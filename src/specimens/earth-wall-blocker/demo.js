/**
 * Earth Wall Blocker — A wall rises to block and protect a region.
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

function rootEl() { return document.querySelector('[data-ewb8]') }

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
  const el = document.querySelector('[data-ewb8-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ewb8-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-ewb8-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ewb8-run], [data-ewb8-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A wall rises to block and protect a region. Resolved.')
  setLive('Earth Wall Blocker. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A wall rises to block and protect a region.')
  setLive('Earth Wall Blocker. Idle.')
}

/** @returns {Promise<void>} */
export function runEarthWallBlocker() {
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
  setLive('Earth Wall Blocker. Active.')
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

export function resetEarthWallBlocker() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayEarthWallBlocker() {
  if (busy) return
  resetEarthWallBlocker()
  void rootEl()?.offsetWidth
  await runEarthWallBlocker()
}

function bindUi() {
  document.querySelector('[data-ewb8-run]')?.addEventListener('click', () => { void runEarthWallBlocker() })
  document.querySelector('[data-ewb8-replay]')?.addEventListener('click', () => { void replayEarthWallBlocker() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayEarthWallBlocker()
  })
}

bindUi()
resetEarthWallBlocker()
