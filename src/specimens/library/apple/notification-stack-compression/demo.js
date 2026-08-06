/**
 * Notification Stack Compression — three cards condense into layered stack.
 * Sandbox-safe (no parent / storage / network).
 *
 * Cards 320×74 · gap 12 · compress 320ms · offsets 6/12 · scales .98/.96
 */

const COMPRESS_MS = 320
const CARD_COUNT = 3

let compressed = false
let busy = false
/** @type {number | null} */
let timerId = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-notification-stack-compression]')
}

function setStatus(text) {
  const el = document.querySelector('[data-nsc-status]')
  if (el) el.textContent = text
}

function clearTimer() {
  if (timerId !== null) {
    window.clearTimeout(timerId)
    timerId = null
  }
}

function toggleControls() {
  const compressBtn = document.querySelector('[data-nsc-compress]')
  const expandBtn = document.querySelector('[data-nsc-expand]')
  const counter = document.querySelector('[data-nsc-counter]')
  if (compressBtn) compressBtn.hidden = compressed
  if (expandBtn) expandBtn.hidden = !compressed
  if (counter) {
    counter.hidden = !compressed
    counter.classList.toggle('is-visible', compressed)
  }
}

export function compressNotificationStack() {
  const root = rootEl()
  if (!root || compressed || busy) return

  busy = true
  clearTimer()
  root.setAttribute('data-phase', 'compressing')
  setStatus('Compressing notifications.')

  const apply = () => {
    root.setAttribute('data-phase', 'compressed')
    compressed = true
    toggleControls()
    setStatus('Stack compressed. Three notifications.')
    busy = false
  }

  if (prefersReducedMotion()) {
    apply()
    return
  }

  timerId = window.setTimeout(apply, COMPRESS_MS)
}

export function expandNotificationStack() {
  const root = rootEl()
  if (!root || !compressed || busy) return

  busy = true
  clearTimer()
  root.setAttribute('data-phase', 'expanding')
  setStatus('Expanding notifications.')

  const apply = () => {
    root.setAttribute('data-phase', 'expanded')
    compressed = false
    toggleControls()
    setStatus('Three notifications expanded.')
    busy = false
  }

  if (prefersReducedMotion()) {
    apply()
    return
  }

  timerId = window.setTimeout(apply, COMPRESS_MS)
}

function bindUi() {
  document.querySelector('[data-nsc-compress]')?.addEventListener('click', () => {
    compressNotificationStack()
  })

  document.querySelector('[data-nsc-expand]')?.addEventListener('click', () => {
    expandNotificationStack()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart' && compressed) expandNotificationStack()
  })
}

bindUi()
toggleControls()

export const NOTIFICATION_STACK_COMPRESSION_CONTRACT = {
  COMPRESS_MS,
  CARD_COUNT,
  CARD_SIZE: { width: 320, height: 74 },
  GAP: 12,
  OFFSETS: { middle: 6, bottom: 12 },
  SCALES: { top: 1, middle: 0.98, bottom: 0.96 },
}
