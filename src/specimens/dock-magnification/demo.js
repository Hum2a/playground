/**
 * Dock Magnification — pointer-proximity magnification rail.
 * Sandbox-safe: no parent access, storage, or network.
 *
 * Scale: 1 + 0.65 * exp(-(d²)/(2·70²)), clamp 1.65
 * Tiles redistribute horizontally; baseline-anchored growth.
 * Pointer leave settles to scale 1 over 240ms.
 */

const TILE = 42
const GAP = 8
const PADDING = 12
const COUNT = 9
const SIGMA = 70
const AMP = 0.65
const MAX_SCALE = 1.65
const SETTLE_MS = 240

/** @type {number[]} */
const REST_CENTERS = (() => {
  const centers = []
  let x = PADDING
  for (let i = 0; i < COUNT; i += 1) {
    centers.push(x + TILE / 2)
    x += TILE + GAP
  }
  return centers
})()

/** @type {HTMLElement[]} */
let tiles = []
let rail = null
let root = null
let pointerInside = false
let settleRaf = 0
/** @type {number[]} */
let settleFrom = []
let settleStart = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scaleAt(pointerX, restCenterX) {
  const d = pointerX - restCenterX
  const raw = 1 + AMP * Math.exp(-(d * d) / (2 * SIGMA * SIGMA))
  return Math.min(raw, MAX_SCALE)
}

/**
 * @param {number[]} scales
 * @returns {number[]}
 */
function layoutLefts(scales) {
  const lefts = []
  let x = PADDING
  for (let i = 0; i < COUNT; i += 1) {
    const w = TILE * scales[i]
    lefts.push(x)
    x += w + GAP
  }
  return lefts
}

/**
 * @param {number[]} scales
 */
function applyLayout(scales) {
  const lefts = layoutLefts(scales)
  for (let i = 0; i < COUNT; i += 1) {
    const tile = tiles[i]
    if (!tile) continue
    tile.style.setProperty('--dm-s', String(scales[i]))
    tile.style.setProperty('--dm-x', `${lefts[i]}px`)
  }
}

function setStatus(text) {
  const el = document.querySelector('[data-dmagn-status]')
  if (el) el.textContent = text
}

function restLayout() {
  applyLayout(Array(COUNT).fill(1))
}

/**
 * @param {number} pointerX
 */
function magnifyAt(pointerX) {
  if (prefersReducedMotion()) return
  const scales = REST_CENTERS.map((cx) => scaleAt(pointerX, cx))
  applyLayout(scales)
  setStatus('Dock magnified.')
}

function cancelSettle() {
  if (settleRaf) {
    window.cancelAnimationFrame(settleRaf)
    settleRaf = 0
  }
}

function startSettle() {
  if (prefersReducedMotion()) {
    restLayout()
    setStatus('Dock at rest.')
    return
  }

  cancelSettle()
  settleFrom = tiles.map((tile) => {
    const s = tile.style.getPropertyValue('--dm-s')
    return s ? Number(s) : 1
  })
  settleStart = performance.now()
  root?.setAttribute('data-phase', 'settling')

  const tick = (now) => {
    const t = Math.min(1, (now - settleStart) / SETTLE_MS)
    const ease = 1 - (1 - t) ** 3
    const scales = settleFrom.map((from) => 1 + (from - 1) * (1 - ease))
    applyLayout(scales)

    if (t < 1) {
      settleRaf = window.requestAnimationFrame(tick)
    } else {
      settleRaf = 0
      root?.setAttribute('data-phase', 'idle')
      restLayout()
      setStatus('Dock at rest.')
    }
  }

  settleRaf = window.requestAnimationFrame(tick)
}

function bindRail() {
  rail = document.querySelector('[data-dmagn-rail]')
  root = document.querySelector('[data-dock-magnification]')
  tiles = Array.from(document.querySelectorAll('[data-dmagn-tile]'))

  if (!rail || !root || tiles.length !== COUNT) return

  restLayout()

  rail.addEventListener('pointerenter', () => {
    pointerInside = true
    cancelSettle()
    root.setAttribute('data-phase', 'active')
  })

  rail.addEventListener('pointerleave', () => {
    pointerInside = false
    startSettle()
  })

  rail.addEventListener('pointermove', (event) => {
    if (!pointerInside) return
    const rect = rail.getBoundingClientRect()
    const x = event.clientX - rect.left
    magnifyAt(x)
  })

  tiles.forEach((tile, index) => {
    tile.addEventListener('focus', () => {
      if (prefersReducedMotion()) {
        setStatus(`Application ${String(index + 1).padStart(2, '0')} focused.`)
        return
      }
      magnifyAt(REST_CENTERS[index])
    })

    tile.addEventListener('blur', () => {
      if (!pointerInside) startSettle()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      cancelSettle()
      pointerInside = false
      root.setAttribute('data-phase', 'idle')
      restLayout()
      setStatus('Dock at rest.')
    }
  })
}

bindRail()

export const DOCK_MAGNIFICATION_CONTRACT = {
  TILE,
  GAP,
  PADDING,
  COUNT,
  SIGMA,
  AMP,
  MAX_SCALE,
  SETTLE_MS,
  REST_CENTERS,
}
