/**
 * Seal Stamp Confirmation — A seal stamp slams to confirm the action.
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

function rootEl() { return document.querySelector('[data-ssc3]') }

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
  const el = document.querySelector('[data-ssc3-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ssc3-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-ssc3-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ssc3-run], [data-ssc3-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A seal stamp slams to confirm the action. Resolved.')
  setLive('Seal Stamp Confirmation. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A seal stamp slams to confirm the action.')
  setLive('Seal Stamp Confirmation. Idle.')
}

/** @returns {Promise<void>} */
export function runSealStampConfirmation() {
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
  setLive('Seal Stamp Confirmation. Active.')
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

export function resetSealStampConfirmation() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replaySealStampConfirmation() {
  if (busy) return
  resetSealStampConfirmation()
  void rootEl()?.offsetWidth
  await runSealStampConfirmation()
}

function bindUi() {
  document.querySelector('[data-ssc3-run]')?.addEventListener('click', () => { void runSealStampConfirmation() })
  document.querySelector('[data-ssc3-replay]')?.addEventListener('click', () => { void replaySealStampConfirmation() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replaySealStampConfirmation()
  })
}

bindUi()
resetSealStampConfirmation()
