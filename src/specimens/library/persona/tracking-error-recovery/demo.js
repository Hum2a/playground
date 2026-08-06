/**
 * Tracking Error Recovery — horizontal tearing until calibration fixes feed.
 * iframe-safe; no storage / parent / network.
 */

const RECOVER_MS = 520

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-ter]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setLive(text) {
  const el = document.querySelector('[data-ter-live]')
  if (el) el.textContent = text
}

function setButton(on) {
  const btn = document.querySelector('[data-ter-calibrate]')
  if (btn) btn.disabled = !on
}

export function resetTrackingErrorRecovery() {
  clearTimers()
  busy = false
  rootEl()?.setAttribute('data-phase', 'error')
  setLive('Tracking error active. Calibrate to recover.')
  setButton(true)
}

export function runTrackingErrorRecovery() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'stable') return

  busy = true
  clearTimers()
  setButton(false)

  if (prefersReducedMotion()) {
    root.setAttribute('data-phase', 'stable')
    setLive('Tracking recovered.')
    busy = false
    setButton(true)
    return
  }

  root.setAttribute('data-phase', 'recover')
  setLive('Calibrating tracking.')

  later(RECOVER_MS, () => {
    root.setAttribute('data-phase', 'stable')
    setLive('Tracking recovered.')
    busy = false
    setButton(true)
  })
}

function bindUi() {
  document.querySelector('[data-ter-calibrate]')?.addEventListener('click', () => {
    runTrackingErrorRecovery()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetTrackingErrorRecovery()
  })
}

bindUi()
resetTrackingErrorRecovery()
