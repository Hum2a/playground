/**
 * Super Effective Hit — tiny portable replay API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

/** Frozen timings (ms) — match contract.json / CSS. */
const T = {
  travel: 150,
  contact: 60,
  secondaryAt: 150 + 55, // 55ms after first contact
  amp: 170,
  resolveAt: 150 + 55 + 170, // after secondary amplification
  done: 150 + 55 + 170 + 140, // ~515ms total incl. message enter
}

const PHASES = [
  'is-travel',
  'is-contact',
  'is-secondary',
  'is-resolve',
  'is-rm-settled',
]

let busy = false
let optimal = false
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
  return document.querySelector('[data-super-effective]')
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
  const goBtn = root.querySelector('[data-seh-apply]')
  const resetBtn = root.querySelector('[data-seh-reset]')
  if (goBtn) {
    goBtn.disabled = !go
    goBtn.hidden = !go
  }
  if (resetBtn) {
    resetBtn.disabled = !reset
    resetBtn.hidden = !reset
  }
}

function setMatchWords(done) {
  const idle = document.querySelector('[data-seh-word-idle]')
  const fin = document.querySelector('[data-seh-word-done]')
  const eff = document.querySelector('[data-seh-eff]')
  if (idle) idle.setAttribute('aria-hidden', done ? 'true' : 'false')
  if (fin) fin.setAttribute('aria-hidden', done ? 'false' : 'true')
  if (eff) eff.setAttribute('aria-hidden', done ? 'false' : 'true')
}

function setStatus(text) {
  const el = document.querySelector('[data-seh-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function applyOptimal(root) {
  clearPhases(root)
  root.classList.add('is-resolve')
  root.setAttribute('data-state', 'optimal')
  setMatchWords(true)
  setStatus('Match optimal. High effectiveness.')
  optimal = true
  busy = false
  setTriggers({ go: false, reset: true })
}

function applyReducedSettled(root) {
  clearPhases(root)
  root.classList.add('is-rm-settled')
  root.setAttribute('data-state', 'optimal')
  setMatchWords(true)
  setStatus('Match optimal. High effectiveness.')
  optimal = true
  busy = false
  setTriggers({ go: false, reset: true })
}

/**
 * Run travel → contact → secondary effectiveness → OPTIMAL.
 * @returns {Promise<void>}
 */
export function runSuperEffectiveHit() {
  const root = rootEl()
  if (!root || busy || optimal) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.setAttribute('data-state', 'running')
  setMatchWords(false)
  setStatus('')
  setTriggers({ go: false, reset: false })
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applyReducedSettled(root)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    root.classList.add('is-travel')

    later(T.travel, () => {
      root.classList.remove('is-travel')
      root.classList.add('is-contact')
    })

    later(T.secondaryAt, () => {
      root.classList.remove('is-contact')
      root.classList.add('is-secondary')
    })

    later(T.resolveAt, () => {
      root.classList.add('is-resolve')
      setMatchWords(true)
      setStatus('Match optimal. High effectiveness.')
    })

    later(T.done, () => {
      root.setAttribute('data-state', 'optimal')
      optimal = true
      busy = false
      setTriggers({ go: false, reset: true })
      resolve()
    })
  })
}

/**
 * Instant reset to UNKNOWN / idle.
 */
export function resetSuperEffectiveHit() {
  const root = rootEl()
  if (!root) return
  clearTimers()
  busy = false
  optimal = false
  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  setMatchWords(false)
  setStatus('')
  setTriggers({ go: true, reset: false })
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-seh-apply]')?.addEventListener('click', () => {
    void runSuperEffectiveHit()
  })
  root.querySelector('[data-seh-reset]')?.addEventListener('click', () => {
    resetSuperEffectiveHit()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetSuperEffectiveHit()
  })

  setTriggers({ go: true, reset: false })
}

bind()
