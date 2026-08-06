/**
 * Predictive Back Edge Pull — Android-inspired edge back gesture preview.
 * Sandbox-safe: no parent, storage, or network.
 */

const EDGE_ZONE_PX = 24
const MAX_DRAG_PX = 140
const TRANSLATE_FACTOR = 0.72
const COMMIT_PX = 112
const VELOCITY_COMMIT_PX_MS = 0.55
const COMMIT_MS = 180
const CANCEL_MS = 200

/** @type {number | null} */
let settleTimer = null
/** @type {number | null} */
let activePointer = null
let dragPx = 0
let startX = 0
let lastX = 0
let lastT = 0
let prevX = 0
let prevT = 0
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
  return document.querySelector('[data-predictive-back-edge-pull]')
}

function clearSettle() {
  if (settleTimer !== null) {
    window.clearTimeout(settleTimer)
    settleTimer = null
  }
}

function setStatus(text) {
  const el = document.querySelector('[data-pbe-status]')
  if (el) el.textContent = text
}

function progressFromDrag(px) {
  return Math.min(1, Math.max(0, px / MAX_DRAG_PX))
}

function applyVars(px, pointerY) {
  const root = rootEl()
  if (!root) return
  const p = progressFromDrag(px)
  const translate = px * TRANSLATE_FACTOR
  root.style.setProperty('--pbe-drag-px', `${px}px`)
  root.style.setProperty('--pbe-translate-px', `${translate}px`)
  root.style.setProperty('--pbe-progress', String(p))
  const indicator = document.querySelector('[data-pbe-indicator]')
  if (indicator) {
    indicator.style.setProperty('--pbe-ind-y', `${pointerY}px`)
    indicator.classList.toggle('is-visible', px > 4)
  }
}

function setPhase(phase) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-pbe-phase', phase)
  root.classList.remove('is-dragging', 'is-committing', 'is-canceling')
  if (phase === 'dragging') root.classList.add('is-dragging')
  if (phase === 'committing') root.classList.add('is-committing')
  if (phase === 'canceling') root.classList.add('is-canceling')
}

function setView(next) {
  view = next
  rootEl()?.setAttribute('data-pbe-view', next)
}

function showDestination(immediate) {
  clearSettle()
  dragging = false
  activePointer = null

  if (immediate) {
    setPhase('idle')
    dragPx = 0
    applyVars(0, 0)
    setView('destination')
    setStatus('Inbox list · Thread B selected.')
    return
  }

  setPhase('committing')
  dragPx = MAX_DRAG_PX
  applyVars(MAX_DRAG_PX, 0)
  settleTimer = window.setTimeout(() => {
    setPhase('idle')
    dragPx = 0
    applyVars(0, 0)
    setView('destination')
    setStatus('Inbox list · Thread B selected.')
    settleTimer = null
  }, COMMIT_MS)
}

function showCurrent() {
  clearSettle()
  setPhase('idle')
  dragging = false
  activePointer = null
  dragPx = 0
  applyVars(0, 0)
  setView('current')
  setStatus('Thread detail · Thread B.')
}

function finishCancel() {
  setPhase('idle')
  dragging = false
  activePointer = null
  dragPx = 0
  applyVars(0, 0)
  setStatus('Back gesture cancelled · Thread B.')
  settleTimer = null
}

function onPointerDown(e) {
  if (view !== 'current') return
  const root = rootEl()
  const stage = document.querySelector('[data-pbe-stage]')
  if (!root || !stage || e.button !== 0) return

  const rect = stage.getBoundingClientRect()
  const x = e.clientX - rect.left
  if (x > EDGE_ZONE_PX) return

  e.preventDefault()
  activePointer = e.pointerId
  dragging = true
  startX = e.clientX
  lastX = e.clientX
  prevX = e.clientX
  lastT = performance.now()
  prevT = lastT
  dragPx = 0
  setPhase('dragging')
  applyVars(0, e.clientY - rect.top)
  stage.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return
  const stage = document.querySelector('[data-pbe-stage]')
  const rect = stage?.getBoundingClientRect()
  const dx = e.clientX - startX
  dragPx = Math.min(MAX_DRAG_PX, Math.max(0, dx))
  const pointerY = rect ? e.clientY - rect.top : 0
  applyVars(dragPx, pointerY)

  prevX = lastX
  prevT = lastT
  lastX = e.clientX
  lastT = performance.now()
}

function velocityPxMs() {
  const dt = lastT - prevT
  if (dt <= 0) return 0
  return (lastX - prevX) / dt
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return

  const stage = document.querySelector('[data-pbe-stage]')
  if (stage?.hasPointerCapture(e.pointerId)) {
    stage.releasePointerCapture(e.pointerId)
  }

  const v = velocityPxMs()
  const shouldCommit =
    dragPx >= COMMIT_PX || (v > VELOCITY_COMMIT_PX_MS && dragPx > 8)

  if (shouldCommit) {
    if (prefersReducedMotion()) {
      showDestination(true)
      return
    }
    setPhase('committing')
    dragPx = MAX_DRAG_PX
    applyVars(MAX_DRAG_PX, 0)
    settleTimer = window.setTimeout(() => showDestination(false), COMMIT_MS)
  } else if (dragPx > 0) {
    if (prefersReducedMotion()) {
      finishCancel()
      return
    }
    setPhase('canceling')
    dragPx = 0
    applyVars(0, 0)
    settleTimer = window.setTimeout(finishCancel, CANCEL_MS)
  } else {
    finishCancel()
  }
}

function onPointerCancel(e) {
  if (e.pointerId !== activePointer) return
  finishCancel()
}

export function resetPredictiveBackEdgePull() {
  showCurrent()
}

export function replayPredictiveBackEdgePull() {
  resetPredictiveBackEdgePull()
}

function bindUi() {
  const stage = document.querySelector('[data-pbe-stage]')
  if (!stage) return

  stage.addEventListener('pointerdown', onPointerDown)
  stage.addEventListener('pointermove', onPointerMove)
  stage.addEventListener('pointerup', onPointerUp)
  stage.addEventListener('pointercancel', onPointerCancel)

  document.querySelectorAll('[data-pbe-replay]').forEach((btn) => {
    btn.addEventListener('click', () => replayPredictiveBackEdgePull())
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') replayPredictiveBackEdgePull()
  })
}

bindUi()
resetPredictiveBackEdgePull()

export const PREDICTIVE_BACK_EDGE_PULL_CONTRACT = {
  EDGE_ZONE_PX,
  MAX_DRAG_PX,
  TRANSLATE_FACTOR,
  COMMIT_PX,
  VELOCITY_COMMIT_PX_MS,
  COMMIT_MS,
  CANCEL_MS,
}
