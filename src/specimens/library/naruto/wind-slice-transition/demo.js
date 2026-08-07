/**
 * Wind Slice Transition — staggered diagonal blades sweep across, exchanging content mid-sweep.
 * iframe-safe; no storage / parent / network.
 */

const TOTAL_MS = 600
const SWAP_AT_MS = 420
const SETTLE_MS = 150

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
  return document.querySelector('[data-wst]')
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
  const el = document.querySelector('[data-wst-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-wst-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-wst-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-wst-run], [data-wst-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

/** @param {'a' | 'b'} next */
function showSurface(next) {
  surface = next
  const root = rootEl()
  root?.setAttribute('data-surface', next)
  document.querySelectorAll('[data-wst-panel]').forEach((el) => {
    el.toggleAttribute('hidden', el.getAttribute('data-wst-panel') !== next)
  })
  setStatus(next === 'a' ? 'STATE 01' : 'STATE 02')
  setLive(next === 'a' ? 'State one in view.' : 'State two in view.')
}

/**
 * Run one staggered blade sweep, alternating states.
 * @returns {Promise<void>}
 */
export function runWindSliceTransition() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  const next = surface === 'a' ? 'b' : 'a'

  if (prefersReducedMotion()) {
    showSurface(next)
    setHint('Press Run to slice to the next state.')
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'idle')
  void root.offsetWidth
  root.setAttribute('data-phase', 'run')
  setHint('Slicing.')
  setLive('Wind blades slicing across the stage.')

  return new Promise((resolve) => {
    later(SWAP_AT_MS, () => {
      showSurface(next)
    })
    later(TOTAL_MS, () => {
      later(SETTLE_MS, () => {
        root.setAttribute('data-phase', 'idle')
        setHint('Press Run to slice to the next state.')
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetWindSliceTransition() {
  clearTimers()
  busy = false
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  showSurface('a')
  setHint('Press Run to slice to the next state.')
  setButtons(true)
  void root?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayWindSliceTransition() {
  if (busy) return
  resetWindSliceTransition()
  void rootEl()?.offsetWidth
  await runWindSliceTransition()
}

function bindUi() {
  document.querySelector('[data-wst-run]')?.addEventListener('click', () => {
    void runWindSliceTransition()
  })
  document.querySelector('[data-wst-replay]')?.addEventListener('click', () => {
    void replayWindSliceTransition()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayWindSliceTransition()
  })
}

bindUi()
resetWindSliceTransition()
requestAnimationFrame(() => {
  void runWindSliceTransition()
})
