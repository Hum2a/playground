/**
 * Predictive Back App Shrink — floating-surface back gesture preview.
 */

const EDGE_ZONE_PX = 24
const MAX_DRAG_PX = 160
const COMMIT_PX = 118
const COMMIT_MS = 180
const CANCEL_MS = 220

/** @type {number | null} */
let settleTimer = null
/** @type {number | null} */
let activePointer = null
let dragPx = 0
let startX = 0
let dragging = false
/** @type {'current' | 'destination'} */
let view = 'current'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  return (
    forced ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function rootEl() {
  return document.querySelector('[data-predictive-back-app-shrink]')
}

function clearSettle() {
  if (settleTimer !== null) {
    window.clearTimeout(settleTimer)
    settleTimer = null
  }
}

function setStatus(text) {
  const el = document.querySelector('[data-pbas-status]')
  if (el) el.textContent = text
}

function progressFromDrag(px) {
  return Math.min(1, Math.max(0, px / MAX_DRAG_PX))
}

function applyVars(px) {
  const root = rootEl()
  if (!root) return
  const p = progressFromDrag(px)
  root.style.setProperty('--pbas-progress', String(p))
  root.style.setProperty('--pbas-drag-px', `${px}px`)
  root.classList.toggle('is-shrunk', 1 - p * 0.12 < 0.97)
}

function setPhase(phase) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-pbas-phase', phase)
  root.classList.remove('is-dragging', 'is-committing', 'is-canceling')
  if (phase === 'dragging') root.classList.add('is-dragging')
  if (phase === 'committing') root.classList.add('is-committing')
  if (phase === 'canceling') root.classList.add('is-canceling')
}

function setView(next) {
  view = next
  rootEl()?.setAttribute('data-pbas-view', next)
}

function showDestination(immediate) {
  clearSettle()
  dragging = false
  activePointer = null

  if (immediate) {
    setPhase('idle')
    dragPx = 0
    applyVars(0)
    setView('destination')
    setStatus('Home screen · returned.')
    return
  }

  setPhase('committing')
  dragPx = MAX_DRAG_PX
  applyVars(MAX_DRAG_PX)
  settleTimer = window.setTimeout(() => {
    setPhase('idle')
    dragPx = 0
    applyVars(0)
    setView('destination')
    setStatus('Home screen · returned.')
    settleTimer = null
  }, COMMIT_MS)
}

function showCurrent() {
  clearSettle()
  setPhase('idle')
  dragging = false
  activePointer = null
  dragPx = 0
  applyVars(0)
  setView('current')
  setStatus('Settings screen active.')
}

function finishCancel() {
  setPhase('idle')
  dragging = false
  activePointer = null
  dragPx = 0
  applyVars(0)
  setStatus('Back gesture cancelled.')
  settleTimer = null
}

function onPointerDown(e) {
  if (view !== 'current') return
  const stage = document.querySelector('[data-pbas-stage]')
  if (!stage || e.button !== 0) return

  const rect = stage.getBoundingClientRect()
  const x = e.clientX - rect.left
  if (x > EDGE_ZONE_PX) return

  e.preventDefault()
  activePointer = e.pointerId
  dragging = true
  startX = e.clientX
  dragPx = 0
  setPhase('dragging')
  applyVars(0)
  stage.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return
  const dx = e.clientX - startX
  dragPx = Math.min(MAX_DRAG_PX, Math.max(0, dx))
  applyVars(dragPx)
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return

  const stage = document.querySelector('[data-pbas-stage]')
  if (stage?.hasPointerCapture(e.pointerId)) {
    stage.releasePointerCapture(e.pointerId)
  }

  const shouldCommit = dragPx >= COMMIT_PX

  if (shouldCommit) {
    if (prefersReducedMotion()) {
      showDestination(true)
      return
    }
    setPhase('committing')
    dragPx = MAX_DRAG_PX
    applyVars(MAX_DRAG_PX)
    settleTimer = window.setTimeout(() => showDestination(false), COMMIT_MS)
  } else if (dragPx > 0) {
    if (prefersReducedMotion()) {
      finishCancel()
      return
    }
    setPhase('canceling')
    dragPx = 0
    applyVars(0)
    settleTimer = window.setTimeout(finishCancel, CANCEL_MS)
  } else {
    finishCancel()
  }
}

function onPointerCancel(e) {
  if (e.pointerId !== activePointer) return
  finishCancel()
}

export function resetPredictiveBackAppShrink() {
  showCurrent()
}

export function replayPredictiveBackAppShrink() {
  resetPredictiveBackAppShrink()
}

function bindUi() {
  const stage = document.querySelector('[data-pbas-stage]')
  if (!stage) return

  stage.addEventListener('pointerdown', onPointerDown)
  stage.addEventListener('pointermove', onPointerMove)
  stage.addEventListener('pointerup', onPointerUp)
  stage.addEventListener('pointercancel', onPointerCancel)

  document.querySelectorAll('[data-pbas-replay]').forEach((btn) => {
    btn.addEventListener('click', () => replayPredictiveBackAppShrink())
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') replayPredictiveBackAppShrink()
  })
}

bindUi()
resetPredictiveBackAppShrink()

export const PREDICTIVE_BACK_APP_SHRINK_CONTRACT = {
  EDGE_ZONE_PX,
  MAX_DRAG_PX,
  COMMIT_PX,
  COMMIT_MS,
  CANCEL_MS,
}
