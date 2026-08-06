/**
 * SPX-2037 Versus Card Collision
 */
;(function () {
  const TOTAL_MS = 900

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
    const el = root.querySelector('[data-vcc-status]')
    if (el) el.textContent = text
  }

  function reset(root) {
    const ctx = getCtx(root)
    if (ctx.timer) window.clearTimeout(ctx.timer)
    ctx.timer = null
    ctx.busy = false
    root.dataset.phase = 'idle'
    setStatus(root, 'Competitors staged.')
  }

  function run(root) {
    const ctx = getCtx(root)
    if (ctx.busy) return
    ctx.busy = true
    if (ctx.timer) window.clearTimeout(ctx.timer)

    if (prefersReducedMotion(root)) {
      root.dataset.phase = 'clash'
      setStatus(root, 'Matchup locked.')
      ctx.busy = false
      return
    }

    root.dataset.phase = 'rush'
    setStatus(root, 'Cards rushing…')

    ctx.timer = window.setTimeout(() => {
      root.dataset.phase = 'clash'
      setStatus(root, 'Matchup locked.')
      ctx.busy = false
      ctx.timer = null
    }, TOTAL_MS)
  }

  function bind(root) {
    if (root.dataset.vccBound === '1') return
    root.dataset.vccBound = '1'
    root.querySelector('[data-vcc-run]')?.addEventListener('click', () => {
      if (root.dataset.phase !== 'idle') reset(root)
      void root.offsetWidth
      run(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-versus-collision]')
      .forEach((el) => bind(el))
  }

  window.versusCardCollision = { init: initAll, run, reset }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
