/**
 * Evolution Silhouette Transformation — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Decisive A↔B geometry swaps (no crossfade); Form B wins permanently.
 */

const CHARGE_MS = 280
/** Instability cycles: A then B durations (ms). Cycle 4 leaves B. */
const CYCLES = [
  { a: 180, b: 90 },
  { a: 140, b: 120 },
  { a: 100, b: 150 },
  { a: 60, b: 0 },
]
const RESOLVE_MS = 220

const PHASES = [
  'est--charge',
  'est--instability',
  'est--resolve',
]

let busy = false
let evolved = false
/** @type {number[]} */
let timers = []
let bound = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-evolution-silhouette]')
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

function setForm(root, form) {
  root.setAttribute('data-form', form)
}

function setCopy(root, evolvedState) {
  const sr = root.querySelector('[data-est-sr]')
  const live = root.querySelector('[data-est-live]')
  if (evolvedState) {
    if (sr) sr.textContent = 'Identity: Form 02 Advanced.'
    if (live) live.textContent = 'Form 02 Advanced.'
  } else {
    if (sr) sr.textContent = 'Identity: Form 01 Basic.'
    if (live) live.textContent = 'Form 01 Basic ready.'
  }
}

function setTriggers({ go, reset }) {
  const root = rootEl()
  if (!root) return
  const goBtn = root.querySelector('[data-est-evolve]')
  const resetBtn = root.querySelector('[data-est-reset]')
  if (goBtn) {
    goBtn.disabled = !go
    goBtn.hidden = !go
  }
  if (resetBtn) {
    resetBtn.disabled = !reset
    resetBtn.hidden = !reset
  }
}

function applyEvolved(root) {
  clearTimers()
  clearPhases(root)
  setForm(root, 'b')
  root.classList.add('est--resolve')
  root.setAttribute('data-state', 'evolved')
  evolved = true
  busy = false
  setTriggers({ go: false, reset: true })
  setCopy(root, true)
}

function applyIdle(root) {
  clearTimers()
  clearPhases(root)
  setForm(root, 'a')
  root.setAttribute('data-state', 'idle')
  evolved = false
  busy = false
  setTriggers({ go: true, reset: false })
  setCopy(root, false)
}

/**
 * Run evolution sequence.
 * @returns {Promise<void>}
 */
export function runEvolution() {
  const root = rootEl()
  if (!root) return Promise.resolve()
  if (busy || evolved) return Promise.resolve()

  if (prefersReducedMotion()) {
    applyEvolved(root)
    return Promise.resolve()
  }

  busy = true
  clearPhases(root)
  setForm(root, 'a')
  root.setAttribute('data-state', 'running')
  setTriggers({ go: false, reset: false })
  const live = root.querySelector('[data-est-live]')
  if (live) live.textContent = 'Evolving. Identity unstable.'

  // Phase 1 — charge
  root.classList.add('est--charge')

  return new Promise((resolve) => {
    later(CHARGE_MS, () => {
      root.classList.remove('est--charge')
      root.classList.add('est--instability')

      let t = 0
      CYCLES.forEach((cycle, index) => {
        const isLast = index === CYCLES.length - 1

        later(t, () => {
          setForm(root, 'a')
        })
        t += cycle.a

        if (isLast) {
          // Cycle 4: after brief A, B remains permanently
          later(t, () => {
            setForm(root, 'b')
            root.classList.remove('est--instability')
            root.classList.add('est--resolve')
            if (live) live.textContent = 'Form 02 Advanced settling.'

            later(RESOLVE_MS, () => {
              applyEvolved(root)
              resolve()
            })
          })
        } else {
          later(t, () => {
            setForm(root, 'b')
          })
          t += cycle.b
        }
      })
    })
  })
}

/**
 * Restore Form A / BASIC immediately.
 * @returns {void}
 */
export function resetEvolution() {
  const root = rootEl()
  if (!root) return
  applyIdle(root)
}

function bind() {
  if (bound) return
  const root = rootEl()
  if (!root) return
  bound = true

  const go = root.querySelector('[data-est-evolve]')
  const reset = root.querySelector('[data-est-reset]')
  if (go) go.addEventListener('click', () => runEvolution())
  if (reset) reset.addEventListener('click', () => resetEvolution())
}

export const evolutionSilhouetteTransformation = {
  run: runEvolution,
  reset: resetEvolution,
}

if (typeof window !== 'undefined') {
  window.evolutionSilhouetteTransformation = evolutionSilhouetteTransformation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true })
  } else {
    bind()
  }
}
