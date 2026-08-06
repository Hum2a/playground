const CLEAR_MS = 900

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
  if (alert) alert.setAttribute('aria-hidden', 'true')
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
      applyDone()
      busy = false
      timer = null
      resolve()
    }, CLEAR_MS)
  })
}

export function resetAllClearReset() {
  if (timer) window.clearTimeout(timer)
  timer = null
  busy = false
  const r = root()
  const alert = document.querySelector('[data-acr-alert]')
  if (alert) alert.setAttribute('aria-hidden', 'false')
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
