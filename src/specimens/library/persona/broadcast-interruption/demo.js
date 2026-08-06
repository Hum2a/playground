/**
 * Broadcast Interruption — normal content replaced by urgent transmission.
 * iframe-safe; no storage / parent / network.
 */

const INTERRUPT_MS = 620

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-bi]')
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
  const el = document.querySelector('[data-bi-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  const btn = document.querySelector('[data-bi-trigger]')
  if (btn) btn.disabled = !on
}

function showUrgent() {
  const normal = document.querySelector('[data-bi-normal]')
  const urgent = document.querySelector('[data-bi-urgent]')
  if (normal) normal.hidden = true
  if (urgent) urgent.hidden = false
}

function resetVisual() {
  const normal = document.querySelector('[data-bi-normal]')
  const urgent = document.querySelector('[data-bi-urgent]')
  if (normal) normal.hidden = false
  if (urgent) urgent.hidden = true
  setLive('Regular programming active.')
}

export function resetBroadcastInterruption() {
  clearTimers()
  busy = false
  resetVisual()
  rootEl()?.setAttribute('data-phase', 'idle')
  setButtons(true)
}

export function runBroadcastInterruption() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  root.setAttribute('data-phase', 'idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showUrgent()
    root.setAttribute('data-phase', 'done')
    setLive('Urgent transmission active.')
    busy = false
    setButtons(true)
    return
  }

  root.setAttribute('data-phase', 'interrupt')
  setLive('Broadcast interrupted.')

  later(INTERRUPT_MS, () => {
    showUrgent()
    root.setAttribute('data-phase', 'done')
    setLive('Urgent transmission active.')
    busy = false
    setButtons(true)
  })
}

function bindUi() {
  document.querySelector('[data-bi-trigger]')?.addEventListener('click', () => {
    runBroadcastInterruption()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetBroadcastInterruption()
  })
}

bindUi()
resetBroadcastInterruption()
