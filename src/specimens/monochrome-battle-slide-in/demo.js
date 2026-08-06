/**
 * Monochrome Battle Slide-In — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Stepped four-tone confrontation: bands → opposing slide-ins → ground → labels.
 */

const BAND_MS = 160
const RIGHT_LEAD_MS = 60
const SLIDE_MS = 300
const GROUND_MS = 120
const META_MS = 120

const PHASES = [
  'mbs--bands',
  'mbs--field',
  'mbs--slide-right',
  'mbs--slide-left',
  'mbs--ground-b',
  'mbs--ground-a',
  'mbs--meta',
]

let busy = false
let battled = false
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
  return document.querySelector('[data-mono-battle]')
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
  const goBtn = root.querySelector('[data-mbs-encounter]')
  const resetBtn = root.querySelector('[data-mbs-reset]')
  if (goBtn) {
    goBtn.disabled = !go
    goBtn.hidden = !go
  }
  if (resetBtn) {
    resetBtn.disabled = !reset
    resetBtn.hidden = !reset
  }
}

function setCopy(root, isBattle) {
  const sr = root.querySelector('[data-mbs-sr]')
  const live = root.querySelector('[data-mbs-live]')
  if (isBattle) {
    if (sr) sr.textContent = 'Confrontation. Local Build A versus Remote Build B.'
    if (live) live.textContent = 'Local Build A versus Remote Build B.'
  } else {
    if (sr) sr.textContent = 'Searching for confrontation.'
    if (live) live.textContent = 'Searching.'
  }
}

function applyBattle(root) {
  clearTimers()
  clearPhases(root)
  root.classList.add('mbs--field')
  root.setAttribute('data-state', 'battle')
  battled = true
  busy = false
  setTriggers({ go: false, reset: true })
  setCopy(root, true)
}

function applyIdle(root) {
  clearTimers()
  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  battled = false
  busy = false
  setTriggers({ go: true, reset: false })
  setCopy(root, false)
}

/**
 * Run encounter → confrontation sequence.
 * @returns {Promise<void>}
 */
export function runMonochromeBattle() {
  const root = rootEl()
  if (!root) return Promise.resolve()
  if (busy || battled) return Promise.resolve()

  if (prefersReducedMotion()) {
    applyBattle(root)
    return Promise.resolve()
  }

  busy = true
  clearPhases(root)
  root.setAttribute('data-state', 'running')
  setTriggers({ go: false, reset: false })
  const live = root.querySelector('[data-mbs-live]')
  if (live) live.textContent = 'Encounter interrupting.'

  // 1. Three pixel bands
  root.classList.add('mbs--bands')

  return new Promise((resolve) => {
    later(BAND_MS, () => {
      root.classList.remove('mbs--bands')
      root.classList.add('mbs--field')
      if (live) live.textContent = 'Entities arriving.'

      // 2. Right begins first (intentional asymmetry)
      root.classList.add('mbs--slide-right')

      later(RIGHT_LEAD_MS, () => {
        root.classList.add('mbs--slide-left')
      })

      // Right arrives at SLIDE_MS; left at RIGHT_LEAD + SLIDE
      later(SLIDE_MS, () => {
        root.classList.add('mbs--ground-b')
      })

      later(RIGHT_LEAD_MS + SLIDE_MS, () => {
        root.classList.add('mbs--ground-a')
      })

      later(RIGHT_LEAD_MS + SLIDE_MS + GROUND_MS, () => {
        root.classList.add('mbs--meta')
        if (live) live.textContent = 'Local Build A versus Remote Build B.'

        later(META_MS, () => {
          applyBattle(root)
          resolve()
        })
      })
    })
  })
}

/**
 * Restore SEARCHING state.
 * @returns {void}
 */
export function resetMonochromeBattle() {
  const root = rootEl()
  if (!root) return
  applyIdle(root)
}

function bind() {
  if (bound) return
  const root = rootEl()
  if (!root) return
  bound = true

  const go = root.querySelector('[data-mbs-encounter]')
  const reset = root.querySelector('[data-mbs-reset]')
  if (go) go.addEventListener('click', () => runMonochromeBattle())
  if (reset) reset.addEventListener('click', () => resetMonochromeBattle())
}

export const monochromeBattleSlideIn = {
  run: runMonochromeBattle,
  reset: resetMonochromeBattle,
}

if (typeof window !== 'undefined') {
  window.monochromeBattleSlideIn = monochromeBattleSlideIn
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true })
  } else {
    bind()
  }
}
