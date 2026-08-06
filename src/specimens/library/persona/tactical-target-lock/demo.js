/**
 * SPX-480 Tactical Target Lock
 * Brackets attack from outside → overshoot → settle → LOCKED.
 * Switch: old releases outward (~90ms), new attacks ~50ms after release starts.
 */
;(function () {
  const RELEASE_MS = 90
  const ATTACK_DELAY_MS = 50
  const ATTACK_MS = 150
  const SETTLE_AT_MS = 150
  const LOCKED_AT_MS = 210
  const IDLE_STATUS = 'No target selected.'

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

  function targets(root) {
    return Array.from(root.querySelectorAll('[data-ttl-target]'))
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-ttl-status]')
    if (el) el.textContent = text
  }

  function clearLockAttrs(btn) {
    btn.removeAttribute('data-lock')
  }

  function applyIdle(root) {
    const ctx = getCtx(root)
    clearTimers(ctx)
    ctx.busy = false
    root.dataset.selected = ''
    targets(root).forEach((btn, i) => {
      clearLockAttrs(btn)
      btn.setAttribute('aria-checked', 'false')
      btn.tabIndex = i === 0 ? 0 : -1
    })
    const clear = root.querySelector('[data-ttl-clear]')
    if (clear) clear.disabled = true
    setStatus(root, IDLE_STATUS)
  }

  function applyImmediate(root, index) {
    const ctx = getCtx(root)
    clearTimers(ctx)
    ctx.busy = false
    const list = targets(root)
    const next = Math.max(0, Math.min(list.length - 1, index | 0))
    root.dataset.selected = String(next)
    list.forEach((btn, i) => {
      clearLockAttrs(btn)
      const on = i === next
      btn.setAttribute('aria-checked', on ? 'true' : 'false')
      btn.tabIndex = on ? 0 : -1
      if (on) btn.setAttribute('data-lock', 'locked')
    })
    const clear = root.querySelector('[data-ttl-clear]')
    if (clear) clear.disabled = false
    const name = list[next]?.dataset.name || 'Target'
    setStatus(root, `${name} targeted.`)
  }

  function startAttack(root, btn) {
    const ctx = getCtx(root)
    btn.setAttribute('data-lock', 'attack')
    later(ctx, SETTLE_AT_MS, () => {
      if (btn.getAttribute('aria-checked') === 'true') {
        btn.setAttribute('data-lock', 'settle')
      }
    })
    later(ctx, LOCKED_AT_MS, () => {
      if (btn.getAttribute('aria-checked') === 'true') {
        btn.setAttribute('data-lock', 'locked')
        ctx.busy = false
      }
    })
  }

  /**
   * @param {HTMLElement} root
   * @param {number} index
   */
  function selectTarget(root, index) {
    const ctx = getCtx(root)
    const list = targets(root)
    const next = Math.max(0, Math.min(list.length - 1, index | 0))
    const prevRaw = root.dataset.selected
    const prev = prevRaw === '' ? -1 : Number(prevRaw)

    if (next === prev && list[next]?.getAttribute('aria-checked') === 'true') {
      return
    }

    if (prefersReducedMotion(root)) {
      applyImmediate(root, next)
      return
    }

    clearTimers(ctx)
    ctx.busy = true

    const clear = root.querySelector('[data-ttl-clear]')
    if (clear) clear.disabled = false

    const nextBtn = list[next]
    const prevBtn = prev >= 0 ? list[prev] : null

    list.forEach((btn, i) => {
      const on = i === next
      btn.setAttribute('aria-checked', on ? 'true' : 'false')
      btn.tabIndex = on ? 0 : -1
      if (!on) clearLockAttrs(btn)
    })
    root.dataset.selected = String(next)

    const name = nextBtn?.dataset.name || 'Target'
    setStatus(root, `${name} targeted.`)

    if (prevBtn && prev !== next) {
      prevBtn.setAttribute('data-lock', 'release')
      later(ctx, RELEASE_MS, () => {
        if (prevBtn.getAttribute('aria-checked') !== 'true') {
          clearLockAttrs(prevBtn)
        }
      })
      later(ctx, ATTACK_DELAY_MS, () => {
        if (nextBtn) startAttack(root, nextBtn)
      })
    } else if (nextBtn) {
      startAttack(root, nextBtn)
    }
  }

  function onKeydown(root, event) {
    const list = targets(root)
    if (!list.length) return
    const current = list.findIndex((b) => b.tabIndex === 0)
    let next = current < 0 ? 0 : current

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      next = (current + 1) % list.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      next = (current - 1 + list.length) % list.length
    } else if (event.key === 'Home') {
      event.preventDefault()
      next = 0
    } else if (event.key === 'End') {
      event.preventDefault()
      next = list.length - 1
    } else if (event.key === ' ' || event.key === 'Enter') {
      // native button activates; also ensure selection
      return
    } else {
      return
    }

    list[next]?.focus()
    selectTarget(root, next)
  }

  function bind(root) {
    if (root.dataset.ttlBound === '1') return
    root.dataset.ttlBound = '1'
    getCtx(root)

    root.querySelector('[data-ttl-rail]')?.addEventListener('keydown', (e) => {
      onKeydown(root, e)
    })

    targets(root).forEach((btn) => {
      btn.addEventListener('click', () => {
        selectTarget(root, Number(btn.dataset.index || 0))
      })
    })

    root.querySelector('[data-ttl-clear]')?.addEventListener('click', () => {
      applyIdle(root)
    })
  }

  function initAll(scope) {
    ;(scope || document)
      .querySelectorAll('[data-tactical-lock]')
      .forEach((el) => bind(el))
  }

  window.tacticalTargetLock = {
    init: initAll,
    select: selectTarget,
    clear: applyIdle,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
