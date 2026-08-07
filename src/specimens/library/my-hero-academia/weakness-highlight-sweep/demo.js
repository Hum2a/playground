/**
 * SPX-2018 Weakness Highlight Sweep
 */
;(function () {
  /** Frozen sweep duration — matches contract.timing.sweepMs */
  const SWEEP_MS = 500
  const HIGHLIGHT_DELAY_MS = 420
  const HIGHLIGHT_MS = 350
  const TOTAL_MS = HIGHLIGHT_DELAY_MS + HIGHLIGHT_MS + 80
  const WEAK_SECTOR = 'GUARD'

  const IDLE = 'idle'
  const SWEEP = 'sweep'
  const FOUND = 'found'

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
    const el = root.querySelector('[data-whs-status]')
    if (el) el.textContent = text
  }

  function reset(root) {
    const ctx = getCtx(root)
    if (ctx.timer) window.clearTimeout(ctx.timer)
    ctx.timer = null
    ctx.busy = false
    root.dataset.phase = IDLE
    setStatus(root, 'Awaiting scan.')
  }

  function run(root) {
    const ctx = getCtx(root)
    if (ctx.busy) return
    ctx.busy = true
    if (ctx.timer) window.clearTimeout(ctx.timer)

    if (prefersReducedMotion(root)) {
      root.dataset.phase = FOUND
      setStatus(root, `Weakness: ${WEAK_SECTOR} sector.`)
      ctx.busy = false
      return
    }

    root.dataset.phase = SWEEP
    setStatus(root, 'Analysis sweep…')

    ctx.timer = window.setTimeout(() => {
      root.dataset.phase = FOUND
      setStatus(root, `Weakness: ${WEAK_SECTOR} sector.`)
      ctx.busy = false
      ctx.timer = null
    }, TOTAL_MS)
  }

  function bind(root) {
    if (root.dataset.whsBound === '1') return
    root.dataset.whsBound = '1'
    root.querySelector('[data-whs-run]')?.addEventListener('click', () => {
      if (root.dataset.phase !== IDLE) reset(root)
      void root.offsetWidth
      run(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-weakness-sweep]')
      .forEach((el) => bind(el))
  }

  window.weaknessHighlightSweep = { init: initAll, run, reset }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }

  void SWEEP_MS
  void WEAK_SECTOR
})()
