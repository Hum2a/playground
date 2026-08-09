/**
 * SPX-153 Error Headline Intrusion
 * 420ms ERROR slide + −3px form recoil → semantic errors settle. Busy-guarded.
 */
;(function () {
  const ENTRY_MS = 420

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
    const el = root.querySelector('[data-ehi-status]')
    if (!el) return
    el.textContent = ''
    void el.offsetWidth
    el.textContent = text
  }

  function setInvalid(root, on) {
    root.querySelectorAll('input, textarea').forEach((el) => {
      el.setAttribute('aria-invalid', on ? 'true' : 'false')
    })
    root.querySelectorAll('[data-ehi-err]').forEach((el) => {
      el.hidden = !on
    })
  }

  function applyIdle(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'idle'
    setInvalid(root, false)
    setStatus(root, 'Contact form ready.')
  }

  function applyError(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'error'
    setInvalid(root, true)
    setStatus(root, 'Contact form has errors.')
  }

  function trigger(root) {
    const s = ctx(root)
    if (s.busy) return

    if (reduced(root)) {
      applyError(root)
      return
    }

    applyIdle(root)
    void root.offsetWidth
    s.busy = true
    setInvalid(root, true)
    root.dataset.phase = 'enter'
    setStatus(root, 'Validating contact form.')

    later(s, ENTRY_MS, () => {
      applyError(root)
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
    if (root.dataset.ehiBound === '1') return
    root.dataset.ehiBound = '1'
    ctx(root)
    root.querySelector('[data-ehi-trigger]')?.addEventListener('click', () => {
      replay(root)
    })
    root.querySelector('[data-ehi-form]')?.addEventListener('submit', (event) => {
      event.preventDefault()
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-error-headline-intrusion]').forEach((el) => {
      bind(el)
      trigger(el)
    })
  }

  window.errorHeadlineIntrusion = {
    init: initAll,
    trigger,
    reset: applyIdle,
    replay,
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object' || data.type !== 'restart') return
    document.querySelectorAll('[data-error-headline-intrusion]').forEach((el) => replay(el))
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
