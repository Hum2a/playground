/**
 * Wild Encounter Transition — tiny portable interruption API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timeline (frozen, ~720ms):
 *   0–120ms     single disturbance (translateX 0 → -5 → 4 → 0)
 *   100ms       bands + seam begin (anticipation short)
 *   100–380ms   7 alternating bands travel (~280ms, stagger 18ms)
 *   100–280ms   encounter plate height 4px → 38%
 *   160–400ms   entity scale .72 → 1.08 → 1
 *   400–720ms   plate expands 38% → 100%; destination locks
 */

const DISTURB_MS = 120
const SWEEP_START_MS = 100
const BAND_MS = 280
const BAND_STAGGER_MS = 18
const BAND_COUNT = 7
const SEAM_GROW_MS = 180
const ENTITY_START_MS = 160
const ENTITY_MS = 240
const TAKEOVER_START_MS = 400
const TAKEOVER_MS = 320
const TOTAL_MS = 720

/** @type {number[]} */
let timers = []
let busy = false
/** @type {'a' | 'b'} */
let surface = 'a'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-wild-encounter]')
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

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = document.querySelector('[data-we-status]')
  if (el) el.textContent = text
}

function statusFor(s) {
  return s === 'a'
    ? 'Route 04. Scanning local records.'
    : 'Unknown entity. Signal detected.'
}

function setButtonsEnabled(on) {
  document.querySelectorAll('[data-we-trigger], [data-we-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

/**
 * @param {'a' | 'b'} next
 */
function showSurface(next) {
  surface = next
  const root = rootEl()
  root?.setAttribute('data-surface', next)

  const plate = document.querySelector('[data-we-plate]')
  if (plate) {
    if (next === 'b') {
      plate.removeAttribute('aria-hidden')
    } else {
      plate.setAttribute('aria-hidden', 'true')
    }
  }

  setStatus(statusFor(next))
}

/**
 * Run one encounter: disturb → band sweep → seam → entity → takeover.
 * @returns {Promise<void>}
 */
export function runWildEncounter() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (surface === 'b') return Promise.resolve()

  busy = true
  clearTimers()
  setButtonsEnabled(false)

  if (prefersReducedMotion()) {
    showSurface('b')
    setPhase('done')
    busy = false
    setButtonsEnabled(true)
    return Promise.resolve()
  }

  setPhase('idle')
  void root.offsetWidth
  setPhase('disturb')

  return new Promise((resolve) => {
    later(SWEEP_START_MS, () => {
      setPhase('sweep')
    })

    later(TAKEOVER_START_MS, () => {
      setPhase('takeover')
    })

    later(TOTAL_MS, () => {
      showSurface('b')
      setPhase('done')
      busy = false
      setButtonsEnabled(true)
      resolve()
    })
  })
}

export function resetWildEncounter() {
  clearTimers()
  busy = false
  setPhase('idle')
  showSurface('a')
  setButtonsEnabled(true)
}

/** @returns {Promise<void>} */
export async function replayWildEncounter() {
  if (busy) return
  resetWildEncounter()
  void rootEl()?.offsetWidth
  await runWildEncounter()
}

function bindUi() {
  document.querySelectorAll('[data-we-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runWildEncounter()
    })
  })

  document.querySelectorAll('[data-we-replay]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void replayWildEncounter()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void replayWildEncounter()
    }
  })
}

bindUi()
resetWildEncounter()

// Expose frozen timing constants for contract parity / debugging
export const WILD_ENCOUNTER_TIMING = {
  DISTURB_MS,
  SWEEP_START_MS,
  BAND_MS,
  BAND_STAGGER_MS,
  BAND_COUNT,
  SEAM_GROW_MS,
  ENTITY_START_MS,
  ENTITY_MS,
  TAKEOVER_START_MS,
  TAKEOVER_MS,
  TOTAL_MS,
}
