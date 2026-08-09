/**
 * SPX-411 Ripple Selection
 * Select → row-centred geometric ripple (3 rings) → lock.
 */
;(function () {
  const RIPPLE_MS = 520
  const STAGGER_MS = 45
  const EMPHASIS_MS = 180
  const RING_COUNT = 3
  const RIPPLE_CLEAR_MS = RIPPLE_MS + STAGGER_MS * (RING_COUNT - 1)

  /** @type {WeakMap<HTMLElement, { timers: number[] }>} */
  const stateMap = new WeakMap()

  function reduced(root) {
    if (document.documentElement.getAttribute('data-force-reduced-motion') === 'true') {
      return true
    }
    if (root.closest('[data-force-reduced-motion="true"]')) return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function ctx(root) {
    let s = stateMap.get(root)
    if (!s) {
      s = { timers: [] }
      stateMap.set(root, s)
    }
    return s
  }

  function clearTimers(s) {
    s.timers.forEach((id) => window.clearTimeout(id))
    s.timers = []
  }

  function later(s, ms, fn) {
    s.timers.push(window.setTimeout(fn, ms))
  }

  function rows(root) {
    return Array.from(root.querySelectorAll('[data-rs-row]'))
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-rs-status]')
    if (el) el.textContent = text
  }

  function applySelection(root, index, { ripple }) {
    const list = rows(root)
    const next = Math.max(0, Math.min(list.length - 1, index | 0))
    const s = ctx(root)
    clearTimers(s)

    list.forEach((btn, i) => {
      const on = i === next
      btn.classList.toggle('is-selected', on)
      btn.classList.remove('is-rippling', 'is-flash')
      btn.setAttribute('aria-checked', on ? 'true' : 'false')
      btn.tabIndex = on ? 0 : -1
    })

    const chosen = list[next]
    const name = chosen?.dataset.name || 'Option'
    setStatus(root, `${name} selected.`)

    if (!chosen) return

    if (!ripple || reduced(root)) {
      return
    }

    void chosen.offsetWidth
    chosen.classList.add('is-rippling', 'is-flash')
    later(s, EMPHASIS_MS, () => chosen.classList.remove('is-flash'))
    later(s, RIPPLE_CLEAR_MS, () => chosen.classList.remove('is-rippling'))
  }

  function selectRippleSelection(root, index) {
    applySelection(root, index, { ripple: true })
  }

  function onKeydown(root, event) {
    const list = rows(root)
    if (!list.length) return
    const current = list.findIndex((b) => b.tabIndex === 0)
    let next = current < 0 ? 0 : current

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      next = (current + 1) % list.length
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      next = (current - 1 + list.length) % list.length
    } else if (event.key === 'Enter') {
      event.preventDefault()
      list[next]?.focus()
      selectRippleSelection(root, next)
      return
    } else {
      return
    }

    list[next]?.focus()
    selectRippleSelection(root, next)
  }

  function bind(root) {
    if (root.dataset.rsBound === '1') return
    root.dataset.rsBound = '1'
    ctx(root)

    root.querySelector('[data-rs-list]')?.addEventListener('keydown', (e) => {
      onKeydown(root, e)
    })

    rows(root).forEach((btn) => {
      btn.addEventListener('click', () => {
        selectRippleSelection(root, Number(btn.dataset.index || 0))
      })
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-ripple-selection]').forEach((el) => bind(el))
  }

  window.rippleSelection = {
    init: initAll,
    select: selectRippleSelection,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
