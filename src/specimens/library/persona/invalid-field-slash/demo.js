/**
 * SPX-145 Invalid Field Slash
 * 40ms delay → 220ms slash + 90ms recoil → error settles. Busy-guarded.
 */
;(function () {
  const DELAY_MS = 40
  const SLASH_MS = 220
  const RECOIL_MS = 90

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

  function inputEl(root) {
    return root.querySelector('[data-ifs-input]')
  }

  function errorEl(root) {
    return root.querySelector('[data-ifs-error]')
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-ifs-status]')
    if (el) el.textContent = text
  }

  function setTrigger(root, disabled) {
    const btn = root.querySelector('[data-ifs-validate]')
    if (btn) btn.disabled = disabled
  }

  function applyIdle(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'idle'
    const input = inputEl(root)
    const err = errorEl(root)
    if (input) input.setAttribute('aria-invalid', 'false')
    if (err) err.hidden = true
    setStatus(root, 'Username ready to validate.')
    setTrigger(root, false)
  }

  function applyError(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'error'
    const input = inputEl(root)
    const err = errorEl(root)
    if (input) input.setAttribute('aria-invalid', 'true')
    if (err) err.hidden = false
    setStatus(root, 'Invalid value.')
    setTrigger(root, false)
  }

  function validate(root) {
    const s = ctx(root)
    if (s.busy) return

    if (reduced(root)) {
      applyError(root)
      return
    }

    applyIdle(root)
    void root.offsetWidth
    s.busy = true
    setTrigger(root, true)
    root.dataset.phase = 'slash'
    setStatus(root, 'Validating.')

    later(s, DELAY_MS, () => {
      root.dataset.phase = 'recoil'
    })
    later(s, DELAY_MS + Math.max(SLASH_MS, RECOIL_MS), () => {
      applyError(root)
    })
  }

  function bind(root) {
    if (root.dataset.ifsBound === '1') return
    root.dataset.ifsBound = '1'
    ctx(root)
    root.querySelector('[data-ifs-validate]')?.addEventListener('click', () => {
      validate(root)
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-invalid-field-slash]').forEach((el) => bind(el))
  }

  window.invalidFieldSlash = {
    init: initAll,
    trigger: validate,
    reset: applyIdle,
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
