/**
 * SPX-459 Eclipse Transition
 * enter 350 → eclipse 300 → dark 200 → reveal 350 (1200ms). Busy-guarded, no loop.
 */
;(function () {
  const ENTER_MS = 350
  const ECLIPSE_MS = 300
  const DARK_MS = 200
  const REVEAL_MS = 350

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
    const el = root.querySelector('[data-et-status]')
    if (el) el.textContent = text
  }

  function setTrigger(root, disabled) {
    const btn = root.querySelector('[data-et-trigger]')
    if (btn) btn.disabled = disabled
  }

  function setPanels(root, nextVisible) {
    const current = root.querySelector('[data-et-current]')
    const next = root.querySelector('[data-et-next]')
    if (current) current.setAttribute('aria-hidden', nextVisible ? 'true' : 'false')
    if (next) next.setAttribute('aria-hidden', nextVisible ? 'false' : 'true')
  }

  function applyIdle(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'idle'
    setPanels(root, false)
    setStatus(root, 'Current state visible.')
    setTrigger(root, false)
  }

  function applyNext(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'done'
    setPanels(root, true)
    setStatus(root, 'Next state visible.')
    setTrigger(root, false)
  }

  function play(root) {
    const s = ctx(root)
    s.busy = true
    setTrigger(root, true)
    setPanels(root, false)
    setStatus(root, 'Eclipse approaching.')
    root.dataset.phase = 'enter'

    later(s, ENTER_MS, () => {
      root.dataset.phase = 'eclipse'
      setStatus(root, 'Eclipse overlap.')
    })

    later(s, ENTER_MS + ECLIPSE_MS, () => {
      root.dataset.phase = 'dark'
      setPanels(root, true)
      setStatus(root, 'Transitioning to next state.')
    })

    later(s, ENTER_MS + ECLIPSE_MS + DARK_MS, () => {
      root.dataset.phase = 'reveal'
    })

    later(s, ENTER_MS + ECLIPSE_MS + DARK_MS + REVEAL_MS, () => {
      root.dataset.phase = 'done'
      setStatus(root, 'Next state visible.')
      s.busy = false
      setTrigger(root, false)
    })
  }

  function triggerEclipse(root) {
    const s = ctx(root)
    if (s.busy) return

    if (reduced(root)) {
      applyNext(root)
      return
    }

    applyIdle(root)
    void root.offsetWidth
    play(root)
  }

  function bind(root) {
    if (root.dataset.etBound === '1') return
    root.dataset.etBound = '1'
    ctx(root)
    root.querySelector('[data-et-trigger]')?.addEventListener('click', () => {
      triggerEclipse(root)
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-eclipse-transition]').forEach((el) => bind(el))
  }

  window.eclipseTransition = {
    init: initAll,
    trigger: triggerEclipse,
    reset: applyIdle,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
