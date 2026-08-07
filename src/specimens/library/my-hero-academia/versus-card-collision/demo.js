/**
 * SPX-2037 Versus Card Collision
 */
;(function () {
  /** Frozen approach offsets — matches contract.geometry */
  const RUSH_MS = 740
  const IMPACT_TICK_MS = 120
  const TOTAL_MS = 900
  const VS_TILT_DEG = -12
  const APPROACH_LEFT = '-48%'
  const APPROACH_RIGHT = '-48%'
  const CLASH_LEFT = '8%'
  const CLASH_RIGHT = '8%'

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
      root.dataset.phase = 'tick'
      setStatus(root, 'Impact.')
      window.setTimeout(() => {
        root.dataset.phase = 'clash'
        setStatus(root, 'Matchup locked.')
        ctx.busy = false
        ctx.timer = null
      }, IMPACT_TICK_MS)
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

  void RUSH_MS
  void VS_TILT_DEG
  void APPROACH_LEFT
  void APPROACH_RIGHT
  void CLASH_LEFT
  void CLASH_RIGHT
})()
