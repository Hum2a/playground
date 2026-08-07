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
const TICK_MS = 50
let holding = false

/** Map elapsed (0–1) → fill % with slowdown in resistance band (48–68%). */
function easedPct(raw) {
  const linear = raw * 100
  if (linear < 48) return linear
  if (linear < 68) {
    const t = (linear - 48) / 20
    return 48 + t * t * 20
  }
  return linear
}

function setFill(pct) {
  const fill = document.querySelector('[data-tbc-fill]')
  if (fill) fill.style.width = `${pct}%`
  const root = rootEl()
  if (!root) return
  if (pct >= NOTCH && root.getAttribute('data-phase') === 'holding') {
    root.setAttribute('data-phase', 'past-notch')
    setStatus('PAST NOTCH')
    setLive('Past 68% resistance notch.')
    setHint('Commit zone — keep holding to confirm.')
  }
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setFill(0)
  setStatus('IDLE')
  setHint('Resistance rises before 68% notch.')
  setLive('Trigger breakpoint idle.')
}

function confirm() {
  holding = false
  rootEl()?.setAttribute('data-phase', 'confirmed')
  setFill(100)
  setStatus('CONFIRMED')
  setHint('Breakpoint crossed and confirmed.')
  setLive('Trigger breakpoint confirmed past 68%.')
}

function startHold() {
  if (holding || busy) return
  if (rootEl()?.getAttribute('data-phase') === 'confirmed') return
  holding = true
  rootEl()?.setAttribute('data-phase', 'holding')
  setStatus('HOLDING')
  setLive('Building toward 68% resistance notch.')
  setHint('Hatched band = rising resistance.')
  setButtons(false)
  const start = performance.now()
  const tick = () => {
    if (!holding) return
    const elapsed = performance.now() - start
    const raw = Math.min(elapsed / HOLD_MS, 1)
    const pct = Math.min(Math.round(easedPct(raw)), 100)
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
  const phase = rootEl()?.getAttribute('data-phase')
  rootEl()?.setAttribute('data-phase', 'cancelled')
  setFill(0)
  if (phase === 'past-notch') {
    setStatus('CANCELLED')
    setHint('Released in commit zone — not confirmed.')
    setLive('Cancelled after notch; confirm requires full hold.')
  } else {
    setStatus('CANCELLED')
    setHint('Released before 68% notch.')
    setLive('Cancelled before breakpoint confirm.')
  }
  later(280, resetVisual)
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
document.querySelector('[data-tbc-bar]')?.addEventListener('pointercancel', () => {
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
