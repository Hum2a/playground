/**
 * Search Field Activation — compact search expands into focused input.
 * Sandbox-safe (no parent / storage / network).
 *
 * Header 360px · search 38→276px · title retract 120ms · expand 260ms
 */

const TITLE_MS = 120
const EXPAND_MS = 260
const PLACEHOLDER_DELAY_MS = Math.round(EXPAND_MS * 0.55)
const HEADER_W = 360
const SEARCH_COMPACT = 38
const SEARCH_EXPANDED = 276

let active = false
let busy = false
/** @type {number | null} */
let timerId = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-search-field-activation]')
}

function setStatus(text) {
  const el = document.querySelector('[data-sfa-status]')
  if (el) el.textContent = text
}

function clearTimer() {
  if (timerId !== null) {
    window.clearTimeout(timerId)
    timerId = null
  }
}

function showExpandedUi() {
  const expanded = document.querySelector('[data-sfa-expanded]')
  const cancel = document.querySelector('[data-sfa-cancel]')
  const input = document.querySelector('[data-sfa-input]')
  if (expanded) expanded.hidden = false
  if (cancel) cancel.hidden = false
  if (input) {
    input.disabled = false
    input.focus()
  }
}

function hideExpandedUi() {
  const expanded = document.querySelector('[data-sfa-expanded]')
  const cancel = document.querySelector('[data-sfa-cancel]')
  const input = document.querySelector('[data-sfa-input]')
  if (expanded) expanded.hidden = true
  if (cancel) cancel.hidden = true
  if (input) {
    input.value = ''
    input.blur()
  }
}

export function activateSearch() {
  const root = rootEl()
  if (!root || active || busy) return

  busy = true
  clearTimer()
  root.setAttribute('data-phase', 'activating')
  setStatus('Activating search.')
  showExpandedUi()

  const finish = () => {
    root.setAttribute('data-phase', 'active')
    active = true
    busy = false
    setStatus('Search active. Focus in input.')
    document.querySelector('[data-sfa-input]')?.focus()
  }

  if (prefersReducedMotion()) {
    finish()
    return
  }

  timerId = window.setTimeout(finish, EXPAND_MS)
}

export function cancelSearch() {
  const root = rootEl()
  if (!root || !active || busy) return

  busy = true
  clearTimer()
  root.setAttribute('data-phase', 'compact')
  active = false
  hideExpandedUi()
  document.querySelector('[data-sfa-trigger]')?.focus()

  timerId = window.setTimeout(() => {
    setStatus('Compact header. Activate search.')
    busy = false
  }, prefersReducedMotion() ? 0 : TITLE_MS)
}

function bindUi() {
  document.querySelector('[data-sfa-trigger]')?.addEventListener('click', () => {
    activateSearch()
  })

  document.querySelector('[data-sfa-cancel]')?.addEventListener('click', () => {
    cancelSearch()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart' && active) cancelSearch()
  })
}

bindUi()

export const SEARCH_FIELD_ACTIVATION_CONTRACT = {
  TITLE_MS,
  EXPAND_MS,
  PLACEHOLDER_DELAY_MS,
  HEADER_W,
  SEARCH_COMPACT,
  SEARCH_EXPANDED,
}
