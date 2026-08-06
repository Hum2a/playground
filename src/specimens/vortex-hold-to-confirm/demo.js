/**
 * Vortex Hold-to-Confirm — Hold builds a vortex; release confirms the action.
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

function rootEl() { return document.querySelector('[data-vhtc2]') }

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
  const el = document.querySelector('[data-vhtc2-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-vhtc2-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-vhtc2-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-vhtc2-run], [data-vhtc2-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('Hold builds a vortex; release confirms the action. Resolved.')
  setLive('Vortex Hold-to-Confirm. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('Hold builds a vortex; release confirms the action.')
  setLive('Vortex Hold-to-Confirm. Idle.')
}

/** @returns {Promise<void>} */
export function runVortexHoldToConfirm() {
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
  setLive('Vortex Hold-to-Confirm. Active.')
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

export function resetVortexHoldToConfirm() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayVortexHoldToConfirm() {
  if (busy) return
  resetVortexHoldToConfirm()
  void rootEl()?.offsetWidth
  await runVortexHoldToConfirm()
}

function bindUi() {
  document.querySelector('[data-vhtc2-run]')?.addEventListener('click', () => { void runVortexHoldToConfirm() })
  document.querySelector('[data-vhtc2-replay]')?.addEventListener('click', () => { void replayVortexHoldToConfirm() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayVortexHoldToConfirm()
  })
}

bindUi()
resetVortexHoldToConfirm()
