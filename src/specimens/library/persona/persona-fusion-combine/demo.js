/**
 * Persona Fusion Combine — two cards travel to center and merge into one.
 * iframe-safe; no storage / parent / network.
 */

const TRAVEL_MS = 520
const MERGE_MS = 480

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-pfc]')
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
  const el = document.querySelector('[data-pfc-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-pfc-run], [data-pfc-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResult() {
  setPhase('done')
  const result = document.querySelector('[data-pfc-result]')
  if (result) result.setAttribute('aria-hidden', 'false')
  setLive('Fusion complete. SYNTH persona derived.')
}

function resetVisual() {
  setPhase('idle')
  const result = document.querySelector('[data-pfc-result]')
  if (result) result.setAttribute('aria-hidden', 'true')
  setLive('Select personas to fuse.')
}

export function runPersonaFusionCombine() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResult()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('travel')
  setLive('Cards traveling to synthesis field.')

  return new Promise((resolve) => {
    later(TRAVEL_MS, () => {
      setPhase('merge')
      setLive('Synthesizing.')

      later(MERGE_MS, () => {
        showResult()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetPersonaFusionCombine() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-pfc-run]')?.addEventListener('click', () => {
    void runPersonaFusionCombine()
  })
  document.querySelector('[data-pfc-reset]')?.addEventListener('click', resetPersonaFusionCombine)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetPersonaFusionCombine()
  })
}

bindUi()
resetPersonaFusionCombine()
