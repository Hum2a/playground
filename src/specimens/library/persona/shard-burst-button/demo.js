/**
 * SPX-430 Shard Burst Button.
 * Safe to run in sandbox="allow-scripts": no parent, storage, or network access.
 */
;(function () {
  const BURST_MS = 420
  const states = new WeakMap()

  function isReduced(root) {
    return (
      document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
      !!root.closest('[data-force-reduced-motion="true"]') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }

  function state(root) {
    let current = states.get(root)
    if (!current) {
      current = { timer: null }
      states.set(root, current)
    }
    return current
  }

  function confirm(root) {
    const button = root.querySelector('[data-sbb-confirm]')
    const label = root.querySelector('[data-sbb-label]')
    const status = root.querySelector('[data-sbb-status]')
    if (!button) return

    const current = state(root)
    if (current.timer) window.clearTimeout(current.timer)

    root.classList.add('is-confirmed')
    root.classList.remove('is-bursting')
    if (label) label.textContent = 'CONFIRMED'
    if (status) status.textContent = 'Confirmed.'

    if (isReduced(root)) return

    // Reflow after removal restarts all twelve CSS animations on rapid activation.
    void root.offsetWidth
    root.classList.add('is-bursting')
    current.timer = window.setTimeout(() => {
      root.classList.remove('is-bursting')
      current.timer = null
    }, BURST_MS)
  }

  function bind(root) {
    if (root.dataset.sbbBound === 'true') return
    root.dataset.sbbBound = 'true'
    state(root)
    root.querySelector('[data-sbb-confirm]')?.addEventListener('click', () => confirm(root))
  }

  function init(scope) {
    ;(scope || document).querySelectorAll('[data-shard-burst-button]').forEach(bind)
  }

  window.shardBurstButton = { init, trigger: confirm }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init())
  } else {
    init()
  }
})()
