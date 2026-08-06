/**
 * SPX-461 Full Moon Milestone
 * 74→75 (~220ms) → hold 100ms → symbolic illum 75→100 (~300ms) → ring →
 * 8 radial marks (~160ms) → PHASE III + MILESTONE COMPLETE.
 * Progressbar stays at 75% — full moon is milestone iconography only.
 */
;(function () {
  const STEP_MS = 220
  const HOLD_MS = 100
  const SWEEP_MS = 300
  const MARKS_MS = 160
  const DONE_PAD_MS = 80

  const IDLE_TEXT =
    'Project completion 74 percent. Phase III milestone pending.'
  const DONE_TEXT =
    'Project completion 75 percent. Phase III milestone complete.'

  /** @type {WeakMap<HTMLElement, { timers: number[], busy: boolean }>} */
  const stateMap = new WeakMap()

  function prefersReducedMotion(root) {
    if (root.closest('[data-force-reduced-motion="true"]')) return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function getCtx(root) {
    let ctx = stateMap.get(root)
    if (!ctx) {
      ctx = { timers: [], busy: false }
      stateMap.set(root, ctx)
    }
    return ctx
  }

  function clearTimers(ctx) {
    ctx.timers.forEach((id) => window.clearTimeout(id))
    ctx.timers = []
  }

  function later(ctx, ms, fn) {
    ctx.timers.push(window.setTimeout(fn, ms))
  }

  function setIllum(root, n) {
    const moon = root.querySelector('[data-fmm-moon]')
    if (moon) moon.style.setProperty('--fmm-illum', String(n))
  }

  function setProgress(root, n, valuetext) {
    const bar = root.querySelector('[data-fmm-bar]')
    const value = root.querySelector('[data-fmm-value]')
    const status = root.querySelector('[data-fmm-status]')
    if (bar) {
      bar.setAttribute('aria-valuenow', String(n))
      bar.setAttribute('aria-valuetext', valuetext)
    }
    if (value) value.textContent = `${n}%`
    if (status) status.textContent = valuetext
  }

  function setCompleteEnabled(root, on) {
    const btn = root.querySelector('[data-fmm-complete]')
    if (btn) btn.disabled = !on
  }

  function reset(root) {
    const ctx = getCtx(root)
    clearTimers(ctx)
    ctx.busy = false
    root.dataset.state = 'idle'
    setIllum(root, 74)
    setProgress(root, 74, IDLE_TEXT)
    setCompleteEnabled(root, true)
    const done = root.querySelector('[data-fmm-done]')
    if (done) done.hidden = true
  }

  function finishImmediate(root) {
    const ctx = getCtx(root)
    clearTimers(ctx)
    ctx.busy = false
    root.dataset.state = 'done'
    setIllum(root, 100)
    setProgress(root, 75, DONE_TEXT)
    setCompleteEnabled(root, false)
    const done = root.querySelector('[data-fmm-done]')
    if (done) done.hidden = false
  }

  function complete(root) {
    const ctx = getCtx(root)
    if (ctx.busy || root.dataset.state === 'done') return
    ctx.busy = true
    clearTimers(ctx)
    setCompleteEnabled(root, false)

    if (prefersReducedMotion(root)) {
      finishImmediate(root)
      return
    }

    // 74 → 75 numeric + matching illumination
    root.dataset.state = 'step'
    setIllum(root, 75)
    setProgress(
      root,
      75,
      'Project completion 75 percent. Phase III milestone reached.',
    )

    later(ctx, STEP_MS + HOLD_MS, () => {
      // Symbolic sweep only — progress stays 75
      root.dataset.state = 'sweep'
      setIllum(root, 100)
    })

    later(ctx, STEP_MS + HOLD_MS + SWEEP_MS, () => {
      root.dataset.state = 'full'
    })

    later(ctx, STEP_MS + HOLD_MS + SWEEP_MS + 40, () => {
      root.dataset.state = 'marks'
    })

    later(ctx, STEP_MS + HOLD_MS + SWEEP_MS + 40 + MARKS_MS, () => {
      root.dataset.state = 'done'
      const done = root.querySelector('[data-fmm-done]')
      if (done) done.hidden = false
      setProgress(root, 75, DONE_TEXT)
    })

    later(
      ctx,
      STEP_MS + HOLD_MS + SWEEP_MS + 40 + MARKS_MS + DONE_PAD_MS,
      () => {
        ctx.busy = false
      },
    )
  }

  function bind(root) {
    if (root.dataset.fmmBound === '1') return
    root.dataset.fmmBound = '1'
    getCtx(root)

    root.querySelector('[data-fmm-complete]')?.addEventListener('click', () => {
      complete(root)
    })
    root.querySelector('[data-fmm-reset]')?.addEventListener('click', () => {
      reset(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-full-moon-milestone]')
      .forEach((el) => bind(el))
  }

  window.fullMoonMilestone = {
    init: initAll,
    complete,
    reset,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
