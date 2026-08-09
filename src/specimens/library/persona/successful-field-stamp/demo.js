/**
 * SPX-146 Successful Field Stamp
 * Reset → 280ms land + 220ms overshoot → 120ms settle. Busy-guarded. No extra nodes.
 */
;(function () {
  const ENTRY_MS = 280
  const OVERSHOOT_AT_MS = 220
  const SETTLE_MS = 120
  const TOTAL_MS = Math.max(ENTRY_MS, OVERSHOOT_AT_MS + SETTLE_MS)

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
    const el = root.querySelector('[data-sfs-status]')
    if (el) el.textContent = text
  }

  function setTrigger(root, disabled) {
    const btn = root.querySelector('[data-sfs-validate]')
    if (btn) btn.disabled = disabled
  }

  function applyIdle(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'idle'
    const input = root.querySelector('[data-sfs-input]')
    if (input) input.setAttribute('aria-invalid', 'false')
    setStatus(root, 'Email ready to validate.')
    setTrigger(root, false)
  }

  function applySuccess(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'success'
    const input = root.querySelector('[data-sfs-input]')
    if (input) input.setAttribute('aria-invalid', 'false')
    setStatus(root, 'Email valid.')
    setTrigger(root, false)
  }

  function validate(root) {
    const s = ctx(root)
    if (s.busy) return

    if (reduced(root)) {
      applySuccess(root)
      return
    }

    applyIdle(root)
    void root.offsetWidth
    s.busy = true
    setTrigger(root, true)
    root.dataset.phase = 'enter'
    setStatus(root, 'Validating.')

    later(s, TOTAL_MS, () => {
      applySuccess(root)
    })
  }

  function bind(root) {
    if (root.dataset.sfsBound === '1') return
    root.dataset.sfsBound = '1'
    ctx(root)
    root.querySelector('[data-sfs-validate]')?.addEventListener('click', () => {
      validate(root)
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-successful-field-stamp]').forEach((el) => bind(el))
  }

  window.successfulFieldStamp = {
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
