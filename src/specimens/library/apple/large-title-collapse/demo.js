/**
 * Large Title Collapse — scroll-driven title transition.
 * Sandbox-safe: no parent access, storage, or network.
 *
 * Large title 42px collapses to compact 17px over scrollY 0–84px.
 * Compact established by 72px; large translates up 54px.
 */

const COLLAPSE_RANGE = 84
const COMPACT_AT = 72
const LARGE_SIZE = 42
const COMPACT_SIZE = 17
const TRANSLATE_Y = 54
const NAV_HEIGHT = 52

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-large-title]')
}

function scrollEl() {
  return document.querySelector('[data-ltc-scroll]')
}

function setStatus(text) {
  const el = document.querySelector('[data-ltc-status]')
  if (el) el.textContent = text
}

function updateFromScroll(scrollY) {
  const root = rootEl()
  const y = Math.max(0, Math.min(scrollY, COLLAPSE_RANGE))
  if (!root) return

  const compactProgress = Math.min(y / COMPACT_AT, 1)
  const collapseProgress = y / COLLAPSE_RANGE
  const fontSize =
    LARGE_SIZE - (LARGE_SIZE - COMPACT_SIZE) * compactProgress
  const translate = -TRANSLATE_Y * collapseProgress
  const largeOpacity = 1 - compactProgress
  const compactOpacity = compactProgress

  root.style.setProperty('--ltc-scroll', String(y))
  root.style.setProperty('--ltc-font', `${fontSize}px`)
  root.style.setProperty('--ltc-ty', `${translate}px`)
  root.style.setProperty('--ltc-large-opacity', String(largeOpacity))
  root.style.setProperty('--ltc-compact-opacity', String(compactOpacity))

  if (y >= COLLAPSE_RANGE) {
    root.setAttribute('data-phase', 'collapsed')
    setStatus('Compact title fixed in navigation bar.')
  } else if (y <= 0) {
    root.setAttribute('data-phase', 'expanded')
    setStatus('Large title visible at scroll top.')
  } else {
    root.setAttribute('data-phase', 'collapsing')
    setStatus('Title collapsing with scroll.')
  }
}

function onScroll() {
  const el = scrollEl()
  if (!el) return
  updateFromScroll(el.scrollTop)
}

export function resetLargeTitleCollapse() {
  const el = scrollEl()
  if (el) el.scrollTop = 0
  updateFromScroll(0)
}

function bindUi() {
  const el = scrollEl()
  if (!el) return

  el.addEventListener('scroll', onScroll, { passive: true })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetLargeTitleCollapse()
  })
}

bindUi()
resetLargeTitleCollapse()

export const LARGE_TITLE_COLLAPSE_CONTRACT = {
  COLLAPSE_RANGE,
  COMPACT_AT,
  LARGE_SIZE,
  COMPACT_SIZE,
  TRANSLATE_Y,
  NAV_HEIGHT,
}
