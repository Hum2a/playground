/**
 * Window Minimise Funnel — compress window toward dock token with funnel geometry.
 * Sandbox-safe (no parent / storage / network).
 *
 * Window 380×250 · token 52×34 · duration 520ms · clip-path funnel
 */

const MINIMISE_MS = 520
const WINDOW_W = 380
const WINDOW_H = 250
const TOKEN_W = 52
const TOKEN_H = 34

let phase = 'open'
let busy = false
/** @type {number | null} */
let timerId = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-window-minimise-funnel]')
}

function setStatus(text) {
  const el = document.querySelector('[data-wmf-status]')
  if (el) el.textContent = text
}

function setPhase(next) {
  phase = next
  rootEl()?.setAttribute('data-phase', next)
}

function clearTimer() {
  if (timerId !== null) {
    window.clearTimeout(timerId)
    timerId = null
  }
}

function toggleControls() {
  const minimise = document.querySelector('[data-wmf-minimise]')
  const restore = document.querySelector('[data-wmf-restore]')
  if (minimise) minimise.hidden = phase === 'minimised' || phase === 'minimising'
  if (restore) restore.hidden = phase !== 'minimised'
}

export function minimiseWindow() {
  const root = rootEl()
  if (!root || phase !== 'open' || busy) return

  busy = true
  clearTimer()
  setPhase('minimising')
  setStatus('Minimising TERMINAL.')
  toggleControls()

  const finish = () => {
    setPhase('minimised')
    setStatus('TERMINAL minimised to dock token.')
    busy = false
    toggleControls()
  }

  if (prefersReducedMotion()) {
    finish()
    return
  }

  timerId = window.setTimeout(finish, MINIMISE_MS)
}

export function restoreWindow() {
  const root = rootEl()
  if (!root || phase !== 'minimised' || busy) return

  busy = true
  clearTimer()
  setPhase('restoring')
  setStatus('Restoring TERMINAL.')
  toggleControls()

  const finish = () => {
    setPhase('open')
    setStatus('TERMINAL window open.')
    busy = false
    toggleControls()
  }

  if (prefersReducedMotion()) {
    finish()
    return
  }

  requestAnimationFrame(() => {
    setPhase('open')
    timerId = window.setTimeout(finish, MINIMISE_MS)
  })
}

function bindUi() {
  document.querySelector('[data-wmf-minimise]')?.addEventListener('click', () => {
    minimiseWindow()
  })

  document.querySelector('[data-wmf-restore]')?.addEventListener('click', () => {
    restoreWindow()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart' && phase !== 'open') {
      clearTimer()
      busy = false
      setPhase('open')
      setStatus('TERMINAL window open.')
      toggleControls()
    }
  })
}

bindUi()
toggleControls()

export const WINDOW_MINIMISE_FUNNEL_CONTRACT = {
  MINIMISE_MS,
  WINDOW_W,
  WINDOW_H,
  TOKEN_W,
  TOKEN_H,
  TITLE: 'TERMINAL',
}
