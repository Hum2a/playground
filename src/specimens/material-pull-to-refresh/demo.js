/**
 * Material Pull-to-Refresh — resisted pull with arc indicator and deterministic refresh.
 * Sandbox-safe: no parent, storage, or network.
 */

const MAX_DISPLAY = 96
const RESIST_K = 140
const THRESHOLD = 72
const HOLD_Y = 64
const LOAD_MS = 900
const ARC_LENGTH = 270
const MAX_ROTATION = 120
const NEW_ROW_TEXT = 'Fresh entry loaded · just now'

let pulling = false
let loading = false
/** @type {number | null} */
let activePointer = null
let startY = 0
let displayY = 0
/** @type {number | null} */
let loadTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-pull-to-refresh]')
}

function viewportEl() {
  return document.querySelector('[data-mptr-viewport]')
}

function setStatus(text) {
  const el = document.querySelector('[data-mptr-status]')
  if (el) el.textContent = text
}

function resistedOffset(dragY) {
  return MAX_DISPLAY * (1 - Math.exp(-dragY / RESIST_K))
}

function applyPull(y) {
  const root = rootEl()
  if (!root) return
  displayY = Math.min(MAX_DISPLAY, Math.max(0, y))
  root.style.setProperty('--mptr-pull', `${displayY}px`)
  const progress = Math.min(1, displayY / THRESHOLD)
  const rotation = progress * MAX_ROTATION
  root.style.setProperty('--mptr-arc-rotation', `${rotation}deg`)
  const arc = document.querySelector('[data-mptr-arc]')
  if (arc instanceof SVGCircleElement) {
    const circumference = 2 * Math.PI * 16
    const visible = (ARC_LENGTH / 360) * circumference * progress
    arc.style.strokeDasharray = `${visible} ${circumference}`
  }
}

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-mptr-phase', phase)
}

function prependRow() {
  const feed = document.querySelector('[data-mptr-feed]')
  if (!feed) return
  const li = document.createElement('li')
  li.className = 'mptr__row mptr__row--new'
  li.innerHTML = `<span class="mptr__dot"></span><span>${NEW_ROW_TEXT}</span>`
  feed.insertBefore(li, feed.firstChild)
}

function finishRefresh() {
  loading = false
  setPhase('idle')
  applyPull(0)
  setStatus('Feed refreshed with one new row.')
}

function startLoading() {
  if (loading) return
  loading = true
  setPhase('loading')
  applyPull(HOLD_Y)
  setStatus('Refreshing…')

  if (loadTimer !== null) window.clearTimeout(loadTimer)
  loadTimer = window.setTimeout(() => {
    prependRow()
    applyPull(0)
    window.setTimeout(finishRefresh, prefersReducedMotion() ? 80 : 200)
    loadTimer = null
  }, LOAD_MS)
}

function onPointerDown(e) {
  const vp = viewportEl()
  if (!vp || loading || e.button !== 0) return
  if (vp.scrollTop > 0) return
  pulling = true
  activePointer = e.pointerId
  startY = e.clientY
  vp.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!pulling || e.pointerId !== activePointer) return
  const vp = viewportEl()
  if (!vp || vp.scrollTop > 0) return
  const dragY = Math.max(0, e.clientY - startY)
  if (dragY > 0) e.preventDefault()
  applyPull(resistedOffset(dragY))
  setPhase(dragY > 0 ? 'pulling' : 'idle')
}

function onPointerUp(e) {
  if (!pulling || e.pointerId !== activePointer) return
  pulling = false
  activePointer = null
  const vp = viewportEl()
  vp?.releasePointerCapture(e.pointerId)

  if (displayY >= THRESHOLD) {
    startLoading()
  } else {
    applyPull(0)
    setPhase('idle')
    setStatus('Pull released below threshold.')
  }
}

export function resetMaterialPullToRefresh() {
  if (loadTimer !== null) {
    window.clearTimeout(loadTimer)
    loadTimer = null
  }
  pulling = false
  loading = false
  activePointer = null
  const feed = document.querySelector('[data-mptr-feed]')
  feed?.querySelector('.mptr__row--new')?.remove()
  applyPull(0)
  setPhase('idle')
  setStatus('Pull down at top to refresh.')
}

function bindUi() {
  const vp = viewportEl()
  vp?.addEventListener('pointerdown', onPointerDown)
  vp?.addEventListener('pointermove', onPointerMove)
  vp?.addEventListener('pointerup', onPointerUp)
  vp?.addEventListener('pointercancel', onPointerUp)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetMaterialPullToRefresh()
  })
}

bindUi()
resetMaterialPullToRefresh()

export const MATERIAL_PULL_TO_REFRESH_CONTRACT = {
  MAX_DISPLAY,
  RESIST_K,
  THRESHOLD,
  HOLD_Y,
  LOAD_MS,
  ARC_LENGTH,
  MAX_ROTATION,
}
