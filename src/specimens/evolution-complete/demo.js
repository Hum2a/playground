/**
 * Evolution Complete — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Settles Form 02, contracts a registration ring, locks four cardinals,
 * then sweeps UNREGISTERED → CANONICAL with previous identity archived.
 */

const SETTLE_MS = 180
const RING_MS = 260
const MARKERS_MS = 90
const SWEEP_MS = 160
const ARCHIVE_MS = 180

const PHASES = [
  'ec--settle',
  'ec--ring',
  'ec--markers',
  'ec--sweep',
  'ec--archive',
]

let busy = false
let canonical = false
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
  return document.querySelector('[data-evolution-complete]')
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
  const goBtn = root.querySelector('[data-ec-register]')
  const resetBtn = root.querySelector('[data-ec-reset]')
  if (goBtn) {
    goBtn.disabled = !go
    goBtn.hidden = !go
  }
  if (resetBtn) {
    resetBtn.disabled = !reset
    resetBtn.hidden = !reset
  }
}

function setCopy(root, isCanonical) {
  const sr = root.querySelector('[data-ec-sr]')
  const live = root.querySelector('[data-ec-live]')
  if (isCanonical) {
    if (sr) sr.textContent = 'Form 02 canonical. Previous Form 01 archived.'
    if (live) live.textContent = 'Form 02 canonical. Previous Form 01 archived.'
  } else {
    if (sr) sr.textContent = 'Form 02 present. Identity unregistered.'
    if (live) live.textContent = 'Form 02 present. Unregistered.'
  }
}

function applyCanonical(root) {
  clearTimers()
  clearPhases(root)
  root.classList.add('ec--markers', 'ec--archive')
  root.setAttribute('data-state', 'canonical')
  canonical = true
  busy = false
  setTriggers({ go: false, reset: true })
  setCopy(root, true)
}

function applyIdle(root) {
  clearTimers()
  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  canonical = false
  busy = false
  setTriggers({ go: true, reset: false })
  setCopy(root, false)
}

/**
 * Run registration / evolution-complete sequence.
 * @returns {Promise<void>}
 */
export function runEvolutionComplete() {
  const root = rootEl()
  if (!root) return Promise.resolve()
  if (busy || canonical) return Promise.resolve()

  if (prefersReducedMotion()) {
    applyCanonical(root)
    return Promise.resolve()
  }

  busy = true
  clearPhases(root)
  root.setAttribute('data-state', 'running')
  setTriggers({ go: false, reset: false })
  const live = root.querySelector('[data-ec-live]')
  if (live) live.textContent = 'Registering Form 02.'

  // 1. Settle elevated Form 02
  root.classList.add('ec--settle')

  return new Promise((resolve) => {
    later(SETTLE_MS, () => {
      // 2. Registration ring contracts
      root.classList.add('ec--ring')

      later(RING_MS, () => {
        // 3. Four cardinal markers lock
        root.classList.add('ec--markers')

        later(MARKERS_MS, () => {
          // 4. Sweep replaces status (no fade) + archive previous
          root.classList.add('ec--sweep', 'ec--archive')
          if (live) live.textContent = 'Form 02 becoming canonical.'

          later(Math.max(SWEEP_MS, ARCHIVE_MS), () => {
            applyCanonical(root)
            resolve()
          })
        })
      })
    })
  })
}

/**
 * Restore unregistered elevated start state.
 * @returns {void}
 */
export function resetEvolutionComplete() {
  const root = rootEl()
  if (!root) return
  applyIdle(root)
}

function bind() {
  if (bound) return
  const root = rootEl()
  if (!root) return
  bound = true

  const go = root.querySelector('[data-ec-register]')
  const reset = root.querySelector('[data-ec-reset]')
  if (go) go.addEventListener('click', () => runEvolutionComplete())
  if (reset) reset.addEventListener('click', () => resetEvolutionComplete())
}

export const evolutionComplete = {
  run: runEvolutionComplete,
  reset: resetEvolutionComplete,
}

if (typeof window !== 'undefined') {
  window.evolutionComplete = evolutionComplete
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true })
  } else {
    bind()
  }
}
