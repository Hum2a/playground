/**
 * Capture Breakout (SPX-713) — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timing (ms):
 *   Enter                 240
 *   Close                 160
 *   Shake 1               220
 *   Pause 1               180
 *   Shake 2               220
 *   Long pause            280
 *   Shake 3 start→40%     ~88  (interrupted)
 *   Compress               70
 *   Breakout / escape     420
 *   Recover               280
 *
 * Exactly two complete checks; third interrupted. Six radial breakout lines.
 */

const T = {
  enter: 240,
  close: 160,
  shake1: 220,
  pause1: 180,
  shake2: 220,
  pause2: 280,
  shake3Full: 220,
  interruptAt: 0.4,
  compress: 70,
  escape: 420,
  recover: 280,
}

T.shake3Partial = Math.round(T.shake3Full * T.interruptAt)

let busy = false
let escaped = false
/** @type {number[]} */
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
  return document.querySelector('[data-capture-breakout]')
}

const PHASES = [
  'is-entering',
  'is-closing',
  'is-closed',
  'is-shake-1',
  'is-shake-2',
  'is-shake-3',
  'is-compress',
  'is-breakout',
  'is-recover',
  'is-escaped',
  'is-rm',
]

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(text) {
  const el = rootEl()?.querySelector('[data-cbo-status]')
  if (el) el.textContent = text
}

function setTriggers({ capture, retry }) {
  const root = rootEl()
  if (!root) return
  const go = root.querySelector('[data-cbo-capture]')
  const again = root.querySelector('[data-cbo-retry]')
  if (go) {
    go.hidden = !capture
    go.disabled = !capture
  }
  if (again) {
    again.hidden = !retry
    again.disabled = !retry
  }
}

function resetVisual() {
  const root = rootEl()
  if (!root) return
  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  setStatus('RESOLVING')
  setTriggers({ capture: true, retry: false })
  escaped = false
}

/**
 * Run capture that fails on the interrupted third check.
 * @returns {Promise<void>}
 */
export function runCaptureBreakout() {
  if (busy) return Promise.resolve()
  const root = rootEl()
  if (!root) return Promise.resolve()

  if (escaped) {
    return runCaptureBreakoutRetry()
  }

  busy = true
  clearTimers()
  resetVisual()
  void root.offsetWidth
  setTriggers({ capture: false, retry: false })
  setStatus('RESOLVING')
  root.setAttribute('data-state', 'capturing')

  if (prefersReducedMotion()) {
    root.classList.add('is-rm', 'is-escaped')
    root.setAttribute('data-state', 'escaped')
    setStatus('ESCAPED')
    setTriggers({ capture: false, retry: true })
    escaped = true
    busy = false
    return Promise.resolve()
  }

  let t = 0
  root.classList.add('is-entering')

  return new Promise((resolve) => {
    later((t += T.enter), () => {
      root.classList.remove('is-entering')
      root.classList.add('is-closing')
    })

    later((t += T.close), () => {
      root.classList.remove('is-closing')
      root.classList.add('is-closed')
      root.setAttribute('data-state', 'checking')
    })

    later((t += 40), () => {
      root.classList.add('is-shake-1')
    })

    later((t += T.shake1), () => {
      root.classList.remove('is-shake-1')
    })

    later((t += T.pause1), () => {
      root.classList.add('is-shake-2')
    })

    later((t += T.shake2), () => {
      root.classList.remove('is-shake-2')
    })

    later((t += T.pause2), () => {
      // Begin third shake — interrupt ~40%
      root.classList.add('is-shake-3')
    })

    later((t += T.shake3Partial), () => {
      root.classList.remove('is-shake-3')
      root.classList.add('is-compress')
    })

    later((t += T.compress), () => {
      root.classList.remove('is-compress', 'is-closed')
      root.classList.add('is-breakout')
      root.setAttribute('data-state', 'breakout')
    })

    later((t += T.escape), () => {
      root.classList.remove('is-breakout')
      root.classList.add('is-recover')
      setStatus('ESCAPED')
    })

    later((t += T.recover), () => {
      root.classList.remove('is-recover')
      root.classList.add('is-escaped')
      root.setAttribute('data-state', 'escaped')
      setTriggers({ capture: false, retry: true })
      escaped = true
      busy = false
      resolve()
    })
  })
}

/**
 * Restore idle and allow another attempt.
 * @returns {Promise<void>}
 */
export function runCaptureBreakoutRetry() {
  clearTimers()
  busy = false
  resetVisual()
  void rootEl()?.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  document.querySelector('[data-cbo-capture]')?.addEventListener('click', () => {
    void runCaptureBreakout()
  })
  document.querySelector('[data-cbo-retry]')?.addEventListener('click', () => {
    void runCaptureBreakoutRetry()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void runCaptureBreakoutRetry().then(() => runCaptureBreakout())
    }
  })
}

bindUi()
