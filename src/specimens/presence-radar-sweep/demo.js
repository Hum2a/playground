/**
 * Presence Radar Sweep — A radar sweep detects presence blips on a field.
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

function rootEl() { return document.querySelector('[data-prs0]') }

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
  const el = document.querySelector('[data-prs0-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-prs0-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-prs0-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-prs0-run], [data-prs0-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A radar sweep detects presence blips on a field. Resolved.')
  setLive('Presence Radar Sweep. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A radar sweep detects presence blips on a field.')
  setLive('Presence Radar Sweep. Idle.')
}

/** @returns {Promise<void>} */
export function runPresenceRadarSweep() {
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
  setLive('Presence Radar Sweep. Active.')
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

export function resetPresenceRadarSweep() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayPresenceRadarSweep() {
  if (busy) return
  resetPresenceRadarSweep()
  void rootEl()?.offsetWidth
  await runPresenceRadarSweep()
}

function bindUi() {
  document.querySelector('[data-prs0-run]')?.addEventListener('click', () => { void runPresenceRadarSweep() })
  document.querySelector('[data-prs0-replay]')?.addEventListener('click', () => { void replayPresenceRadarSweep() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayPresenceRadarSweep()
  })
}

bindUi()
resetPresenceRadarSweep()
