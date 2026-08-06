/**
 * SPX-2040 Match Start Slam
 */
;(function () {
  const SLAM_MS = 500
  const TEAR_MS = 380
  const TOTAL_MS = SLAM_MS + TEAR_MS + 100

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
    const el = root.querySelector('[data-mss-status]')
    if (el) el.textContent = text
  }

  function reset(root) {
    const ctx = getCtx(root)
    clearTimers(ctx)
    ctx.busy = false
    root.dataset.phase = 'idle'
    setStatus(root, 'Match pending.')
  }

  function goLive(root) {
    const ctx = getCtx(root)
    root.dataset.phase = 'live'
    setStatus(root, 'Match live.')
    ctx.busy = false
  }

  function tear(root) {
    const ctx = getCtx(root)
    root.dataset.phase = 'tear'
    setStatus(root, 'Overlay clearing…')
    later(ctx, TEAR_MS + 100, () => goLive(root))
  }

  function slam(root) {
    const ctx = getCtx(root)
    root.dataset.phase = 'slam'
    setStatus(root, 'START slam.')
    later(ctx, SLAM_MS, () => tear(root))
  }

  function run(root) {
    const ctx = getCtx(root)
    if (ctx.busy) return
    ctx.busy = true
    clearTimers(ctx)

    if (prefersReducedMotion(root)) {
      goLive(root)
      return
    }

    slam(root)
  }

  function bind(root) {
    if (root.dataset.mssBound === '1') return
    root.dataset.mssBound = '1'
    root.querySelector('[data-mss-run]')?.addEventListener('click', () => {
      if (root.dataset.phase !== 'idle') reset(root)
      void root.offsetWidth
      run(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-match-slam]')
      .forEach((el) => bind(el))
  }

  window.matchStartSlam = { init: initAll, run, reset }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
