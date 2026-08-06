/**
 * Lightning Target Acquisition — A reticle snaps onto a target with lightning tick marks.
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

function rootEl() { return document.querySelector('[data-lta8]') }

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
  const el = document.querySelector('[data-lta8-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-lta8-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-lta8-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-lta8-run], [data-lta8-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A reticle snaps onto a target with lightning tick marks. Resolved.')
  setLive('Lightning Target Acquisition. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A reticle snaps onto a target with lightning tick marks.')
  setLive('Lightning Target Acquisition. Idle.')
}

/** @returns {Promise<void>} */
export function runLightningTargetAcquisition() {
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
  setLive('Lightning Target Acquisition. Active.')
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

export function resetLightningTargetAcquisition() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayLightningTargetAcquisition() {
  if (busy) return
  resetLightningTargetAcquisition()
  void rootEl()?.offsetWidth
  await runLightningTargetAcquisition()
}

function bindUi() {
  document.querySelector('[data-lta8-run]')?.addEventListener('click', () => { void runLightningTargetAcquisition() })
  document.querySelector('[data-lta8-replay]')?.addEventListener('click', () => { void replayLightningTargetAcquisition() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayLightningTargetAcquisition()
  })
}

bindUi()
resetLightningTargetAcquisition()
