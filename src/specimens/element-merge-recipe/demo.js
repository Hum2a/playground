/**
 * Element Merge Recipe — Two element tokens combine into a result recipe.
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

function rootEl() { return document.querySelector('[data-emr0]') }

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
  const el = document.querySelector('[data-emr0-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-emr0-status]')
  if (el) el.textContent = text
}

function setNote(text) {
  const el = document.querySelector('[data-emr0-note]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-emr0-run], [data-emr0-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('DONE')
  setNote('Two element tokens combine into a result recipe. Resolved.')
  setLive('Element Merge Recipe. Resolved.')
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setNote('Two element tokens combine into a result recipe.')
  setLive('Element Merge Recipe. Idle.')
}

/** @returns {Promise<void>} */
export function runElementMergeRecipe() {
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
  setLive('Element Merge Recipe. Active.')
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

export function resetElementMergeRecipe() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayElementMergeRecipe() {
  if (busy) return
  resetElementMergeRecipe()
  void rootEl()?.offsetWidth
  await runElementMergeRecipe()
}

function bindUi() {
  document.querySelector('[data-emr0-run]')?.addEventListener('click', () => { void runElementMergeRecipe() })
  document.querySelector('[data-emr0-replay]')?.addEventListener('click', () => { void replayElementMergeRecipe() })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayElementMergeRecipe()
  })
}

bindUi()
resetElementMergeRecipe()
