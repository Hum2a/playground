/**
 * Objective Chain Advance — An objective chain advances to the next checkpoint.
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

function rootEl() { return document.querySelector('[data-oca3]') }

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
  const el = document.querySelector('[data-oca3-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-oca3-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-oca3-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-oca3-run], [data-oca3-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('An objective chain advances to the next checkpoint. Resolved.')
  setLive('Objective Chain Advance. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('An objective chain advances to the next checkpoint.')
  setLive('Objective Chain Advance. Idle.')
}

/** @returns {Promise<void>} */
export function runObjectiveChainAdvance() {
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
  setLive('Objective Chain Advance. Active.')
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

export function resetObjectiveChainAdvance() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayObjectiveChainAdvance() {
  if (busy) return
  resetObjectiveChainAdvance()
  void rootEl()?.offsetWidth
  await runObjectiveChainAdvance()
}

function bindUi() {
  document.querySelector('[data-oca3-run]')?.addEventListener('click', () => { void runObjectiveChainAdvance() })
  document.querySelector('[data-oca3-replay]')?.addEventListener('click', () => { void replayObjectiveChainAdvance() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayObjectiveChainAdvance()
  })
}

bindUi()
resetObjectiveChainAdvance()
