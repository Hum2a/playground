/**
 * Maximum Output Breakthrough — meter fills 0→100% NOMINAL then breaks to 108%.
 * iframe-safe; no storage / parent / network.
 */

const FILL_MS = 580
const BREAK_MS = 320
const SETTLE_MS = 330
const TOTAL_MS = FILL_MS + BREAK_MS + SETTLE_MS
const START_PCT = 0
const NOMINAL_PCT = 100
const OVERSHOOT_PCT = 108

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
  return document.querySelector('[data-mob]')
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
  const el = document.querySelector('[data-mob-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-mob-status]')
  if (el) el.textContent = text
}

function setPct(pct, label) {
  const max = document.querySelector('[data-mob-max]')
  if (max) max.textContent = label ?? `${pct}%`
}

function setButtons(on) {
  document.querySelectorAll('[data-mob-run], [data-mob-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function applyDone() {
  setPct(OVERSHOOT_PCT, 'MAX+')
  setStatus('Maximum output exceeded.')
  setLive('Breakthrough registered at 108%.')
}

function resetVisual() {
  setPct(START_PCT)
  setStatus('NOMINAL 100%')
  setLive('Output at zero. Nominal limit 100%.')
}

/** @returns {Promise<void>} */
export function runMaximumOutputBreakthrough() {
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
    applyDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('fill')
  setLive('Filling to nominal 100%.')
  setPct(START_PCT)

  return new Promise((resolve) => {
    later(FILL_MS, () => {
      setPct(NOMINAL_PCT)
      setPhase('break')
      setLive('Breaking nominal limit.')
      later(BREAK_MS, () => {
        applyDone()
        setPhase('done')
        later(SETTLE_MS, () => {
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })
}

export function resetMaximumOutputBreakthrough() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMaximumOutputBreakthrough() {
  if (busy) return
  resetMaximumOutputBreakthrough()
  void rootEl()?.offsetWidth
  await runMaximumOutputBreakthrough()
}

function bindUi() {
  document.querySelector('[data-mob-run]')?.addEventListener('click', () => {
    void runMaximumOutputBreakthrough()
  })
  document.querySelector('[data-mob-replay]')?.addEventListener('click', () => {
    void replayMaximumOutputBreakthrough()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMaximumOutputBreakthrough()
  })
}

bindUi()
resetMaximumOutputBreakthrough()
