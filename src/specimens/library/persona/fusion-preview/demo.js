/**
 * Fusion Preview — select two models, run a finite preview beam once.
 * iframe-safe; no storage / parent / network.
 */

const BEAM_MS = 480
const SETTLE_MS = 420

let busy = false
/** @type {number[]} */
let timers = []
const selected = { a: false, b: false }

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-fpr]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setLive(text) {
  const el = document.querySelector('[data-fpr-live]')
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function syncRunEnabled() {
  const run = document.querySelector('[data-fpr-run]')
  if (run) run.disabled = !(selected.a && selected.b) || busy
}

function setInputsEnabled(on) {
  document.querySelectorAll('[data-fpr-input]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showPreview() {
  setPhase('done')
  const ghost = document.querySelector('[data-fpr-ghost]')
  if (ghost) ghost.setAttribute('aria-hidden', 'false')
  setLive('Preview ready: SIGMA.')
  busy = false
  syncRunEnabled()
  const run = document.querySelector('[data-fpr-run]')
  if (run) run.disabled = true
}

export function runFusionPreview() {
  const root = rootEl()
  if (!root || busy || !(selected.a && selected.b)) return Promise.resolve()
  if (root.getAttribute('data-phase') === 'done') return Promise.resolve()

  busy = true
  clearTimers()
  setInputsEnabled(false)
  syncRunEnabled()

  if (prefersReducedMotion()) {
    showPreview()
    return Promise.resolve()
  }

  setPhase('beam')
  const ghost = document.querySelector('[data-fpr-ghost]')
  if (ghost) ghost.setAttribute('aria-hidden', 'false')
  setLive('Beaming models into preview.')

  return new Promise((resolve) => {
    later(Math.max(BEAM_MS, SETTLE_MS) + 120, () => {
      showPreview()
      resolve()
    })
  })
}

export function resetFusionPreview() {
  clearTimers()
  busy = false
  selected.a = false
  selected.b = false
  setPhase('idle')
  document.querySelectorAll('[data-fpr-input]').forEach((btn) => {
    btn.setAttribute('aria-pressed', 'false')
    btn.disabled = false
  })
  const ghost = document.querySelector('[data-fpr-ghost]')
  if (ghost) ghost.setAttribute('aria-hidden', 'true')
  setLive('Select two models, then preview.')
  syncRunEnabled()
}

function toggleInput(key) {
  if (busy) return
  const root = rootEl()
  if (!root || root.getAttribute('data-phase') === 'done') return

  selected[key] = !selected[key]
  const btn = document.querySelector(`[data-fpr-input="${key}"]`)
  if (btn) btn.setAttribute('aria-pressed', selected[key] ? 'true' : 'false')

  if (selected.a && selected.b) {
    setLive('Both models selected. Run preview.')
  } else if (selected.a || selected.b) {
    setLive('Select the other model.')
  } else {
    setLive('Select two models, then preview.')
  }
  syncRunEnabled()
}

function bindUi() {
  document.querySelectorAll('[data-fpr-input]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-fpr-input')
      if (key === 'a' || key === 'b') toggleInput(key)
    })
  })
  document.querySelector('[data-fpr-run]')?.addEventListener('click', () => {
    void runFusionPreview()
  })
  document.querySelector('[data-fpr-reset]')?.addEventListener('click', resetFusionPreview)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetFusionPreview()
  })
}

bindUi()
resetFusionPreview()
