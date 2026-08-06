/**
 * Measurement Overload — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Deterministic analyser climb → hold at 9999 → ---- → > 9,999 overflow.
 */

/** Frozen measurement sequence (normal → warn → max) */
const SEQUENCE = [
  '0142',
  '0721',
  '1840',
  '3912',
  '5740',
  '7182',
  '8431',
  '9270',
  '9714',
  '9938',
  '9999',
]

const TICK_MS = 90
const HOLD_MS = 180
const DASH_MS = 90
const SHIFT_MS = 100

const PHASES = ['mo--edges', 'mo--shift', 'mo--offset', 'mo--break', 'mo--fracture']

let busy = false
let exceeded = false
/** @type {number[]} */
let timers = []
let bound = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-measurement-overload]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setDigits(root, text) {
  const el = root.querySelector('[data-mo-digits]')
  if (el) el.textContent = text
}

function setStatus(root, text) {
  const el = root.querySelector('[data-mo-status]')
  if (el) el.textContent = text
}

function setTriggers({ go, reset }) {
  const root = rootEl()
  if (!root) return
  const goBtn = root.querySelector('[data-mo-measure]')
  const resetBtn = root.querySelector('[data-mo-reset]')
  if (goBtn) {
    goBtn.disabled = !go
    goBtn.hidden = !go
  }
  if (resetBtn) {
    resetBtn.disabled = !reset
    resetBtn.hidden = !reset
  }
}

function setCopy(root, mode) {
  const sr = root.querySelector('[data-mo-sr]')
  const live = root.querySelector('[data-mo-live]')
  if (mode === 'exceeded') {
    const msg = 'Measurement exceeds supported range of 9,999.'
    if (sr) sr.textContent = msg
    if (live) live.textContent = msg
  } else if (mode === 'running') {
    if (sr) sr.textContent = 'Measuring within supported range.'
    if (live) live.textContent = 'Measuring.'
  } else {
    if (sr) sr.textContent = 'Analyser ready. Supported range 0 to 9,999.'
    if (live) live.textContent = 'Analyser ready.'
  }
}

function applyExceeded(root) {
  clearTimers()
  clearPhases(root)
  root.classList.add('mo--edges', 'mo--offset', 'mo--break', 'mo--fracture')
  root.setAttribute('data-state', 'exceeded')
  root.setAttribute('data-phase', 'overflow')
  setDigits(root, '> 9,999')
  setStatus(root, 'RANGE EXCEEDED')
  exceeded = true
  busy = false
  setTriggers({ go: false, reset: true })
  setCopy(root, 'exceeded')
}

function applyIdle(root) {
  clearTimers()
  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  root.setAttribute('data-phase', 'idle')
  setDigits(root, '0000')
  setStatus(root, '')
  exceeded = false
  busy = false
  setTriggers({ go: true, reset: false })
  setCopy(root, 'idle')
}

/**
 * Run measurement → overflow sequence.
 * @returns {Promise<void>}
 */
export function runMeasurement() {
  const root = rootEl()
  if (!root) return Promise.resolve()
  if (busy || exceeded) return Promise.resolve()

  if (prefersReducedMotion()) {
    applyExceeded(root)
    return Promise.resolve()
  }

  busy = true
  clearPhases(root)
  root.setAttribute('data-state', 'running')
  root.setAttribute('data-phase', 'normal')
  setTriggers({ go: false, reset: false })
  setCopy(root, 'running')
  setStatus(root, '')
  setDigits(root, '0000')

  return new Promise((resolve) => {
    let t = 0

    SEQUENCE.forEach((value, index) => {
      later(t, () => {
        setDigits(root, value)

        if (value === '9270') {
          root.setAttribute('data-phase', 'warn')
          root.classList.add('mo--edges')
        }

        if (value === '9714') {
          root.classList.remove('mo--shift')
          void root.offsetWidth
          root.classList.add('mo--shift')
        }

        if (value === '9938') {
          root.classList.add('mo--offset')
        }

        if (value === '9999') {
          root.setAttribute('data-phase', 'max')
          const live = root.querySelector('[data-mo-live]')
          if (live) live.textContent = 'Maximum supported reading.'
        }
      })

      t += value === '9999' ? HOLD_MS : TICK_MS
      // After 9714 shift starts, still advance on tick; shift is parallel
      if (value === '9714') {
        // ensure shift animation can finish without blocking sequence
        void SHIFT_MS
      }
    })

    // After hold at 9999 completes (already included in t via HOLD_MS for last item)
    later(t, () => {
      root.setAttribute('data-phase', 'dash')
      setDigits(root, '----')
      const live = root.querySelector('[data-mo-live]')
      if (live) live.textContent = 'Representation failure.'
    })

    later(t + DASH_MS, () => {
      root.setAttribute('data-phase', 'overflow')
      setDigits(root, '> 9,999')
      setStatus(root, 'RANGE EXCEEDED')
      root.classList.add('mo--break', 'mo--fracture')
      setCopy(root, 'exceeded')

      later(160, () => {
        applyExceeded(root)
        resolve()
      })
    })
  })
}

/**
 * Restore idle analyser.
 * @returns {void}
 */
export function resetMeasurement() {
  const root = rootEl()
  if (!root) return
  applyIdle(root)
}

function bind() {
  if (bound) return
  const root = rootEl()
  if (!root) return
  bound = true

  const go = root.querySelector('[data-mo-measure]')
  const reset = root.querySelector('[data-mo-reset]')
  if (go) go.addEventListener('click', () => runMeasurement())
  if (reset) reset.addEventListener('click', () => resetMeasurement())
}

export const measurementOverload = {
  run: runMeasurement,
  reset: resetMeasurement,
}

function onRestartMessage(event) {
  if (event.data && event.data.type === 'restart') {
    resetMeasurement()
    void runMeasurement()
  }
}

if (typeof window !== 'undefined') {
  window.measurementOverload = measurementOverload
  window.addEventListener('message', onRestartMessage)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true })
  } else {
    bind()
  }
}
