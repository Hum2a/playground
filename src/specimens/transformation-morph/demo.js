/**
 * Transformation Morph — A profile card morphs through a silhouette into a new identity.
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

function rootEl() { return document.querySelector('[data-tm0]') }

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
  const el = document.querySelector('[data-tm0-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tm0-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-tm0-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tm0-run], [data-tm0-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A profile card morphs through a silhouette into a new identity. Resolved.')
  setLive('Transformation Morph. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A profile card morphs through a silhouette into a new identity.')
  setLive('Transformation Morph. Idle.')
}

/** @returns {Promise<void>} */
export function runTransformationMorph() {
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
  setLive('Transformation Morph. Active.')
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

export function resetTransformationMorph() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayTransformationMorph() {
  if (busy) return
  resetTransformationMorph()
  void rootEl()?.offsetWidth
  await runTransformationMorph()
}

function bindUi() {
  document.querySelector('[data-tm0-run]')?.addEventListener('click', () => { void runTransformationMorph() })
  document.querySelector('[data-tm0-replay]')?.addEventListener('click', () => { void replayTransformationMorph() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTransformationMorph()
  })
}

bindUi()
resetTransformationMorph()
