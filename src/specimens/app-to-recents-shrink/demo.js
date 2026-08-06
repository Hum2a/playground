/**
 * App-to-Recents Shrink — active app becomes centre task card.
 * Sandbox-safe (no parent / storage / network).
 */

const TRANSITION_MS = 380
const CARD_W = 300
const CARD_H = 520
const SIDE_OFFSET = 250

let phase = 'app'
let busy = false
let dragStart = 0
let dragging = false
/** @type {number | null} */
let holdTimer = null
/** @type {number | null} */
let activePointer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-app-to-recents]')
}

function statusEl() {
  return document.querySelector('[data-atrs-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function toggleControls() {
  const overview = document.querySelector('[data-atrs-overview]')
  const restore = document.querySelector('[data-atrs-restore]')
  if (overview) overview.hidden = phase === 'overview'
  if (restore) restore.hidden = phase === 'app'
}

function enterOverview() {
  if (busy || phase === 'overview') return
  busy = true
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-phase', 'overview')
  phase = 'overview'
  setStatus('Overview — GALLERY is centre task card with neighbours at ±250px.')
  toggleControls()
  const ms = prefersReducedMotion() ? 0 : TRANSITION_MS
  window.setTimeout(() => {
    busy = false
  }, ms)
}

function restoreApp() {
  if (busy || phase === 'app') return
  busy = true
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-phase', 'app')
  phase = 'app'
  setStatus('Full-screen GALLERY restored.')
  toggleControls()
  const ms = prefersReducedMotion() ? 0 : TRANSITION_MS
  window.setTimeout(() => {
    busy = false
  }, ms)
}

export function resetAppToRecentsShrink() {
  if (holdTimer) window.clearTimeout(holdTimer)
  holdTimer = null
  dragging = false
  activePointer = null
  busy = false
  phase = 'app'
  rootEl()?.setAttribute('data-phase', 'app')
  toggleControls()
  setStatus('Press OVERVIEW or swipe up from bottom to shrink app into recents.')
}

function onPointerDown(e) {
  if (phase !== 'app' || busy) return
  dragging = true
  activePointer = e.pointerId
  dragStart = e.clientY
  e.currentTarget.setPointerCapture(e.pointerId)
  holdTimer = window.setTimeout(() => {
    if (dragging && dragStart - e.clientY > 24) enterOverview()
  }, 180)
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return
  const up = dragStart - e.clientY
  if (up > 48 && holdTimer) {
    window.clearTimeout(holdTimer)
    holdTimer = null
    enterOverview()
  }
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return
  dragging = false
  activePointer = null
  if (holdTimer) {
    window.clearTimeout(holdTimer)
    holdTimer = null
  }
  e.currentTarget.releasePointerCapture(e.pointerId)
}

function bindUi() {
  document.querySelector('[data-atrs-overview]')?.addEventListener('click', enterOverview)
  document.querySelector('[data-atrs-restore]')?.addEventListener('click', restoreApp)
  const gesture = document.querySelector('[data-atrs-gesture]')
  gesture?.addEventListener('pointerdown', onPointerDown)
  gesture?.addEventListener('pointermove', onPointerMove)
  gesture?.addEventListener('pointerup', onPointerUp)
  gesture?.addEventListener('pointercancel', onPointerUp)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetAppToRecentsShrink()
    }
  })
}

bindUi()
resetAppToRecentsShrink()

export const APP_TO_RECENTS_SHRINK_CONTRACT = {
  TRANSITION_MS,
  CARD_W,
  CARD_H,
  SIDE_OFFSET,
}
