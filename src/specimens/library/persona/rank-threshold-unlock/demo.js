/**
 * Rank Threshold Unlock — progress crosses 80% threshold; unlock flash.
 * iframe-safe; no storage / parent / network.
 */

const FILL_MS = 600
const FLASH_MS = 360
const START_PCT = 72
const END_PCT = 100
const THRESHOLD_PCT = 80

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-rtu]')
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
  const el = document.querySelector('[data-rtu-live]')
  if (el) el.textContent = text
}

function setPct(pct) {
  const el = document.querySelector('[data-rtu-pct]')
  if (el) el.textContent = `${pct}%`
}

function setButtons(on) {
  document.querySelectorAll('[data-rtu-run], [data-rtu-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  setPhase('done')
  setPct(END_PCT)
  setLive('Assist Follow-Up unlocked.')
}

function resetVisual() {
  setPhase('idle')
  setPct(START_PCT)
  setLive('Rank progress idle.')
}

export function runRankThresholdUnlock() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

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

  setPhase('fill')
  setLive(`Advancing past ${THRESHOLD_PCT}% threshold.`)
  setPct(END_PCT)

  return new Promise((resolve) => {
    later(FILL_MS, () => {
      setPhase('flash')
      setLive('Assist Follow-Up unlocked.')

      later(FLASH_MS, () => {
        showDone()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetRankThresholdUnlock() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-rtu-run]')?.addEventListener('click', () => {
    void runRankThresholdUnlock()
  })
  document.querySelector('[data-rtu-reset]')?.addEventListener('click', resetRankThresholdUnlock)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetRankThresholdUnlock()
  })
}

bindUi()
resetRankThresholdUnlock()
