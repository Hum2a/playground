/**
 * Sheet Rubber-Band Limit — upward overshoot resistance at max expanded detent.
 * Sandbox-safe (no parent / storage / network).
 */

const DETENTS = { collapsed: 112, medium: 318, expanded: 520 }
const MAX_OVERSHOOT = 54
const OVERSHOOT_DIV = 70
const CONTENT_RATIO = 0.35
const TICK_THRESHOLD = 32
const SETTLE_MS = 360
const RM_MAX_OVERSHOOT = 8

let visibleH = DETENTS.expanded
let overshootDisplay = 0
let dragging = false
let startY = 0
let startVisible = DETENTS.expanded
/** @type {number | null} */
let activePointer = null
/** @type {number | null} */
let settleTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-sheet-rubber-band]')
}

function sheetEl() {
  return document.querySelector('[data-srbl-sheet]')
}

function contentEl() {
  return document.querySelector('[data-srbl-content]')
}

function grabEl() {
  return document.querySelector('[data-srbl-grab]')
}

function statusEl() {
  return document.querySelector('[data-srbl-status]')
}

/**
 * @param {number} raw
 * @returns {number}
 */
export function calcDisplayOvershoot(raw) {
  const display = MAX_OVERSHOOT * (1 - Math.exp(-raw / OVERSHOOT_DIV))
  const capped = Math.min(display, MAX_OVERSHOOT)
  if (prefersReducedMotion()) return Math.min(capped, RM_MAX_OVERSHOOT)
  return capped
}

function clearSettle() {
  if (settleTimer !== null) {
    window.clearTimeout(settleTimer)
    settleTimer = null
  }
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function updateTicks(display) {
  const root = rootEl()
  if (!root) return
  root.classList.toggle('is-limit', display >= TICK_THRESHOLD)
}

function applyVisuals(h, display) {
  const root = rootEl()
  const sheet = sheetEl()
  const content = contentEl()
  if (!root || !sheet || !content) return

  root.style.setProperty('--srbl-visible', `${h}px`)
  root.style.setProperty('--srbl-overshoot', `${display}px`)
  root.style.setProperty('--srbl-stretch', `${display * 0.45}px`)
  content.style.transform =
    display > 0 ? `translateY(${display * CONTENT_RATIO}px)` : ''

  overshootDisplay = display
  updateTicks(display)

  if (display > 0) {
    setStatus(`Rubber-band overshoot ${Math.round(display)}px displayed.`)
  } else if (!dragging) {
    setStatus(`Sheet expanded · ${Math.round(h)}px visible.`)
  }
}

function snapToExpanded() {
  const root = rootEl()
  if (!root) return
  clearSettle()
  dragging = false
  activePointer = null
  root.setAttribute('data-phase', 'settling')
  root.classList.add('is-settling')

  if (prefersReducedMotion() || overshootDisplay <= 0) {
    visibleH = DETENTS.expanded
    applyVisuals(visibleH, 0)
    root.setAttribute('data-phase', 'idle')
    root.classList.remove('is-settling')
    setStatus(`Sheet expanded · ${DETENTS.expanded}px visible.`)
    return
  }

  const startDisplay = overshootDisplay
  const start = performance.now()

  function tick(now) {
    const t = Math.min(1, (now - start) / SETTLE_MS)
    const eased = 1 - (1 - t) ** 3
    const display = startDisplay * (1 - eased)
    applyVisuals(DETENTS.expanded, display)
    if (t < 1) {
      requestAnimationFrame(tick)
    } else {
      visibleH = DETENTS.expanded
      applyVisuals(visibleH, 0)
      root.setAttribute('data-phase', 'idle')
      root.classList.remove('is-settling')
      setStatus(`Sheet expanded · ${DETENTS.expanded}px visible.`)
    }
  }

  requestAnimationFrame(tick)
}

function onPointerDown(e) {
  const grab = grabEl()
  if (!grab?.contains(e.target) || e.button !== 0) return
  e.preventDefault()
  clearSettle()
  dragging = true
  activePointer = e.pointerId
  startY = e.clientY
  startVisible = visibleH
  rootEl()?.setAttribute('data-phase', 'dragging')
  grab.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return

  const dy = startY - e.clientY
  let targetH = startVisible + dy

  if (targetH > DETENTS.expanded) {
    const raw = targetH - DETENTS.expanded
    const display = calcDisplayOvershoot(raw)
    visibleH = DETENTS.expanded
    applyVisuals(visibleH, display)
    return
  }

  targetH = Math.max(DETENTS.collapsed, Math.min(DETENTS.expanded, targetH))
  visibleH = targetH
  applyVisuals(visibleH, 0)
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return
  dragging = false
  grabEl()?.releasePointerCapture(e.pointerId)
  activePointer = null

  if (overshootDisplay > 0) {
    snapToExpanded()
    return
  }

  if (visibleH < DETENTS.expanded) {
    const nearest =
      Math.abs(visibleH - DETENTS.collapsed) <
      Math.abs(visibleH - DETENTS.medium)
        ? 'collapsed'
        : 'medium'
    visibleH = DETENTS[nearest]
    rootEl()?.setAttribute('data-detent', nearest)
    applyVisuals(visibleH, 0)
    setStatus(`Sheet ${nearest} · ${visibleH}px visible.`)
  } else {
    visibleH = DETENTS.expanded
    applyVisuals(visibleH, 0)
    setStatus(`Sheet expanded · ${DETENTS.expanded}px visible.`)
  }
  rootEl()?.setAttribute('data-phase', 'idle')
}

export function resetSheetRubberBandLimit() {
  clearSettle()
  dragging = false
  visibleH = DETENTS.expanded
  overshootDisplay = 0
  const root = rootEl()
  if (root) {
    root.setAttribute('data-phase', 'idle')
    root.setAttribute('data-detent', 'expanded')
    root.classList.remove('is-settling')
  }
  applyVisuals(visibleH, 0)
  setStatus('Sheet expanded · 520px visible. Drag up beyond limit to test rubber-band.')
}

function bindUi() {
  const grab = grabEl()
  if (grab) {
    grab.addEventListener('pointerdown', onPointerDown)
    grab.addEventListener('pointermove', onPointerMove)
    grab.addEventListener('pointerup', onPointerUp)
    grab.addEventListener('pointercancel', onPointerUp)
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetSheetRubberBandLimit()
    }
  })
}

bindUi()
resetSheetRubberBandLimit()

export const SHEET_RUBBER_BAND_LIMIT_CONTRACT = {
  DETENTS,
  MAX_OVERSHOOT,
  OVERSHOOT_DIV,
  CONTENT_RATIO,
  TICK_THRESHOLD,
  SETTLE_MS,
  RM_MAX_OVERSHOOT,
  calcDisplayOvershoot,
}
