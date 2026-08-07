/**
 * SPX-2030 Performance Meter Burst — staggered bar race with OUTPUT overshoot clip.
 */
;(function () {
  const TOTAL_MS = 960
  const VALUES = ['62%', '48%', '94%']

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

  function meters(root) {
    return Array.from(root.querySelectorAll('.pmb__meter'))
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-pmb-status]')
    if (el) el.textContent = text
  }

  function applyFinal(root) {
    meters(root).forEach((m, i) => {
      const val = m.querySelector('[data-pmb-val]')
      if (val) val.textContent = VALUES[i] || '0%'
    })
  }

  function reset(root) {
    const ctx = getCtx(root)
    if (ctx.timer) window.clearTimeout(ctx.timer)
    ctx.timer = null
    ctx.busy = false
    root.dataset.phase = 'idle'
    meters(root).forEach((m) => {
      const val = m.querySelector('[data-pmb-val]')
      if (val) val.textContent = '0%'
    })
    setStatus(root, 'Awaiting results.')
  }

  function run(root) {
    const ctx = getCtx(root)
    if (ctx.busy) return
    ctx.busy = true
    if (ctx.timer) window.clearTimeout(ctx.timer)

    if (prefersReducedMotion(root)) {
      root.dataset.phase = 'done'
      applyFinal(root)
      setStatus(root, 'OUTPUT exceeded ceiling.')
      ctx.busy = false
      return
    }

    root.dataset.phase = 'race'
    setStatus(root, 'Bars racing…')

    const delays = [420, 600, 820]
    meters(root).forEach((m, i) => {
      const val = m.querySelector('[data-pmb-val]')
      const target = VALUES[i]
      ctx.timer = window.setTimeout(() => {
        if (val && target) val.textContent = target
      }, delays[i])
    })

    ctx.timer = window.setTimeout(() => {
      root.dataset.phase = 'done'
      applyFinal(root)
      setStatus(root, 'OUTPUT exceeded ceiling.')
      ctx.busy = false
      ctx.timer = null
    }, TOTAL_MS)
  }

  function bind(root) {
    if (root.dataset.pmbBound === '1') return
    root.dataset.pmbBound = '1'
    root.querySelector('[data-pmb-run]')?.addEventListener('click', () => {
      if (root.dataset.phase !== 'idle') reset(root)
      void root.offsetWidth
      run(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-meter-burst]')
      .forEach((el) => bind(el))
  }

  window.performanceMeterBurst = { init: initAll, run, reset }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
