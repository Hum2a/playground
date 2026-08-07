/**
 * Multi-Fusion Assembly — three models converge into OMEGA once.
 * iframe-safe; no storage / parent / network.
 */

const CONVERGE_MS = 720
const STAGGER_MS = 80
const MERGE_MS = 480

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-mfa]')
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
  const el = document.querySelector('[data-mfa-live]')
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setButtons(on) {
  document.querySelectorAll('[data-mfa-run], [data-mfa-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResult() {
  setPhase('done')
  const core = document.querySelector('[data-mfa-core]')
  if (core) core.setAttribute('aria-hidden', 'false')
  setLive('Assembly complete. OMEGA derived.')
  busy = false
  setButtons(true)
  const run = document.querySelector('[data-mfa-run]')
  if (run) run.disabled = true
}

export function runMultiFusionAssembly() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (root.getAttribute('data-phase') === 'done') return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResult()
    return Promise.resolve()
  }

  setPhase('converge')
  setLive('Models converging.')

  return new Promise((resolve) => {
    later(CONVERGE_MS + STAGGER_MS * 2, () => {
      setPhase('merge')
      const core = document.querySelector('[data-mfa-core]')
      if (core) core.setAttribute('aria-hidden', 'false')
      setLive('Synthesizing OMEGA.')

      later(MERGE_MS, () => {
        showResult()
        resolve()
      })
    })
  })
}

export function resetMultiFusionAssembly() {
  clearTimers()
  busy = false
  setPhase('idle')
  const core = document.querySelector('[data-mfa-core]')
  if (core) core.setAttribute('aria-hidden', 'true')
  setLive('Three models ready to assemble.')
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-mfa-run]')?.addEventListener('click', () => {
    void runMultiFusionAssembly()
  })
  document
    .querySelector('[data-mfa-reset]')
    ?.addEventListener('click', resetMultiFusionAssembly)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetMultiFusionAssembly()
  })
}

bindUi()
resetMultiFusionAssembly()
