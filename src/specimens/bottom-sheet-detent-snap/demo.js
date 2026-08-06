/**
 * Bottom Sheet Detent Snap — three fixed detents with velocity-aware settling.
 * Sandbox-safe: no parent, storage, or network.
 */

const DETENTS = {
  collapsed: 112,
  medium: 318,
  expanded: 520,
}

const DETENT_ORDER = ['collapsed', 'medium', 'expanded']
const VELOCITY_THRESHOLD_PX_MS = 0.55
const SPRING_MS = 320
const SNAP_RM_MS = 160
const MAX_OVERSHOOT_PX = 8

/** @type {number | null} */
let snapTimer = null
/** @type {number | null} */
let activePointer = null
let visibleH = DETENTS.collapsed
let startY = 0
let startVisible = DETENTS.collapsed
let lastY = 0
let lastT = 0
let prevY = 0
let prevT = 0
let dragging = false
/** @type {'collapsed' | 'medium' | 'expanded'} */
let snappedDetent = 'collapsed'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  return (
    forced ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function forcedReducedMotion() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  )
}

function rootEl() {
  return document.querySelector('[data-bottom-sheet-detent]')
}

function clearSnapTimer() {
  if (snapTimer !== null) {
    window.clearTimeout(snapTimer)
    snapTimer = null
  }
}

function detentIndex(name) {
  return DETENT_ORDER.indexOf(name)
}

function nearestDetent(h) {
  let best = DETENT_ORDER[0]
  let bestDist = Infinity
  for (const key of DETENT_ORDER) {
    const d = Math.abs(DETENTS[key] - h)
    if (d < bestDist) {
      bestDist = d
      best = key
    }
  }
  return best
}

function setStatus(text) {
  const el = document.querySelector('[data-bsd-status]')
  if (el) el.textContent = text
}

function updateReveal(h) {
  const root = rootEl()
  if (!root) return
  const metricsP = Math.min(
    1,
    Math.max(0, (h - DETENTS.collapsed) / (DETENTS.medium - DETENTS.collapsed)),
  )
  const stepsP = Math.min(
    1,
    Math.max(0, (h - DETENTS.medium) / (DETENTS.expanded - DETENTS.medium)),
  )
  root.style.setProperty('--bsd-metrics-p', String(metricsP))
  root.style.setProperty('--bsd-steps-p', String(stepsP))
}

function applyHeight(h, animate) {
  const root = rootEl()
  if (!root) return
  visibleH = Math.min(DETENTS.expanded, Math.max(DETENTS.collapsed, h))
  root.style.setProperty('--bsd-visible', `${visibleH}px`)
  updateReveal(visibleH)
  if (!animate) {
    root.classList.remove('is-snapping', 'is-snapping-rm')
  }
}

function setPhase(phase) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-bsd-phase', phase)
  root.classList.toggle('is-dragging', phase === 'dragging')
}

function setDetentAttr(name) {
  const root = rootEl()
  if (!root) return
  snappedDetent = name
  root.setAttribute('data-bsd-detent', name)
  const px = DETENTS[name]
  setStatus(`Sheet ${name} · ${px}px visible.`)
}

function snapToDetent(name) {
  const target = DETENTS[name]
  const root = rootEl()
  if (!root) return

  clearSnapTimer()
  setPhase('idle')
  dragging = false
  activePointer = null

  const rm = prefersReducedMotion()
  const forced = forcedReducedMotion()

  root.classList.remove('is-snapping', 'is-snapping-rm')
  if (rm && !forced) root.classList.add('is-snapping-rm')
  else if (!forced) root.classList.add('is-snapping')

  if (forced) {
    applyHeight(target, false)
    setDetentAttr(name)
    root.classList.remove('is-snapping', 'is-snapping-rm')
    return
  }

  const overshoot =
    target > visibleH
      ? Math.min(MAX_OVERSHOOT_PX, target - visibleH)
      : -Math.min(MAX_OVERSHOOT_PX, visibleH - target)

  if (!rm && overshoot !== 0) {
    applyHeight(target + overshoot, true)
    const half = SPRING_MS * 0.55
    snapTimer = window.setTimeout(() => {
      applyHeight(target, true)
      snapTimer = window.setTimeout(() => {
        setDetentAttr(name)
        root.classList.remove('is-snapping', 'is-snapping-rm')
        snapTimer = null
      }, half)
    }, half)
  } else {
    applyHeight(target, true)
    const duration = rm ? SNAP_RM_MS : SPRING_MS
    snapTimer = window.setTimeout(() => {
      setDetentAttr(name)
      root.classList.remove('is-snapping', 'is-snapping-rm')
      snapTimer = null
    }, duration)
  }
}

function resolveReleaseDetent(velocity) {
  const baseIdx = detentIndex(snappedDetent)
  if (velocity > VELOCITY_THRESHOLD_PX_MS) {
    return DETENT_ORDER[Math.min(DETENT_ORDER.length - 1, baseIdx + 1)]
  }
  if (velocity < -VELOCITY_THRESHOLD_PX_MS) {
    return DETENT_ORDER[Math.max(0, baseIdx - 1)]
  }
  return nearestDetent(visibleH)
}

function onPointerDown(e) {
  const grab = document.querySelector('[data-bsd-grab]')
  if (!grab?.contains(e.target) || e.button !== 0) return

  e.preventDefault()
  clearSnapTimer()
  activePointer = e.pointerId
  dragging = true
  startY = e.clientY
  startVisible = visibleH
  lastY = e.clientY
  prevY = e.clientY
  lastT = performance.now()
  prevT = lastT
  setPhase('dragging')
  grab.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return

  const dy = startY - e.clientY
  applyHeight(startVisible + dy, false)

  prevY = lastY
  prevT = lastT
  lastY = e.clientY
  lastT = performance.now()
}

function velocityPxMs() {
  const dt = lastT - prevT
  if (dt <= 0) return 0
  return (prevY - lastY) / dt
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return

  const grab = document.querySelector('[data-bsd-grab]')
  if (grab?.hasPointerCapture(e.pointerId)) {
    grab.releasePointerCapture(e.pointerId)
  }

  const v = velocityPxMs()
  const target = resolveReleaseDetent(v)
  snapToDetent(target)
}

function onPointerCancel(e) {
  if (e.pointerId !== activePointer) return
  snapToDetent(snappedDetent)
}

export function resetBottomSheetDetentSnap() {
  clearSnapTimer()
  applyHeight(DETENTS.collapsed, false)
  setDetentAttr('collapsed')
  setPhase('idle')
}

function bindUi() {
  const grab = document.querySelector('[data-bsd-grab]')
  if (!grab) return

  grab.addEventListener('pointerdown', onPointerDown)
  grab.addEventListener('pointermove', onPointerMove)
  grab.addEventListener('pointerup', onPointerUp)
  grab.addEventListener('pointercancel', onPointerCancel)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetBottomSheetDetentSnap()
  })
}

bindUi()
resetBottomSheetDetentSnap()

export const BOTTOM_SHEET_DETENT_SNAP_CONTRACT = {
  DETENTS,
  VELOCITY_THRESHOLD_PX_MS,
  SPRING_MS,
  SNAP_RM_MS,
  MAX_OVERSHOOT_PX,
  HANDLE: { widthPx: 36, heightPx: 5 },
  CORNER_RADIUS_PX: 18,
  PREVIEW_HEIGHT_PX: 600,
}
