/**
 * Shared Resource Pool — collective drain from central mass.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Frozen allocation:
 *   BUILD 8 units → 40 capacity
 *   TEST  7 units → 35 capacity
 *   SHIP  3 units → 15 capacity
 *   Remaining 2 units → 10 LOW
 *
 * Pool commits: 100 → 60 → 25 → 10
 * Unit stagger: 60ms; BUILD @0, TEST @180ms, SHIP @300ms
 */

const ALLOCATIONS = [
  ['build', 8, 40],
  ['test', 7, 35],
  ['ship', 3, 15],
]
const UNIT_MS = 60
const UNIT_COUNT = 20
const UNIT_ANGLE_STEP = 360 / UNIT_COUNT

/** @type {number[]} */
let timers = []
let busy = false

function root() {
  return document.querySelector('[data-shared-resource]')
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

function setMass(el, pool) {
  const mass = pool / 100
  const glow = Math.max(0.35, mass)
  el.style.setProperty('--srp-mass', String(mass))
  el.style.setProperty('--srp-glow', String(glow))
}

function buildUnits(el) {
  const host = el.querySelector('[data-srp-units]')
  if (!host) return
  host.replaceChildren()
  for (let i = 0; i < UNIT_COUNT; i++) {
    const unit = document.createElement('span')
    unit.className = 'srp__unit'
    unit.dataset.unit = String(i)
    unit.style.setProperty('--srp-angle', `${i * UNIT_ANGLE_STEP}deg`)
    host.append(unit)
  }
}

function text(el, pool, build, test, ship, state = 'AVAILABLE') {
  el.querySelector('[data-srp-pool]').textContent = String(pool)
  el.querySelector('[data-srp-remaining]').textContent = String(pool)
  el.querySelector('[data-srp-build]').textContent = String(build)
  el.querySelector('[data-srp-test]').textContent = String(test)
  el.querySelector('[data-srp-ship]').textContent = String(ship)
  el.querySelector('[data-srp-state]').textContent = state
  el.querySelector('[data-srp-status]').textContent =
    `Pool ${pool}. Build ${build}, Test ${test}, Ship ${ship}. ${state}.`
  setMass(el, pool)
  if (build === 40) el.dataset.build = '40'
  else delete el.dataset.build
  if (test === 35) el.dataset.test = '35'
  else delete el.dataset.test
  if (ship === 15) el.dataset.ship = '15'
  else delete el.dataset.ship
}

function controls(el, go, reset) {
  const alloc = el.querySelector('[data-srp-allocate]')
  const resetBtn = el.querySelector('[data-srp-reset]')
  alloc.hidden = !go
  alloc.disabled = !go
  resetBtn.hidden = !reset
}

function final(el) {
  text(el, 10, 40, 35, 15, 'LOW')
  el.dataset.low = '10'
  controls(el, false, true)
  busy = false
}

function allocate() {
  const el = root()
  if (!el || busy) return
  busy = true
  el.dataset.active = '1'
  controls(el, false, false)

  const units = [...el.querySelectorAll('.srp__unit')]

  if (reduced()) {
    units.slice(0, 8).forEach((u) => {
      u.dataset.to = 'build'
    })
    units.slice(8, 15).forEach((u) => {
      u.dataset.to = 'test'
    })
    units.slice(15, 18).forEach((u) => {
      u.dataset.to = 'ship'
    })
    el.dataset.build = '40'
    el.dataset.test = '35'
    el.dataset.ship = '15'
    return final(el)
  }

  const start = [0, UNIT_MS * 3, UNIT_MS * 3 + UNIT_MS * 2]
  let cursor = 0

  ALLOCATIONS.forEach(([to, count], group) => {
    for (let i = 0; i < count; i++) {
      const unit = units[cursor++]
      later(start[group] + i * UNIT_MS, () => {
        unit.dataset.to = to
      })
    }
    const done = start[group] + (count - 1) * UNIT_MS + 240
    later(done, () => {
      if (group === 0) text(el, 60, 40, 0, 0)
      if (group === 1) {
        text(el, 25, 40, 35, 0)
        el.dataset.low = '25'
      }
      if (group === 2) final(el)
    })
  })
}

function reset() {
  const el = root()
  if (!el) return
  timers.forEach(window.clearTimeout)
  timers = []
  busy = false
  delete el.dataset.active
  delete el.dataset.low
  delete el.dataset.build
  delete el.dataset.test
  delete el.dataset.ship
  buildUnits(el)
  text(el, 100, 0, 0, 0)
  controls(el, true, false)
}

function init() {
  const el = root()
  if (!el || el.dataset.bound) return
  el.dataset.bound = '1'
  buildUnits(el)
  el.querySelector('[data-srp-allocate]').addEventListener('click', allocate)
  el.querySelector('[data-srp-reset]').addEventListener('click', reset)
}

window.sharedResourcePool = { allocate, reset, init }

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true })
} else {
  init()
}
