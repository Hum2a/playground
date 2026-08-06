/**
 * Desktop Space Swipe — adjacent workspace planes slide coherently.
 * Sandbox-safe (no parent / storage / network).
 *
 * Viewport 520×360 · transition 460ms · depth scale .985
 */

const TRANSITION_MS = 460
const INDICATOR_DELAY_MS = Math.round(TRANSITION_MS * 0.5)
const VIEWPORT_W = 520
const VIEWPORT_H = 360

let currentSpace = '01'
let busy = false
/** @type {number | null} */
let timerId = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-desktop-space-swipe]')
}

function setStatus(text) {
  const el = document.querySelector('[data-dss-status]')
  if (el) el.textContent = text
}

function clearTimer() {
  if (timerId !== null) {
    window.clearTimeout(timerId)
    timerId = null
  }
}

function updateIndicator(space) {
  const indicator = document.querySelector('[data-dss-indicator]')
  if (indicator) indicator.textContent = space
}

function toggleControls() {
  const next = document.querySelector('[data-dss-next]')
  const prev = document.querySelector('[data-dss-prev]')
  if (next) next.disabled = currentSpace === '02' || busy
  if (prev) prev.disabled = currentSpace === '01' || busy
}

function applySpace(space) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-space', space)
  currentSpace = space
  setStatus(space === '01' ? 'Space 01 — three windows.' : 'Space 02 — two windows.')
  toggleControls()
}

export function nextSpace() {
  if (currentSpace !== '01' || busy) return
  busy = true
  clearTimer()
  toggleControls()

  const finish = () => {
    applySpace('02')
    updateIndicator('02')
    busy = false
    toggleControls()
  }

  if (prefersReducedMotion()) {
    finish()
    return
  }

  const root = rootEl()
  root?.setAttribute('data-space', '02')

  timerId = window.setTimeout(() => {
    updateIndicator('02')
  }, INDICATOR_DELAY_MS)

  window.setTimeout(() => {
    finish()
  }, TRANSITION_MS)
}

export function previousSpace() {
  if (currentSpace !== '02' || busy) return
  busy = true
  clearTimer()
  toggleControls()

  const finish = () => {
    applySpace('01')
    updateIndicator('01')
    busy = false
    toggleControls()
  }

  if (prefersReducedMotion()) {
    finish()
    return
  }

  const root = rootEl()
  root?.setAttribute('data-space', '01')

  timerId = window.setTimeout(() => {
    updateIndicator('01')
  }, INDICATOR_DELAY_MS)

  window.setTimeout(() => {
    finish()
  }, TRANSITION_MS)
}

function bindUi() {
  document.querySelector('[data-dss-next]')?.addEventListener('click', () => {
    nextSpace()
  })

  document.querySelector('[data-dss-prev]')?.addEventListener('click', () => {
    previousSpace()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart' && currentSpace !== '01') {
      clearTimer()
      busy = false
      applySpace('01')
      updateIndicator('01')
    }
  })
}

bindUi()
toggleControls()

export const DESKTOP_SPACE_SWIPE_CONTRACT = {
  TRANSITION_MS,
  INDICATOR_DELAY_MS,
  VIEWPORT_W,
  VIEWPORT_H,
  OUTGOING_SCALE: 0.985,
  INCOMING_SCALE: 0.985,
  SPACES: {
    '01': { windows: 3 },
    '02': { windows: 2 },
  },
}
