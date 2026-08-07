/**
 * SPX-2017 Analysis Scribble Reveal
 */
;(function () {
  /** Frozen hand-path stroke ladder — matches contract.strokeLadder */
  const STROKE_CIRCLE_MS = 320
  const STROKE_ARROW_MS = 280
  const STROKE_UNDERLINE_MS = 240
  const STROKE_ARROW_DELAY_MS = 180
  const STROKE_UNDERLINE_DELAY_MS = 360
  const NOTE_DELAY_MS = 520
  const OUTPUT_SETTLE_MS = 200
  const OUTPUT_DELAY_MS = 720
  const TOTAL_MS = OUTPUT_DELAY_MS + OUTPUT_SETTLE_MS

  const IDLE = 'idle'
  const SCRIBBLE = 'scribble'
  const DONE = 'done'

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
    const el = root.querySelector('[data-asr-status]')
    if (el) el.textContent = text
  }

  function reset(root) {
    const ctx = getCtx(root)
    if (ctx.timer) window.clearTimeout(ctx.timer)
    ctx.timer = null
    ctx.busy = false
    root.dataset.phase = IDLE
    setStatus(root, 'Profile unmarked.')
  }

  function run(root) {
    const ctx = getCtx(root)
    if (ctx.busy) return
    ctx.busy = true
    if (ctx.timer) window.clearTimeout(ctx.timer)

    if (prefersReducedMotion(root)) {
      root.dataset.phase = DONE
      setStatus(root, 'Annotations complete.')
      ctx.busy = false
      return
    }

    root.dataset.phase = SCRIBBLE
    setStatus(root, 'Rapid annotation…')

    ctx.timer = window.setTimeout(() => {
      root.dataset.phase = DONE
      setStatus(root, 'Annotations complete.')
      ctx.busy = false
      ctx.timer = null
    }, TOTAL_MS)
  }

  function bind(root) {
    if (root.dataset.asrBound === '1') return
    root.dataset.asrBound = '1'
    root.querySelector('[data-asr-run]')?.addEventListener('click', () => {
      if (root.dataset.phase !== IDLE) reset(root)
      void root.offsetWidth
      run(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-analysis-scribble]')
      .forEach((el) => bind(el))
  }

  window.analysisScribbleReveal = { init: initAll, run, reset }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }

  void STROKE_CIRCLE_MS
  void STROKE_ARROW_MS
  void STROKE_UNDERLINE_MS
  void STROKE_ARROW_DELAY_MS
  void STROKE_UNDERLINE_DELAY_MS
  void NOTE_DELAY_MS
})()
