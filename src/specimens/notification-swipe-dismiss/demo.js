/**
 * Notification Swipe Dismiss — horizontal drag with opacity fade and height collapse.
 */

const CARD_W = 336
const CARD_H = 76
const OPACITY_START = 0.35
const COMMIT_RATIO = 0.45
const VELOCITY_THRESHOLD = 0.65
const EXIT_MS = 160
const COLLAPSE_MS = 180

/** @type {boolean} */
let dragging = false
/** @type {number} */
let offsetX = 0
/** @type {number} */
let startX = 0
/** @type {number} */
let lastX = 0
/** @type {number} */
let lastT = 0
/** @type {number} */
let velocity = 0
/** @type {number} */
let pointerId = -1

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function card() {
  return document.querySelector('[data-nsd-card]')
}

function wrap() {
  return document.querySelector('[data-nsd-card-wrap]')
}

function statusEl() {
  return document.querySelector('[data-nsd-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function applyOffset(x) {
  offsetX = x
  const c = card()
  if (!c) return
  const abs = Math.abs(x)
  const progress = abs / CARD_W
  const opacity = progress <= OPACITY_START ? 1 : 1 - (progress - OPACITY_START) / (1 - OPACITY_START)
  c.style.transform = `translate3d(${x}px, 0, 0)`
  c.style.opacity = String(Math.max(0, opacity))
}

function animateTo(target, duration, onDone) {
  if (prefersReducedMotion()) {
    applyOffset(target)
    onDone?.()
    return
  }
  const from = offsetX
  const t0 = performance.now()
  const tick = (now) => {
    const t = Math.min((now - t0) / duration, 1)
    applyOffset(from + (target - from) * t)
    if (t < 1) requestAnimationFrame(tick)
    else onDone?.()
  }
  requestAnimationFrame(tick)
}

function collapseCard() {
  const w = wrap()
  const c = card()
  if (!w || !c) return

  const direction = offsetX >= 0 ? 1 : -1
  const exitTarget = direction * (CARD_W + 40)

  if (prefersReducedMotion()) {
    c.style.transform = `translate3d(${exitTarget}px, 0, 0)`
    c.style.opacity = '0'
    w.classList.add('is-collapsing')
    window.setTimeout(() => {
      w.classList.add('is-removed')
      setStatus('Notification dismissed. Remaining cards preserved order.')
    }, 20)
    return
  }

  animateTo(exitTarget, EXIT_MS, () => {
    w.classList.add('is-collapsing')
    window.setTimeout(() => {
      w.classList.add('is-removed')
      setStatus('Notification dismissed. Remaining cards preserved order.')
    }, COLLAPSE_MS)
  })
}

function settle() {
  const abs = Math.abs(offsetX)
  const commit = abs >= CARD_W * COMMIT_RATIO || Math.abs(velocity) > VELOCITY_THRESHOLD
  if (commit) collapseCard()
  else animateTo(0, 180, () => setStatus('Gesture cancelled — card restored.'))
}

function onPointerDown(event) {
  if (event.button !== 0 || wrap()?.classList.contains('is-removed')) return
  dragging = true
  startX = event.clientX - offsetX
  lastX = event.clientX
  lastT = performance.now()
  velocity = 0
  pointerId = event.pointerId
  card()?.setPointerCapture(event.pointerId)
}

function onPointerMove(event) {
  if (!dragging) return
  const now = performance.now()
  const dt = now - lastT
  if (dt > 0) velocity = (event.clientX - lastX) / dt
  lastX = event.clientX
  lastT = now
  event.preventDefault()
  applyOffset(event.clientX - startX)
}

function onPointerUp() {
  if (!dragging) return
  dragging = false
  card()?.releasePointerCapture(pointerId)
  settle()
}

export function resetNotificationSwipeDismiss() {
  offsetX = 0
  dragging = false
  const w = wrap()
  const c = card()
  w?.classList.remove('is-collapsing', 'is-removed')
  if (c) {
    c.style.transform = ''
    c.style.opacity = ''
  }
  setStatus('Swipe the top notification horizontally. Commit at 45% width or velocity.')
}

function bindUi() {
  const c = card()
  c?.addEventListener('pointerdown', onPointerDown)
  c?.addEventListener('pointermove', onPointerMove)
  c?.addEventListener('pointerup', onPointerUp)
  c?.addEventListener('pointercancel', onPointerUp)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetNotificationSwipeDismiss()
    }
  })
}

bindUi()
resetNotificationSwipeDismiss()

export const NOTIFICATION_SWIPE_DISMISS_CONTRACT = {
  CARD_W,
  CARD_H,
  OPACITY_START,
  COMMIT_RATIO,
  VELOCITY_THRESHOLD,
  EXIT_MS,
  COLLAPSE_MS,
}
