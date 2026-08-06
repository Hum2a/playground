/**
 * Power State Transformation — tiny portable upgrade API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timeline (frozen):
 *   0–420ms     pressure — 10 marks inward; deterministic ±2px shift
 *   420–520ms   compression — scale(.94, 1.04); marks collapse
 *   520–590ms   hold
 *   590–770ms   burst — geom swap; 8 rays; field 110%→165%→118%
 *   590ms       STATE metric clip
 *   650ms       THROUGHPUT metric clip
 *   710ms       CHANNELS metric clip
 *   770–920ms   settle — ascended 1.06→1; thin static outline
 */

const PRESSURE_MS = 420
const COMPRESS_MS = 100
const HOLD_MS = 70
const BURST_MS = 180
const SETTLE_MS = 150
const MARK_COUNT = 10
const RAY_COUNT = 8

const COMPRESS_AT = PRESSURE_MS
const HOLD_AT = PRESSURE_MS + COMPRESS_MS
const BURST_AT = HOLD_AT + HOLD_MS
const METRIC_STATE_AT = BURST_AT
const METRIC_THROUGHPUT_AT = BURST_AT + 60
const METRIC_CHANNELS_AT = BURST_AT + 120
const SETTLE_AT = BURST_AT + BURST_MS
const TOTAL_MS = SETTLE_AT + SETTLE_MS

/** @type {number[]} */
let timers = []
let busy = false
/** @type {'base' | 'ascended'} */
let form = 'base'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-power-state]')
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
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setForm(next) {
  form = next
  const root = rootEl()
  root?.setAttribute('data-form', next)
}

function setStatus(text) {
  const el = document.querySelector('[data-pst-status]')
  if (el) el.textContent = text
}

function setButtonsEnabled(on) {
  document.querySelectorAll('[data-pst-trigger], [data-pst-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function revealMetric(name) {
  const root = rootEl()
  root?.setAttribute(`data-metric-${name}`, 'on')
}

function clearMetrics() {
  const root = rootEl()
  if (!root) return
  root.removeAttribute('data-metric-state')
  root.removeAttribute('data-metric-throughput')
  root.removeAttribute('data-metric-channels')
}

function showAscendedImmediate() {
  setForm('ascended')
  setPhase('done')
  revealMetric('state')
  revealMetric('throughput')
  revealMetric('channels')
  setStatus('Engine 04. State ascended.')
}

/**
 * Run one transformation: pressure → compress → burst → metrics → settle.
 * @returns {Promise<void>}
 */
export function runPowerStateTransform() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (form === 'ascended') return Promise.resolve()

  busy = true
  clearTimers()
  clearMetrics()
  setButtonsEnabled(false)

  if (prefersReducedMotion()) {
    showAscendedImmediate()
    busy = false
    setButtonsEnabled(true)
    return Promise.resolve()
  }

  setForm('base')
  setPhase('idle')
  void root.offsetWidth
  setPhase('pressure')

  return new Promise((resolve) => {
    later(COMPRESS_AT, () => setPhase('compress'))
    later(HOLD_AT, () => setPhase('hold'))
    later(BURST_AT, () => {
      setForm('ascended')
      setPhase('burst')
    })
    later(METRIC_STATE_AT, () => revealMetric('state'))
    later(METRIC_THROUGHPUT_AT, () => revealMetric('throughput'))
    later(METRIC_CHANNELS_AT, () => revealMetric('channels'))
    later(SETTLE_AT, () => setPhase('settle'))
    later(TOTAL_MS, () => {
      setPhase('done')
      setStatus('Engine 04. State ascended.')
      busy = false
      setButtonsEnabled(true)
      resolve()
    })
  })
}

export function resetPowerStateTransform() {
  clearTimers()
  busy = false
  clearMetrics()
  setForm('base')
  setPhase('idle')
  setStatus('Engine 04. State base.')
  setButtonsEnabled(true)
}

/** @returns {Promise<void>} */
export async function replayPowerStateTransform() {
  if (busy) return
  resetPowerStateTransform()
  void rootEl()?.offsetWidth
  await runPowerStateTransform()
}

function bindUi() {
  document.querySelectorAll('[data-pst-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runPowerStateTransform()
    })
  })

  document.querySelectorAll('[data-pst-replay]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void replayPowerStateTransform()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void replayPowerStateTransform()
    }
  })
}

bindUi()
resetPowerStateTransform()

export const POWER_STATE_TIMING = {
  PRESSURE_MS,
  COMPRESS_MS,
  HOLD_MS,
  BURST_MS,
  SETTLE_MS,
  MARK_COUNT,
  RAY_COUNT,
  COMPRESS_AT,
  HOLD_AT,
  BURST_AT,
  METRIC_STATE_AT,
  METRIC_THROUGHPUT_AT,
  METRIC_CHANNELS_AT,
  SETTLE_AT,
  TOTAL_MS,
}
