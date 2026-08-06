/**
 * Contradiction Found — evidence cards collide; conflicting values flash.
 * iframe-safe; no storage / parent / network.
 */

const COLLIDE_MS = 420
const FLASH_MS = 360

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-cf]')
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
  const el = document.querySelector('[data-cf-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-cf-run], [data-cf-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDone() {
  setPhase('done')
  const banner = document.querySelector('[data-cf-banner]')
  if (banner) banner.setAttribute('aria-hidden', 'false')
  setLive('Contradiction found. Times conflict.')
}

function resetVisual() {
  setPhase('idle')
  const banner = document.querySelector('[data-cf-banner]')
  if (banner) banner.setAttribute('aria-hidden', 'true')
  setLive('Review evidence for conflicts.')
}

export function runContradictionFound() {
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

  setPhase('collide')
  setLive('Cards colliding.')

  return new Promise((resolve) => {
    later(COLLIDE_MS, () => {
      setPhase('flash')
      setLive('Highlighting conflict.')

      later(FLASH_MS, () => {
        showDone()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetContradictionFound() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-cf-run]')?.addEventListener('click', () => {
    void runContradictionFound()
  })
  document.querySelector('[data-cf-reset]')?.addEventListener('click', resetContradictionFound)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetContradictionFound()
  })
}

bindUi()
resetContradictionFound()
