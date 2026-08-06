/**
 * Body Flicker Page Jump — Page content streaks away and resolves as a new view.
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

function rootEl() { return document.querySelector('[data-bfpj2]') }

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
  const el = document.querySelector('[data-bfpj2-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-bfpj2-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-bfpj2-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-bfpj2-run], [data-bfpj2-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('Page content streaks away and resolves as a new view. Resolved.')
  setLive('Body Flicker Page Jump. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('Page content streaks away and resolves as a new view.')
  setLive('Body Flicker Page Jump. Idle.')
}

/** @returns {Promise<void>} */
export function runBodyFlickerPageJump() {
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
  setLive('Body Flicker Page Jump. Active.')
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

export function resetBodyFlickerPageJump() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayBodyFlickerPageJump() {
  if (busy) return
  resetBodyFlickerPageJump()
  void rootEl()?.offsetWidth
  await runBodyFlickerPageJump()
}

function bindUi() {
  document.querySelector('[data-bfpj2-run]')?.addEventListener('click', () => { void runBodyFlickerPageJump() })
  document.querySelector('[data-bfpj2-replay]')?.addEventListener('click', () => { void replayBodyFlickerPageJump() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayBodyFlickerPageJump()
  })
}

bindUi()
resetBodyFlickerPageJump()
