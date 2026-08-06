/**
 * Navigation Drawer Edge Pull — left-edge gesture drawer with scrim and pill selection.
 * Sandbox-safe: no parent, storage, or network.
 */

const DRAWER_W = 304
const EDGE_ZONE = 24
const OPEN_PROGRESS = 0.46
const VELOCITY_THRESHOLD = 0.5
const APP_SHIFT = 24
const SCRIM_MAX = 0.32
const SNAP_MS = 220
const SNAP_RM_MS = 0

/** @type {number | null} */
let activePointer = null
let dragging = false
let startX = 0
let startProgress = 0
let lastX = 0
let prevX = 0
let lastT = 0
let prevT = 0
let progress = 0
let isOpen = false
/** @type {number | null} */
let snapTimer = null

const ITEM_OFFSETS = [52, 104, 156, 208, 260]

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function forcedReducedMotion() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  )
}

function rootEl() {
  return document.querySelector('[data-navigation-drawer]')
}

function clearSnapTimer() {
  if (snapTimer !== null) {
    window.clearTimeout(snapTimer)
    snapTimer = null
  }
}

function setStatus(text) {
  const el = document.querySelector('[data-ndep-status]')
  if (el) el.textContent = text
}

function applyProgress(p, animate) {
  const root = rootEl()
  if (!root) return
  progress = Math.max(0, Math.min(1, p))
  root.style.setProperty('--ndep-progress', String(progress))
  root.style.setProperty('--ndep-drawer-x', `${-DRAWER_W + DRAWER_W * progress}px`)
  root.style.setProperty('--ndep-app-x', `${APP_SHIFT * progress}px`)
  root.style.setProperty('--ndep-scrim', String(SCRIM_MAX * progress))
  if (!animate) {
    root.classList.remove('is-snapping')
  }
}

function setOpen(open, animate) {
  const root = rootEl()
  if (!root) return
  isOpen = open
  root.setAttribute('data-ndep-open', open ? 'true' : 'false')
  const menu = document.querySelector('[data-ndep-menu]')
  if (menu) menu.setAttribute('aria-expanded', open ? 'true' : 'false')
  const target = open ? 1 : 0
  clearSnapTimer()

  if (!animate || forcedReducedMotion()) {
    applyProgress(target, false)
    setStatus(open ? 'Drawer open.' : 'Drawer closed.')
    return
  }

  root.classList.add('is-snapping')
  applyProgress(target, true)
  const duration = prefersReducedMotion() ? SNAP_RM_MS : SNAP_MS
  snapTimer = window.setTimeout(() => {
    root.classList.remove('is-snapping')
    setStatus(open ? 'Drawer open.' : 'Drawer closed.')
    snapTimer = null
  }, duration || 1)
}

function velocityPxMs() {
  const dt = lastT - prevT
  if (dt <= 0) return 0
  return (lastX - prevX) / dt
}

function resolveRelease() {
  const v = velocityPxMs()
  if (dragging && !isOpen) {
    if (progress >= OPEN_PROGRESS || v > VELOCITY_THRESHOLD) return true
    return false
  }
  if (dragging && isOpen) {
    if (progress <= 1 - OPEN_PROGRESS || v < -VELOCITY_THRESHOLD) return false
    return true
  }
  return isOpen
}

function canStartGesture(e) {
  const drawer = document.querySelector('[data-ndep-drawer]')
  const edge = document.querySelector('[data-ndep-edge]')
  if (!edge || !drawer) return false
  if (e.button !== 0) return false
  if (isOpen) return drawer.contains(e.target)
  const stage = document.querySelector('[data-ndep-stage]')
  if (!stage) return false
  const rect = stage.getBoundingClientRect()
  return e.clientX - rect.left <= EDGE_ZONE
}

function onPointerDown(e) {
  if (!canStartGesture(e)) return
  e.preventDefault()
  clearSnapTimer()
  dragging = true
  activePointer = e.pointerId
  startX = e.clientX
  startProgress = progress
  lastX = prevX = e.clientX
  lastT = prevT = performance.now()
  const target = e.target
  if (target instanceof Element) target.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return
  const dx = e.clientX - startX
  const delta = dx / DRAWER_W
  applyProgress(startProgress + delta, false)
  prevX = lastX
  prevT = lastT
  lastX = e.clientX
  lastT = performance.now()
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return
  dragging = false
  activePointer = null
  const open = resolveRelease()
  setOpen(open, true)
}

function onPointerCancel(e) {
  if (e.pointerId !== activePointer) return
  dragging = false
  activePointer = null
  setOpen(isOpen, true)
}

function movePill(index) {
  const pill = document.querySelector('[data-ndep-pill]')
  if (pill && ITEM_OFFSETS[index] !== undefined) {
    pill.style.setProperty('--ndep-pill-y', `${ITEM_OFFSETS[index]}px`)
  }
  document.querySelectorAll('[data-ndep-item]').forEach((btn, i) => {
    btn.classList.toggle('is-selected', i === index)
  })
}

function onItemClick(e) {
  const btn = e.target.closest('[data-ndep-item]')
  if (!btn) return
  const items = [...document.querySelectorAll('[data-ndep-item]')]
  const index = items.indexOf(btn)
  if (index >= 0) movePill(index)
}

export function resetNavigationDrawerEdgePull() {
  clearSnapTimer()
  dragging = false
  activePointer = null
  movePill(0)
  setOpen(false, false)
}

function bindUi() {
  const stage = document.querySelector('[data-ndep-stage]')
  const scrim = document.querySelector('[data-ndep-scrim]')
  const menu = document.querySelector('[data-ndep-menu]')
  const list = document.querySelector('[data-ndep-list]')

  stage?.addEventListener('pointerdown', onPointerDown)
  stage?.addEventListener('pointermove', onPointerMove)
  stage?.addEventListener('pointerup', onPointerUp)
  stage?.addEventListener('pointercancel', onPointerCancel)

  scrim?.addEventListener('click', () => setOpen(false, true))
  menu?.addEventListener('click', () => setOpen(true, true))
  list?.addEventListener('click', onItemClick)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault()
      setOpen(false, true)
      menu?.focus()
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetNavigationDrawerEdgePull()
  })
}

bindUi()
resetNavigationDrawerEdgePull()

export const NAVIGATION_DRAWER_EDGE_PULL_CONTRACT = {
  DRAWER_W,
  EDGE_ZONE,
  OPEN_PROGRESS,
  VELOCITY_THRESHOLD,
  APP_SHIFT,
  SCRIM_MAX,
}
