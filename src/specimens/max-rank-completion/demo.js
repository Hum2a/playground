/**
 * Max Rank Completion — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Terminal Social Link state: energy → 09→10 → diamond circuit → MAX lock.
 */

const ENERGY_MS = 300
const RANK_MS = 180
const CIRCUIT_MS = 420
const LOCK_MS = 160
const RANK_AT = ENERGY_MS
const CIRCUIT_AT = ENERGY_MS + RANK_MS
const LOCK_AT = CIRCUIT_AT + CIRCUIT_MS
const TOTAL_MS = LOCK_AT + LOCK_MS

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
  return document.querySelector('[data-max-rank]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-mrc-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setBusyUi(root, isBusy) {
  const btn = root.querySelector('[data-mrc-trigger]')
  if (btn) btn.disabled = isBusy || complete
}

function applyReducedComplete(root) {
  clearTimers()
  busy = false
  complete = true
  root.classList.add('mrc--reduced')
  root.setAttribute('data-state', 'complete')
  setStatus(root, 'Social link max rank. Rank 10.')
  setBusyUi(root, false)
}

/**
 * Run max-rank completion choreography.
 * @returns {Promise<void>}
 */
export function completeMaxRank() {
  const root = rootEl()
  if (!root || busy || complete) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('mrc--reduced')
  setBusyUi(root, true)
  setStatus(root, 'Social link rank 09.')

  if (prefersReducedMotion()) {
    applyReducedComplete(root)
    return Promise.resolve()
  }

  root.setAttribute('data-state', 'energy')
  void root.offsetWidth

  return new Promise((resolve) => {
    later(RANK_AT, () => {
      root.setAttribute('data-state', 'rank')
      setStatus(root, 'Social link rank 10.')
    })

    later(CIRCUIT_AT, () => {
      root.setAttribute('data-state', 'circuit')
    })

    later(LOCK_AT, () => {
      root.setAttribute('data-state', 'lock')
      setStatus(root, 'Social link max rank. Rank 10.')
    })

    later(TOTAL_MS, () => {
      root.setAttribute('data-state', 'complete')
      complete = true
      busy = false
      setBusyUi(root, false)
      resolve()
    })
  })
}

/**
 * Restore rank 09 idle bond.
 * @returns {Promise<void>}
 */
export function resetMaxRank() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  complete = false
  root.classList.remove('mrc--reduced')
  root.setAttribute('data-state', 'idle')
  void root.offsetWidth
  setStatus(root, 'Social link rank 09.')
  setBusyUi(root, false)
  return Promise.resolve()
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-mrc-trigger]')?.addEventListener('click', () => {
    void completeMaxRank()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void resetMaxRank()
    }
  })
}

bind()
