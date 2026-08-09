/**
 * SPX-416 Water Disturbance Hover
 * Local pointer only. --disturb-x/--disturb-y. 3 reused rings. Max 8px line nudge.
 */
;(function () {
  const FOCUS_X = 230
  const FOCUS_Y = 130
  const MOVE_PX = 18
  const MAX_NUDGE = 8
  const LINE_INFLUENCE = 72

  /** @type {WeakMap<HTMLElement, { lastX: number, lastY: number, raf: number, pending: {x:number,y:number}|null }>} */
  const stateMap = new WeakMap()

  function reduced(root) {
    if (document.documentElement.getAttribute('data-force-reduced-motion') === 'true') {
      return true
    }
    if (root.closest('[data-force-reduced-motion="true"]')) return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function ctx(surface) {
    let s = stateMap.get(surface)
    if (!s) {
      s = { lastX: FOCUS_X, lastY: FOCUS_Y, raf: 0, pending: null }
      stateMap.set(surface, s)
    }
    return s
  }

  function localPoint(surface, event) {
    const r = surface.getBoundingClientRect()
    return {
      x: Math.min(Math.max(event.clientX - r.left, 0), r.width),
      y: Math.min(Math.max(event.clientY - r.top, 0), r.height),
    }
  }

  function setDisturb(surface, x, y) {
    surface.style.setProperty('--disturb-x', `${x}px`)
    surface.style.setProperty('--disturb-y', `${y}px`)
  }

  function nudgeLines(surface, x, y, enable) {
    const h = surface.clientHeight || 260
    const mid = (surface.clientWidth || 460) / 2
    const sign = x >= mid ? 1 : -1
    surface.querySelectorAll('[data-wdh-line]').forEach((line) => {
      if (!enable) {
        line.style.transform = 'translateX(0px)'
        return
      }
      const pct = parseFloat(line.style.top) || 50
      const ly = (pct / 100) * h
      const dist = Math.abs(ly - y)
      const mag = dist >= LINE_INFLUENCE ? 0 : (1 - dist / LINE_INFLUENCE) * MAX_NUDGE
      line.style.transform = `translateX(${(sign * mag).toFixed(2)}px)`
    })
  }

  function restartRipple(surface, root) {
    if (reduced(root)) return
    const rings = surface.querySelector('[data-wdh-rings]')
    if (!rings) return
    rings.classList.remove('is-rippling')
    void rings.offsetWidth
    rings.classList.add('is-rippling')
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-wdh-status]')
    if (el) el.textContent = text
  }

  function applyCalm(surface, root) {
    const s = ctx(surface)
    if (document.activeElement === surface) {
      surface.dataset.state = 'focus'
      setDisturb(surface, FOCUS_X, FOCUS_Y)
      nudgeLines(surface, FOCUS_X, FOCUS_Y, !reduced(root))
      setStatus(root, 'Surface focused.')
      return
    }
    surface.dataset.state = 'calm'
    surface.querySelector('[data-wdh-rings]')?.classList.remove('is-rippling')
    nudgeLines(surface, FOCUS_X, FOCUS_Y, false)
    setStatus(root, 'Surface calm.')
    s.lastX = FOCUS_X
    s.lastY = FOCUS_Y
  }

  function applyPoint(surface, root, x, y, { ripple }) {
    const s = ctx(surface)
    setDisturb(surface, x, y)
    nudgeLines(surface, x, y, !reduced(root) && surface.dataset.state === 'live')
    if (ripple) {
      const dx = x - s.lastX
      const dy = y - s.lastY
      if (Math.hypot(dx, dy) >= MOVE_PX || ripple === 'force') {
        restartRipple(surface, root)
        s.lastX = x
        s.lastY = y
      }
    }
  }

  function scheduleMove(surface, root, x, y) {
    const s = ctx(surface)
    s.pending = { x, y }
    if (s.raf) return
    s.raf = window.requestAnimationFrame(() => {
      s.raf = 0
      const p = s.pending
      s.pending = null
      if (!p || surface.dataset.state !== 'live') return
      applyPoint(surface, root, p.x, p.y, { ripple: true })
    })
  }

  function bind(root) {
    if (root.dataset.wdhBound === '1') return
    root.dataset.wdhBound = '1'
    const surface = root.querySelector('[data-wdh-surface]')
    if (!surface) return
    ctx(surface)
    setDisturb(surface, FOCUS_X, FOCUS_Y)

    surface.addEventListener('pointerenter', (event) => {
      const { x, y } = localPoint(surface, event)
      surface.dataset.state = 'live'
      setStatus(root, 'Surface disturbed.')
      applyPoint(surface, root, x, y, { ripple: 'force' })
    })

    surface.addEventListener('pointermove', (event) => {
      if (surface.dataset.state !== 'live') return
      const { x, y } = localPoint(surface, event)
      scheduleMove(surface, root, x, y)
    })

    surface.addEventListener('pointerleave', () => {
      applyCalm(surface, root)
    })

    surface.addEventListener('focus', () => {
      if (surface.dataset.state === 'live') return
      surface.dataset.state = 'focus'
      setDisturb(surface, FOCUS_X, FOCUS_Y)
      nudgeLines(surface, FOCUS_X, FOCUS_Y, !reduced(root))
      setStatus(root, 'Surface focused.')
    })

    surface.addEventListener('blur', () => {
      if (surface.dataset.state === 'live') return
      applyCalm(surface, root)
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-water-disturbance]').forEach((el) => bind(el))
  }

  window.waterDisturbanceHover = {
    init: initAll,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
