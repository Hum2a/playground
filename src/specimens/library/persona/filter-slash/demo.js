/**
 * Filter Slash — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const SWEEP_MS = 360

function rootEl() {
  return document.querySelector('[data-filter-slash]')
}

function toggleEl() {
  return document.querySelector('[data-filter-slash-toggle]')
}

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

/**
 * Apply or clear the "urgent only" filter.
 * @param {boolean} active
 */
export function setFilterActive(active) {
  const root = rootEl()
  const toggle = toggleEl()
  if (!root || !toggle) return

  toggle.setAttribute('aria-pressed', active ? 'true' : 'false')
  root.classList.toggle('filter-slash--active', active)

  if (active && !prefersReducedMotion()) {
    root.classList.remove('filter-slash--sweep')
    void root.offsetWidth
    root.classList.add('filter-slash--sweep')
    window.setTimeout(() => root.classList.remove('filter-slash--sweep'), SWEEP_MS)
  }
}

function bindUi() {
  const toggle = toggleEl()
  toggle?.addEventListener('click', () => {
    const active = toggle.getAttribute('aria-pressed') !== 'true'
    setFilterActive(active)
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') setFilterActive(false)
  })
}

bindUi()
