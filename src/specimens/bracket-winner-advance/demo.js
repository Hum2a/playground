/**
 * SPX-2038 Bracket Winner Advance
 */
;(function () {
  const TOTAL_MS = 850

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
    const el = root.querySelector('[data-bwa-status]')
    if (el) el.textContent = text
  }

  function reset(root) {
    const ctx = getCtx(root)
    if (ctx.timer) window.clearTimeout(ctx.timer)
    ctx.timer = null
    ctx.busy = false
    root.dataset.phase = 'idle'
    const next = root.querySelector('[data-bwa-next]')
    if (next) next.textContent = '—'
    const slotA = root.querySelector('[data-bwa-slot-a]')
    if (slotA) slotA.style.opacity = ''
    setStatus(root, 'Round one complete.')
  }

  function finish(root) {
    const ctx = getCtx(root)
    const next = root.querySelector('[data-bwa-next]')
    if (next) next.textContent = 'ALPHA'
    root.dataset.phase = 'done'
    setStatus(root, 'ALPHA advanced to round two.')
    ctx.busy = false
  }

  function run(root) {
    const ctx = getCtx(root)
    if (ctx.busy) return
    ctx.busy = true
    if (ctx.timer) window.clearTimeout(ctx.timer)

    if (prefersReducedMotion(root)) {
      finish(root)
      return
    }

    root.dataset.phase = 'advance'
    setStatus(root, 'Winner advancing…')

    ctx.timer = window.setTimeout(() => {
      finish(root)
      ctx.timer = null
    }, TOTAL_MS)
  }

  function bind(root) {
    if (root.dataset.bwaBound === '1') return
    root.dataset.bwaBound = '1'
    root.querySelector('[data-bwa-run]')?.addEventListener('click', () => {
      if (root.dataset.phase !== 'idle') reset(root)
      void root.offsetWidth
      run(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-bracket-advance]')
      .forEach((el) => bind(el))
  }

  window.bracketWinnerAdvance = { init: initAll, run, reset }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
