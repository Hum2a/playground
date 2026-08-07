/**
 * Confrontation Card Slam — slam 460ms then hold shown.
 * iframe-safe; no storage / parent / network.
 */

const SLAM_MS = 460

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-ccs]')
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
  const el = document.querySelector('[data-ccs-live]')
  if (el) el.textContent = text
}

export function resetConfrontationSlam() {
  clearTimers()
  busy = false
  const root = rootEl()
  if (root) root.setAttribute('data-phase', 'idle')
  setLive('Exploration in progress.')
}

export function runConfrontationSlam() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  root.setAttribute('data-phase', 'idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.setAttribute('data-phase', 'shown')
    setLive('Confrontation card active.')
    busy = false
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'slam')
  setLive('Confrontation card active.')

  return new Promise((resolve) => {
    later(SLAM_MS, () => {
      root.setAttribute('data-phase', 'shown')
      busy = false
      resolve()
    })
  })
}

function bindUi() {
  document.querySelector('[data-ccs-confront]')?.addEventListener('click', () => {
    void runConfrontationSlam()
  })
  document.querySelector('[data-ccs-dismiss]')?.addEventListener('click', resetConfrontationSlam)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetConfrontationSlam()
  })
}

bindUi()
resetConfrontationSlam()
