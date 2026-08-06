/**
 * Liquid Split Transition — tiny portable container transition API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timeline (frozen):
 *   0–180ms   liquid seam grows width 0 → 110%
 *   160ms     upper/lower slabs begin opposing displacement
 *   160–590ms split travel (~430ms) + destination scale .97 → 1
 *   590–760ms slabs continue off-host; destination settled
 *
 * Seam origin: 54% host height. Upper −58%/−8px, lower +58%/+8px.
 */

const SEAM_MS = 180
const SPLIT_START_MS = 160
const SPLIT_MS = 430
const TOTAL_MS = 760

/** @type {number[]} */
let timers = []
let busy = false
/** @type {'a' | 'b'} */
let surface = 'a'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-liquid-split]')
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
  const el = document.querySelector('[data-ls-status]')
  if (el) el.textContent = text
}

function statusFor(s) {
  return s === 'a' ? 'Depth 01. Surface.' : 'Depth 02. Submerged.'
}

function setButtonsEnabled(on) {
  document.querySelectorAll('[data-ls-descend], [data-ls-reset]').forEach((btn) => {
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
  setStatus(statusFor(next))
}

/**
 * Run one descend: seam → opposing split → destination exposed.
 * @returns {Promise<void>}
 */
export function runLiquidSplit() {
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
  setPhase('seam')

  return new Promise((resolve) => {
    later(SPLIT_START_MS, () => {
      setPhase('split')
    })

    later(SPLIT_START_MS + SPLIT_MS, () => {
      showSurface('b')
      setPhase('exit')
    })

    later(TOTAL_MS, () => {
      setPhase('done')
      busy = false
      setButtonsEnabled(true)
      resolve()
    })
  })
}

export function resetLiquidSplit() {
  clearTimers()
  busy = false
  setPhase('idle')
  showSurface('a')
  setButtonsEnabled(true)
}

/** @returns {Promise<void>} */
export async function replayLiquidSplit() {
  if (busy) return
  resetLiquidSplit()
  void rootEl()?.offsetWidth
  await runLiquidSplit()
}

function bindUi() {
  document.querySelectorAll('[data-ls-descend]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runLiquidSplit()
    })
  })

  document.querySelectorAll('[data-ls-reset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      resetLiquidSplit()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void replayLiquidSplit()
    }
  })
}

bindUi()
resetLiquidSplit()
