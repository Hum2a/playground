/**
 * Lightning Target Acquisition — a loose reticle snaps onto a target with branching marks, then locks.
 * iframe-safe; no storage / parent / network.
 */

const SNAP_MS = 440
const SETTLE_MS = 150

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-lta]')
}

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
  const el = document.querySelector('[data-lta-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-lta-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-lta-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-lta-run], [data-lta-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function showResolved() {
  setPhase('locked')
  setStatus('LOCKED')
  setHint('Target locked. Press Replay to reacquire.')
  setLive('Target locked.')
}

function resetVisual() {
  setPhase('idle')
  setStatus('IDLE')
  setHint('Press Run to acquire the target.')
  setLive('Reticle idle. Target unlocked.')
}

/**
 * Auto-run the scan → snap → lock sequence.
 * @returns {Promise<void>}
 */
export function runLightningTargetAcquisition() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'locked') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('run')
  setStatus('ACQUIRING')
  setHint('Acquiring.')
  setLive('Reticle acquiring target.')

  return new Promise((resolve) => {
    later(SNAP_MS, () => {
      later(SETTLE_MS, () => {
        showResolved()
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
  document.querySelector('[data-lta-run]')?.addEventListener('click', () => {
    void runLightningTargetAcquisition()
  })
  document.querySelector('[data-lta-replay]')?.addEventListener('click', () => {
    void replayLightningTargetAcquisition()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayLightningTargetAcquisition()
  })
}

bindUi()
resetLightningTargetAcquisition()
