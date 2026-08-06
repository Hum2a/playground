/**
 * Heads-Up Notification Drop — transient overlay alert.
 * Sandbox-safe (no parent / storage / network).
 */

const ENTRY_MS = 320
const DWELL_MS = 3200
const EXIT_MS = 220
const EXPAND_MS = 220
const SWIPE_DISMISS = 55
const START_Y = -110

/** @type {number[]} */
let timers = []
let dwellDeadline = 0
let paused = false
let visible = false
let expanded = false
let dragging = false
let startY = 0
let dragY = 0
/** @type {number | null} */
let activePointer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-heads-up]')
}

function alertEl() {
  return document.querySelector('[data-hund-alert]')
}

function statusEl() {
  return document.querySelector('[data-hund-status]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function scheduleExit() {
  clearTimers()
  dwellDeadline = Date.now() + DWELL_MS
  later(DWELL_MS, () => {
    if (!paused && visible) dismissAlert()
  })
}

function dismissAlert() {
  if (!visible) return
  clearTimers()
  setPhase('exiting')
  setStatus('Alert retreating.')
  const ms = prefersReducedMotion() ? 0 : EXIT_MS
  later(ms, () => {
    hideAlert()
    setStatus('Press SHOW ALERT to trigger a heads-up notification.')
  })
}

function hideAlert() {
  visible = false
  expanded = false
  const alert = alertEl()
  if (alert) {
    alert.hidden = true
    alert.style.transform = ''
  }
  document.querySelector('[data-hund-actions]')?.setAttribute('hidden', '')
  setPhase('idle')
}

export function showHeadsUpNotification() {
  if (visible) return
  clearTimers()
  visible = true
  expanded = false
  paused = false
  const alert = alertEl()
  if (!alert) return
  alert.hidden = false
  document.querySelector('[data-hund-actions]')?.setAttribute('hidden', '')
  setPhase('entering')
  setStatus('Heads-up alert dropping.')

  if (prefersReducedMotion()) {
    setPhase('visible')
    setStatus('Alert visible. Hover or focus pauses timeout.')
    scheduleExit()
    return
  }

  alert.style.transform = `translateY(${START_Y}px)`
  alert.style.opacity = '0'
  requestAnimationFrame(() => {
    alert.style.transform = 'translateY(0)'
    alert.style.opacity = '1'
    later(ENTRY_MS, () => {
      setPhase('visible')
      setStatus('Alert visible. Hover or focus pauses timeout.')
      scheduleExit()
    })
  })
}

function expandAlert() {
  if (!visible || expanded) return
  expanded = true
  clearTimers()
  setPhase('expanded')
  document.querySelector('[data-hund-actions]')?.removeAttribute('hidden')
  setStatus('Alert expanded. Swipe up to dismiss early.')
  scheduleExit()
}

function pauseDwell() {
  if (!visible || paused) return
  paused = true
  clearTimers()
  setStatus('Timeout paused while interacting.')
}

function resumeDwell() {
  if (!visible || !paused) return
  paused = false
  const remaining = Math.max(0, dwellDeadline - Date.now())
  setStatus('Timeout resumed.')
  later(remaining, () => {
    if (!paused) dismissAlert()
  })
}

export function resetHeadsUpNotificationDrop() {
  clearTimers()
  hideAlert()
  dragging = false
  activePointer = null
  paused = false
}

function onPointerDown(e) {
  if (!visible) return
  dragging = true
  activePointer = e.pointerId
  startY = e.clientY
  dragY = 0
  e.currentTarget.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return
  dragY = Math.min(0, e.clientY - startY)
  const alert = alertEl()
  if (alert && !prefersReducedMotion()) {
    alert.style.transform = `translateY(${dragY}px)`
  }
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return
  dragging = false
  activePointer = null
  e.currentTarget.releasePointerCapture(e.pointerId)
  if (Math.abs(dragY) > SWIPE_DISMISS) {
    dismissAlert()
    return
  }
  const alert = alertEl()
  if (alert) alert.style.transform = 'translateY(0)'
}

function bindUi() {
  document.querySelector('[data-hund-trigger]')?.addEventListener('click', showHeadsUpNotification)
  document.querySelector('[data-hund-dismiss]')?.addEventListener('click', dismissAlert)

  const alert = alertEl()
  alert?.addEventListener('click', (e) => {
    if (e.target.closest('[data-hund-dismiss]')) return
    expandAlert()
  })
  alert?.addEventListener('mouseenter', pauseDwell)
  alert?.addEventListener('mouseleave', resumeDwell)
  alert?.addEventListener('focus', pauseDwell)
  alert?.addEventListener('blur', resumeDwell)
  alert?.addEventListener('pointerdown', onPointerDown)
  alert?.addEventListener('pointermove', onPointerMove)
  alert?.addEventListener('pointerup', onPointerUp)
  alert?.addEventListener('pointercancel', onPointerUp)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetHeadsUpNotificationDrop()
    }
  })
}

bindUi()
resetHeadsUpNotificationDrop()

export const HEADS_UP_NOTIFICATION_DROP_CONTRACT = {
  ENTRY_MS,
  DWELL_MS,
  EXIT_MS,
  EXPAND_MS,
  SWIPE_DISMISS,
  ALERT_W: 350,
  ALERT_H: 88,
}
