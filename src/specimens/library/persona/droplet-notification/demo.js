/**
 * SPX-415 Droplet Notification
 * appear 80 → fall 260 → impact 40 → ripple 320 / badge 180. Busy-guarded, no loop.
 */
;(function () {
  const APPEAR_MS = 80
  const FALL_MS = 260
  const IMPACT_MS = 40
  const RIPPLE_MS = 320

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

  function setCopy(root, text) {
    const el = root.querySelector('[data-dn-copy]')
    if (el) el.textContent = text
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-dn-status]')
    if (el) el.textContent = text
  }

  function setTrigger(root, disabled) {
    const btn = root.querySelector('[data-dn-trigger]')
    if (btn) btn.disabled = disabled
  }

  function applyIdle(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'idle'
    setCopy(root, 'Inbox quiet.')
    setStatus(root, 'No new notification.')
    setTrigger(root, false)
  }

  function applyActive(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'active'
    setCopy(root, 'New event recorded.')
    setStatus(root, 'New notification.')
    setTrigger(root, false)
  }

  function triggerDroplet(root) {
    const s = ctx(root)
    if (s.busy) return

    if (reduced(root)) {
      applyActive(root)
      return
    }

    s.busy = true
    setTrigger(root, true)
    setCopy(root, 'Signal incoming.')
    setStatus(root, 'Notification arriving.')
    root.dataset.phase = 'appear'

    later(s, APPEAR_MS, () => {
      root.dataset.phase = 'fall'
    })
    later(s, APPEAR_MS + FALL_MS, () => {
      root.dataset.phase = 'impact'
    })
    later(s, APPEAR_MS + FALL_MS + IMPACT_MS, () => {
      root.dataset.phase = 'ripple'
      setCopy(root, 'New event recorded.')
      setStatus(root, 'New notification.')
    })
    later(s, APPEAR_MS + FALL_MS + IMPACT_MS + RIPPLE_MS, () => {
      root.dataset.phase = 'active'
      s.busy = false
      setTrigger(root, false)
    })
  }

  function bind(root) {
    if (root.dataset.dnBound === '1') return
    root.dataset.dnBound = '1'
    ctx(root)
    root.querySelector('[data-dn-trigger]')?.addEventListener('click', () => {
      triggerDroplet(root)
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-droplet-notification]').forEach((el) => bind(el))
  }

  window.dropletNotification = {
    init: initAll,
    trigger: triggerDroplet,
    reset: applyIdle,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
