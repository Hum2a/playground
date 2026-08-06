/**
 * SPX-2027 Training Simulation Start
 */
;(function () {
  const COUNT_STEPS = ['3', '2', '1', 'GO']
  const STEP_MS = 380
  const BURST_MS = 580
  const LIVE_MS = 400

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

  function setStatus(root, text) {
    const el = root.querySelector('[data-tss-status]')
    if (el) el.textContent = text
  }

  function setTelemetry(root) {
    const pulse = root.querySelector('[data-tss-pulse]')
    const load = root.querySelector('[data-tss-load]')
    if (pulse) pulse.textContent = '118'
    if (load) load.textContent = '84%'
  }

  function reset(root) {
    const ctx = getCtx(root)
    clearTimers(ctx)
    ctx.busy = false
    root.dataset.phase = 'idle'
    const count = root.querySelector('[data-tss-count]')
    if (count) count.textContent = '3'
    const pulse = root.querySelector('[data-tss-pulse]')
    const load = root.querySelector('[data-tss-load]')
    if (pulse) pulse.textContent = '—'
    if (load) load.textContent = '—'
    setStatus(root, 'Simulation standby.')
  }

  function goLive(root) {
    const ctx = getCtx(root)
    root.dataset.phase = 'live'
    setTelemetry(root)
    setStatus(root, 'Telemetry live.')
    ctx.busy = false
  }

  function burst(root) {
    const ctx = getCtx(root)
    root.dataset.phase = 'burst'
    setStatus(root, 'Simulation active.')
    later(ctx, BURST_MS + LIVE_MS, () => goLive(root))
  }

  function runCountdown(root) {
    const ctx = getCtx(root)
    const countEl = root.querySelector('[data-tss-count]')
    let step = 0

    function tick() {
      if (!countEl) return
      countEl.textContent = COUNT_STEPS[step]
      root.dataset.phase = 'count'
      void root.offsetWidth
      step += 1
      if (step < COUNT_STEPS.length) {
        later(ctx, STEP_MS, tick)
      } else {
        later(ctx, STEP_MS, () => burst(root))
      }
    }

    tick()
  }

  function start(root) {
    const ctx = getCtx(root)
    if (ctx.busy) return
    ctx.busy = true
    clearTimers(ctx)

    if (prefersReducedMotion(root)) {
      root.dataset.phase = 'live'
      setTelemetry(root)
      setStatus(root, 'Telemetry live.')
      ctx.busy = false
      return
    }

    setStatus(root, 'Countdown…')
    runCountdown(root)
  }

  function bind(root) {
    if (root.dataset.tssBound === '1') return
    root.dataset.tssBound = '1'
    root.querySelector('[data-tss-start]')?.addEventListener('click', () => {
      if (root.dataset.phase !== 'idle') reset(root)
      void root.offsetWidth
      start(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-training-start]')
      .forEach((el) => bind(el))
  }

  window.trainingSimulationStart = { init: initAll, start, reset }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
