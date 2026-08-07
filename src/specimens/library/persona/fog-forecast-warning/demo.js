/**
 * Fog Forecast Warning — finite escalating stages WATCH → ADVISORY → ALERT.
 * iframe-safe; no storage / parent / network.
 */

const STAGE_MS = 700
const STAGES = [
  { id: 'watch', label: 'WATCH', live: 'Fog forecast: watch.' },
  { id: 'advisory', label: 'ADVISORY', live: 'Fog forecast: advisory.' },
  { id: 'alert', label: 'ALERT', live: 'Fog forecast: alert.' },
]

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-ffw]')
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
  const el = document.querySelector('[data-ffw-live]')
  if (el) el.textContent = text
}

function setStageLabel(label) {
  const el = document.querySelector('[data-ffw-stage-label]')
  if (el) el.textContent = label
}

function setButtons(on) {
  document.querySelectorAll('[data-ffw-run], [data-ffw-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function applyStage(stage) {
  const root = rootEl()
  if (root) root.setAttribute('data-stage', stage.id)
  setStageLabel(stage.label)
  setLive(stage.live)
}

function resetVisual() {
  const root = rootEl()
  if (root) root.setAttribute('data-stage', 'idle')
  setStageLabel('WATCH')
  setLive('Fog forecast idle.')
}

export function runFogForecast() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applyStage(STAGES[2])
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-stage', 'run')
  applyStage(STAGES[0])

  return new Promise((resolve) => {
    later(STAGE_MS, () => {
      applyStage(STAGES[1])
      later(STAGE_MS, () => {
        applyStage(STAGES[2])
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetFogForecast() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-ffw-run]')?.addEventListener('click', () => {
    void runFogForecast()
  })
  document.querySelector('[data-ffw-reset]')?.addEventListener('click', resetFogForecast)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetFogForecast()
  })
}

bindUi()
resetFogForecast()
