/**
 * Bottom Sheet Detent Snap — three stable detents with velocity bias.
 * Sandbox-safe (no parent / storage / network).
 */

const SHEET_H = 640
const DETENTS = { collapsed: 96, medium: 360, expanded: 640 }
const VELOCITY_THRESH = 0.55
const SCRIM_MAX = 0.34

let visibleH = DETENTS.collapsed
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
  return document.querySelector('[data-bottom-sheet-detent]')
}

function statusEl() {
  return document.querySelector('[data-abssds-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function scrimOpacity(h) {
  const range = DETENTS.expanded - DETENTS.collapsed
  const t = (h - DETENTS.collapsed) / range
  return Math.max(0, Math.min(SCRIM_MAX, t * SCRIM_MAX))
}

/**
 * @param {number} rawH
 */
export function applyResistance(rawH) {
  if (rawH <= DETENTS.expanded) return rawH
  const extra = rawH - DETENTS.expanded
  return DETENTS.expanded + Math.sqrt(extra) * 6
}

function phaseFor(h) {
  if (h <= DETENTS.collapsed + 20) return 'collapsed'
  if (h >= DETENTS.expanded - 20) return 'expanded'
  return 'medium'
}

function applyHeight(h) {
  const root = rootEl()
  if (!root) return
  visibleH = Math.max(DETENTS.collapsed, Math.min(h, DETENTS.expanded + 48))
  root.style.setProperty('--abssds-visible', `${visibleH}px`)
  root.style.setProperty('--abssds-scrim', String(scrimOpacity(visibleH)))
  root.setAttribute('data-phase', phaseFor(visibleH))
}

function nearestDetent(h, v) {
  const options = [DETENTS.collapsed, DETENTS.medium, DETENTS.expanded]
  if (Math.abs(v) > VELOCITY_THRESH) {
    const dir = v > 0 ? 1 : -1
    const idx = options.findIndex((d) => Math.abs(d - h) < 40)
    const base = idx >= 0 ? idx : options.reduce((best, d, i) =>
      Math.abs(d - h) < Math.abs(options[best] - h) ? i : best, 0)
    const target = Math.max(0, Math.min(2, base + dir))
    return options[target]
  }
  return options.reduce((best, d) =>
    Math.abs(d - h) < Math.abs(best - h) ? d : best, DETENTS.collapsed)
}

function snapTo(target) {
  const root = rootEl()
  root?.classList.remove('is-dragging')
  if (prefersReducedMotion()) {
    applyHeight(target)
    announce(target)
    return
  }
  const start = visibleH
  const startTime = performance.now()
  const duration = 220
  const animate = (now) => {
    const t = Math.min(1, (now - startTime) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    applyHeight(start + (target - start) * eased)
    if (t < 1) requestAnimationFrame(animate)
    else announce(target)
  }
  requestAnimationFrame(animate)
}

function announce(h) {
  if (h <= DETENTS.collapsed + 20) setStatus('Collapsed detent — 96px visible.')
  else if (h >= DETENTS.expanded - 20) setStatus('Expanded detent — content scrollable.')
  else setStatus('Medium detent — 360px visible.')
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
  if (dt > 0) velocity = (lastY - e.clientY) / dt
  lastY = e.clientY
  lastT = now
  const delta = startY - e.clientY
  applyHeight(applyResistance(startH + delta))
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return
  dragging = false
  activePointer = null
  e.currentTarget.releasePointerCapture(e.pointerId)
  snapTo(nearestDetent(visibleH, velocity))
}

export function resetBottomSheetDetentSnap() {
  dragging = false
  activePointer = null
  visibleH = DETENTS.collapsed
  rootEl()?.classList.remove('is-dragging')
  applyHeight(DETENTS.collapsed)
  setStatus('Drag the handle to move between collapsed, medium, and expanded detents.')
}

function bindUi() {
  const handle = document.querySelector('[data-abssds-handle]')
  handle?.addEventListener('pointerdown', onPointerDown)
  handle?.addEventListener('pointermove', onPointerMove)
  handle?.addEventListener('pointerup', onPointerUp)
  handle?.addEventListener('pointercancel', onPointerUp)

  document.querySelector('[data-abssds-scrim]')?.addEventListener('click', () => {
    snapTo(DETENTS.collapsed)
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetBottomSheetDetentSnap()
    }
  })
}

bindUi()
resetBottomSheetDetentSnap()

export const BOTTOM_SHEET_DETENT_SNAP_CONTRACT = {
  SHEET_H,
  DETENTS,
  VELOCITY_THRESH,
  SCRIM_MAX,
}
