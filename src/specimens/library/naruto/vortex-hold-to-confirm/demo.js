/**
 * Vortex Hold-to-Confirm — hold the core to build a rotating vortex; release early cancels.
 * Real pointer/keyboard hold plus a deterministic Run auto-hold. iframe-safe; no storage / parent / network.
 */

const HOLD_MS = 900
const CANCEL_MS = 200
const CONFIRM_PULSE_MS = 180

let holding = false
let confirmed = false
let busy = false
let keyHeld = false
let activePointerId = null
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-vhc]')
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
  const el = document.querySelector('[data-vhc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-vhc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-vhc-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-vhc-run], [data-vhc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function resetVisual() {
  setPhase('idle')
  setStatus('IDLE')
  setHint('Hold the core, or press Run.')
  setLive('Core idle. Hold to build.')
}

function confirmHold() {
  const root = rootEl()
  if (!root) return
  holding = false
  keyHeld = false
  activePointerId = null
  confirmed = true
  busy = true
  setPhase('confirmed')
  setStatus('CONFIRMED')
  setHint('Core confirmed. Press Replay to build again.')
  setLive('Core confirmed.')
  later(CONFIRM_PULSE_MS, () => {
    busy = false
    setButtons(true)
  })
}

function startHold() {
  const root = rootEl()
  if (!root || holding || confirmed || busy) return
  holding = true
  setPhase('holding')
  setStatus('HOLDING')
  setHint('Keep holding.')
  setLive('Holding to build the vortex.')
  setButtons(false)
  void root.offsetWidth
  later(HOLD_MS, () => {
    if (holding) confirmHold()
  })
}

function cancelHold() {
  if (!holding) return
  holding = false
  keyHeld = false
  activePointerId = null
  setPhase('cancel')
  setStatus('CANCELLED')
  setHint('Hold the core, or press Run.')
  setLive('Cancelled before confirming.')
  later(CANCEL_MS, () => {
    if (!holding && !confirmed) {
      setPhase('idle')
      setStatus('IDLE')
    }
    setButtons(true)
  })
}

/**
 * Auto-run a full deterministic hold-to-confirm cycle (used by Run/Replay).
 * @returns {Promise<void>}
 */
export function runVortexHoldToConfirm() {
  const root = rootEl()
  if (!root || busy || confirmed || holding) return Promise.resolve()

  clearTimers()
  setButtons(false)

  if (prefersReducedMotion()) {
    confirmHold()
    return Promise.resolve()
  }

  startHold()
  return new Promise((resolve) => {
    later(HOLD_MS + CONFIRM_PULSE_MS + 20, () => resolve())
  })
}

export function resetVortexHoldToConfirm() {
  clearTimers()
  holding = false
  confirmed = false
  busy = false
  keyHeld = false
  activePointerId = null
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayVortexHoldToConfirm() {
  if (busy || holding) return
  resetVortexHoldToConfirm()
  void rootEl()?.offsetWidth
  await runVortexHoldToConfirm()
}

function bindUi() {
  const button = document.querySelector('[data-vhc-button]')

  button?.addEventListener('pointerdown', (e) => {
    if (e.button != null && e.button !== 0) return
    if (confirmed || busy) return
    activePointerId = e.pointerId
    try {
      button.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    e.preventDefault()
    startHold()
  })

  const release = (e) => {
    if (activePointerId != null && e.pointerId !== activePointerId) return
    if (holding) cancelHold()
    activePointerId = null
  }

  button?.addEventListener('pointerup', release)
  button?.addEventListener('pointercancel', release)
  button?.addEventListener('lostpointercapture', () => {
    if (holding) cancelHold()
    activePointerId = null
  })

  button?.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' && e.key !== ' ') return
    if (e.repeat) {
      e.preventDefault()
      return
    }
    if (confirmed || busy) return
    e.preventDefault()
    keyHeld = true
    startHold()
  })

  button?.addEventListener('keyup', (e) => {
    if (e.code !== 'Space' && e.key !== ' ') return
    if (!keyHeld && !holding) return
    e.preventDefault()
    keyHeld = false
    cancelHold()
  })

  button?.addEventListener('blur', () => {
    if (holding) cancelHold()
    keyHeld = false
  })

  document.querySelector('[data-vhc-run]')?.addEventListener('click', () => {
    void runVortexHoldToConfirm()
  })
  document.querySelector('[data-vhc-replay]')?.addEventListener('click', () => {
    void replayVortexHoldToConfirm()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayVortexHoldToConfirm()
  })
}

bindUi()
resetVortexHoldToConfirm()
