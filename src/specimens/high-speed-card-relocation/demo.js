/**
 * High-Speed Card Relocation — A card leaves an afterimage and arrives in another slot.
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

function rootEl() { return document.querySelector('[data-hscr6]') }

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
  const el = document.querySelector('[data-hscr6-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-hscr6-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-hscr6-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-hscr6-run], [data-hscr6-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A card leaves an afterimage and arrives in another slot. Resolved.')
  setLive('High-Speed Card Relocation. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A card leaves an afterimage and arrives in another slot.')
  setLive('High-Speed Card Relocation. Idle.')
}

/** @returns {Promise<void>} */
export function runHighSpeedCardRelocation() {
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
  setLive('High-Speed Card Relocation. Active.')
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

export function resetHighSpeedCardRelocation() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayHighSpeedCardRelocation() {
  if (busy) return
  resetHighSpeedCardRelocation()
  void rootEl()?.offsetWidth
  await runHighSpeedCardRelocation()
}

function bindUi() {
  document.querySelector('[data-hscr6-run]')?.addEventListener('click', () => { void runHighSpeedCardRelocation() })
  document.querySelector('[data-hscr6-replay]')?.addEventListener('click', () => { void replayHighSpeedCardRelocation() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayHighSpeedCardRelocation()
  })
}

bindUi()
resetHighSpeedCardRelocation()
