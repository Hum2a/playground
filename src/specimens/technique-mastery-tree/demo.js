/**
 * Technique Mastery Tree — A skill-tree node unlocks along a mastery path.
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

function rootEl() { return document.querySelector('[data-tmt2]') }

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
  const el = document.querySelector('[data-tmt2-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tmt2-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-tmt2-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tmt2-run], [data-tmt2-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('A skill-tree node unlocks along a mastery path. Resolved.')
  setLive('Technique Mastery Tree. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('A skill-tree node unlocks along a mastery path.')
  setLive('Technique Mastery Tree. Idle.')
}

/** @returns {Promise<void>} */
export function runTechniqueMasteryTree() {
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
  setLive('Technique Mastery Tree. Active.')
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

export function resetTechniqueMasteryTree() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayTechniqueMasteryTree() {
  if (busy) return
  resetTechniqueMasteryTree()
  void rootEl()?.offsetWidth
  await runTechniqueMasteryTree()
}

function bindUi() {
  document.querySelector('[data-tmt2-run]')?.addEventListener('click', () => { void runTechniqueMasteryTree() })
  document.querySelector('[data-tmt2-replay]')?.addEventListener('click', () => { void replayTechniqueMasteryTree() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTechniqueMasteryTree()
  })
}

bindUi()
resetTechniqueMasteryTree()
