/**
 * Butterfly Success State — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const PHASES = [
  'is-assembling',
  'is-opening',
  'is-holding',
  'is-departing',
  'is-complete',
]

/** Frozen timings (ms) — match contract.json / CSS custom properties. */
const T = {
  assemble: 220,
  open: 100,
  hold: 80,
  depart: 260,
}

const OPEN_AT = T.assemble
const HOLD_AT = OPEN_AT + T.open
const DEPART_AT = HOLD_AT + T.hold
const DONE_AT = DEPART_AT + T.depart

let busy = false
let complete = false
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
  return document.querySelector('[data-butterfly-success]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(text) {
  const el = document.querySelector('[data-bss-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function setTriggers({ go, reset }) {
  const root = rootEl()
  if (!root) return
  const goBtn = root.querySelector('[data-bss-complete]')
  const resetBtn = root.querySelector('[data-bss-reset]')
  if (goBtn) {
    goBtn.disabled = !go
    goBtn.hidden = !go
  }
  if (resetBtn) {
    resetBtn.disabled = !reset
    resetBtn.hidden = !reset
  }
}

function setLabel(text) {
  const el = document.querySelector('[data-bss-label]')
  if (el) el.textContent = text
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function applySettled(root) {
  clearPhases(root)
  root.classList.add('is-complete')
  root.setAttribute('data-state', 'complete')
  complete = true
  busy = false
  setLabel('COMPLETE')
  setTriggers({ go: false, reset: true })
  setStatus('Record saved.')
}

/**
 * Run assemble → open → hold → depart success sequence.
 * @returns {Promise<void>}
 */
export function runButterflySuccess() {
  const root = rootEl()
  if (!root || busy || complete) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.setAttribute('data-state', 'running')
  setTriggers({ go: false, reset: false })
  setLabel('PROCESSING')
  setStatus('')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applySettled(root)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    root.classList.add('is-assembling')

    later(OPEN_AT, () => {
      root.classList.remove('is-assembling')
      root.classList.add('is-opening')
    })

    later(HOLD_AT, () => {
      root.classList.remove('is-opening')
      root.classList.add('is-holding')
    })

    later(DEPART_AT, () => {
      root.classList.remove('is-holding')
      root.classList.add('is-departing')
      setLabel('COMPLETE')
    })

    later(DONE_AT, () => {
      applySettled(root)
      resolve()
    })
  })
}

/**
 * Instant reset — restores PROCESSING without reversing departure.
 */
export function resetButterflySuccess() {
  const root = rootEl()
  if (!root) return
  clearTimers()
  busy = false
  complete = false
  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  setLabel('PROCESSING')
  setTriggers({ go: true, reset: false })
  setStatus('')
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-bss-complete]')?.addEventListener('click', () => {
    void runButterflySuccess()
  })
  root.querySelector('[data-bss-reset]')?.addEventListener('click', () => {
    resetButterflySuccess()
  })

  setTriggers({ go: true, reset: false })
  setLabel('PROCESSING')
}

bind()
