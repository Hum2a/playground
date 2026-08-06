/**
 * Critical Capture (SPX-711) — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timing (ms):
 *   Target enter          220
 *   Close settle           80
 *   Pause                 100
 *   Single sharp lock     170  (only one — not three shakes)
 *   Confirm ring          160
 *   Total                ~730
 *
 * Critical indicator: exactly 4 rays, ~18px outward at peak compression.
 */

const ENTER_MS = 220
const CLOSE_MS = 80
const PAUSE_MS = 100
const LOCK_MS = 170
const RING_MS = 160
const TOTAL_MS = ENTER_MS + CLOSE_MS + PAUSE_MS + LOCK_MS + RING_MS

let busy = false
let verified = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
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

function rootEl() {
  return document.querySelector('[data-crit-cap]')
}

function setPhase(phase) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = rootEl()?.querySelector('[data-crit-status]')
  if (el) el.textContent = text
}

function setTriggerLabel(label, disabled) {
  const btn = rootEl()?.querySelector('[data-crit-trigger]')
  if (!btn) return
  btn.textContent = label
  btn.disabled = Boolean(disabled)
}

function resetVisual() {
  const root = rootEl()
  if (!root) return
  root.classList.remove(
    'crit-cap--enter',
    'crit-cap--closed',
    'crit-cap--lock',
    'crit-cap--rays',
    'crit-cap--ring',
    'crit-cap--done',
    'crit-cap--rm',
  )
  setPhase('idle')
  setStatus('VERIFYING')
  setTriggerLabel('CAPTURE', false)
  verified = false
}

/**
 * Run the critical (single-lock) capture path.
 * @returns {Promise<void>}
 */
export function runCriticalCapture() {
  if (busy) return Promise.resolve()
  const root = rootEl()
  if (!root) return Promise.resolve()

  if (verified) {
    return runCriticalCaptureReset()
  }

  busy = true
  clearTimers()
  resetVisual()
  void root.offsetWidth
  setTriggerLabel('CAPTURE', true)
  setStatus('VERIFYING')

  if (prefersReducedMotion()) {
    root.classList.add('crit-cap--rm', 'crit-cap--done', 'crit-cap--closed')
    setPhase('done')
    setStatus('VERIFIED')
    setTriggerLabel('RESET', false)
    verified = true
    busy = false
    return Promise.resolve()
  }

  // 1) Target enters
  root.classList.add('crit-cap--enter')
  setPhase('enter')

  return new Promise((resolve) => {
    later(ENTER_MS, () => {
      // 2) Container closes
      root.classList.add('crit-cap--closed')
      setPhase('closed')
    })

    later(ENTER_MS + CLOSE_MS + PAUSE_MS, () => {
      // 3) One sharp lock only
      root.classList.add('crit-cap--lock')
      setPhase('lock')
      // Rays at peak compression (~mid lock)
      later(Math.round(LOCK_MS * 0.35), () => {
        root.classList.add('crit-cap--rays')
      })
    })

    later(ENTER_MS + CLOSE_MS + PAUSE_MS + LOCK_MS, () => {
      // 4) Immediate confirmation after single check
      setStatus('VERIFIED')
      root.classList.add('crit-cap--ring')
      setPhase('confirm')
    })

    later(TOTAL_MS, () => {
      root.classList.remove('crit-cap--enter', 'crit-cap--lock', 'crit-cap--rays', 'crit-cap--ring')
      root.classList.add('crit-cap--done')
      setPhase('done')
      setTriggerLabel('RESET', false)
      verified = true
      busy = false
      resolve()
    })
  })
}

/**
 * Restore idle verifying state.
 * @returns {Promise<void>}
 */
export function runCriticalCaptureReset() {
  clearTimers()
  busy = false
  resetVisual()
  void rootEl()?.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  document.querySelector('[data-crit-trigger]')?.addEventListener('click', () => {
    void runCriticalCapture()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void runCriticalCaptureReset().then(() => runCriticalCapture())
    }
  })
}

bindUi()
