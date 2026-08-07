/**
 * Deadline Pressure Meter — discrete day/compress steps.
 * iframe-safe; no storage / parent / network.
 */

const STEPS = [
  { days: 14, live: 'Fourteen days until deadline.' },
  { days: 7, live: 'Seven days until deadline.' },
  { days: 3, live: 'Three days until deadline.' },
  { days: 1, live: 'One day until deadline.' },
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
  return document.querySelector('[data-dpm]')
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
  const el = document.querySelector('[data-dpm-live]')
  if (el) el.textContent = text
}

function applyStep(i) {
  const root = rootEl()
  const count = document.querySelector('[data-dpm-count]')
  const step = STEPS[i]
  if (root) root.setAttribute('data-step', String(i))
  if (count) count.textContent = String(step.days).padStart(2, '0')
  setLive(step.live)
}

function setButtons(on) {
  document.querySelectorAll('[data-dpm-run], [data-dpm-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

export function runDeadlinePressure() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  applyStep(0)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applyStep(STEPS.length - 1)
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let i = 0
    const tick = () => {
      i += 1
      if (i >= STEPS.length) {
        busy = false
        setButtons(true)
        resolve()
        return
      }
      applyStep(i)
      later(STEP_MS, tick)
    }
    later(STEP_MS, tick)
  })
}

export function resetDeadlinePressure() {
  clearTimers()
  busy = false
  applyStep(0)
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-dpm-run]')?.addEventListener('click', () => {
    void runDeadlinePressure()
  })
  document.querySelector('[data-dpm-reset]')?.addEventListener('click', resetDeadlinePressure)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetDeadlinePressure()
  })
}

bindUi()
resetDeadlinePressure()
