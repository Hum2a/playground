/**
 * Critical Weakness Hit — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Short exploit feedback: compress → four attack lines → 3-layer split → resolve.
 */

const COMPRESS_MS = 70
const ATTACK_MS = 70
const SPLIT_MS = 80
const RESOLVE_MS = 140
/** Total ≈ COMPRESS + ATTACK + SPLIT + RESOLVE = 360ms */

const PHASES = [
  'cwh--compress',
  'cwh--attack',
  'cwh--impact',
  'cwh--split',
  'cwh--recombine',
  'cwh--resolve',
  'cwh--cut',
  'cwh--resolved',
]

let busy = false
let resolved = false
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
  return document.querySelector('[data-critical-weakness]')
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

function setLive(text) {
  const live = document.querySelector('[data-cwh-live]')
  if (!live) return
  live.textContent = ''
  void live.offsetWidth
  live.textContent = text
}

function setTriggers({ go, reset }) {
  const root = rootEl()
  if (!root) return
  const goBtn = root.querySelector('[data-cwh-optimise]')
  const resetBtn = root.querySelector('[data-cwh-reset]')
  if (goBtn) {
    goBtn.disabled = !go
    goBtn.hidden = !go
  }
  if (resetBtn) {
    resetBtn.disabled = !reset
    resetBtn.hidden = !reset
  }
}

function applyResolved(root) {
  clearTimers()
  clearPhases(root)
  root.classList.add('cwh--resolved')
  root.setAttribute('data-state', 'resolved')
  resolved = true
  busy = false
  setTriggers({ go: false, reset: true })
  setLive('Memory resolved.')
}

function applyIdle(root) {
  clearTimers()
  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  resolved = false
  busy = false
  setTriggers({ go: true, reset: false })
  setLive('Memory weakness exposed.')
}

/**
 * Run critical weakness exploit sequence.
 * @returns {Promise<void>}
 */
export function runCriticalWeaknessHit() {
  const root = rootEl()
  if (!root) return Promise.resolve()
  if (busy || resolved) return Promise.resolve()

  if (prefersReducedMotion()) {
    applyResolved(root)
    return Promise.resolve()
  }

  busy = true
  clearPhases(root)
  root.setAttribute('data-state', 'running')
  setTriggers({ go: false, reset: false })
  setLive('Optimising memory weakness.')

  // Anticipation compress
  root.classList.add('cwh--compress')

  return new Promise((resolve) => {
    later(COMPRESS_MS, () => {
      // Four corner lines attack inward
      root.classList.add('cwh--attack')

      later(ATTACK_MS, () => {
        // Impact: hide lines, split into 3 deterministic layers
        root.classList.add('cwh--impact', 'cwh--split')
        root.classList.remove('cwh--attack')

        later(SPLIT_MS, () => {
          // Recombine + status swap + horizontal cut
          root.classList.remove('cwh--split', 'cwh--compress')
          root.classList.add('cwh--recombine', 'cwh--resolve', 'cwh--cut')

          later(RESOLVE_MS, () => {
            applyResolved(root)
            resolve()
          })
        })
      })
    })
  })
}

/**
 * Restore idle WEAKNESS composition instantly.
 * @returns {void}
 */
export function resetCriticalWeaknessHit() {
  const root = rootEl()
  if (!root) return
  applyIdle(root)
}

function bind() {
  if (bound) return
  const root = rootEl()
  if (!root) return
  bound = true

  const go = root.querySelector('[data-cwh-optimise]')
  const reset = root.querySelector('[data-cwh-reset]')
  if (go) go.addEventListener('click', () => runCriticalWeaknessHit())
  if (reset) reset.addEventListener('click', () => resetCriticalWeaknessHit())
}

export const criticalWeaknessHit = {
  run: runCriticalWeaknessHit,
  reset: resetCriticalWeaknessHit,
}

if (typeof window !== 'undefined') {
  window.criticalWeaknessHit = criticalWeaknessHit
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true })
  } else {
    bind()
  }
}
