/**
 * Chakra Control Balance — Two opposing meters must settle inside a narrow equilibrium band.
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

function rootEl() { return document.querySelector('[data-ccb2]') }

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
  const el = document.querySelector('[data-ccb2-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ccb2-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-ccb2-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ccb2-run], [data-ccb2-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('Two opposing meters must settle inside a narrow equilibrium band. Resolved.')
  setLive('Chakra Control Balance. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('Two opposing meters must settle inside a narrow equilibrium band.')
  setLive('Chakra Control Balance. Idle.')
}

/** @returns {Promise<void>} */
export function runChakraControlBalance() {
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
  setLive('Chakra Control Balance. Active.')
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

export function resetChakraControlBalance() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayChakraControlBalance() {
  if (busy) return
  resetChakraControlBalance()
  void rootEl()?.offsetWidth
  await runChakraControlBalance()
}

function bindUi() {
  document.querySelector('[data-ccb2-run]')?.addEventListener('click', () => { void runChakraControlBalance() })
  document.querySelector('[data-ccb2-replay]')?.addEventListener('click', () => { void replayChakraControlBalance() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayChakraControlBalance()
  })
}

bindUi()
resetChakraControlBalance()
