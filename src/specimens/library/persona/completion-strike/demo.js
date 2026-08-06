/**
 * Completion Strike — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const PHASES = [
  'is-compressing',
  'is-red-strike',
  'is-ink-strike',
  'is-contracting',
  'is-marking',
  'is-badging',
  'is-complete',
]

const T = {
  compress: 0,
  red: 100,
  ink: 220,
  contract: 300,
  mark: 420,
  badge: 560,
  done: 720,
}

let busy = false
let complete = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-completion-strike]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(text) {
  const el = document.querySelector('[data-cs-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function setTriggers({ go, undo }) {
  const root = rootEl()
  if (!root) return
  const goBtn = root.querySelector('[data-cs-complete]')
  const undoBtn = root.querySelector('[data-cs-undo]')
  if (goBtn) {
    goBtn.disabled = !go
    goBtn.hidden = !go
  }
  if (undoBtn) {
    undoBtn.disabled = !undo
    undoBtn.hidden = !undo
  }
}

function setChecked(checked) {
  const row = document.querySelector('[data-cs-row]')
  const badge = document.querySelector('[data-cs-badge]')
  if (row) row.setAttribute('aria-checked', checked ? 'true' : 'false')
  if (badge) badge.setAttribute('aria-hidden', checked ? 'false' : 'true')
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function applySettled(root) {
  clearPhases(root)
  root.classList.add('is-complete')
  root.setAttribute('data-state', 'complete')
  complete = true
  busy = false
  setChecked(true)
  setTriggers({ go: false, undo: true })
  setStatus('Build Preview completed.')
}

/**
 * Run completion strike sequence.
 * @returns {Promise<void>}
 */
export function runCompletionStrike() {
  const root = rootEl()
  if (!root || busy || complete) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.setAttribute('data-state', 'running')
  setTriggers({ go: false, undo: false })
  setStatus('')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applySettled(root)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    root.classList.add('is-compressing')

    later(T.red, () => root.classList.add('is-red-strike'))
    later(T.ink, () => root.classList.add('is-ink-strike'))
    later(T.contract, () => root.classList.add('is-contracting'))
    later(T.mark, () => root.classList.add('is-marking'))
    later(T.badge, () => root.classList.add('is-badging'))
    later(T.done, () => {
      applySettled(root)
      resolve()
    })
  })
}

/**
 * Instant undo — restores idle task row without theatrical un-complete.
 */
export function resetCompletionStrike() {
  const root = rootEl()
  if (!root) return
  clearTimers()
  busy = false
  complete = false
  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  setChecked(false)
  setTriggers({ go: true, undo: false })
  setStatus('')
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-cs-complete]')?.addEventListener('click', () => {
    void runCompletionStrike()
  })
  root.querySelector('[data-cs-undo]')?.addEventListener('click', () => {
    resetCompletionStrike()
  })

  const row = root.querySelector('[data-cs-row]')
  row?.addEventListener('keydown', (event) => {
    if (event.key !== ' ' && event.key !== 'Enter') return
    event.preventDefault()
    if (complete) resetCompletionStrike()
    else void runCompletionStrike()
  })
  if (row && !row.hasAttribute('tabindex')) {
    row.setAttribute('tabindex', '0')
  }

  setTriggers({ go: true, undo: false })
  setChecked(false)
}

bind()
