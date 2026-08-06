/**
 * Collapsing App Bar — scroll-driven header collapse with single title element.
 * Sandbox-safe: no parent, storage, or network.
 */

const COLLAPSE_RANGE = 96
const BAR_LARGE = 152
const BAR_SMALL = 64
const TITLE_LARGE = 32
const TITLE_SMALL = 20
const DIVIDER_AT = 88

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scrollEl() {
  return document.querySelector('[data-cab-scroll]')
}

function setStatus(text) {
  const el = document.querySelector('[data-cab-status]')
  if (el) el.textContent = text
}

function updateFromScroll(scrollY) {
  const root = document.querySelector('[data-collapsing-app-bar]')
  if (!root) return

  const y = Math.max(0, Math.min(scrollY, COLLAPSE_RANGE))
  const t = y / COLLAPSE_RANGE
  const barH = BAR_LARGE - (BAR_LARGE - BAR_SMALL) * t
  const titleSize = TITLE_LARGE - (TITLE_LARGE - TITLE_SMALL) * t
  const titleY = 96 - 56 * t

  root.style.setProperty('--cab-bar-h', `${barH}px`)
  root.style.setProperty('--cab-title-size', `${titleSize}px`)
  root.style.setProperty('--cab-title-y', `${titleY}px`)
  root.classList.toggle('is-divider', scrollY > DIVIDER_AT)

  if (y >= COLLAPSE_RANGE) {
    root.setAttribute('data-cab-phase', 'collapsed')
    setStatus('App bar collapsed.')
  } else if (y <= 0) {
    root.setAttribute('data-cab-phase', 'expanded')
    setStatus('App bar expanded.')
  } else {
    root.setAttribute('data-cab-phase', 'collapsing')
    setStatus('App bar collapsing.')
  }
}

export function resetCollapsingAppBar() {
  const el = scrollEl()
  if (el) el.scrollTop = 0
  updateFromScroll(0)
}

function bindUi() {
  const el = scrollEl()
  el?.addEventListener('scroll', () => updateFromScroll(el.scrollTop), { passive: true })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetCollapsingAppBar()
  })
}

bindUi()
resetCollapsingAppBar()

export const COLLAPSING_APP_BAR_CONTRACT = {
  COLLAPSE_RANGE,
  BAR_LARGE,
  BAR_SMALL,
  TITLE_LARGE,
  TITLE_SMALL,
  DIVIDER_AT,
}
