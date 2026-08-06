/**
 * Multi-Key Seal — Three prerequisite nodes activate before the seal opens.
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

function rootEl() { return document.querySelector('[data-mks4]') }

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
  const el = document.querySelector('[data-mks4-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-mks4-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-mks4-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-mks4-run], [data-mks4-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('Three prerequisite nodes activate before the seal opens. Resolved.')
  setLive('Multi-Key Seal. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('Three prerequisite nodes activate before the seal opens.')
  setLive('Multi-Key Seal. Idle.')
}

/** @returns {Promise<void>} */
export function runMultiKeySeal() {
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
  setLive('Multi-Key Seal. Active.')
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

export function resetMultiKeySeal() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMultiKeySeal() {
  if (busy) return
  resetMultiKeySeal()
  void rootEl()?.offsetWidth
  await runMultiKeySeal()
}

function bindUi() {
  document.querySelector('[data-mks4-run]')?.addEventListener('click', () => { void runMultiKeySeal() })
  document.querySelector('[data-mks4-replay]')?.addEventListener('click', () => { void replayMultiKeySeal() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMultiKeySeal()
  })
}

bindUi()
resetMultiKeySeal()
