/**
 * Wind Slice Transition — Sharp slice planes cut across to reveal the next state.
 * iframe-safe; no storage / parent / network.
 */
const ACTIVE_MS = 480
const SETTLE_MS = 160

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced = document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() { return document.querySelector('[data-wst1]') }

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
  const el = document.querySelector('[data-wst1-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-wst1-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-wst1-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-wst1-run], [data-wst1-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('Sharp slice planes cut across to reveal the next state. Resolved.')
  setLive('Wind Slice Transition. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('Sharp slice planes cut across to reveal the next state.')
  setLive('Wind Slice Transition. Idle.')
}

/** @returns {Promise<void>} */
export function runWindSliceTransition() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return Promise.resolve()
  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth
  if (prefersReducedMotion()) {
    showDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }
  root.setAttribute('data-phase', 'active')
  setStatus('ACTIVE')
  setLive('Wind Slice Transition. Active.')
  return new Promise((resolve) => {
    later(ACTIVE_MS, () => {
      showDone()
      later(SETTLE_MS, () => {
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
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayWindSliceTransition() {
  if (busy) return
  resetWindSliceTransition()
  void rootEl()?.offsetWidth
  await runWindSliceTransition()
}

function bindUi() {
  document.querySelector('[data-wst1-run]')?.addEventListener('click', () => { void runWindSliceTransition() })
  document.querySelector('[data-wst1-replay]')?.addEventListener('click', () => { void replayWindSliceTransition() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayWindSliceTransition()
  })
}

bindUi()
resetWindSliceTransition()
