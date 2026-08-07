/**
 * SPX-731 Branch Evolution Choice
 * Stem 180ms → branch split 260ms → nodes stagger ~40ms.
 * Confirm: unselected retract 220ms; current travels along selected branch.
 *
 * Frozen SVG geometry (viewBox 400×320):
 *   source (200,250) → fork (200,205) [stem ≈45px]
 *   left  (70,72) PERFORMANCE
 *   mid   (200,58) BALANCED
 *   right (330,72) PORTABLE
 */
;(function () {
  const STEM_MS = 180
  const BRANCH_MS = 260
  const NODE_BASE_MS = STEM_MS + BRANCH_MS - 40 // ~400 outer stagger base
  const CHOOSE_READY_MS = STEM_MS + BRANCH_MS + 80
  const RETRACT_MS = 220
  const TRAVEL_MS = 320

  const DEST = [
    { left: '17.5%', top: '18%' },
    { left: '50%', top: '18%' },
    { left: '82.5%', top: '18%' },
  ]

  const IDLE_STATUS =
    'Current build STANDARD. Evolve to reveal branch futures.'

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

  function options(root) {
    return Array.from(root.querySelectorAll('[data-bec-option]'))
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-bec-status]')
    if (el) el.textContent = text
  }

  function setButtons(root, { evolve, choose }) {
    const e = root.querySelector('[data-bec-evolve]')
    const c = root.querySelector('[data-bec-choose]')
    if (e) e.disabled = !evolve
    if (c) c.disabled = !choose
  }

  function syncSelection(root, index) {
    const list = options(root)
    const next = Math.max(0, Math.min(list.length - 1, index | 0))
    root.dataset.selected = String(next)
    list.forEach((btn, i) => {
      const on = i === next
      btn.setAttribute('aria-checked', on ? 'true' : 'false')
      btn.tabIndex = on ? 0 : -1
    })
    const name = list[next]?.dataset.name || 'future'
    if (root.dataset.state === 'choose') {
      setStatus(root, `${name} branch selected. Press Choose to confirm.`)
    }
  }

  function applyGlyph(current, name) {
    const glyph = current.querySelector('.bec__glyph')
    if (!glyph) return
    glyph.className = 'bec__glyph'
    if (name === 'PERFORMANCE') glyph.classList.add('bec__glyph--perf')
    else if (name === 'PORTABLE') glyph.classList.add('bec__glyph--port')
    else if (name === 'BALANCED') glyph.classList.add('bec__glyph--bal')
    else glyph.classList.add('bec__glyph--standard')
  }

  function reset(root) {
    const ctx = getCtx(root)
    clearTimers(ctx)
    ctx.busy = false
    root.dataset.state = 'idle'
    root.dataset.selected = '1'

    const opts = root.querySelector('[data-bec-options]')
    if (opts) opts.hidden = true

    options(root).forEach((btn) => {
      btn.classList.remove('is-kept', 'is-retract')
    })
    root.querySelectorAll('[data-bec-branch]').forEach((p) => {
      p.classList.remove('is-kept', 'is-retract')
    })

    const current = root.querySelector('[data-bec-current]')
    if (current) {
      current.classList.remove('is-travel')
      current.style.left = ''
      current.style.top = ''
      applyGlyph(current, 'STANDARD')
    }
    const label = root.querySelector('[data-bec-current-label]')
    if (label) label.textContent = 'BUILD // STANDARD'

    syncSelection(root, 1)
    setButtons(root, { evolve: true, choose: false })
    setStatus(root, IDLE_STATUS)
  }

  function showBranchesImmediate(root) {
    root.dataset.state = 'choose'
    const opts = root.querySelector('[data-bec-options]')
    if (opts) opts.hidden = false
    setButtons(root, { evolve: false, choose: true })
    syncSelection(root, Number(root.dataset.selected || 1))
    setStatus(
      root,
      'Three futures available. Select PERFORMANCE, BALANCED, or PORTABLE.',
    )
  }

  function evolve(root) {
    const ctx = getCtx(root)
    if (ctx.busy || root.dataset.state !== 'idle') return
    ctx.busy = true
    clearTimers(ctx)
    setButtons(root, { evolve: false, choose: false })

    if (prefersReducedMotion(root)) {
      showBranchesImmediate(root)
      ctx.busy = false
      return
    }

    root.dataset.state = 'grow'
    setStatus(root, 'Branches growing from current build.')

    later(ctx, CHOOSE_READY_MS, () => {
      root.dataset.state = 'choose'
      setButtons(root, { evolve: false, choose: true })
      syncSelection(root, Number(root.dataset.selected || 1))
      setStatus(
        root,
        'Three futures available. Select PERFORMANCE, BALANCED, or PORTABLE.',
      )
      ctx.busy = false
    })
  }

  function finishChosen(root, index) {
    const list = options(root)
    const chosen = list[index]
    const name = chosen?.dataset.name || 'BALANCED'
    const build = chosen?.dataset.build || `BUILD // ${name}`

    root.dataset.state = 'done'
    const opts = root.querySelector('[data-bec-options]')
    if (opts) opts.hidden = true

    const current = root.querySelector('[data-bec-current]')
    if (current) {
      current.classList.remove('is-travel')
      current.style.left = ''
      current.style.top = ''
      applyGlyph(current, name)
    }
    const label = root.querySelector('[data-bec-current-label]')
    if (label) label.textContent = build

    setButtons(root, { evolve: false, choose: false })
    setStatus(root, `Identity evolved to ${name}.`)
    getCtx(root).busy = false
  }

  function choose(root) {
    const ctx = getCtx(root)
    if (ctx.busy || root.dataset.state !== 'choose') return
    ctx.busy = true
    clearTimers(ctx)
    setButtons(root, { evolve: false, choose: false })

    const index = Number(root.dataset.selected || 1)
    const list = options(root)

    if (prefersReducedMotion(root)) {
      finishChosen(root, index)
      return
    }

    root.dataset.state = 'confirm'
    list.forEach((btn, i) => {
      btn.classList.toggle('is-kept', i === index)
      btn.classList.toggle('is-retract', i !== index)
    })
    root.querySelectorAll('[data-bec-branch]').forEach((path) => {
      const i = Number(path.getAttribute('data-bec-branch'))
      path.classList.toggle('is-kept', i === index)
      path.classList.toggle('is-retract', i !== index)
    })

    const current = root.querySelector('[data-bec-current]')
    if (current) {
      // force layout then travel along selected branch endpoint
      void current.offsetWidth
      current.classList.add('is-travel')
      current.style.left = DEST[index].left
      current.style.top = DEST[index].top
    }

    const name = list[index]?.dataset.name || 'future'
    const retracted = list
      .filter((_, i) => i !== index)
      .map((btn) => btn.dataset.name)
      .filter(Boolean)
      .join(' and ')
    setStatus(
      root,
      `${name} branch retained. ${retracted} branches retract. Becoming ${name}.`,
    )

    later(ctx, Math.max(RETRACT_MS, TRAVEL_MS) + 40, () => {
      finishChosen(root, index)
    })
  }

  function onKeydown(root, event) {
    if (root.dataset.state !== 'choose') return
    const list = options(root)
    if (!list.length) return
    let next = Number(root.dataset.selected || 0)

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      next = (next + 1) % list.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      next = (next - 1 + list.length) % list.length
    } else if (event.key === 'Home') {
      event.preventDefault()
      next = 0
    } else if (event.key === 'End') {
      event.preventDefault()
      next = list.length - 1
    } else {
      return
    }

    syncSelection(root, next)
    list[next]?.focus()
  }

  function bind(root) {
    if (root.dataset.becBound === '1') return
    root.dataset.becBound = '1'
    getCtx(root)

    root.querySelector('[data-bec-evolve]')?.addEventListener('click', () => {
      evolve(root)
    })
    root.querySelector('[data-bec-choose]')?.addEventListener('click', () => {
      choose(root)
    })
    root.querySelector('[data-bec-reset]')?.addEventListener('click', () => {
      reset(root)
    })

    root.querySelector('[data-bec-options]')?.addEventListener('keydown', (e) => {
      onKeydown(root, e)
    })

    options(root).forEach((btn) => {
      btn.addEventListener('click', () => {
        if (root.dataset.state !== 'choose') return
        syncSelection(root, Number(btn.dataset.index || 0))
      })
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-branch-evolution]')
      .forEach((el) => bind(el))
  }

  window.branchEvolutionChoice = {
    init: initAll,
    evolve,
    choose,
    reset,
    select: syncSelection,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
