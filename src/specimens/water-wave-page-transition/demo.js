/**
 * Water Wave Page Transition — A wave wipe exchanges page content.
 * iframe-safe; no storage / parent / network.
 */
const ACTIVE_MS = 480
const SETTLE_MS = 160

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced = document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() { return document.querySelector('[data-wwpt6]') }

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setLive(text) {
  const el = document.querySelector('[data-wwpt6-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-wwpt6-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-wwpt6-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-wwpt6-run], [data-wwpt6-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A wave wipe exchanges page content. Resolved.')
  setLive('Water Wave Page Transition. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A wave wipe exchanges page content.')
  setLive('Water Wave Page Transition. Idle.')
}

/** @returns {Promise<void>} */
export function runWaterWavePageTransition() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return Promise.resolve()
  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth
  if (prefersReducedMotion()) {
    showDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }
  root.setAttribute('data-phase', 'active')
  setStatus('ACTIVE')
  setLive('Water Wave Page Transition. Active.')
  return new Promise((resolve) => {
    later(ACTIVE_MS, () => {
      showDone()
      later(SETTLE_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetWaterWavePageTransition() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayWaterWavePageTransition() {
  if (busy) return
  resetWaterWavePageTransition()
  void rootEl()?.offsetWidth
  await runWaterWavePageTransition()
}

function bindUi() {
  document.querySelector('[data-wwpt6-run]')?.addEventListener('click', () => { void runWaterWavePageTransition() })
  document.querySelector('[data-wwpt6-replay]')?.addEventListener('click', () => { void replayWaterWavePageTransition() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayWaterWavePageTransition()
  })
}

bindUi()
resetWaterWavePageTransition()
