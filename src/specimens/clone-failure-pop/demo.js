/**
 * Clone Failure Pop — One worker collapses while remaining workers continue.
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

function rootEl() { return document.querySelector('[data-cfp7]') }

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
  const el = document.querySelector('[data-cfp7-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-cfp7-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-cfp7-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-cfp7-run], [data-cfp7-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('One worker collapses while remaining workers continue. Resolved.')
  setLive('Clone Failure Pop. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('One worker collapses while remaining workers continue.')
  setLive('Clone Failure Pop. Idle.')
}

/** @returns {Promise<void>} */
export function runCloneFailurePop() {
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
  setLive('Clone Failure Pop. Active.')
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

export function resetCloneFailurePop() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayCloneFailurePop() {
  if (busy) return
  resetCloneFailurePop()
  void rootEl()?.offsetWidth
  await runCloneFailurePop()
}

function bindUi() {
  document.querySelector('[data-cfp7-run]')?.addEventListener('click', () => { void runCloneFailurePop() })
  document.querySelector('[data-cfp7-replay]')?.addEventListener('click', () => { void replayCloneFailurePop() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCloneFailurePop()
  })
}

bindUi()
resetCloneFailurePop()
