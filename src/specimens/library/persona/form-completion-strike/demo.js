/**
 * SPX-154 Form Completion Strike
 * Valid submit → border flash + 180ms slash + delayed 220ms COMPLETE badge. Busy-guarded.
 */
;(function () {
  const TOTAL_MS = 260

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

  function fields(root) {
    return {
      name: root.querySelector('[data-fcs-name]'),
      email: root.querySelector('[data-fcs-email]'),
      message: root.querySelector('[data-fcs-message]'),
    }
  }

  function isValid(root) {
    const { name, email, message } = fields(root)
    if (!name || !email || !message) return false
    const named = name.value.trim().length > 0
    const mailed = email.value.trim().length > 0 && email.checkValidity()
    const messaged = message.value.trim().length > 0
    return named && mailed && messaged
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-fcs-status]')
    if (!el) return
    el.textContent = ''
    void el.offsetWidth
    el.textContent = text
  }

  function syncControls(root) {
    const completeBtn = root.querySelector('[data-fcs-complete]')
    const replayBtn = root.querySelector('[data-fcs-replay]')
    const hint = root.querySelector('[data-fcs-hint]')
    const done = root.dataset.phase === 'done'
    const playing = root.dataset.phase === 'play'
    const valid = isValid(root)
    if (completeBtn) completeBtn.disabled = done || playing || !valid || ctx(root).busy
    if (replayBtn) replayBtn.hidden = !done
    if (hint) hint.hidden = valid || done || playing
  }

  function applyIdle(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'idle'
    const { name, email, message } = fields(root)
    if (name) name.value = 'Ada Lane'
    if (email) email.value = 'ada@archive.test'
    if (message) message.value = ''
    syncControls(root)
    setStatus(root, 'Form incomplete.')
  }

  function applyDone(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'done'
    syncControls(root)
    setStatus(root, 'Form complete.')
  }

  function complete(root) {
    const s = ctx(root)
    if (s.busy) return
    if (root.dataset.phase === 'done' || root.dataset.phase === 'play') return
    if (!isValid(root)) {
      syncControls(root)
      return
    }

    if (reduced(root)) {
      applyDone(root)
      return
    }

    s.busy = true
    root.dataset.phase = 'play'
    syncControls(root)
    setStatus(root, 'Completing form.')

    later(s, TOTAL_MS, () => {
      applyDone(root)
    })
  }

  function replay(root) {
    const s = ctx(root)
    if (s.busy) return
    applyIdle(root)
  }

  function bind(root) {
    if (root.dataset.fcsBound === '1') return
    root.dataset.fcsBound = '1'
    ctx(root)
    root.querySelector('[data-fcs-complete]')?.addEventListener('click', () => {
      complete(root)
    })
    root.querySelector('[data-fcs-replay]')?.addEventListener('click', () => {
      replay(root)
    })
    root.querySelector('[data-fcs-form]')?.addEventListener('submit', (event) => {
      event.preventDefault()
      complete(root)
    })
    root.querySelector('[data-fcs-form]')?.addEventListener('input', () => {
      if (root.dataset.phase === 'idle') syncControls(root)
    })
    syncControls(root)
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-form-completion-strike]').forEach((el) => bind(el))
  }

  window.formCompletionStrike = {
    init: initAll,
    complete,
    reset: applyIdle,
    replay,
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object' || data.type !== 'restart') return
    document.querySelectorAll('[data-form-completion-strike]').forEach((el) => replay(el))
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
