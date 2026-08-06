/**
 * Surface Break Reveal — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Submerged → ascent → waterline cross → clarity.
 */

const ASCENT_MS = 620
/** Heading crosses waterline ~halfway through the 70px rise. */
const CROSS_MS = 340
const REACT_MS = 160
const EXIT_MS = 220
const TOTAL_MS = ASCENT_MS + EXIT_MS

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
  return document.querySelector('[data-surface-break]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-sbr-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setBusyUi(root, isBusy) {
  const btn = root.querySelector('[data-sbr-surface]')
  if (btn) btn.disabled = isBusy || complete
}

function applyReducedComplete(root) {
  clearTimers()
  busy = false
  complete = true
  root.classList.add('sbr--reduced')
  root.setAttribute('data-state', 'complete')
  root.setAttribute('data-recovered', 'true')
  setStatus(root, 'Record 045 recovered.')
  setBusyUi(root, false)
}

/**
 * Rise through the waterline and recover the record.
 * @returns {Promise<void>}
 */
export function surfaceBreakReveal() {
  const root = rootEl()
  if (!root || busy || complete) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('sbr--reduced')
  root.removeAttribute('data-recovered')
  setBusyUi(root, true)
  setStatus(root, 'Unknown record submerged.')

  if (prefersReducedMotion()) {
    applyReducedComplete(root)
    return Promise.resolve()
  }

  root.setAttribute('data-state', 'ascending')
  void root.offsetWidth

  return new Promise((resolve) => {
    later(CROSS_MS, () => {
      root.setAttribute('data-state', 'reacting')
      root.setAttribute('data-recovered', 'true')
      setStatus(root, 'Record 045 recovered.')
    })

    later(ASCENT_MS, () => {
      root.setAttribute('data-state', 'exiting')
    })

    later(TOTAL_MS, () => {
      root.setAttribute('data-state', 'complete')
      complete = true
      busy = false
      setBusyUi(root, false)
      resolve()
    })
  })
}

/**
 * Restore submerged idle composition.
 * @returns {Promise<void>}
 */
export function resetSurfaceBreak() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  complete = false
  root.classList.remove('sbr--reduced')
  root.removeAttribute('data-recovered')
  root.removeAttribute('style')
  root.setAttribute('data-state', 'idle')
  void root.offsetWidth
  setStatus(root, 'Unknown record submerged.')
  setBusyUi(root, false)
  return Promise.resolve()
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-sbr-surface]')?.addEventListener('click', () => {
    void surfaceBreakReveal()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void resetSurfaceBreak()
    }
  })
}

bind()
