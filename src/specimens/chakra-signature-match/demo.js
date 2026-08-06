/**
 * Chakra Signature Match — A signature waveform locks onto a matching profile.
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

function rootEl() { return document.querySelector('[data-csm2]') }

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
  const el = document.querySelector('[data-csm2-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-csm2-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-csm2-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-csm2-run], [data-csm2-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A signature waveform locks onto a matching profile. Resolved.')
  setLive('Chakra Signature Match. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A signature waveform locks onto a matching profile.')
  setLive('Chakra Signature Match. Idle.')
}

/** @returns {Promise<void>} */
export function runChakraSignatureMatch() {
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
  setLive('Chakra Signature Match. Active.')
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

export function resetChakraSignatureMatch() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayChakraSignatureMatch() {
  if (busy) return
  resetChakraSignatureMatch()
  void rootEl()?.offsetWidth
  await runChakraSignatureMatch()
}

function bindUi() {
  document.querySelector('[data-csm2-run]')?.addEventListener('click', () => { void runChakraSignatureMatch() })
  document.querySelector('[data-csm2-replay]')?.addEventListener('click', () => { void replayChakraSignatureMatch() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayChakraSignatureMatch()
  })
}

bindUi()
resetChakraSignatureMatch()
