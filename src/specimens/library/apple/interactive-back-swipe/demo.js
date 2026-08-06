/**
 * Interactive Back Swipe — edge-gesture navigation with commit/cancel thresholds.
 * Sandbox-safe: no parent, storage, or network.
 */

const EDGE_ZONE_PX = 28
const COMMIT_RATIO = 0.42
const VELOCITY_COMMIT_PX_MS = 0.62
const COMMIT_MS = 260
const CANCEL_MS = 220

/** @type {number | null} */
let settleTimer = null
/** @type {number | null} */
let activePointer = null
let dragPx = 0
let stageWidth = 0
let startX = 0
let lastX = 0
let lastT = 0
let prevX = 0
let prevT = 0
let dragging = false
/** @type {'orbit' | 'projects'} */
let view = 'orbit'

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
  return document.querySelector('[data-interactive-back-swipe]')
}

function clearSettle() {
  if (settleTimer !== null) {
    window.clearTimeout(settleTimer)
    settleTimer = null
  }
}

function setStatus(text) {
  const el = document.querySelector('[data-ibs-status]')
  if (el) el.textContent = text
}

function progressFromDrag(px) {
  if (stageWidth <= 0) return 0
  return Math.min(1, Math.max(0, px / stageWidth))
}

function applyVars(px) {
  const root = rootEl()
  if (!root) return
  const p = progressFromDrag(px)
  root.style.setProperty('--ibs-drag-px', `${px}px`)
  root.style.setProperty('--ibs-progress', String(p))
  const tick = document.querySelector('[data-ibs-tick]')
  if (tick) tick.classList.toggle('is-on', p >= COMMIT_RATIO)
}

function measureStage() {
  const stage = document.querySelector('[data-ibs-stage]')
  stageWidth = stage ? stage.clientWidth : 420
  const root = rootEl()
  if (root) root.style.setProperty('--ibs-width', `${stageWidth}px`)
}

function setPhase(phase) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-ibs-phase', phase)
  root.classList.remove('is-dragging', 'is-committing', 'is-canceling')
  if (phase === 'dragging') root.classList.add('is-dragging')
  if (phase === 'committing') root.classList.add('is-committing')
  if (phase === 'canceling') root.classList.add('is-canceling')
}

function setView(next) {
  view = next
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-ibs-view', next)
}

function showProjects(immediate) {
  clearSettle()
  dragging = false
  activePointer = null

  if (immediate) {
    setPhase('idle')
    dragPx = 0
    applyVars(0)
    setView('projects')
    setStatus('Projects list · ORBIT selected.')
    return
  }

  setPhase('committing')
  dragPx = stageWidth
  applyVars(stageWidth)
  settleTimer = window.setTimeout(() => {
    setPhase('idle')
    dragPx = 0
    applyVars(0)
    setView('projects')
    setStatus('Projects list · ORBIT selected.')
    settleTimer = null
  }, COMMIT_MS)
}

function showOrbit() {
  clearSettle()
  setPhase('idle')
  dragging = false
  activePointer = null
  dragPx = 0
  applyVars(0)
  setView('orbit')
  setStatus('Project detail · ORBIT.')
}

function finishCancel() {
  setPhase('idle')
  dragging = false
  activePointer = null
  dragPx = 0
  applyVars(0)
  setStatus('Back gesture cancelled · ORBIT.')
  settleTimer = null
}

function onPointerDown(e) {
  if (view !== 'orbit') return
  const root = rootEl()
  const stage = document.querySelector('[data-ibs-stage]')
  if (!root || !stage || e.button !== 0) return

  measureStage()
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
  stage.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return

  const dx = e.clientX - startX
  dragPx = Math.min(stageWidth, Math.max(0, dx))
  applyVars(dragPx)

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

  const stage = document.querySelector('[data-ibs-stage]')
  if (stage?.hasPointerCapture(e.pointerId)) {
    stage.releasePointerCapture(e.pointerId)
  }

  const v = velocityPxMs()
  const commitByPos = dragPx >= stageWidth * COMMIT_RATIO
  const commitByVel = v > VELOCITY_COMMIT_PX_MS && dragPx > 8
  const shouldCommit = commitByPos || commitByVel

  if (shouldCommit) {
  if (prefersReducedMotion()) {
      showProjects(true)
      return
    }
    setPhase('committing')
    dragPx = stageWidth
    applyVars(stageWidth)
    settleTimer = window.setTimeout(() => showProjects(false), COMMIT_MS)
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

export function resetInteractiveBackSwipe() {
  measureStage()
  showOrbit()
}

export function replayInteractiveBackSwipe() {
  resetInteractiveBackSwipe()
}

function bindUi() {
  const stage = document.querySelector('[data-ibs-stage]')
  if (!stage) return

  stage.addEventListener('pointerdown', onPointerDown)
  stage.addEventListener('pointermove', onPointerMove)
  stage.addEventListener('pointerup', onPointerUp)
  stage.addEventListener('pointercancel', onPointerCancel)

  document.querySelectorAll('[data-ibs-replay]').forEach((btn) => {
    btn.addEventListener('click', () => replayInteractiveBackSwipe())
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') replayInteractiveBackSwipe()
  })

  window.addEventListener('resize', measureStage)
}

bindUi()
resetInteractiveBackSwipe()

export const INTERACTIVE_BACK_SWIPE_CONTRACT = {
  EDGE_ZONE_PX,
  COMMIT_RATIO,
  VELOCITY_COMMIT_PX_MS,
  COMMIT_MS,
  CANCEL_MS,
  PREVIEW: { widthPx: 420, heightPx: 560 },
}
