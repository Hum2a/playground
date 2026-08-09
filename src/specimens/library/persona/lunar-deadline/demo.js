/**
 * Lunar Deadline — tiny portable phase API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * No wall clock. No Date.now().
 */

/** @typedef {'full' | 'waning-gibbous' | 'last-quarter' | 'new'} LunarPhase */

const PHASE_MS = 620

/** @type {LunarPhase[]} */
const PHASES = ['full', 'waning-gibbous', 'last-quarter', 'new']

const META = {
  full: {
    label: 'FULL',
    remaining: '03 PHASES REMAINING',
    urgency: 'normal',
    aria: 'Deadline: three phases remaining',
    live: 'Full. Three phases remaining.',
  },
  'waning-gibbous': {
    label: 'WANING GIBBOUS',
    remaining: '02 PHASES REMAINING',
    urgency: 'elevated',
    aria: 'Deadline: two phases remaining',
    live: 'Waning gibbous. Two phases remaining.',
  },
  'last-quarter': {
    label: 'LAST QUARTER',
    remaining: '01 PHASES REMAINING',
    urgency: 'urgent',
    aria: 'Deadline: one phase remaining',
    live: 'Last quarter. One phase remaining.',
  },
  new: {
    label: 'NEW',
    remaining: '00 PHASES REMAINING',
    urgency: 'critical',
    aria: 'Deadline: zero phases remaining',
    live: 'New. Zero phases remaining.',
  },
}

/** @type {LunarPhase} */
let phase = 'full'
let busy = false
/** @type {number | null} */
let timer = null

function prefersReducedMotion(root) {
  if (root?.closest?.('[data-force-reduced-motion="true"]')) return true
  if (document.documentElement.getAttribute('data-force-reduced-motion') === 'true') {
    return true
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-lunar-deadline]')
}

function clearTimer() {
  if (timer !== null) {
    window.clearTimeout(timer)
    timer = null
  }
}

function setButtonsEnabled(on) {
  const advance = document.querySelector('[data-ld-advance]')
  if (advance instanceof HTMLButtonElement) {
    advance.disabled = !on || phase === 'new'
  }
}

/**
 * @param {LunarPhase} next
 * @param {{ animate?: boolean }} [opts]
 */
function applyPhase(next, opts = {}) {
  const root = rootEl()
  const meta = META[next]
  if (!root || !meta) return

  const animate = opts.animate !== false && !prefersReducedMotion(root)
  phase = next
  if (animate) {
    root.classList.remove('ld--snap')
    void root.offsetWidth
  } else {
    root.classList.add('ld--snap')
  }
  root.setAttribute('data-phase', next)
  root.setAttribute('data-urgency', meta.urgency)
  root.setAttribute('aria-label', meta.aria)

  const remaining = document.querySelector('[data-ld-remaining]')
  const phaseLabel = document.querySelector('[data-ld-phase]')
  const live = document.querySelector('[data-ld-live]')
  if (remaining) remaining.textContent = meta.remaining
  if (phaseLabel) phaseLabel.textContent = meta.label
  if (live) live.textContent = meta.live
}

/**
 * Advance one lunar deadline state.
 * @returns {Promise<void>}
 */
export function advanceLunarDeadline() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  const idx = PHASES.indexOf(phase)
  if (idx < 0 || idx >= PHASES.length - 1) return Promise.resolve()

  const next = PHASES[idx + 1]
  if (prefersReducedMotion(root)) {
    applyPhase(next, { animate: false })
    setButtonsEnabled(true)
    return Promise.resolve()
  }

  busy = true
  setButtonsEnabled(false)
  clearTimer()
  applyPhase(next, { animate: true })

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      timer = null
      busy = false
      setButtonsEnabled(true)
      resolve()
    }, PHASE_MS)
  })
}

export function resetLunarDeadline() {
  clearTimer()
  busy = false
  applyPhase('full', { animate: false })
  setButtonsEnabled(true)
}

/** @returns {Promise<void>} */
export async function replayLunarDeadline() {
  if (busy) return
  resetLunarDeadline()
  for (let i = 0; i < PHASES.length - 1; i++) {
    await advanceLunarDeadline()
  }
}

function bindUi() {
  document.querySelector('[data-ld-advance]')?.addEventListener('click', () => {
    void advanceLunarDeadline()
  })
  document.querySelector('[data-ld-reset]')?.addEventListener('click', () => {
    resetLunarDeadline()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayLunarDeadline()
  })
}

bindUi()
resetLunarDeadline()
