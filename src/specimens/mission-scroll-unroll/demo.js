/**
 * Mission Scroll Unroll — A rolled mission scroll expands to reveal briefing content.
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

function rootEl() { return document.querySelector('[data-msu1]') }

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
  const el = document.querySelector('[data-msu1-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-msu1-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-msu1-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-msu1-run], [data-msu1-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A rolled mission scroll expands to reveal briefing content. Resolved.')
  setLive('Mission Scroll Unroll. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A rolled mission scroll expands to reveal briefing content.')
  setLive('Mission Scroll Unroll. Idle.')
}

/** @returns {Promise<void>} */
export function runMissionScrollUnroll() {
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
  setLive('Mission Scroll Unroll. Active.')
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

export function resetMissionScrollUnroll() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMissionScrollUnroll() {
  if (busy) return
  resetMissionScrollUnroll()
  void rootEl()?.offsetWidth
  await runMissionScrollUnroll()
}

function bindUi() {
  document.querySelector('[data-msu1-run]')?.addEventListener('click', () => { void runMissionScrollUnroll() })
  document.querySelector('[data-msu1-replay]')?.addEventListener('click', () => { void replayMissionScrollUnroll() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMissionScrollUnroll()
  })
}

bindUi()
resetMissionScrollUnroll()
