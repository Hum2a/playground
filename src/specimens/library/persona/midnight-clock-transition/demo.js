/**
 * Midnight Clock Transition — tiny portable temporal transition API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timeline (frozen):
 *   0–120ms    anticipation (ring brightens)
 *   120–620ms  accelerating hands + digital steps
 *   ~520ms     approach to 12
 *   620ms      vertical seam impact
 *   620–800ms  panels expand from centre (~180ms)
 *   ~700ms     state swap under coverage
 *   800–900ms  panels exit outward; State B revealed
 *
 * Hand geometry:
 *   23:54 → hour 357deg, minute 324deg
 *   00:00 → both 0deg
 *   Minute hand travels ~1.9 turns (ending at 0); hour ~0.1 turn.
 */

const ANTICIPATE_MS = 120
const IMPACT_MS = 620
const SWAP_MS = 700
const REVEAL_MS = 800
const TOTAL_MS = 900

const DIGITAL_STEPS = [
  { at: 120, text: '23:54' },
  { at: 260, text: '23:56' },
  { at: 380, text: '23:58' },
  { at: 500, text: '23:59' },
  { at: 620, text: '00:00' },
]

const PHASES = [
  'midnight-clock--anticipate',
  'midnight-clock--accelerate',
  'midnight-clock--impact',
  'midnight-clock--wipe',
  'midnight-clock--reveal',
  'midnight-clock--midnight',
  'midnight-clock--reduced',
]

let busy = false
let atMidnight = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-midnight-clock]')
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

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(text) {
  const el = document.querySelector('[data-mc-status]')
  if (el) el.textContent = text
}

function setDigital(text) {
  const el = document.querySelector('[data-mc-digital]')
  if (el) el.textContent = text
}

function showScene(which) {
  const a = document.querySelector('[data-mc-scene="a"]')
  const b = document.querySelector('[data-mc-scene="b"]')
  if (!a || !b) return
  const midnight = which === 'b'
  a.hidden = midnight
  b.hidden = !midnight
}

function syncButtons() {
  const advance = document.querySelector('[data-mc-advance]')
  const reset = document.querySelector('[data-mc-reset]')
  if (advance instanceof HTMLButtonElement) advance.disabled = busy || atMidnight
  if (reset instanceof HTMLButtonElement) reset.disabled = busy || !atMidnight
}

function settleMidnight() {
  const root = rootEl()
  if (!root) return
  clearPhases(root)
  root.classList.add('midnight-clock--midnight')
  root.setAttribute('data-state', 'midnight')
  showScene('b')
  setDigital('00:00')
  setStatus('Midnight. 7 April.')
  atMidnight = true
  busy = false
  syncButtons()
}

function settleEvening() {
  const root = rootEl()
  if (!root) return
  clearTimers()
  clearPhases(root)
  root.setAttribute('data-state', 'evening')
  showScene('a')
  setDigital('23:54')
  setStatus('Late evening. 6 April, 23:54.')
  atMidnight = false
  busy = false
  syncButtons()
}

/**
 * Run the midnight transition once.
 * @returns {Promise<void>}
 */
export function advanceToMidnight() {
  const root = rootEl()
  if (!root || busy || atMidnight) return Promise.resolve()

  busy = true
  syncButtons()
  clearTimers()
  clearPhases(root)
  showScene('a')
  setDigital('23:54')
  setStatus('Late evening. 6 April, 23:54.')
  root.setAttribute('data-state', 'advancing')

  if (prefersReducedMotion()) {
    root.classList.add('midnight-clock--reduced')
    settleMidnight()
    return Promise.resolve()
  }

  void root.offsetWidth
  root.classList.add('midnight-clock--anticipate')

  return new Promise((resolve) => {
    later(ANTICIPATE_MS, () => {
      root.classList.remove('midnight-clock--anticipate')
      root.classList.add('midnight-clock--accelerate')
    })

    for (const step of DIGITAL_STEPS) {
      later(step.at, () => setDigital(step.text))
    }

    later(IMPACT_MS, () => {
      root.classList.remove('midnight-clock--accelerate')
      root.classList.add('midnight-clock--impact', 'midnight-clock--wipe')
    })

    later(SWAP_MS, () => {
      showScene('b')
      setDigital('00:00')
    })

    later(REVEAL_MS, () => {
      root.classList.remove('midnight-clock--impact')
      root.classList.add('midnight-clock--reveal')
    })

    later(TOTAL_MS, () => {
      settleMidnight()
      resolve()
    })
  })
}

/** Reset to 23:54 / 06 APR / LATE EVENING. */
export function resetMidnightClock() {
  if (busy) return
  settleEvening()
}

/** @returns {Promise<void>} */
export async function replayMidnightClock() {
  if (busy) return
  if (atMidnight) resetMidnightClock()
  await advanceToMidnight()
}

function bindUi() {
  document.querySelector('[data-mc-advance]')?.addEventListener('click', () => {
    void advanceToMidnight()
  })
  document.querySelector('[data-mc-reset]')?.addEventListener('click', () => {
    resetMidnightClock()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMidnightClock()
  })

  syncButtons()
}

bindUi()
