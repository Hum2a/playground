/**
 * SPX-152 Submit Blackout
 * Compress → overlay from button centre 420ms → 900ms PROCESSING hold → 360ms reveal.
 */
;(function () {
  const COMPRESS_MS = 90
  const EXPAND_MS = 420
  const HOLD_MS = 900
  const REVEAL_MS = 360

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

  function formEl(root) {
    return root.querySelector('[data-sb-form]')
  }

  function submitEl(root) {
    return root.querySelector('[data-sb-submit]')
  }

  function setStatus(root, text) {
    const el = root.querySelector('[data-sb-status]')
    if (el) el.textContent = text
  }

  function setBusy(root, on) {
    const form = formEl(root)
    const btn = submitEl(root)
    if (form) form.setAttribute('aria-busy', on ? 'true' : 'false')
    if (btn) btn.disabled = !!on
  }

  function setOrigin(root) {
    const form = formEl(root)
    const btn = submitEl(root)
    if (!form || !btn) return
    const fr = form.getBoundingClientRect()
    const br = btn.getBoundingClientRect()
    const x = br.left + br.width / 2 - fr.left
    const y = br.top + br.height / 2 - fr.top
    const radius = Math.ceil(
      Math.hypot(Math.max(x, fr.width - x), Math.max(y, fr.height - y)) + 12,
    )
    form.style.setProperty('--sb-ox', `${x}px`)
    form.style.setProperty('--sb-oy', `${y}px`)
    form.style.setProperty('--sb-or', `${radius}px`)
  }

  function applyIdle(root) {
    const s = ctx(root)
    clearTimers(s)
    s.busy = false
    root.dataset.phase = 'idle'
    setBusy(root, false)
    setStatus(root, 'Form ready to submit.')
  }

  function run(root) {
    const s = ctx(root)
    if (s.busy) return
    s.busy = true
    clearTimers(s)
    setBusy(root, true)
    setOrigin(root)
    setStatus(root, 'Processing.')

    if (reduced(root)) {
      root.dataset.phase = 'processing'
      later(s, HOLD_MS, () => applyIdle(root))
      return
    }

    root.dataset.phase = 'compress'
    later(s, COMPRESS_MS, () => {
      root.dataset.phase = 'expand'
    })
    later(s, COMPRESS_MS + EXPAND_MS, () => {
      root.dataset.phase = 'processing'
    })
    later(s, COMPRESS_MS + EXPAND_MS + HOLD_MS, () => {
      root.dataset.phase = 'reveal'
    })
    later(s, COMPRESS_MS + EXPAND_MS + HOLD_MS + REVEAL_MS, () => {
      applyIdle(root)
    })
  }

  function bind(root) {
    if (root.dataset.sbBound === '1') return
    root.dataset.sbBound = '1'
    ctx(root)
    const form = formEl(root)
    form?.addEventListener('submit', (event) => {
      event.preventDefault()
      run(root)
    })
  }

  function initAll(scope) {
    ;(scope || document).querySelectorAll('[data-submit-blackout]').forEach((el) => bind(el))
  }

  window.submitBlackout = {
    init: initAll,
    trigger: run,
    reset: applyIdle,
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type !== 'restart') return
    document.querySelectorAll('[data-submit-blackout]').forEach((el) => applyIdle(el))
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll())
  } else {
    initAll()
  }
})()
