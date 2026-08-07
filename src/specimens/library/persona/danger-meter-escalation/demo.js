/**
 * Danger Meter Escalation — discrete CLEAR→CAUTION→WARNING→CRITICAL.
 * iframe-safe; no storage / parent / network.
 */

const LEVELS = [
  { id: 0, label: 'CLEAR', live: 'Danger level clear.' },
  { id: 1, label: 'CAUTION', live: 'Danger level caution.' },
  { id: 2, label: 'WARNING', live: 'Danger level warning.' },
  { id: 3, label: 'CRITICAL', live: 'Danger level critical.' },
]
const STEP_MS = 500

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-dme]')
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
  const el = document.querySelector('[data-dme-live]')
  if (el) el.textContent = text
}

function applyLevel(i) {
  const root = rootEl()
  const label = document.querySelector('[data-dme-level-label]')
  const level = LEVELS[i]
  if (root) root.setAttribute('data-level', String(level.id))
  if (label) label.textContent = level.label
  setLive(level.live)
}

function setButtons(on) {
  document.querySelectorAll('[data-dme-run], [data-dme-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

export function runDangerMeter() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  applyLevel(0)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applyLevel(LEVELS.length - 1)
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let i = 0
    const tick = () => {
      i += 1
      if (i >= LEVELS.length) {
        busy = false
        setButtons(true)
        resolve()
        return
      }
      applyLevel(i)
      later(STEP_MS, tick)
    }
    later(STEP_MS, tick)
  })
}

export function resetDangerMeter() {
  clearTimers()
  busy = false
  applyLevel(0)
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-dme-run]')?.addEventListener('click', () => {
    void runDangerMeter()
  })
  document.querySelector('[data-dme-reset]')?.addEventListener('click', resetDangerMeter)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetDangerMeter()
  })
}

bindUi()
resetDangerMeter()
