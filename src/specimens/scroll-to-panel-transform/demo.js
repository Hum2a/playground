/**
 * Scroll-to-Panel Transform — A compact scroll token morphs into a readable content panel.
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

function rootEl() { return document.querySelector('[data-stpt5]') }

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
  const el = document.querySelector('[data-stpt5-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-stpt5-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-stpt5-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-stpt5-run], [data-stpt5-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A compact scroll token morphs into a readable content panel. Resolved.')
  setLive('Scroll-to-Panel Transform. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A compact scroll token morphs into a readable content panel.')
  setLive('Scroll-to-Panel Transform. Idle.')
}

/** @returns {Promise<void>} */
export function runScrollToPanelTransform() {
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
  setLive('Scroll-to-Panel Transform. Active.')
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

export function resetScrollToPanelTransform() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayScrollToPanelTransform() {
  if (busy) return
  resetScrollToPanelTransform()
  void rootEl()?.offsetWidth
  await runScrollToPanelTransform()
}

function bindUi() {
  document.querySelector('[data-stpt5-run]')?.addEventListener('click', () => { void runScrollToPanelTransform() })
  document.querySelector('[data-stpt5-replay]')?.addEventListener('click', () => { void replayScrollToPanelTransform() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayScrollToPanelTransform()
  })
}

bindUi()
resetScrollToPanelTransform()
