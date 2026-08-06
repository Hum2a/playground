/**
 * Search Bar-to-View Transform — compact bar expands into dedicated search view.
 * Sandbox-safe (no parent / storage / network).
 */

const RESULTS_DELAY_MS = 140

/** @type {number} */
let savedScroll = 0
/** @type {number | null} */
let focusTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-search-bar-transform]')
}

function host() {
  return document.querySelector('[data-sbvt-host]')
}

function input() {
  return document.querySelector('[data-sbvt-input]')
}

function results() {
  return document.querySelector('[data-sbvt-results]')
}

function statusEl() {
  return document.querySelector('[data-sbvt-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function expand() {
  const h = host()
  if (!h || root()?.getAttribute('data-phase') === 'expanded') return
  savedScroll = h.scrollTop
  setPhase('expanded')
  const res = results()
  if (res) res.hidden = false
  setStatus('Search view expanded — results appear after 140ms.')

  if (focusTimer !== null) clearTimeout(focusTimer)
  const delay = prefersReducedMotion() ? 0 : 320
  focusTimer = window.setTimeout(() => {
    input()?.focus()
    focusTimer = null
  }, delay)
}

function collapse() {
  const h = host()
  setPhase('compact')
  input()?.blur()
  const res = results()
  if (res) res.hidden = true
  if (h) h.scrollTop = savedScroll
  setStatus('Collapsed to compact search bar.')
}

export function resetSearchBarToViewTransform() {
  if (focusTimer !== null) {
    clearTimeout(focusTimer)
    focusTimer = null
  }
  const inp = input()
  if (inp) inp.value = ''
  collapse()
  setStatus('Tap the search bar to expand into search view.')
}

function bindUi() {
  document.querySelector('[data-sbvt-trigger]')?.addEventListener('click', expand)
  document.querySelector('[data-sbvt-back]')?.addEventListener('click', collapse)

  input()?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') collapse()
  })

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root()?.getAttribute('data-phase') === 'expanded') {
      collapse()
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetSearchBarToViewTransform()
    }
  })
}

bindUi()
resetSearchBarToViewTransform()

export const SEARCH_BAR_TO_VIEW_TRANSFORM_CONTRACT = {
  COMPACT_W: 320,
  COMPACT_H: 56,
  EXPANDED_W: 344,
  EXPANDED_H: 500,
  RADIUS_COMPACT: 28,
  RADIUS_EXPANDED: 24,
  ICON_SHIFT_PX: 8,
  RESULTS_DELAY_MS,
}
