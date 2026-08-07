const CLOSE_MS = 420
const CLOSE_STAGGER_MS = 60
const SHUTTER_COUNT = 5
const LABEL_DELAY_MS = 700
const LABEL_MS = 280

const TOTAL_MS = LABEL_DELAY_MS + LABEL_MS

let busy = false
/** @type {number | null} */
let timer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-lockdown-shutter]')
}

function setLive(text) {
  const el = document.querySelector('[data-lds-live]')
  if (el) el.textContent = text
}

function applyDone() {
  const r = root()
  const label = document.querySelector('[data-lds-label]')
  if (label) label.setAttribute('aria-hidden', 'false')
  if (r) r.dataset.phase = 'done'
  setLive('Facility lockdown active.')
  const run = document.querySelector('[data-lds-run]')
  const reset = document.querySelector('[data-lds-reset]')
  if (run) run.disabled = true
  if (reset) reset.hidden = false
}

export function runLockdownShutter() {
  const r = root()
  if (!r || busy || r.dataset.phase === 'done') return Promise.resolve()

  busy = true
  if (timer) window.clearTimeout(timer)
  setLive('Shutter segments closing…')
  void r.offsetWidth

  if (prefersReducedMotion()) {
    applyDone()
    busy = false
    return Promise.resolve()
  }

  r.dataset.phase = 'close'

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      applyDone()
      busy = false
      timer = null
      resolve()
    }, TOTAL_MS)
  })
}

export function resetLockdownShutter() {
  if (timer) window.clearTimeout(timer)
  timer = null
  busy = false
  const r = root()
  const label = document.querySelector('[data-lds-label]')
  if (label) label.setAttribute('aria-hidden', 'true')
  if (r) r.dataset.phase = 'idle'
  setLive('Facility operational.')
  const run = document.querySelector('[data-lds-run]')
  const reset = document.querySelector('[data-lds-reset]')
  if (run) run.disabled = false
  if (reset) reset.hidden = true
  void r?.offsetWidth
}

export async function replayLockdownShutter() {
  if (busy) return
  resetLockdownShutter()
  void root()?.offsetWidth
  await runLockdownShutter()
}

function bind() {
  document.querySelector('[data-lds-run]')?.addEventListener('click', () => {
    void runLockdownShutter()
  })
  document.querySelector('[data-lds-reset]')?.addEventListener('click', () => {
    resetLockdownShutter()
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetLockdownShutter()
  })
}

bind()
