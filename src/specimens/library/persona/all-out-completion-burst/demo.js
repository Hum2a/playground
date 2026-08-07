/**
 * All-Out Completion Burst — entities collapse into one VICTORY result.
 * iframe-safe; no storage / parent / network.
 */

const COLLAPSE_MS = 320
const BURST_MS = 460
const RESULT_MS = 320

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-aocb]')
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
  const el = document.querySelector('[data-aocb-live]')
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setButtons(on) {
  document.querySelectorAll('[data-aocb-go], [data-aocb-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showVictory() {
  setPhase('done')
  setLive('All-out complete. Victory.')
  busy = false
  setButtons(true)
  const go = document.querySelector('[data-aocb-go]')
  if (go) go.disabled = true
}

export function runAllOutCompletionBurst() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (root.getAttribute('data-phase') === 'done') return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showVictory()
    return Promise.resolve()
  }

  setPhase('collapse')
  setLive('Entities collapsing.')

  return new Promise((resolve) => {
    later(COLLAPSE_MS, () => {
      setPhase('burst')
      setLive('Completion burst.')

      later(BURST_MS, () => {
        showVictory()
        later(RESULT_MS, () => resolve())
      })
    })
  })
}

export function resetAllOutCompletionBurst() {
  clearTimers()
  busy = false
  setPhase('idle')
  setLive('Entities active.')
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-aocb-go]')?.addEventListener('click', () => {
    void runAllOutCompletionBurst()
  })
  document
    .querySelector('[data-aocb-reset]')
    ?.addEventListener('click', resetAllOutCompletionBurst)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetAllOutCompletionBurst()
  })
}

bindUi()
resetAllOutCompletionBurst()
