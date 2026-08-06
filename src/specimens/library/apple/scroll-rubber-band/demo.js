/**
 * Scroll Rubber Band — non-linear top overscroll with spring return.
 * Sandbox-safe (no parent / storage / network).
 *
 * displayOffset = 90 * (1 - exp(-dragDistance / 120)), clamp 90px
 * Boundary stretch 0→24px · RELEASE at 60px · settle ~420ms · overshoot ≤4px
 */

const MAX_OFFSET = 90
const RESIST_DIVISOR = 120
const RELEASE_THRESHOLD = 60
const BOUNDARY_MAX = 24
const SETTLE_MS = 420
const MAX_OVERSHOOT = 4
const RM_MAX_OFFSET = 12

/** @type {number | null} */
let rafId = null
let pulling = false
let dragDistance = 0
let displayOffset = 0
/** @type {number} */
let pointerStartY = 0
/** @type {number} */
let pullStartScrollTop = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function viewportEl() {
  return document.querySelector('[data-srb-viewport]')
}

function innerEl() {
  return document.querySelector('[data-srb-inner]')
}

function boundaryEl() {
  return document.querySelector('[data-srb-boundary]')
}

function releaseEl() {
  return document.querySelector('[data-srb-release]')
}

function statusEl() {
  return document.querySelector('[data-srb-status]')
}

function rootEl() {
  return document.querySelector('[data-scroll-rubber-band]')
}

/**
 * @param {number} distance
 * @returns {number}
 */
export function calcDisplayOffset(distance) {
  const raw = MAX_OFFSET * (1 - Math.exp(-distance / RESIST_DIVISOR))
  const capped = Math.min(raw, MAX_OFFSET)
  return prefersReducedMotion() ? Math.min(capped, RM_MAX_OFFSET) : capped
}

/**
 * @param {number} offset
 */
function applyOffset(offset) {
  displayOffset = offset
  const inner = innerEl()
  const boundary = boundaryEl()
  const release = releaseEl()
  const root = rootEl()
  if (!inner || !boundary || !release || !root) return

  inner.style.transform = offset > 0 ? `translate3d(0, ${offset}px, 0)` : ''
  const stretch = (offset / MAX_OFFSET) * BOUNDARY_MAX
  boundary.style.setProperty('--srb-stretch', `${stretch}px`)
  boundary.style.setProperty('--srb-stretch-ratio', String(offset / MAX_OFFSET))
  release.classList.toggle('is-visible', offset >= RELEASE_THRESHOLD)
  root.setAttribute(
    'data-phase',
    offset > 0.5 ? 'overscroll' : pulling ? 'pulling' : 'idle',
  )

  if (offset > 0.5) {
    setStatus(`Overscroll ${Math.round(offset)}px displayed.`)
  } else if (!pulling) {
    setStatus('At scroll top. Pull down to test rubber-band resistance.')
  }
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function cancelSpring() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

/**
 * Damped spring return with ≤4px overshoot.
 * @param {number} from
 */
function springBack(from) {
  cancelSpring()
  if (prefersReducedMotion() || from <= 0) {
    applyOffset(0)
    dragDistance = 0
    return
  }

  let position = from
  let velocity = 0
  let last = performance.now()
  const stiffness = 320
  const damping = 28

  const tick = (now) => {
    const dt = Math.min((now - last) / 1000, 0.032)
    last = now
    const accel = -stiffness * position - damping * velocity
    velocity += accel * dt
    position += velocity * dt

    if (position < -MAX_OVERSHOOT) {
      position = -MAX_OVERSHOOT
      velocity *= -0.25
    }

    if (Math.abs(position) < 0.35 && Math.abs(velocity) < 1.5) {
      applyOffset(0)
      dragDistance = 0
      rafId = null
      return
    }

    applyOffset(Math.max(position, -MAX_OVERSHOOT))
    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)
}

/**
 * @param {PointerEvent} event
 */
function onPointerDown(event) {
  const viewport = viewportEl()
  if (!viewport || event.button !== 0) return
  pulling = true
  pointerStartY = event.clientY
  pullStartScrollTop = viewport.scrollTop
  dragDistance = 0
  cancelSpring()
  viewport.setPointerCapture(event.pointerId)
}

/**
 * @param {PointerEvent} event
 */
function onPointerMove(event) {
  if (!pulling) return
  const viewport = viewportEl()
  if (!viewport) return

  const deltaY = event.clientY - pointerStartY

  if (viewport.scrollTop <= 0 && pullStartScrollTop <= 0 && deltaY > 0) {
    event.preventDefault()
    dragDistance = Math.max(dragDistance, deltaY)
    applyOffset(calcDisplayOffset(dragDistance))
    return
  }

  if (displayOffset > 0) {
    event.preventDefault()
    dragDistance = Math.max(0, dragDistance + event.movementY)
    applyOffset(calcDisplayOffset(dragDistance))
  }
}

/**
 * @param {PointerEvent} event
 */
function onPointerUp(event) {
  if (!pulling) return
  pulling = false
  const viewport = viewportEl()
  viewport?.releasePointerCapture(event.pointerId)
  const from = displayOffset
  springBack(from)
}

/**
 * @param {WheelEvent} event
 */
function onWheel(event) {
  const viewport = viewportEl()
  if (!viewport || viewport.scrollTop > 0 || event.deltaY >= 0) return

  event.preventDefault()
  cancelSpring()
  dragDistance = Math.max(0, dragDistance - event.deltaY * 0.55)
  applyOffset(calcDisplayOffset(dragDistance))
  springBack(displayOffset)
}

export function resetScrollRubberBand() {
  cancelSpring()
  pulling = false
  dragDistance = 0
  const viewport = viewportEl()
  if (viewport) viewport.scrollTop = 0
  applyOffset(0)
  setStatus('At scroll top. Pull down to test rubber-band resistance.')
}

function bindUi() {
  const viewport = viewportEl()
  if (!viewport) return

  viewport.addEventListener('pointerdown', onPointerDown)
  viewport.addEventListener('pointermove', onPointerMove)
  viewport.addEventListener('pointerup', onPointerUp)
  viewport.addEventListener('pointercancel', onPointerUp)
  viewport.addEventListener('wheel', onWheel, { passive: false })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetScrollRubberBand()
    }
  })
}

bindUi()
resetScrollRubberBand()

export const SCROLL_RUBBER_BAND_CONTRACT = {
  MAX_OFFSET,
  RESIST_DIVISOR,
  RELEASE_THRESHOLD,
  BOUNDARY_MAX,
  SETTLE_MS,
  MAX_OVERSHOOT,
  RM_MAX_OFFSET,
  calcDisplayOffset,
}
