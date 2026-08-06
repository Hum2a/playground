/**
 * Purchase Confirm Hold — PlayStation-inspired motion specimen.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-pch]')
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
  const el = document.querySelector('[data-pch-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-pch-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-pch-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-pch-run], [data-pch-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

const HOLD_MS = 850
const CIRC = 263.89
let holding = false

function setRing(pct) {
  const fill = document.querySelector('[data-pch-fill]')
  if (fill) fill.style.strokeDashoffset = String(CIRC * (1 - pct / 100))
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setRing(0)
  setStatus('IDLE')
  setHint('Hold to confirm purchase.')
  setLive('Purchase hold idle.')
}

function confirm() {
  holding = false
  rootEl()?.setAttribute('data-phase', 'confirmed')
  setRing(100)
  setStatus('PURCHASED')
  setHint('Purchase confirmed.')
  setLive('Purchase confirmed.')
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
    setRing(pct)
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
  setRing(0)
  setStatus('CANCELLED')
  setLive('Purchase cancelled.')
  later(200, resetVisual)
  setButtons(true)
}

export function runPurchaseConfirmHold() {
  if (busy || rootEl()?.getAttribute('data-phase') === 'confirmed') return Promise.resolve()
  busy = true
  clearTimers()
  resetVisual()
  startHold()
  return new Promise((r) => later(HOLD_MS + 80, r))
}

export function resetPurchaseConfirmHold() {
  clearTimers()
  busy = false
  holding = false
  resetVisual()
  setButtons(true)
}

export async function replayPurchaseConfirmHold() {
  if (busy) return
  resetPurchaseConfirmHold()
  await runPurchaseConfirmHold()
}

document.querySelector('[data-pch-purchase]')?.addEventListener('pointerdown', (e) => {
  if (e.button === 0 && !busy && rootEl()?.getAttribute('data-phase') !== 'confirmed') startHold()
})
document.querySelector('[data-pch-purchase]')?.addEventListener('pointerup', () => {
  if (holding && rootEl()?.getAttribute('data-phase') !== 'confirmed') cancelHold()
})

function bindUi() {
  document.querySelector('[data-pch-run]')?.addEventListener('click', () => {
    void runPurchaseConfirmHold()
  })
  document.querySelector('[data-pch-replay]')?.addEventListener('click', () => {
    void replayPurchaseConfirmHold()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayPurchaseConfirmHold()
  })
}

bindUi()
resetPurchaseConfirmHold()
