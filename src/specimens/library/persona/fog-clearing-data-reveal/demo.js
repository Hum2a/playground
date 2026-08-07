/**
 * Fog-Clearing Data Reveal — staged fog clear via keyframes.
 * iframe-safe; no storage / parent / network.
 */

const CLEAR_MS = 1400

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-fcdr]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-fcdr-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-fcdr-run], [data-fcdr-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showClear() {
  setPhase('done')
  setLive('Data fully readable.')
}

function resetVisual() {
  setPhase('idle')
  setLive('Data obscured by fog.')
}

export function runFogClearing() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showClear()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('clearing')
  setLive('Clearing fog.')

  return new Promise((resolve) => {
    later(CLEAR_MS, () => {
      showClear()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetFogClearing() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-fcdr-run]')?.addEventListener('click', () => {
    void runFogClearing()
  })
  document.querySelector('[data-fcdr-reset]')?.addEventListener('click', resetFogClearing)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetFogClearing()
  })
}

bindUi()
resetFogClearing()
