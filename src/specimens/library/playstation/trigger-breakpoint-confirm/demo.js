/**
 * Trigger Breakpoint Confirm — PlayStation-inspired motion specimen.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tbc]')
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
  const el = document.querySelector('[data-tbc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tbc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-tbc-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tbc-run], [data-tbc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

const HOLD_MS = 1100
const NOTCH = 68
let holding = false

function setFill(pct) {
  const fill = document.querySelector('[data-tbc-fill]')
  if (fill) fill.style.width = `${pct}%`
  const root = rootEl()
  if (root && pct >= NOTCH) root.setAttribute('data-phase', 'past-notch')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setFill(0)
  setStatus('IDLE')
  setHint('Hold past notch to confirm.')
  setLive('Trigger breakpoint idle.')
}

function confirm() {
  holding = false
  rootEl()?.setAttribute('data-phase', 'confirmed')
  setFill(100)
  setStatus('CONFIRMED')
  setHint('Breakpoint crossed and confirmed.')
  setLive('Trigger breakpoint confirmed.')
}

function startHold() {
  if (holding || busy) return
  holding = true
  rootEl()?.setAttribute('data-phase', 'holding')
  setStatus('HOLDING')
  setButtons(false)
  const start = performance.now()
  const tick = () => {
    if (!holding) return
    const elapsed = performance.now() - start
    const pct = Math.min((elapsed / HOLD_MS) * 100, 100)
    setFill(Math.round(pct))
    if (elapsed >= HOLD_MS) {
      confirm()
      busy = false
      setButtons(true)
      return
    }
    later(50, tick)
  }
  if (prefersReducedMotion()) {
    later(HOLD_MS, () => { if (holding) confirm(); busy = false; setButtons(true) })
  } else tick()
}

function cancelHold() {
  if (!holding) return
  holding = false
  rootEl()?.setAttribute('data-phase', 'cancelled')
  setFill(0)
  setStatus('CANCELLED')
  setHint('Released before confirm.')
  setLive('Cancelled before breakpoint confirm.')
  later(200, resetVisual)
  setButtons(true)
}

export function runTriggerBreakpointConfirm() {
  if (busy || rootEl()?.getAttribute('data-phase') === 'confirmed') return Promise.resolve()
  busy = true
  clearTimers()
  resetVisual()
  startHold()
  return new Promise((r) => later(HOLD_MS + 100, r))
}

export function resetTriggerBreakpointConfirm() {
  clearTimers()
  busy = false
  holding = false
  resetVisual()
  setButtons(true)
}

export async function replayTriggerBreakpointConfirm() {
  if (busy) return
  resetTriggerBreakpointConfirm()
  await runTriggerBreakpointConfirm()
}

document.querySelector('[data-tbc-bar]')?.addEventListener('pointerdown', (e) => {
  if (e.button === 0 && !busy) startHold()
})
document.querySelector('[data-tbc-bar]')?.addEventListener('pointerup', () => {
  if (holding && rootEl()?.getAttribute('data-phase') !== 'confirmed') cancelHold()
})

function bindUi() {
  document.querySelector('[data-tbc-run]')?.addEventListener('click', () => {
    void runTriggerBreakpointConfirm()
  })
  document.querySelector('[data-tbc-replay]')?.addEventListener('click', () => {
    void replayTriggerBreakpointConfirm()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTriggerBreakpointConfirm()
  })
}

bindUi()
resetTriggerBreakpointConfirm()
