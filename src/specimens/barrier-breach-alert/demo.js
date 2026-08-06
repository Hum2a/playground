/**
 * Barrier Breach Alert — A perimeter fractures at a breach point with an alert.
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

function rootEl() { return document.querySelector('[data-bba0]') }

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
  const el = document.querySelector('[data-bba0-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-bba0-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-bba0-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-bba0-run], [data-bba0-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A perimeter fractures at a breach point with an alert. Resolved.')
  setLive('Barrier Breach Alert. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A perimeter fractures at a breach point with an alert.')
  setLive('Barrier Breach Alert. Idle.')
}

/** @returns {Promise<void>} */
export function runBarrierBreachAlert() {
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
  setLive('Barrier Breach Alert. Active.')
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

export function resetBarrierBreachAlert() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayBarrierBreachAlert() {
  if (busy) return
  resetBarrierBreachAlert()
  void rootEl()?.offsetWidth
  await runBarrierBreachAlert()
}

function bindUi() {
  document.querySelector('[data-bba0-run]')?.addEventListener('click', () => { void runBarrierBreachAlert() })
  document.querySelector('[data-bba0-replay]')?.addEventListener('click', () => { void replayBarrierBreachAlert() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayBarrierBreachAlert()
  })
}

bindUi()
resetBarrierBreachAlert()
