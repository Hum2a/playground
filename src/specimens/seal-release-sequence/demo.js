/**
 * Seal Release Sequence — Concentric rings disengage outward to unlock content.
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

function rootEl() { return document.querySelector('[data-srs1]') }

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
  const el = document.querySelector('[data-srs1-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-srs1-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-srs1-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-srs1-run], [data-srs1-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('Concentric rings disengage outward to unlock content. Resolved.')
  setLive('Seal Release Sequence. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('Concentric rings disengage outward to unlock content.')
  setLive('Seal Release Sequence. Idle.')
}

/** @returns {Promise<void>} */
export function runSealReleaseSequence() {
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
  setLive('Seal Release Sequence. Active.')
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

export function resetSealReleaseSequence() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replaySealReleaseSequence() {
  if (busy) return
  resetSealReleaseSequence()
  void rootEl()?.offsetWidth
  await runSealReleaseSequence()
}

function bindUi() {
  document.querySelector('[data-srs1-run]')?.addEventListener('click', () => { void runSealReleaseSequence() })
  document.querySelector('[data-srs1-replay]')?.addEventListener('click', () => { void replaySealReleaseSequence() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replaySealReleaseSequence()
  })
}

bindUi()
resetSealReleaseSequence()
