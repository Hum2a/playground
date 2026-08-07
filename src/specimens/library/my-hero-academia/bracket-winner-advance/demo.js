/**
 * SPX-2038 Bracket Winner Advance
 */
;(function () {
  /** Frozen lane geometry — matches contract.geometry */
  const DRAW_MS = 420
  const TRAVEL_MS = 520
  const TRAVEL_DELAY_MS = 200
  const DOCK_MS = 130
  const TOTAL_MS = TRAVEL_DELAY_MS + TRAVEL_MS + DOCK_MS
  const TRAVEL_DX_PX = 168
  const TRAVEL_DY_PX = 52
  const WINNER = 'ALPHA'

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

  function applyLaneGeometry(root) {
    const winner = root.querySelector('[data-bwa-winner]')
    const next = root.querySelector('[data-bwa-next]')
    if (!winner || !next) return

    const start = root.querySelector('[data-bwa-slot-a]')
    if (start && next) {
      const bracket = root.querySelector('.bwa__bracket')
      if (bracket) {
        const startRect = start.getBoundingClientRect()
        const nextRect = next.getBoundingClientRect()
        const bracketRect = bracket.getBoundingClientRect()
        const dx = nextRect.left - startRect.left
        const dy = nextRect.top - startRect.top
        if (Number.isFinite(dx) && Number.isFinite(dy) && bracketRect.width > 0) {
          root.style.setProperty('--bwa-travel-dx', `${dx}px`)
          root.style.setProperty('--bwa-travel-dy', `${dy}px`)
          return
        }
      }
    }

    root.style.setProperty('--bwa-travel-dx', `${TRAVEL_DX_PX}px`)
    root.style.setProperty('--bwa-travel-dy', `${TRAVEL_DY_PX}px`)
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
    if (next) next.textContent = WINNER
    root.dataset.phase = 'done'
    setStatus(root, `${WINNER} advanced to round two.`)
    ctx.busy = false
  }

  function run(root) {
    const ctx = getCtx(root)
    if (ctx.busy) return
    ctx.busy = true
    if (ctx.timer) window.clearTimeout(ctx.timer)

    applyLaneGeometry(root)

    if (prefersReducedMotion(root)) {
      finish(root)
      return
    }

    root.dataset.phase = 'advance'
    setStatus(root, 'Winner advancing…')

    ctx.timer = window.setTimeout(() => {
      root.dataset.phase = 'dock'
      window.setTimeout(() => {
        finish(root)
        ctx.timer = null
      }, DOCK_MS)
    }, TOTAL_MS)
  }

  function bind(root) {
    if (root.dataset.bwaBound === '1') return
    root.dataset.bwaBound = '1'
    applyLaneGeometry(root)
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

  void DRAW_MS
  void TRAVEL_MS
  void TRAVEL_DX_PX
  void TRAVEL_DY_PX
})()
