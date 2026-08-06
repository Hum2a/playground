/**
 * Smoke Mask Transition — overlapping circles cover a content swap, then disperse.
 * iframe-safe; no storage / parent / network.
 */

const TOTAL_MS = 700
const COVER_AT_MS = 300
const SETTLE_MS = 140

let busy = false
/** @type {'a' | 'b'} */
let surface = 'a'
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-smt]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setLive(text) {
  const el = document.querySelector('[data-smt-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-smt-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-smt-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-smt-run], [data-smt-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

/** @param {'a' | 'b'} next */
function showSurface(next) {
  surface = next
  const root = rootEl()
  root?.setAttribute('data-surface', next)
  document.querySelectorAll('[data-smt-panel]').forEach((el) => {
    el.toggleAttribute('hidden', el.getAttribute('data-smt-panel') !== next)
  })
  setStatus(next === 'a' ? 'STATE 01' : 'STATE 02')
  setLive(next === 'a' ? 'State one in view.' : 'State two concealed and revealed.')
}

/**
 * Run one cover → swap → disperse cycle, alternating states.
 * @returns {Promise<void>}
 */
export function runSmokeMaskTransition() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  const next = surface === 'a' ? 'b' : 'a'

  if (prefersReducedMotion()) {
    showSurface(next)
    setHint('Press Run to swap under cover.')
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'idle')
  void root.offsetWidth
  root.setAttribute('data-phase', 'run')
  setHint('Covering.')
  setLive('Smoke covering the stage.')

  return new Promise((resolve) => {
    later(COVER_AT_MS, () => {
      showSurface(next)
      setHint('Dispersing.')
    })
    later(TOTAL_MS, () => {
      later(SETTLE_MS, () => {
        root.setAttribute('data-phase', 'idle')
        setHint('Press Run to swap under cover.')
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetSmokeMaskTransition() {
  clearTimers()
  busy = false
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  showSurface('a')
  setHint('Press Run to swap under cover.')
  setButtons(true)
  void root?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replaySmokeMaskTransition() {
  if (busy) return
  await runSmokeMaskTransition()
}

function bindUi() {
  document.querySelector('[data-smt-run]')?.addEventListener('click', () => {
    void runSmokeMaskTransition()
  })
  document.querySelector('[data-smt-replay]')?.addEventListener('click', () => {
    resetSmokeMaskTransition()
    void rootEl()?.offsetWidth
    void runSmokeMaskTransition()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      resetSmokeMaskTransition()
      void rootEl()?.offsetWidth
      void runSmokeMaskTransition()
    }
  })
}

bindUi()
resetSmokeMaskTransition()
