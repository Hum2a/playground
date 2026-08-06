/**
 * Android Drag Proxy Formation — rich row condenses into portable proxy.
 * Sandbox-safe (no parent / storage / network).
 */

const DRAG_THRESHOLD = 7
const ROW_W = 300
const ROW_H = 92
const PROXY_W = 156
const PROXY_H = 48
const POINTER_OFFSET = 8
const RETURN_MS = 220

/** @type {boolean} */
let dragging = false
/** @type {boolean} */
let proxyFormed = false
/** @type {number} */
let startX = 0
/** @type {number} */
let startY = 0
/** @type {number} */
let pointerX = 0
/** @type {number} */
let pointerY = 0
/** @type {number} */
let validCount = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-android-drag-proxy]')
}

function row() {
  return document.querySelector('[data-adpf-row]')
}

function proxy() {
  return document.querySelector('[data-adpf-proxy]')
}

function slot() {
  return document.querySelector('[data-adpf-source-slot]')
}

function statusEl() {
  return document.querySelector('[data-adpf-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function positionProxy(x, y) {
  const el = proxy()
  const host = root()
  if (!el || !host) return
  const r = host.getBoundingClientRect()
  el.style.left = `${x - r.left + POINTER_OFFSET}px`
  el.style.top = `${y - r.top + POINTER_OFFSET}px`
}

function proxyCenter() {
  const el = proxy()
  if (!el || el.hidden) return null
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

function dropHit(kind) {
  const center = proxyCenter()
  const zone = document.querySelector(`[data-adpf-drop="${kind}"]`)
  if (!center || !zone) return false
  const r = zone.getBoundingClientRect()
  return (
    center.x >= r.left &&
    center.x <= r.right &&
    center.y >= r.top &&
    center.y <= r.bottom
  )
}

function updateTargets() {
  document.querySelectorAll('[data-adpf-drop]').forEach((zone) => {
    const kind = zone.getAttribute('data-adpf-drop')
    zone.classList.toggle('is-active', kind ? dropHit(kind) : false)
  })
}

function showProxy() {
  const el = proxy()
  const r = row()
  const s = slot()
  if (!el || !r || !s) return

  el.hidden = false
  el.style.width = prefersReducedMotion() ? `${PROXY_W}px` : `${ROW_W}px`
  el.style.height = prefersReducedMotion() ? `${PROXY_H}px` : `${ROW_H}px`
  positionProxy(pointerX, pointerY)

  if (!prefersReducedMotion()) {
    requestAnimationFrame(() => {
      el.style.width = `${PROXY_W}px`
      el.style.height = `${PROXY_H}px`
    })
  }

  r.classList.add('is-placeholder')
  s.classList.add('is-gap')
  proxyFormed = true
  setPhase('dragging')
  setStatus('Proxy formed — icon and title only; 92px placeholder remains.')
}

function absorbValid() {
  validCount += 1
  const countEl = document.querySelector('[data-adpf-count-valid]')
  if (countEl) countEl.textContent = `${validCount} file${validCount === 1 ? '' : 's'}`
  const el = proxy()
  const r = row()
  const s = slot()
  if (el) el.hidden = true
  r?.classList.remove('is-placeholder')
  s?.classList.remove('is-gap')
  dragging = false
  proxyFormed = false
  setPhase('dropped')
  setStatus('Dropped into INBOX — proxy absorbed.')
}

function returnProxy() {
  const el = proxy()
  const r = row()
  const s = slot()
  if (!el || !r) return

  document.querySelectorAll('[data-adpf-drop]').forEach((z) => z.classList.remove('is-active'))
  el.classList.add('is-returning')
  setPhase('returning')
  setStatus('Invalid drop — proxy returning to source.')

  const hostR = root()?.getBoundingClientRect()
  const rowR = r.getBoundingClientRect()
  if (hostR) {
    el.style.left = `${rowR.left - hostR.left + POINTER_OFFSET}px`
    el.style.top = `${rowR.top - hostR.top + POINTER_OFFSET}px`
  }

  window.setTimeout(() => {
    el.hidden = true
    el.classList.remove('is-returning')
    el.style.width = ''
    el.style.height = ''
    r.classList.remove('is-placeholder')
    s?.classList.remove('is-gap')
    dragging = false
    proxyFormed = false
    setPhase('idle')
    setStatus('Drag FIELD NOTES at least 7px to form a compact proxy.')
  }, prefersReducedMotion() ? 0 : RETURN_MS)
}

function onPointerDown(event) {
  const r = row()
  if (!r || event.button !== 0 || root()?.getAttribute('data-phase') === 'dropped') return
  dragging = true
  proxyFormed = false
  startX = event.clientX
  startY = event.clientY
  pointerX = event.clientX
  pointerY = event.clientY
  r.setPointerCapture(event.pointerId)
}

function onPointerMove(event) {
  if (!dragging) return
  pointerX = event.clientX
  pointerY = event.clientY
  const dist = Math.hypot(pointerX - startX, pointerY - startY)

  if (!proxyFormed && dist >= DRAG_THRESHOLD) showProxy()

  if (proxyFormed) {
    positionProxy(pointerX, pointerY)
    updateTargets()
    if (dropHit('valid')) setStatus('Over INBOX — release to drop.')
    else if (dropHit('invalid')) setStatus('Over LOCKED — invalid target.')
    else setStatus('Dragging compact proxy.')
  }
}

function onPointerUp(event) {
  if (!dragging) return
  row()?.releasePointerCapture(event.pointerId)

  if (!proxyFormed) {
    dragging = false
    return
  }

  if (dropHit('valid')) absorbValid()
  else returnProxy()
}

export function resetAndroidDragProxyFormation() {
  dragging = false
  proxyFormed = false
  validCount = 0
  const r = row()
  const el = proxy()
  const s = slot()
  r?.classList.remove('is-placeholder')
  s?.classList.remove('is-gap')
  if (el) {
    el.hidden = true
    el.classList.remove('is-returning')
    el.style.width = ''
    el.style.height = ''
  }
  document.querySelectorAll('[data-adpf-drop]').forEach((z) => z.classList.remove('is-active'))
  const countEl = document.querySelector('[data-adpf-count-valid]')
  if (countEl) countEl.textContent = '0 files'
  setPhase('idle')
  setStatus('Drag FIELD NOTES at least 7px to form a compact proxy.')
}

function bindUi() {
  const r = row()
  if (!r) return
  r.addEventListener('pointerdown', onPointerDown)
  r.addEventListener('pointermove', onPointerMove)
  r.addEventListener('pointerup', onPointerUp)
  r.addEventListener('pointercancel', onPointerUp)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetAndroidDragProxyFormation()
    }
  })
}

bindUi()
resetAndroidDragProxyFormation()

export const ANDROID_DRAG_PROXY_FORMATION_CONTRACT = {
  DRAG_THRESHOLD,
  ROW_W,
  ROW_H,
  PROXY_W,
  PROXY_H,
  POINTER_OFFSET,
  RETURN_MS,
  PROXY_SCALE: 1.03,
}
