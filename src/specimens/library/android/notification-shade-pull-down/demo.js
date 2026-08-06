/**
 * Notification Shade Pull-Down — tracked shade with detents.
 * Sandbox-safe (no parent / storage / network).
 */

const MAX_H = 620
const PARTIAL_H = 260
const CLOSE_THRESH = 160
const PARTIAL_THRESH = 400
const QS_REVEAL = 220
const SETTLE_MS = 220

const DETENTS = { closed: 0, partial: PARTIAL_H, full: MAX_H }

let visibleH = 0
let dragging = false
let startY = 0
let startH = 0
let lastY = 0
let lastT = 0
let velocity = 0
/** @type {number | null} */
let activePointer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-notification-shade]')
}

function shadeEl() {
  return document.querySelector('[data-nspd-shade]')
}

function statusEl() {
  return document.querySelector('[data-nspd-status]')
}

/**
 * @param {number} dragY
 */
export function calcShadeHeight(dragY) {
  if (dragY <= MAX_H) return dragY
  const extra = dragY - MAX_H
  return MAX_H + Math.sqrt(extra) * 8
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function applyHeight(h) {
  const shade = shadeEl()
  const root = rootEl()
  if (!shade || !root) return
  visibleH = Math.max(0, Math.min(h, MAX_H + 40))
  shade.style.transform = `translateY(calc(-100% + ${visibleH}px))`
  root.classList.toggle('is-qs', visibleH > QS_REVEAL)
  if (visibleH <= 0) root.setAttribute('data-phase', 'closed')
  else if (visibleH >= MAX_H - 2) root.setAttribute('data-phase', 'full')
  else if (Math.abs(visibleH - PARTIAL_H) < 30) root.setAttribute('data-phase', 'partial')
  else root.setAttribute('data-phase', 'dragging')
}

function snapTo(target) {
  const root = rootEl()
  root?.classList.remove('is-dragging')
  if (prefersReducedMotion()) {
    applyHeight(target)
    announceDetent(target)
    return
  }
  root?.classList.add('is-settling')
  const start = visibleH
  const startTime = performance.now()
  const animate = (now) => {
    const t = Math.min(1, (now - startTime) / SETTLE_MS)
    const eased = 1 - Math.pow(1 - t, 3)
    applyHeight(start + (target - start) * eased)
    if (t < 1) requestAnimationFrame(animate)
    else {
      root?.classList.remove('is-settling')
      announceDetent(target)
    }
  }
  requestAnimationFrame(animate)
}

function announceDetent(h) {
  if (h <= 0) setStatus('Shade closed. Drag down from top 32px.')
  else if (h >= MAX_H - 2) setStatus('Full shade — quick controls visible.')
  else setStatus(`Partial shade at ${PARTIAL_H}px.`)
}

function chooseDetent() {
  if (visibleH < CLOSE_THRESH && velocity < 0.4) return DETENTS.closed
  if (visibleH > PARTIAL_THRESH || velocity > 0.55) return DETENTS.full
  if (velocity < -0.55) return DETENTS.closed
  if (velocity > 0.3) return DETENTS.full
  return DETENTS.partial
}

function onPointerDown(e) {
  dragging = true
  activePointer = e.pointerId
  startY = e.clientY
  startH = visibleH
  lastY = e.clientY
  lastT = performance.now()
  velocity = 0
  rootEl()?.classList.add('is-dragging')
  e.currentTarget.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return
  const now = performance.now()
  const dt = now - lastT
  if (dt > 0) velocity = (e.clientY - lastY) / dt
  lastY = e.clientY
  lastT = now
  const dragY = Math.max(0, e.clientY - startY + startH)
  applyHeight(calcShadeHeight(dragY))
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return
  dragging = false
  activePointer = null
  e.currentTarget.releasePointerCapture(e.pointerId)
  snapTo(chooseDetent())
}

export function resetNotificationShadePullDown() {
  dragging = false
  activePointer = null
  visibleH = 0
  rootEl()?.classList.remove('is-dragging', 'is-settling', 'is-qs')
  rootEl()?.setAttribute('data-phase', 'closed')
  applyHeight(0)
  setStatus('Drag down from the top 32px to reveal the notification shade.')
}

function bindUi() {
  const grab = document.querySelector('[data-nspd-grab]')
  const shade = document.querySelector('[data-nspd-shade]')
  ;[grab, shade].forEach((el) => {
    el?.addEventListener('pointerdown', onPointerDown)
    el?.addEventListener('pointermove', onPointerMove)
    el?.addEventListener('pointerup', onPointerUp)
    el?.addEventListener('pointercancel', onPointerUp)
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetNotificationShadePullDown()
    }
  })
}

bindUi()
resetNotificationShadePullDown()

export const NOTIFICATION_SHADE_PULL_DOWN_CONTRACT = {
  MAX_H,
  PARTIAL_H,
  CLOSE_THRESH,
  PARTIAL_THRESH,
  QS_REVEAL,
}
