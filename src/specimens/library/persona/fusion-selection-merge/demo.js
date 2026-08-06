/**
 * SPX-509 Fusion Selection Merge
 * Phases (~950ms): converge 0–360 → compress 300–480 → cover 420–650 →
 * result 600–850 → done ~950. Sources retract inward under glass coverage.
 */
;(function () {
  const IDLE_STATUS =
    'Source A Motion and Source B Glass selected for merge.'
  const DONE_STATUS = 'Sources merged into Result C.'

  /** @type {WeakMap<HTMLElement, { timers: number[], busy: boolean }>} */
  const stateMap = new WeakMap()

  function prefersReducedMotion(root) {
    if (root.closest('[data-force-reduced-motion="true"]')) return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function clearTimers(ctx) {
    ctx.timers.forEach((id) => window.clearTimeout(id))
    ctx.timers = []
  }

  function getCtx(root) {
    let ctx = stateMap.get(root)
    if (!ctx) {
      ctx = { timers: [], busy: false }
      stateMap.set(root, ctx)
    }
    return ctx
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-fsm-status]')
    if (el) el.textContent = text
  }

  function setMerged(root, merged) {
    const a = root.querySelector('[data-fsm-source="a"]')
    const b = root.querySelector('[data-fsm-source="b"]')
    const c = root.querySelector('[data-fsm-result]')
    const done = root.querySelector('[data-fsm-done]')
    const fuse = root.querySelector('[data-fsm-fuse]')

    if (a) {
      a.hidden = merged
      a.setAttribute('aria-hidden', merged ? 'true' : 'false')
    }
    if (b) {
      b.hidden = merged
      b.setAttribute('aria-hidden', merged ? 'true' : 'false')
    }
    if (c) {
      c.hidden = !merged
      c.setAttribute('aria-hidden', merged ? 'false' : 'true')
    }
    if (done) done.hidden = !merged
    if (fuse) fuse.disabled = merged
  }

  function resetFusion(root) {
    const ctx = getCtx(root)
    clearTimers(ctx)
    ctx.busy = false
    root.dataset.state = 'idle'
    setMerged(root, false)
    setStatus(root, IDLE_STATUS)
  }

  function finishMerged(root) {
    root.dataset.state = 'done'
    setMerged(root, true)
    setStatus(root, DONE_STATUS)
    getCtx(root).busy = false
  }

  function fuse(root) {
    const ctx = getCtx(root)
    if (ctx.busy || root.dataset.state === 'done') return
    ctx.busy = true
    clearTimers(ctx)

    if (prefersReducedMotion(root)) {
      finishMerged(root)
      return
    }

    const schedule = (ms, fn) => {
      ctx.timers.push(window.setTimeout(fn, ms))
    }

    // Timeline anchors (ms from fuse):
    // 0 converge · 300 compress · 420 cover · 600 result · 850 settle · 950 done
    root.dataset.state = 'converge'
    setStatus(root, 'Merging sources.')

    schedule(300, () => {
      root.dataset.state = 'compress'
    })

    schedule(420, () => {
      root.dataset.state = 'cover'
    })

    schedule(600, () => {
      root.dataset.state = 'result'
      const c = root.querySelector('[data-fsm-result]')
      if (c) {
        c.hidden = false
        c.setAttribute('aria-hidden', 'false')
      }
      const a = root.querySelector('[data-fsm-source="a"]')
      const b = root.querySelector('[data-fsm-source="b"]')
      if (a) a.setAttribute('aria-hidden', 'true')
      if (b) b.setAttribute('aria-hidden', 'true')
    })

    schedule(850, () => {
      const done = root.querySelector('[data-fsm-done]')
      if (done) done.hidden = false
      root.dataset.state = 'done'
      setMerged(root, true)
      setStatus(root, DONE_STATUS)
    })

    schedule(950, () => {
      ctx.busy = false
    })
  }

  function bind(root) {
    if (root.dataset.fsmBound === '1') return
    root.dataset.fsmBound = '1'
    getCtx(root)

    root.querySelector('[data-fsm-fuse]')?.addEventListener('click', () => {
      fuse(root)
    })
    root.querySelector('[data-fsm-reset]')?.addEventListener('click', () => {
      resetFusion(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-fusion-merge]')
      .forEach((el) => bind(el))
  }

  window.fusionSelectionMerge = {
    init: initAll,
    fuse,
    reset: resetFusion,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
