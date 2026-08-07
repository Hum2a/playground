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
const TICK_MS = 50
let holding = false

function setFill(pct) {
  const fill = document.querySelector('[data-pch-fill]')
  if (fill) fill.style.width = `${pct}%`
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setFill(0)
  const label = document.querySelector('[data-pch-label]')
  if (label) label.textContent = 'Hold to buy · $19.99'
  setStatus('IDLE')
  setHint('Hold the store CTA to confirm.')
  setLive('Purchase hold idle.')
}

function confirm() {
  holding = false
  rootEl()?.setAttribute('data-phase', 'confirmed')
  setFill(100)
  const label = document.querySelector('[data-pch-label]')
  if (label) label.textContent = 'Purchased · $19.99'
  setStatus('PURCHASED')
  setHint('Purchase confirmed.')
  setLive('Purchase confirmed for $19.99.')
}

function startHold() {
  if (holding || busy) return
  if (rootEl()?.getAttribute('data-phase') === 'confirmed') return
  holding = true
  rootEl()?.setAttribute('data-phase', 'holding')
  setStatus('HOLDING')
  setLive('Holding store purchase CTA.')
  setButtons(false)
  const start = performance.now()
  const tick = () => {
    if (!holding) return
    const elapsed = performance.now() - start
    const pct = Math.min((elapsed / HOLD_MS) * 100, 100)
    setFill(pct)
    if (elapsed >= HOLD_MS) {
      confirm()
      busy = false
      setButtons(true)
      return
    }
    later(TICK_MS, tick)
  }
  if (prefersReducedMotion()) {
    later(HOLD_MS, () => {
      if (holding) confirm()
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
  rootEl()?.setAttribute('data-phase', 'cancelled')
  setFill(0)
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
  if (e.button === 0 && !busy && rootEl()?.getAttribute('data-phase') !== 'confirmed') {
    startHold()
  }
})
document.querySelector('[data-pch-purchase]')?.addEventListener('pointerup', () => {
  if (holding && rootEl()?.getAttribute('data-phase') !== 'confirmed') cancelHold()
})
document.querySelector('[data-pch-purchase]')?.addEventListener('pointercancel', () => {
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
