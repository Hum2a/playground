/**
 * SPX-151 Password Reveal Cutout
 * Reveal 520ms peel; hide 360ms slam from the right. Type swap is the truth.
 */
;(function () {
  const REVEAL_MS = 520
  const HIDE_MS = 360

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
    return root.querySelector('[data-prc-input]')
  }

  function btnEl(root) {
    return root.querySelector('[data-prc-toggle]')
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-prc-status]')
    if (el) el.textContent = text
  }

  function applyHidden(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'hidden'
    const input = inputEl(root)
    const btn = btnEl(root)
    if (input) input.type = 'password'
    if (btn) {
      btn.setAttribute('aria-pressed', 'false')
      btn.textContent = 'REVEAL'
    }
    setStatus(root, 'Password hidden.')
  }

  function applyShown(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'shown'
    const input = inputEl(root)
    const btn = btnEl(root)
    if (input) input.type = 'text'
    if (btn) {
      btn.setAttribute('aria-pressed', 'true')
      btn.textContent = 'HIDE'
    }
    setStatus(root, 'Password visible.')
  }

  function reveal(root) {
    const s = ctx(root)
    if (s.busy) return
    const input = inputEl(root)
    const btn = btnEl(root)
    if (input) input.type = 'text'
    if (btn) {
      btn.setAttribute('aria-pressed', 'true')
      btn.textContent = 'HIDE'
    }
    setStatus(root, 'Password visible.')

    if (reduced(root)) {
      applyShown(root)
      return
    }

    s.busy = true
    root.dataset.phase = 'hidden'
    void root.offsetWidth
    root.dataset.phase = 'reveal'
    later(s, REVEAL_MS, () => applyShown(root))
  }

  function hide(root) {
    const s = ctx(root)
    if (s.busy) return
    const btn = btnEl(root)
    if (btn) {
      btn.setAttribute('aria-pressed', 'false')
      btn.textContent = 'REVEAL'
    }

    if (reduced(root)) {
      applyHidden(root)
      return
    }

    s.busy = true
    root.dataset.phase = 'shown'
    void root.offsetWidth
    root.dataset.phase = 'hide'
    setStatus(root, 'Password hidden.')
    later(s, HIDE_MS, () => applyHidden(root))
  }

  function toggle(root) {
    const input = inputEl(root)
    if (!input) return
    if (input.type === 'text' || root.dataset.phase === 'shown' || root.dataset.phase === 'reveal') {
      hide(root)
    } else {
      reveal(root)
    }
  }

  function bind(root) {
    if (root.dataset.prcBound === '1') return
    root.dataset.prcBound = '1'
    ctx(root)
    root.querySelector('[data-prc-toggle]')?.addEventListener('click', () => {
      toggle(root)
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-password-reveal-cutout]').forEach((el) => bind(el))
  }

  window.passwordRevealCutout = {
    init: initAll,
    reveal,
    hide,
    toggle,
    reset: applyHidden,
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type !== 'restart') return
    document.querySelectorAll('[data-password-reveal-cutout]').forEach((el) => applyHidden(el))
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
