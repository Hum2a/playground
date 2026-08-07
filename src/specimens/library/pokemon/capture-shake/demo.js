/**
 * Capture Shake — tiny portable capture/confirm API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

/** Frozen timings (ms) — match contract.json / CSS custom properties. */
const T = {
  enter: 240,
  close: 160,
  settle: 140,
  settleWait: 180,
  shake1: 220,
  pause1: 180,
  shake2: 220,
  pause2: 200,
  shake3: 200,
  pause3: 220,
  resolve: 320,
}

const PHASES = [
  'is-entering',
  'is-closing',
  'is-enclosed',
  'is-closed',
  'is-settling',
  'is-checking',
  'is-shake-1',
  'is-shake-2',
  'is-shake-3',
  'is-resolve',
  'is-rm-settled',
]

let busy = false
let captured = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-capture-shake]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setTriggers({ go, reset }) {
  const root = rootEl()
  if (!root) return
  const goBtn = root.querySelector('[data-cs-capture]')
  const resetBtn = root.querySelector('[data-cs-reset]')
  if (goBtn) {
    goBtn.disabled = !go
    goBtn.hidden = !go
  }
  if (resetBtn) {
    resetBtn.disabled = !reset
    resetBtn.hidden = !reset
  }
}

function setStatusWords(done) {
  const idle = document.querySelector('[data-cs-word-idle]')
  const fin = document.querySelector('[data-cs-word-done]')
  if (idle) idle.setAttribute('aria-hidden', done ? 'true' : 'false')
  if (fin) fin.setAttribute('aria-hidden', done ? 'false' : 'true')
}

function setAccessibleStatus(message) {
  const text = document.querySelector('[data-cs-status-text]')
  if (text) text.textContent = message
}

function applyCaptured(root) {
  clearPhases(root)
  root.classList.add('is-closed', 'is-resolve')
  root.setAttribute('data-state', 'captured')
  setStatusWords(true)
  setAccessibleStatus('Capture complete. Captured.')
  captured = true
  busy = false
  setTriggers({ go: false, reset: true })
}

function applyReducedSettled(root) {
  clearPhases(root)
  root.classList.add('is-rm-settled', 'is-closed')
  root.setAttribute('data-state', 'captured')
  setStatusWords(true)
  setAccessibleStatus('Capture complete. Captured without motion.')
  captured = true
  busy = false
  setTriggers({ go: false, reset: true })
}

/**
 * Run capture → settle → three checks → CAPTURED.
 * @returns {Promise<void>}
 */
export function runCaptureShake() {
  const root = rootEl()
  if (!root || busy || captured) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.setAttribute('data-state', 'capturing')
  setTriggers({ go: false, reset: false })
  setAccessibleStatus('Capture started. Enclosing unknown specimen.')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applyReducedSettled(root)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let t = 0

    root.classList.add('is-entering')

    t += T.enter
    later(t - 40, () => {
      root.classList.add('is-closing')
    })

    later(t, () => {
      root.classList.remove('is-entering')
      root.classList.add('is-enclosed', 'is-closed')
      root.setAttribute('data-state', 'settling')
    })

    // Close finishes shortly after enter; then settle
    t += 40
    later(t, () => {
      root.classList.remove('is-closing')
      root.classList.add('is-settling')
    })

    t += T.settle
    later(t, () => {
      root.classList.remove('is-settling')
      root.setAttribute('data-state', 'checking')
      root.classList.add('is-checking')
      setAccessibleStatus('Capture checks ready. Three checks remain.')
    })

    t += T.settleWait

    // Shake 1
    later(t, () => {
      root.classList.add('is-shake-1')
      setAccessibleStatus('Capture check 1 of 3.')
    })
    t += T.shake1
    later(t, () => {
      root.classList.remove('is-shake-1')
    })
    t += T.pause1

    // Shake 2
    later(t, () => {
      root.classList.add('is-shake-2')
      setAccessibleStatus('Capture check 2 of 3.')
    })
    t += T.shake2
    later(t, () => {
      root.classList.remove('is-shake-2')
    })
    t += T.pause2

    // Shake 3
    later(t, () => {
      root.classList.add('is-shake-3')
      setAccessibleStatus('Capture check 3 of 3.')
    })
    t += T.shake3
    later(t, () => {
      root.classList.remove('is-shake-3')
    })
    t += T.pause3

    // Resolve
    later(t, () => {
      root.classList.remove('is-checking')
      root.classList.add('is-resolve')
      root.setAttribute('data-state', 'captured')
      setStatusWords(true)
      setAccessibleStatus('Capture complete. Captured.')
      setTriggers({ go: false, reset: true })
      captured = true
      busy = false
      resolve()
    })
  })
}

/**
 * Instant reset to UNRESOLVED / open device.
 */
export function resetCaptureShake() {
  const root = rootEl()
  if (!root) return
  clearTimers()
  busy = false
  captured = false
  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  setStatusWords(false)
  setAccessibleStatus('Capture unresolved. Ready to begin.')
  setTriggers({ go: true, reset: false })
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-cs-capture]')?.addEventListener('click', () => {
    void runCaptureShake()
  })
  root.querySelector('[data-cs-reset]')?.addEventListener('click', () => {
    resetCaptureShake()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetCaptureShake()
  })

  setTriggers({ go: true, reset: false })
}

bind()
