/**
 * Four-Point Barrier Construct — Four corner nodes connect into a protected region.
 * iframe-safe; no storage / parent / network.
 */
const ACTIVE_MS = 480
const SETTLE_MS = 160

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced = document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() { return document.querySelector('[data-fpbc8]') }

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
  const el = document.querySelector('[data-fpbc8-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-fpbc8-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-fpbc8-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-fpbc8-run], [data-fpbc8-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('Four corner nodes connect into a protected region. Resolved.')
  setLive('Four-Point Barrier Construct. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('Four corner nodes connect into a protected region.')
  setLive('Four-Point Barrier Construct. Idle.')
}

/** @returns {Promise<void>} */
export function runFourPointBarrierConstruct() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return Promise.resolve()
  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth
  if (prefersReducedMotion()) {
    showDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }
  root.setAttribute('data-phase', 'active')
  setStatus('ACTIVE')
  setLive('Four-Point Barrier Construct. Active.')
  return new Promise((resolve) => {
    later(ACTIVE_MS, () => {
      showDone()
      later(SETTLE_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetFourPointBarrierConstruct() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayFourPointBarrierConstruct() {
  if (busy) return
  resetFourPointBarrierConstruct()
  void rootEl()?.offsetWidth
  await runFourPointBarrierConstruct()
}

function bindUi() {
  document.querySelector('[data-fpbc8-run]')?.addEventListener('click', () => { void runFourPointBarrierConstruct() })
  document.querySelector('[data-fpbc8-replay]')?.addEventListener('click', () => { void replayFourPointBarrierConstruct() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayFourPointBarrierConstruct()
  })
}

bindUi()
resetFourPointBarrierConstruct()
