/**
 * Pull To Refresh — thresholded overscroll refresh with one rotation cycle.
 */

const MAX_PULL = 110
const THRESHOLD = 72
const HOLD_OFFSET = 58
const REFRESH_MS = 620
const RESIST_DIVISOR = 100
const ARC_LEN = 88

/** @type {boolean} */
let pulling = false
/** @type {boolean} */
let refreshing = false
/** @type {number} */
let dragDistance = 0
/** @type {number} */
let displayOffset = 0
/** @type {number} */
let pointerStartY = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function viewportEl() {
  return document.querySelector('[data-ptr-viewport]')
}

function innerEl() {
  return document.querySelector('[data-ptr-inner]')
}

function arcEl() {
  return document.querySelector('[data-ptr-arc]')
}

function stateEl() {
  return document.querySelector('[data-ptr-state]')
}

function statusEl() {
  return document.querySelector('[data-ptr-status]')
}

function timeEl() {
  return document.querySelector('[data-ptr-time]')
}

function rootEl() {
  return document.querySelector('[data-pull-to-refresh]')
}

function tickA() {
  return document.querySelector('[data-ptr-tick-a]')
}

function tickB() {
  return document.querySelector('[data-ptr-tick-b]')
}

/**
 * @param {number} distance
 */
export function calcPullOffset(distance) {
  const raw = MAX_PULL * (1 - Math.exp(-distance / RESIST_DIVISOR))
  return Math.min(raw, MAX_PULL)
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

/**
 * @param {number} offset
 */
function applyPull(offset) {
  displayOffset = offset
  const inner = innerEl()
  const arc = arcEl()
  const state = stateEl()
  if (!inner || !arc || !state) return

  inner.style.transform = offset > 0 ? `translate3d(0, ${offset}px, 0)` : ''
  const ratio = offset / THRESHOLD
  const dash = Math.max(ARC_LEN - ratio * ARC_LEN, 0)
  arc.style.strokeDashoffset = String(Math.min(dash, ARC_LEN))

  const atThreshold = offset >= THRESHOLD
  tickA()?.classList.toggle('is-visible', atThreshold)
  tickB()?.classList.toggle('is-visible', atThreshold)
  state.textContent = atThreshold ? 'RELEASE' : 'PULL'
  setPhase(atThreshold ? 'release' : offset > 0 ? 'pulling' : 'idle')
}

function springTo(target, onDone) {
  if (prefersReducedMotion()) {
    applyPull(target)
    onDone?.()
    return
  }
  const from = displayOffset
  const t0 = performance.now()
  const duration = 280
  const tick = (now) => {
    const t = Math.min((now - t0) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    applyPull(from + (target - from) * eased)
    if (t < 1) requestAnimationFrame(tick)
    else onDone?.()
  }
  requestAnimationFrame(tick)
}

function runRefresh() {
  if (refreshing) return
  refreshing = true
  setPhase('refreshing')
  setStatus('Refreshing feed…')
  rootEl()?.classList.add('is-refreshing')

  const arc = arcEl()
  if (arc) {
    if (prefersReducedMotion()) {
      arc.style.strokeDashoffset = '0'
    } else {
      arc.style.transition = `stroke-dashoffset ${REFRESH_MS}ms linear, transform ${REFRESH_MS}ms linear`
      arc.style.strokeDashoffset = '0'
      arc.style.transform = 'rotate(270deg)'
    }
  }

  window.setTimeout(() => {
    const time = timeEl()
    if (time) time.textContent = '12:43:02'
    setStatus('Refresh complete — timestamp updated to 12:43:02.')
    springTo(0, () => {
      refreshing = false
      rootEl()?.classList.remove('is-refreshing')
      if (arc) {
        arc.style.transition = ''
        arc.style.transform = 'rotate(-90deg)'
        arc.style.strokeDashoffset = String(ARC_LEN)
      }
      dragDistance = 0
      setPhase('idle')
      setStatus('Pull down at top to refresh. Threshold 72px.')
    })
  }, REFRESH_MS)
}

function onPointerDown(event) {
  const viewport = viewportEl()
  if (!viewport || refreshing || event.button !== 0) return
  if (viewport.scrollTop > 0) return
  pulling = true
  pointerStartY = event.clientY
  dragDistance = 0
  viewport.setPointerCapture(event.pointerId)
}

function onPointerMove(event) {
  if (!pulling || refreshing) return
  const viewport = viewportEl()
  if (!viewport || viewport.scrollTop > 0) return
  const delta = event.clientY - pointerStartY
  if (delta <= 0) return
  event.preventDefault()
  dragDistance = delta
  applyPull(calcPullOffset(dragDistance))
  setStatus(
    displayOffset >= THRESHOLD
      ? 'RELEASE — let go to refresh.'
      : `Pulling ${Math.round(displayOffset)}px.`,
  )
}

function onPointerUp(event) {
  if (!pulling) return
  pulling = false
  viewportEl()?.releasePointerCapture(event.pointerId)
  if (refreshing) return

  if (displayOffset >= THRESHOLD) {
    applyPull(HOLD_OFFSET)
    runRefresh()
  } else {
    springTo(0, () => {
      dragDistance = 0
      setStatus('Pull down at top to refresh. Threshold 72px.')
    })
  }
}

export function resetPullToRefresh() {
  pulling = false
  refreshing = false
  dragDistance = 0
  const viewport = viewportEl()
  if (viewport) viewport.scrollTop = 0
  const time = timeEl()
  if (time) time.textContent = '12:42:18'
  rootEl()?.classList.remove('is-refreshing')
  const arc = arcEl()
  if (arc) {
    arc.style.transition = ''
    arc.style.transform = 'rotate(-90deg)'
    arc.style.strokeDashoffset = String(ARC_LEN)
  }
  applyPull(0)
  setPhase('idle')
  setStatus('Pull down at top to refresh. Threshold 72px.')
}

function bindUi() {
  const viewport = viewportEl()
  if (!viewport) return
  viewport.addEventListener('pointerdown', onPointerDown)
  viewport.addEventListener('pointermove', onPointerMove)
  viewport.addEventListener('pointerup', onPointerUp)
  viewport.addEventListener('pointercancel', onPointerUp)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetPullToRefresh()
    }
  })
}

bindUi()
resetPullToRefresh()

export const PULL_TO_REFRESH_CONTRACT = {
  MAX_PULL,
  THRESHOLD,
  HOLD_OFFSET,
  REFRESH_MS,
  calcPullOffset,
}
