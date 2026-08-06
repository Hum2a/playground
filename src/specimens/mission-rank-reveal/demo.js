/**
 * Mission Rank Reveal — A mission rank letter reveals with a stamp settle.
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

function rootEl() { return document.querySelector('[data-mrr9]') }

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
  const el = document.querySelector('[data-mrr9-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-mrr9-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-mrr9-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-mrr9-run], [data-mrr9-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A mission rank letter reveals with a stamp settle. Resolved.')
  setLive('Mission Rank Reveal. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A mission rank letter reveals with a stamp settle.')
  setLive('Mission Rank Reveal. Idle.')
}

/** @returns {Promise<void>} */
export function runMissionRankReveal() {
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
  setLive('Mission Rank Reveal. Active.')
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

export function resetMissionRankReveal() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMissionRankReveal() {
  if (busy) return
  resetMissionRankReveal()
  void rootEl()?.offsetWidth
  await runMissionRankReveal()
}

function bindUi() {
  document.querySelector('[data-mrr9-run]')?.addEventListener('click', () => { void runMissionRankReveal() })
  document.querySelector('[data-mrr9-replay]')?.addEventListener('click', () => { void replayMissionRankReveal() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMissionRankReveal()
  })
}

bindUi()
resetMissionRankReveal()
