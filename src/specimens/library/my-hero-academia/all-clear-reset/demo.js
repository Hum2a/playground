const RETRACT_MS = 420
const STAMP_MS = 280
const STAMP_DELAY_MS = 360
const REBUILD_MS = 500
const REBUILD_DELAY_MS = 120

const STAMP_END_MS = STAMP_DELAY_MS + STAMP_MS
const TOTAL_MS = STAMP_END_MS + REBUILD_DELAY_MS + REBUILD_MS

let busy = false
/** @type {number | null} */
let timer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-all-clear]')
}

function setLive(text) {
  const el = document.querySelector('[data-acr-live]')
  if (el) el.textContent = text
}

function applyDone() {
  const r = root()
  const alert = document.querySelector('[data-acr-alert]')
  const stamp = document.querySelector('[data-acr-stamp]')
  if (alert) alert.setAttribute('aria-hidden', 'true')
  if (stamp) stamp.setAttribute('aria-hidden', 'true')
  if (r) r.dataset.phase = 'done'
  setLive('All clear. Operations restored.')
  const run = document.querySelector('[data-acr-run]')
  const reset = document.querySelector('[data-acr-reset]')
  if (run) run.disabled = true
  if (reset) reset.hidden = false
}

export function runAllClearReset() {
  const r = root()
  if (!r || busy || r.dataset.phase === 'done') return Promise.resolve()

  busy = true
  if (timer) window.clearTimeout(timer)
  setLive('Retracting alert geometry…')
  void r.offsetWidth

  if (prefersReducedMotion()) {
    applyDone()
    busy = false
    return Promise.resolve()
  }

  r.dataset.phase = 'clearing'

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      r.dataset.phase = 'stamp'
      setLive('All clear stamped.')

      timer = window.setTimeout(() => {
        r.dataset.phase = 'rebuild'
        setLive('Rebuilding operations panel…')

        timer = window.setTimeout(() => {
          applyDone()
          busy = false
          timer = null
          resolve()
        }, REBUILD_DELAY_MS + REBUILD_MS)
      }, STAMP_MS)
    }, STAMP_DELAY_MS)
  })
}

export function resetAllClearReset() {
  if (timer) window.clearTimeout(timer)
  timer = null
  busy = false
  const r = root()
  const alert = document.querySelector('[data-acr-alert]')
  const stamp = document.querySelector('[data-acr-stamp]')
  if (alert) alert.setAttribute('aria-hidden', 'false')
  if (stamp) stamp.setAttribute('aria-hidden', 'true')
  if (r) r.dataset.phase = 'alert'
  setLive('Threat alert active.')
  const run = document.querySelector('[data-acr-run]')
  const reset = document.querySelector('[data-acr-reset]')
  if (run) run.disabled = false
  if (reset) reset.hidden = true
  void r?.offsetWidth
}

export async function replayAllClearReset() {
  if (busy) return
  resetAllClearReset()
  void root()?.offsetWidth
  await runAllClearReset()
}

function bind() {
  document.querySelector('[data-acr-run]')?.addEventListener('click', () => {
    void runAllClearReset()
  })
  document.querySelector('[data-acr-reset]')?.addEventListener('click', () => {
    resetAllClearReset()
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetAllClearReset()
  })
}

bind()
