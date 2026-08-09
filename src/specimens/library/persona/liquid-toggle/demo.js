/**
 * SPX-414 Liquid Toggle
 * Vessel fill 18% OFF ↔ 82% ON. Waterline waves only during travel.
 */
;(function () {
  const ON_MS = 460
  const OFF_MS = 360

  /** @type {WeakMap<HTMLElement, { timer: number | null }>} */
  const stateMap = new WeakMap()

  function reduced(root) {
    if (document.documentElement.getAttribute('data-force-reduced-motion') === 'true') {
      return true
    }
    if (root.closest('[data-force-reduced-motion="true"]')) return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function ctx(root) {
    let s = stateMap.get(root)
    if (!s) {
      s = { timer: null }
      stateMap.set(root, s)
    }
    return s
  }

  function setPressed(root, on) {
    const btn = root.querySelector('[data-lt-toggle]')
    const label = root.querySelector('[data-lt-label]')
    const status = root.querySelector('[data-lt-status]')
    if (!btn) return

    const next = !!on
    btn.setAttribute('aria-pressed', next ? 'true' : 'false')
    if (label) label.textContent = next ? 'ON' : 'OFF'
    if (status) status.textContent = next ? 'On.' : 'Off.'

    const s = ctx(root)
    if (s.timer) window.clearTimeout(s.timer)
    btn.classList.remove('is-waving')

    if (reduced(root)) return

    void btn.offsetWidth
    btn.classList.add('is-waving')
    s.timer = window.setTimeout(() => {
      btn.classList.remove('is-waving')
      s.timer = null
    }, next ? ON_MS : OFF_MS)
  }

  function toggleLiquid(root) {
    const btn = root.querySelector('[data-lt-toggle]')
    if (!btn) return
    setPressed(root, btn.getAttribute('aria-pressed') !== 'true')
  }

  function bind(root) {
    if (root.dataset.ltBound === '1') return
    root.dataset.ltBound = '1'
    ctx(root)
    root.querySelector('[data-lt-toggle]')?.addEventListener('click', () => {
      toggleLiquid(root)
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-liquid-toggle]').forEach((el) => bind(el))
  }

  window.liquidToggle = {
    init: initAll,
    toggle: toggleLiquid,
    set: setPressed,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
