/**
 * SPX-460 Crescent Wipe
 * 520px crescent · left -420px → calc(100% + 420px) · 900ms. Busy-guarded, no loop.
 */
;(function () {
  const WIPE_MS = 900

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
    const el = root.querySelector('[data-cw-status]')
    if (el) el.textContent = text
  }

  function setTrigger(root, disabled) {
    const btn = root.querySelector('[data-cw-trigger]')
    if (btn) btn.disabled = disabled
  }

  function setPages(root, showB) {
    const pageA = root.querySelector('[data-cw-page="a"]')
    const pageB = root.querySelector('[data-cw-page="b"]')
    if (pageA) pageA.setAttribute('aria-hidden', showB ? 'true' : 'false')
    if (pageB) pageB.setAttribute('aria-hidden', showB ? 'false' : 'true')
  }

  function applyIdle(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'idle'
    setPages(root, false)
    setStatus(root, 'Page A visible.')
    setTrigger(root, false)
  }

  function applyB(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'done'
    setPages(root, true)
    setStatus(root, 'Page B visible.')
    setTrigger(root, false)
  }

  function play(root) {
    const s = ctx(root)
    s.busy = true
    setTrigger(root, true)
    setPages(root, false)
    setStatus(root, 'Wiping to page B.')
    root.dataset.phase = 'run'

    later(s, WIPE_MS, () => {
      root.dataset.phase = 'done'
      setPages(root, true)
      setStatus(root, 'Page B visible.')
      s.busy = false
      setTrigger(root, false)
    })
  }

  function triggerWipe(root) {
    const s = ctx(root)
    if (s.busy) return

    if (reduced(root)) {
      applyB(root)
      return
    }

    applyIdle(root)
    void root.offsetWidth
    play(root)
  }

  function bind(root) {
    if (root.dataset.cwBound === '1') return
    root.dataset.cwBound = '1'
    ctx(root)
    root.querySelector('[data-cw-trigger]')?.addEventListener('click', () => {
      triggerWipe(root)
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-crescent-wipe]').forEach((el) => bind(el))
  }

  window.crescentWipe = {
    init: initAll,
    trigger: triggerWipe,
    reset: applyIdle,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
