/**
 * Shadow Bind Selection — Shadow tendrils bind and select a target card.
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

function rootEl() { return document.querySelector('[data-sbs1]') }

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
  const el = document.querySelector('[data-sbs1-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-sbs1-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-sbs1-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-sbs1-run], [data-sbs1-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('Shadow tendrils bind and select a target card. Resolved.')
  setLive('Shadow Bind Selection. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('Shadow tendrils bind and select a target card.')
  setLive('Shadow Bind Selection. Idle.')
}

/** @returns {Promise<void>} */
export function runShadowBindSelection() {
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
  setLive('Shadow Bind Selection. Active.')
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

export function resetShadowBindSelection() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayShadowBindSelection() {
  if (busy) return
  resetShadowBindSelection()
  void rootEl()?.offsetWidth
  await runShadowBindSelection()
}

function bindUi() {
  document.querySelector('[data-sbs1-run]')?.addEventListener('click', () => { void runShadowBindSelection() })
  document.querySelector('[data-sbs1-replay]')?.addEventListener('click', () => { void replayShadowBindSelection() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayShadowBindSelection()
  })
}

bindUi()
resetShadowBindSelection()
