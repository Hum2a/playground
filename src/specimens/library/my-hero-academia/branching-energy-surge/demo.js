/**
 * SPX-2008 Branching Energy Surge — angular branches converge on action.
 */
;(function () {
  const TOTAL_MS = 900
  const IDLE = 'idle'
  const SURGE = 'surge'
  const READY = 'ready'

  /** @type {WeakMap<HTMLElement, { timer: number | null, busy: boolean }>} */
  const stateMap = new WeakMap()

  function prefersReducedMotion(root) {
    if (root.closest('[data-force-reduced-motion="true"]')) return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function getCtx(root) {
    let ctx = stateMap.get(root)
    if (!ctx) {
      ctx = { timer: null, busy: false }
      stateMap.set(root, ctx)
    }
    return ctx
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-bes-status]')
    if (el) el.textContent = text
  }

  function setLabel(root, text) {
    const el = root.querySelector('[data-bes-label]')
    if (el) el.textContent = text
  }

  function reset(root) {
    const ctx = getCtx(root)
    if (ctx.timer) window.clearTimeout(ctx.timer)
    ctx.timer = null
    ctx.busy = false
    root.dataset.phase = IDLE
    setLabel(root, 'STANDBY')
    setStatus(root, 'Energy dormant.')
  }

  function run(root) {
    const ctx = getCtx(root)
    if (ctx.busy) return
    ctx.busy = true
    if (ctx.timer) window.clearTimeout(ctx.timer)

    if (prefersReducedMotion(root)) {
      root.dataset.phase = READY
      setLabel(root, 'READY')
      setStatus(root, 'Output channel armed.')
      ctx.busy = false
      return
    }

    root.dataset.phase = SURGE
    setLabel(root, 'SURGE')
    setStatus(root, 'Branches converging…')

    ctx.timer = window.setTimeout(() => {
      root.dataset.phase = READY
      setLabel(root, 'READY')
      setStatus(root, 'Output channel armed.')
      ctx.busy = false
      ctx.timer = null
    }, TOTAL_MS)
  }

  function bind(root) {
    if (root.dataset.besBound === '1') return
    root.dataset.besBound = '1'
    root.querySelector('[data-bes-run]')?.addEventListener('click', () => {
      if (root.dataset.phase !== IDLE) reset(root)
      void root.offsetWidth
      run(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-branching-surge]')
      .forEach((el) => bind(el))
  }

  window.branchingEnergySurge = { init: initAll, run, reset }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
