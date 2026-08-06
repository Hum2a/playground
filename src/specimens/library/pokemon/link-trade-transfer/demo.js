/**
 * SPX-829 Link Trade Transfer
 * Link join 160ms → shrink 120ms → to mid 260ms (cross flash) →
 * to opposite 260ms → ownership swap → link teardown 180ms.
 *
 * Frozen path geometry:
 *   VECTOR: y = axis − 10px, left → right
 *   PRISM:  y = axis + 10px, right → left
 *   Cross flash at stage centre.
 */
;(function () {
  const LINK_MS = 160
  const SHRINK_MS = 120
  const TO_MID_MS = 260
  const TO_END_MS = 260
  const SWAP_MS = 160
  const TEARDOWN_MS = 180

  const IDLE_STATUS = 'Node A owns VECTOR. Node B owns PRISM.'
  const DONE_STATUS = 'Node A owns PRISM. Node B owns VECTOR. Trade complete.'

  /** @type {WeakMap<HTMLElement, { timers: number[], busy: boolean, swapped: boolean }>} */
  const stateMap = new WeakMap()

  function prefersReducedMotion(root) {
    if (root.closest('[data-force-reduced-motion="true"]')) return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function getCtx(root) {
    let ctx = stateMap.get(root)
    if (!ctx) {
      ctx = { timers: [], busy: false, swapped: false }
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
    const el = root.querySelector('[data-ltt-status]')
    if (el) el.textContent = text
  }

  function setTradeEnabled(root, on) {
    const btn = root.querySelector('[data-ltt-trade]')
    if (btn) btn.disabled = !on
  }

  function setGlyph(pad, kind) {
    const g = pad.querySelector('[data-ltt-home]')
    if (!g) return
    g.className =
      kind === 'prism' ? 'ltt__glyph ltt__glyph--prism' : 'ltt__glyph ltt__glyph--vector'
    g.setAttribute('data-ltt-home', pad.getAttribute('data-ltt-pad') || '')
    g.classList.add('is-arrived')
    g.style.opacity = '1'
  }

  function applyOwnership(root, swapped) {
    const padA = root.querySelector('[data-ltt-pad="a"]')
    const padB = root.querySelector('[data-ltt-pad="b"]')
    if (swapped) {
      if (padA) setGlyph(padA, 'prism')
      if (padB) setGlyph(padB, 'vector')
    } else {
      if (padA) setGlyph(padA, 'vector')
      if (padB) setGlyph(padB, 'prism')
    }
  }

  function reset(root) {
    const ctx = getCtx(root)
    clearTimers(ctx)
    ctx.busy = false
    ctx.swapped = false
    root.dataset.state = 'idle'
    root.querySelectorAll('.ltt__node').forEach((n) => n.classList.remove('is-recv'))
    root.querySelectorAll('.ltt__glyph').forEach((g) => {
      g.classList.remove('is-arrived')
      g.style.opacity = ''
    })
    applyOwnership(root, false)
    const done = root.querySelector('[data-ltt-done]')
    if (done) done.hidden = true
    setTradeEnabled(root, true)
    setStatus(root, IDLE_STATUS)
  }

  function finishDone(root) {
    const ctx = getCtx(root)
    root.dataset.state = 'done'
    ctx.swapped = true
    applyOwnership(root, true)
    root.querySelectorAll('.ltt__node').forEach((n) => n.classList.remove('is-recv'))
    const done = root.querySelector('[data-ltt-done]')
    if (done) done.hidden = false
    setTradeEnabled(root, false)
    setStatus(root, DONE_STATUS)
    ctx.busy = false
  }

  function trade(root) {
    const ctx = getCtx(root)
    if (ctx.busy || root.dataset.state === 'done') return
    ctx.busy = true
    clearTimers(ctx)
    setTradeEnabled(root, false)

    if (prefersReducedMotion(root)) {
      finishDone(root)
      return
    }

    const done = root.querySelector('[data-ltt-done]')
    if (done) done.hidden = true

    // 1) join link
    root.dataset.state = 'link'
    setStatus(root, 'Link channel opening.')

    later(ctx, LINK_MS, () => {
      // 2) shrink (flyers appear at endpoints)
      root.dataset.state = 'shrink'
    })

    later(ctx, LINK_MS + SHRINK_MS, () => {
      // 3) depart to midpoint
      root.dataset.state = 'depart'
      setStatus(root, 'Entities transferring.')
    })

    later(ctx, LINK_MS + SHRINK_MS + TO_MID_MS, () => {
      // 4) cross flash at centre
      root.dataset.state = 'cross'
    })

    later(ctx, LINK_MS + SHRINK_MS + TO_MID_MS + 80, () => {
      // 5) continue to opposite endpoints
      root.dataset.state = 'arrive'
      root.querySelector('[data-ltt-node="a"]')?.classList.add('is-recv')
      root.querySelector('[data-ltt-node="b"]')?.classList.add('is-recv')
    })

    later(ctx, LINK_MS + SHRINK_MS + TO_MID_MS + 80 + TO_END_MS, () => {
      // 6) ownership labels + glyphs update only after arrival
      applyOwnership(root, true)
      ctx.swapped = true
      root.dataset.state = 'swap'
      setStatus(root, 'Ownership updated.')
    })

    later(
      ctx,
      LINK_MS + SHRINK_MS + TO_MID_MS + 80 + TO_END_MS + SWAP_MS,
      () => {
        // 7) tear down link
        root.dataset.state = 'teardown'
      },
    )

    later(
      ctx,
      LINK_MS + SHRINK_MS + TO_MID_MS + 80 + TO_END_MS + SWAP_MS + TEARDOWN_MS,
      () => {
        finishDone(root)
      },
    )
  }

  function bind(root) {
    if (root.dataset.lttBound === '1') return
    root.dataset.lttBound = '1'
    getCtx(root)

    root.querySelector('[data-ltt-trade]')?.addEventListener('click', () => {
      trade(root)
    })
    root.querySelector('[data-ltt-reset]')?.addEventListener('click', () => {
      reset(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-link-trade]')
      .forEach((el) => bind(el))
  }

  window.linkTradeTransfer = {
    init: initAll,
    trade,
    reset,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
