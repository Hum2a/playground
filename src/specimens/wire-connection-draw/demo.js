/**
 * Wire Connection Draw — A thin wire line rapidly connects two selected nodes.
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

function rootEl() { return document.querySelector('[data-wcd0]') }

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
  const el = document.querySelector('[data-wcd0-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-wcd0-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-wcd0-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-wcd0-run], [data-wcd0-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A thin wire line rapidly connects two selected nodes. Resolved.')
  setLive('Wire Connection Draw. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A thin wire line rapidly connects two selected nodes.')
  setLive('Wire Connection Draw. Idle.')
}

/** @returns {Promise<void>} */
export function runWireConnectionDraw() {
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
  setLive('Wire Connection Draw. Active.')
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

export function resetWireConnectionDraw() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayWireConnectionDraw() {
  if (busy) return
  resetWireConnectionDraw()
  void rootEl()?.offsetWidth
  await runWireConnectionDraw()
}

function bindUi() {
  document.querySelector('[data-wcd0-run]')?.addEventListener('click', () => { void runWireConnectionDraw() })
  document.querySelector('[data-wcd0-replay]')?.addEventListener('click', () => { void replayWireConnectionDraw() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayWireConnectionDraw()
  })
}

bindUi()
resetWireConnectionDraw()
