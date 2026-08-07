/**
 * Power Threshold Break — meter at 92% breaks through 100% cap to BREAKTHROUGH.
 */

const SURGE_MS = 500
const SETTLE_MS = 300

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-ptb]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-ptb-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ptb-run], [data-ptb-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setFill(pct) {
  const fill = document.querySelector('[data-ptb-fill]')
  if (fill) fill.style.setProperty('--ptb-pct', `${pct}%`)
}

function setStatus(text) {
  const el = document.querySelector('[data-ptb-status]')
  if (el) el.textContent = text
}

function showBreakthrough() {
  setFill(108)
  setStatus('BREAKTHROUGH')
  const stamp = document.querySelector('[data-ptb-breakthrough]')
  if (stamp) stamp.removeAttribute('hidden')
  setLive('Threshold broken.')
}

function resetVisual() {
  setFill(92)
  setStatus('CHARGING')
  const stamp = document.querySelector('[data-ptb-breakthrough]')
  if (stamp) stamp.setAttribute('hidden', '')
  setLive('Output below threshold.')
}

/** @returns {Promise<void>} */
export function runPowerThresholdBreak() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    showBreakthrough()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('surge')
  setLive('Surging past cap.')

  return new Promise((resolve) => {
    later(SURGE_MS, () => {
      showBreakthrough()
      setPhase('settle')

      later(SETTLE_MS, () => {
        setPhase('done')
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetPowerThresholdBreak() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setButtons(true)
  const root = rootEl()
  if (root) void root.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayPowerThresholdBreak() {
  if (busy) return
  resetPowerThresholdBreak()
  void rootEl()?.offsetWidth
  await runPowerThresholdBreak()
}

function bindUi() {
  document.querySelector('[data-ptb-run]')?.addEventListener('click', () => {
    void runPowerThresholdBreak()
  })
  document.querySelector('[data-ptb-replay]')?.addEventListener('click', () => {
    void replayPowerThresholdBreak()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayPowerThresholdBreak()
  })
}

bindUi()
resetPowerThresholdBreak()
