/**
 * SPX-155 Required Marker Impact
 * 180ms slam + 100ms settle. Label never moves. Busy-guarded.
 */
;(function () {
  const TOTAL_MS = 280

  /** @type {WeakMap<HTMLElement, { timers: number[], busy: boolean }>} */
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
      s = { timers: [], busy: false }
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

  function setStatus(root, text) {
    const el = root.querySelector('[data-rmi-status]')
    if (!el) return
    el.textContent = ''
    void el.offsetWidth
    el.textContent = text
  }

  function setRequired(root, on) {
    const input = root.querySelector('[data-rmi-input]')
    const sr = root.querySelector('[data-rmi-sr]')
    if (input) input.setAttribute('aria-required', on ? 'true' : 'false')
    if (sr) sr.hidden = !on
  }

  function applyIdle(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'idle'
    setRequired(root, false)
    setStatus(root, 'Email is optional.')
  }

  function applyRequired(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'required'
    setRequired(root, true)
    setStatus(root, 'Email is required.')
  }

  function trigger(root) {
    const s = ctx(root)
    if (s.busy) return
    if (root.dataset.phase === 'required' || root.dataset.phase === 'play') return

    if (reduced(root)) {
      applyRequired(root)
      return
    }

    s.busy = true
    setRequired(root, true)
    root.dataset.phase = 'play'
    setStatus(root, 'Marking email required.')

    later(s, TOTAL_MS, () => {
      applyRequired(root)
    })
  }

  function replay(root) {
    const s = ctx(root)
    if (s.busy) return
    applyIdle(root)
    void root.offsetWidth
    trigger(root)
  }

  function bind(root) {
    if (root.dataset.rmiBound === '1') return
    root.dataset.rmiBound = '1'
    ctx(root)
    root.querySelector('[data-rmi-trigger]')?.addEventListener('click', () => {
      replay(root)
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-required-marker-impact]').forEach((el) => {
      bind(el)
      trigger(el)
    })
  }

  window.requiredMarkerImpact = {
    init: initAll,
    trigger,
    reset: applyIdle,
    replay,
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object' || data.type !== 'restart') return
    document.querySelectorAll('[data-required-marker-impact]').forEach((el) => replay(el))
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
