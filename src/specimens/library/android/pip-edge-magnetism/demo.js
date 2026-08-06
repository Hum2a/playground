/**
 * PiP Edge Magnetism — floating window with edge attraction and snap slots.
 * Sandbox-safe: no parent, storage, or network.
 */

const STAGE_W = 390
const STAGE_H = 700
const WIN_W = 176
const WIN_H = 99
const INSET = 12
const ATTRACT_ZONE = 56
const ATTRACT_BLEND = 0.35
const SNAP_MS = 180
const FLING_THRESHOLD = 0.8

/** @type {{ id: string; x: number; y: number }[]} */
const SLOTS = [
  { id: 'tl', x: INSET, y: INSET + 40 },
  { id: 'tr', x: STAGE_W - WIN_W - INSET, y: INSET + 40 },
  { id: 'bl', x: INSET, y: STAGE_H - WIN_H - INSET },
  { id: 'br', x: STAGE_W - WIN_W - INSET, y: STAGE_H - WIN_H - INSET },
]

let posX = SLOTS[3].x
let posY = SLOTS[3].y
let dragging = false
/** @type {number | null} */
let activePointer = null
let offsetX = 0
let offsetY = 0
let lastX = 0
let prevX = 0
let lastT = 0
let prevT = 0
/** @type {number | null} */
let snapTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function windowEl() {
  return document.querySelector('[data-pem-window]')
}

function setStatus(text) {
  const el = document.querySelector('[data-pem-status]')
  if (el) el.textContent = text
}

function applyPosition(x, y, animate) {
  const win = windowEl()
  const root = document.querySelector('[data-pip-edge-magnetism]')
  if (!win || !root) return
  posX = x
  posY = y
  win.style.left = `${x}px`
  win.style.top = `${y}px`
  root.classList.toggle('is-snapping', animate && !prefersReducedMotion())

  const cx = x + WIN_W / 2
  const nearLeft = cx < ATTRACT_ZONE + INSET
  const nearRight = cx > STAGE_W - ATTRACT_ZONE - INSET
  root.classList.toggle('is-attract-left', nearLeft && dragging)
  root.classList.toggle('is-attract-right', nearRight && dragging)
}

function nearestSlot(x, y, biasEdge) {
  let best = SLOTS[0]
  let bestDist = Infinity
  for (const slot of SLOTS) {
    if (biasEdge === 'left' && slot.x > STAGE_W / 2) continue
    if (biasEdge === 'right' && slot.x < STAGE_W / 2) continue
    const d = Math.hypot(slot.x - x, slot.y - y)
    if (d < bestDist) {
      bestDist = d
      best = slot
    }
  }
  return best
}

function magneticX(rawX, centerX) {
  if (prefersReducedMotion()) return rawX
  const leftAnchor = INSET + WIN_W / 2
  const rightAnchor = STAGE_W - INSET - WIN_W / 2
  if (Math.abs(centerX - leftAnchor) < ATTRACT_ZONE) {
    return rawX + (leftAnchor - centerX) * ATTRACT_BLEND
  }
  if (Math.abs(centerX - rightAnchor) < ATTRACT_ZONE) {
    return rawX + (rightAnchor - centerX) * ATTRACT_BLEND
  }
  return rawX
}

function velocityPxMs() {
  const dt = lastT - prevT
  if (dt <= 0) return 0
  return (lastX - prevX) / dt
}

function snapToSlot(slot) {
  const rm = prefersReducedMotion()
  applyPosition(slot.x, slot.y, !rm)
  setStatus(`Window snapped to ${slot.id} slot.`)
  if (snapTimer !== null) window.clearTimeout(snapTimer)
  snapTimer = window.setTimeout(() => {
    document.querySelector('[data-pip-edge-magnetism]')?.classList.remove('is-snapping')
    snapTimer = null
  }, rm ? 0 : SNAP_MS)
}

function onPointerDown(e) {
  const win = windowEl()
  if (!win?.contains(e.target) || e.button !== 0) return
  dragging = true
  activePointer = e.pointerId
  const rect = win.getBoundingClientRect()
  const stage = document.querySelector('[data-pem-stage]')?.getBoundingClientRect()
  if (!stage) return
  offsetX = e.clientX - rect.left
  offsetY = e.clientY - rect.top
  lastX = prevX = e.clientX
  lastT = prevT = performance.now()
  win.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return
  const stage = document.querySelector('[data-pem-stage]')?.getBoundingClientRect()
  if (!stage) return
  let x = e.clientX - stage.left - offsetX
  let y = e.clientY - stage.top - offsetY
  x = Math.max(INSET, Math.min(STAGE_W - WIN_W - INSET, x))
  y = Math.max(INSET + 40, Math.min(STAGE_H - WIN_H - INSET, y))
  const cx = x + WIN_W / 2
  x = magneticX(x, cx)
  x = Math.max(INSET, Math.min(STAGE_W - WIN_W - INSET, x))
  applyPosition(x, y, false)
  const win = windowEl()
  win?.classList.add('is-dragging')
  prevX = lastX
  prevT = lastT
  lastX = e.clientX
  lastT = performance.now()
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return
  dragging = false
  activePointer = null
  windowEl()?.classList.remove('is-dragging')
  windowEl()?.releasePointerCapture(e.pointerId)
  document.querySelector('[data-pip-edge-magnetism]')?.classList.remove('is-attract-left', 'is-attract-right')

  const v = velocityPxMs()
  let bias = null
  if (v > FLING_THRESHOLD) bias = 'right'
  else if (v < -FLING_THRESHOLD) bias = 'left'
  const slot = nearestSlot(posX, posY, bias)
  snapToSlot(slot)
}

export function resetPipEdgeMagnetism() {
  if (snapTimer !== null) {
    window.clearTimeout(snapTimer)
    snapTimer = null
  }
  dragging = false
  activePointer = null
  snapToSlot(SLOTS[3])
}

function bindUi() {
  const stage = document.querySelector('[data-pem-stage]')
  stage?.addEventListener('pointerdown', onPointerDown)
  stage?.addEventListener('pointermove', onPointerMove)
  stage?.addEventListener('pointerup', onPointerUp)
  stage?.addEventListener('pointercancel', onPointerUp)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetPipEdgeMagnetism()
  })
}

bindUi()
resetPipEdgeMagnetism()

export const PIP_EDGE_MAGNETISM_CONTRACT = {
  STAGE_W,
  STAGE_H,
  WIN_W,
  WIN_H,
  INSET,
  ATTRACT_ZONE,
  ATTRACT_BLEND,
  SNAP_MS,
  FLING_THRESHOLD,
  SLOTS,
}
