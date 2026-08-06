/**
 * Drop Target Magnetism — magnetic attraction toward valid ARCHIVE target.
 */

const PROXY_W = 92
const PROXY_H = 52
const MAGNET_RADIUS = 86
const MAX_ATTRACTION = 0.28
const ACQUIRE_DIST = 42
const ARCHIVE_EXPAND = 4
const DRAG_THRESHOLD = 6

/** @type {boolean} */
let dragging = false
/** @type {boolean} */
let active = false
/** @type {number} */
let startX = 0
/** @type {number} */
let startY = 0
/** @type {number} */
let rawX = 0
/** @type {number} */
let rawY = 0
/** @type {number} */
let dragAngle = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-drop-target-magnetism]')
}

function fileEl() {
  return document.querySelector('[data-dtm-file]')
}

function proxy() {
  return document.querySelector('[data-dtm-proxy]')
}

function archive() {
  return document.querySelector('[data-dtm-archive]')
}

function statusEl() {
  return document.querySelector('[data-dtm-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function archiveCenter() {
  const el = archive()
  if (!el) return { x: 0, y: 0 }
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

/**
 * @param {number} px
 * @param {number} py
 */
function applyMagnetism(px, py) {
  const center = archiveCenter()
  const dx = center.x - px
  const dy = center.y - py
  const dist = Math.hypot(dx, dy)

  const zone = archive()
  if (!zone) return { x: px, y: py, dist, angle: dragAngle, attracted: false }

  if (prefersReducedMotion()) {
    const inside = dist < MAGNET_RADIUS
    zone.classList.toggle('is-in-bounds', inside)
    zone.classList.toggle('is-acquiring', inside && dist < ACQUIRE_DIST)
    return { x: px, y: py, dist, angle: 0, attracted: inside }
  }

  if (dist >= MAGNET_RADIUS) {
    zone.classList.remove('is-attracted', 'is-acquiring', 'is-in-bounds')
    return { x: px, y: py, dist, angle: dragAngle, attracted: false }
  }

  const t = 1 - dist / MAGNET_RADIUS
  const pull = t * MAX_ATTRACTION
  const x = px + dx * pull
  const y = py + dy * pull
  const angle = dragAngle * (1 - t)
  zone.classList.add('is-attracted', 'is-in-bounds')
  zone.classList.toggle('is-acquiring', dist < ACQUIRE_DIST)
  return { x, y, dist, angle, attracted: true }
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} angle
 */
function positionProxy(x, y, angle) {
  const el = proxy()
  const stage = document.querySelector('[data-dtm-stage]')
  const stageR = stage?.getBoundingClientRect()
  if (!el || !stageR) return
  el.style.left = `${x - stageR.left - PROXY_W / 2}px`
  el.style.top = `${y - stageR.top - PROXY_H / 2}px`
  el.style.transform = `rotate(${angle}deg)`
}

function dropInsideArchive(x, y) {
  const zone = archive()
  if (!zone) return false
  const r = zone.getBoundingClientRect()
  return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
}

function showProxy() {
  const el = proxy()
  const f = fileEl()
  if (!el || !f) return
  el.hidden = false
  f.classList.add('is-dragging')
  setPhase('dragging')
}

function commitDrop() {
  const el = proxy()
  const f = fileEl()
  const zone = archive()
  if (!el || !f || !zone) return
  zone.classList.add('is-filled')
  el.classList.add('is-dropped')
  f.classList.add('is-archived')
  setPhase('dropped')
  setStatus('FILE // 07 archived in ARCHIVE.')
  window.setTimeout(() => {
    el.hidden = true
    el.classList.remove('is-dropped')
    dragging = false
    active = false
  }, prefersReducedMotion() ? 60 : 240)
}

function returnToSource() {
  const el = proxy()
  const f = fileEl()
  archive()?.classList.remove('is-attracted', 'is-acquiring', 'is-in-bounds')
  if (!el || !f) return
  el.classList.add('is-returning')
  setPhase('returning')
  setStatus('Dropped outside ARCHIVE — returning to source.')
  window.setTimeout(() => {
    el.hidden = true
    el.classList.remove('is-returning')
    f.classList.remove('is-dragging')
    dragging = false
    active = false
    setPhase('idle')
    setStatus('Drag FILE // 07. ARCHIVE attracts within 86px; LOCKED never pulls.')
  }, prefersReducedMotion() ? 60 : 320)
}

function onPointerDown(event) {
  const f = fileEl()
  if (!f || f.classList.contains('is-archived') || event.button !== 0) return
  dragging = true
  active = false
  startX = event.clientX
  startY = event.clientY
  rawX = event.clientX
  rawY = event.clientY
  dragAngle = -6
  f.setPointerCapture(event.pointerId)
}

function onPointerMove(event) {
  if (!dragging) return
  rawX = event.clientX
  rawY = event.clientY
  const dist = Math.hypot(rawX - startX, rawY - startY)
  if (!active && dist >= DRAG_THRESHOLD) {
    active = true
    showProxy()
  }
  if (!active) return

  dragAngle += event.movementX * 0.08
  const result = applyMagnetism(rawX, rawY)
  positionProxy(result.x, result.y, result.angle)
  setStatus(
    result.attracted
      ? result.dist < ACQUIRE_DIST
        ? 'Acquisition ticks — release over ARCHIVE to drop.'
        : 'Magnetic pull toward ARCHIVE.'
      : 'Direct pointer tracking.',
  )
}

function onPointerUp(event) {
  if (!dragging) return
  fileEl()?.releasePointerCapture(event.pointerId)
  if (!active) {
    dragging = false
    return
  }
  const result = applyMagnetism(rawX, rawY)
  if (dropInsideArchive(result.x, result.y)) {
    commitDrop()
  } else {
    returnToSource()
  }
}

export function resetDropTargetMagnetism() {
  dragging = false
  active = false
  const f = fileEl()
  const el = proxy()
  const zone = archive()
  f?.classList.remove('is-dragging', 'is-archived')
  el?.classList.remove('is-returning', 'is-dropped')
  if (el) {
    el.hidden = true
    el.style.transform = ''
  }
  zone?.classList.remove('is-attracted', 'is-acquiring', 'is-in-bounds', 'is-filled')
  setPhase('idle')
  setStatus('Drag FILE // 07. ARCHIVE attracts within 86px; LOCKED never pulls.')
}

function bindUi() {
  const f = fileEl()
  if (!f) return
  f.addEventListener('pointerdown', onPointerDown)
  f.addEventListener('pointermove', onPointerMove)
  f.addEventListener('pointerup', onPointerUp)
  f.addEventListener('pointercancel', onPointerUp)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetDropTargetMagnetism()
    }
  })
}

bindUi()
resetDropTargetMagnetism()

export const DROP_TARGET_MAGNETISM_CONTRACT = {
  PROXY_W,
  PROXY_H,
  MAGNET_RADIUS,
  MAX_ATTRACTION,
  ACQUIRE_DIST,
  ARCHIVE_EXPAND,
}
