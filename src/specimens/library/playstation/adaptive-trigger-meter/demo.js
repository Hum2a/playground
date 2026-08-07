/**
 * Adaptive Trigger Meter — PlayStation-inspired motion specimen.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-atm]')
}

let busy = false
/** @type {number[]} */
let timers = []

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setLive(text) {
  const el = document.querySelector('[data-atm-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-atm-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-atm-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-atm-run], [data-atm-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

const HOLD_MS = 1000
let holding = false
let activePointerId = null

function setFill(pct) {
  const fill = document.querySelector('[data-atm-fill]')
  if (fill) fill.style.height = `${pct}%`
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setFill(0)
  setStatus('IDLE')
  setHint('Hold trigger or press Run.')
  setLive('Trigger meter idle.')
}

function engage() {
  holding = false
  activePointerId = null
  rootEl()?.setAttribute('data-phase', 'engaged')
  setFill(100)
  setStatus('ENGAGED')
  setHint('Trigger threshold reached.')
  setLive('Adaptive trigger engaged.')
}

function startHold() {
  if (holding || busy) return
  holding = true
  rootEl()?.setAttribute('data-phase', 'holding')
  setStatus('HOLDING')
  setLive('Building trigger resistance.')
  setButtons(false)
  let start = performance.now()
  const tick = () => {
    if (!holding) return
    const elapsed = performance.now() - start
    const raw = Math.min(elapsed / HOLD_MS, 1)
    const eased = raw < 0.66 ? raw * 0.85 : raw * 0.85 + (raw - 0.66) * 0.45
    setFill(Math.round(eased * 100))
    if (elapsed >= HOLD_MS) {
      engage()
      busy = false
      setButtons(true)
      return
    }
    later(60, tick)
  }
  if (prefersReducedMotion()) {
    later(HOLD_MS, () => {
      if (holding) engage()
      busy = false
      setButtons(true)
    })
  } else {
    tick()
  }
}

function cancelHold() {
  if (!holding) return
  holding = false
  activePointerId = null
  resetVisual()
  setButtons(true)
}

export function runAdaptiveTriggerMeter() {
  if (busy || rootEl()?.getAttribute('data-phase') === 'engaged') return Promise.resolve()
  busy = true
  clearTimers()
  resetVisual()
  startHold()
  return new Promise((resolve) => {
    later(HOLD_MS + 80, () => resolve())
  })
}

export function resetAdaptiveTriggerMeter() {
  clearTimers()
  busy = false
  holding = false
  resetVisual()
  setButtons(true)
}

export async function replayAdaptiveTriggerMeter() {
  if (busy) return
  resetAdaptiveTriggerMeter()
  await runAdaptiveTriggerMeter()
}

function bindHold() {
  const btn = document.querySelector('[data-atm-trigger]')
  btn?.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || busy) return
    activePointerId = e.pointerId
    startHold()
  })
  const release = (e) => {
    if (activePointerId != null && e.pointerId !== activePointerId) return
    if (holding && rootEl()?.getAttribute('data-phase') !== 'engaged') cancelHold()
  }
  btn?.addEventListener('pointerup', release)
  btn?.addEventListener('pointercancel', release)
}
bindHold()

function bindUi() {
  document.querySelector('[data-atm-run]')?.addEventListener('click', () => {
    void runAdaptiveTriggerMeter()
  })
  document.querySelector('[data-atm-replay]')?.addEventListener('click', () => {
    void replayAdaptiveTriggerMeter()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayAdaptiveTriggerMeter()
  })
}

bindUi()
resetAdaptiveTriggerMeter()
