/**
 * SPX-434 Glass Badge Assembly
 * Nine fixed fragments reset and converge without shared timers or globals per instance.
 */
;(function () {
  const ASSEMBLY_MS = 1060
  const stateMap = new WeakMap()

  function reduced(root) {
    return (
      document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
      Boolean(root.closest('[data-force-reduced-motion="true"]')) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }

  function state(root) {
    let value = stateMap.get(root)
    if (!value) {
      value = { frame: 0, timer: 0 }
      stateMap.set(root, value)
    }
    return value
  }

  function clearRun(root) {
    const value = state(root)
    if (value.frame) window.cancelAnimationFrame(value.frame)
    if (value.timer) window.clearTimeout(value.timer)
    value.frame = 0
    value.timer = 0
  }

  function status(root, text) {
    const live = root.querySelector('[data-gba-status]')
    if (live) live.textContent = text
  }

  function complete(root) {
    clearRun(root)
    root.setAttribute('data-state', 'complete')
    status(root, 'Glass badge assembled.')
  }

  function assemble(root) {
    if (!root) return

    clearRun(root)
    root.setAttribute('data-state', 'idle')
    status(root, 'Resetting nine glass fragments.')

    if (reduced(root)) {
      complete(root)
      return
    }

    const value = state(root)
    value.frame = window.requestAnimationFrame(() => {
      root.setAttribute('data-state', 'assembling')
      status(root, 'Nine glass fragments assembling.')
      value.timer = window.setTimeout(() => complete(root), ASSEMBLY_MS)
    })
  }

  function bind(root) {
    if (root.dataset.gbaBound === '1') return
    root.dataset.gbaBound = '1'
    root.querySelector('[data-gba-assemble]')?.addEventListener('click', () => assemble(root))
  }

  function init(scope) {
    const host = scope || document
    if (host.matches?.('[data-glass-badge-assembly]')) bind(host)
    host.querySelectorAll?.('[data-glass-badge-assembly]').forEach(bind)
  }

  window.glassBadgeAssembly = { init, assemble }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init())
  } else {
    init()
  }
})()
