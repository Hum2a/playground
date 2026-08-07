/**
 * Arcana Card Draw — deck rise then flip to CATEGORY VII.
 * iframe-safe; no storage / parent / network.
 */

const RISE_MS = 480
const FLIP_MS = 520

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-acd]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-acd-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-acd-draw], [data-acd-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  setPhase('done')
  setLive('Category VII revealed.')
}

function resetVisual() {
  setPhase('idle')
  setLive('Deck ready.')
}

export function runArcanaCardDraw() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

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

  setPhase('rise')
  setLive('Card rising from deck.')

  return new Promise((resolve) => {
    later(RISE_MS, () => {
      setPhase('flip')
      setLive('Card flipping.')

      later(FLIP_MS, () => {
        showDone()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetArcanaCardDraw() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-acd-draw]')?.addEventListener('click', () => {
    void runArcanaCardDraw()
  })
  document.querySelector('[data-acd-reset]')?.addEventListener('click', resetArcanaCardDraw)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetArcanaCardDraw()
  })
}

bindUi()
resetArcanaCardDraw()
