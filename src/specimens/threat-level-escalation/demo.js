/**
 * Threat Level Escalation — meter steps through five discrete levels.
 */

const STEP_MS = 200
const SETTLE_MS = 1150

const LABELS = ['LOW', 'GUARDED', 'ELEVATED', 'HIGH', 'CRITICAL']

let busy = false
let settled = false
let currentStep = 1
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-threat-level]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function setStatus(text) {
  const el = root()?.querySelector('[data-tle-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function updateReadout(step) {
  const readout = root()?.querySelector('[data-tle-readout]')
  if (readout) {
    readout.textContent = `Current: LEVEL ${step} — ${LABELS[step - 1]}`
  }
}

function applyStep(el, step) {
  for (let i = 2; i <= 5; i += 1) {
    el.classList.remove(`tle--step-${i}`)
  }
  if (step > 1) el.classList.add(`tle--step-${step}`)
  updateReadout(step)
}

export function runThreatEscalation() {
  const el = root()
  if (!el || busy || settled) return Promise.resolve()

  busy = true
  clearTimers()
  const trigger = el.querySelector('[data-tle-trigger]')
  if (trigger) trigger.disabled = true

  const steps = prefersReducedMotion() ? [5] : [2, 3, 4, 5]

  return new Promise((resolve) => {
    steps.forEach((step, index) => {
      later(index * STEP_MS, () => {
        currentStep = step
        applyStep(el, step)
      })
    })

    const finalDelay = prefersReducedMotion() ? 0 : (steps.length - 1) * STEP_MS
    later(finalDelay, () => {
      setStatus('Threat level critical. Maximum alert state reached.')
    })

    later(prefersReducedMotion() ? 0 : SETTLE_MS, () => {
      settled = true
      busy = false
      resolve()
    })
  })
}

export function resetThreatEscalation() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  clearTimers()
  settled = false
  busy = false
  currentStep = 1

  for (let i = 2; i <= 5; i += 1) {
    el.classList.remove(`tle--step-${i}`)
  }

  const trigger = el.querySelector('[data-tle-trigger]')
  if (trigger) trigger.disabled = false

  updateReadout(1)
  setStatus('')
  void el.offsetWidth
  return Promise.resolve()
}

export async function replayThreatEscalation() {
  if (busy) return
  await resetThreatEscalation()
  await runThreatEscalation()
}

function bindUi() {
  root()?.querySelector('[data-tle-trigger]')?.addEventListener('click', () => {
    void runThreatEscalation()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      void replayThreatEscalation()
    }
  })
}

bindUi()
updateReadout(currentStep)
