/**
 * State Intensity Field — topographic pressure contour API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Frozen levels:
 *   1 — 20 NOMINAL   (1 band,  0 shards, radius 8px)
 *   2 — 45 ELEVATED  (2 bands, 2 shards, radius 14px)
 *   3 — 70 HIGH      (3 bands, 4 shards, radius 22px)
 *   4 — 95 CRITICAL  (4 bands + rupture, 8 shards, radius 34px, 4 ticks)
 *
 * Transitions: 300ms, 300ms, 360ms (+220ms hold each step)
 */

const LEVELS = [
  { load: 20, status: 'NOMINAL', ms: 0 },
  { load: 45, status: 'ELEVATED', ms: 300 },
  { load: 70, status: 'HIGH', ms: 300 },
  { load: 95, status: 'CRITICAL', ms: 360 },
]

/** @type {number[]} */
let timers = []
let busy = false

function root() {
  return document.querySelector('[data-state-intensity]')
}

function reduced() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function setLadder(el, level) {
  el.querySelectorAll('[data-sif-rung]').forEach((rung) => {
    rung.classList.toggle(
      'sif__rung--active',
      Number(rung.getAttribute('data-sif-rung')) === level,
    )
  })
}

function set(el, n) {
  const x = LEVELS[n]
  el.dataset.level = String(n + 1)
  el.querySelector('[data-sif-status]').textContent = x.status
  el.querySelector('[data-sif-sr]').textContent =
    `ENGINE 04 pressure band ${x.load}. ${x.status}.`
  setLadder(el, n + 1)
}

function controls(el, increase, reset) {
  const inc = el.querySelector('[data-sif-increase]')
  const res = el.querySelector('[data-sif-reset]')
  inc.hidden = !increase
  inc.disabled = !increase
  res.hidden = !reset
}

function increase() {
  const el = root()
  if (!el || busy) return
  busy = true
  controls(el, false, false)

  if (reduced()) {
    set(el, 3)
    controls(el, false, true)
    busy = false
    return
  }

  let at = 0
  ;[1, 2, 3].forEach((n) => {
    at += LEVELS[n].ms
    later(at, () => set(el, n))
    at += 220
  })
  later(at, () => {
    busy = false
    controls(el, false, true)
  })
}

function reset() {
  const el = root()
  if (!el) return
  timers.forEach(window.clearTimeout)
  timers = []
  busy = false
  set(el, 0)
  controls(el, true, false)
}

function init() {
  const el = root()
  if (!el || el.dataset.bound) return
  el.dataset.bound = '1'
  el.querySelector('[data-sif-increase]').addEventListener('click', increase)
  el.querySelector('[data-sif-reset]').addEventListener('click', reset)
}

window.stateIntensityField = { increase, reset, init }

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true })
} else {
  init()
}
