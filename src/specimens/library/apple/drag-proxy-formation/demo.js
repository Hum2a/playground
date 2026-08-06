/**
 * Drag Proxy Formation — condense source card into portable proxy on drag.
 * Sandbox-safe (no parent / storage / network).
 */

const DRAG_THRESHOLD = 6
const CARD_W = 260
const CARD_H = 150
const PROXY_W = 116
const PROXY_H = 64
const FORM_MS = 140
const POINTER_OFFSET = 8

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
/** @type {number | null} */
let formRaf = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-drag-proxy-formation]')
}

function card() {
  return document.querySelector('[data-dpf-card]')
}

function proxy() {
  return document.querySelector('[data-dpf-proxy]')
}

function drop() {
  return document.querySelector('[data-dpf-drop]')
}

function statusEl() {
  return document.querySelector('[data-dpf-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function collapseMeta(progress) {
  const charts = document.querySelector('[data-dpf-meta-charts]')
  const updated = document.querySelector('[data-dpf-meta-updated]')
  if (charts) charts.style.opacity = progress < 0.35 ? '1' : '0'
  if (updated) updated.style.opacity = progress < 0.15 ? '1' : '0'
}

function positionProxy(x, y) {
  const el = proxy()
  if (!el) return
  el.style.left = `${x + POINTER_OFFSET}px`
  el.style.top = `${y + POINTER_OFFSET}px`
}

function proxyCenter() {
  const el = proxy()
  if (!el || el.hidden) return null
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

function dropContainsCenter() {
  const center = proxyCenter()
  const zone = drop()
  if (!center || !zone) return false
  const r = zone.getBoundingClientRect()
  return (
    center.x >= r.left &&
    center.x <= r.right &&
    center.y >= r.top &&
    center.y <= r.bottom
  )
}

function animateFormation() {
  if (formRaf !== null) cancelAnimationFrame(formRaf)
  const el = proxy()
  if (!el) return

  if (prefersReducedMotion()) {
    el.style.width = `${PROXY_W}px`
    el.style.height = `${PROXY_H}px`
    collapseMeta(1)
    proxyFormed = true
    return
  }

  const t0 = performance.now()
  const tick = (now) => {
    const t = Math.min((now - t0) / FORM_MS, 1)
    const eased = 1 - Math.pow(1 - t, 2)
    const w = CARD_W + (PROXY_W - CARD_W) * eased
    const h = CARD_H + (PROXY_H - CARD_H) * eased
    el.style.width = `${w}px`
    el.style.height = `${h}px`
    collapseMeta(eased)
    if (t < 1) {
      formRaf = requestAnimationFrame(tick)
    } else {
      proxyFormed = true
      formRaf = null
    }
  }
  formRaf = requestAnimationFrame(tick)
}

function showProxy() {
  const el = proxy()
  const c = card()
  if (!el || !c) return
  const hostR = root()?.getBoundingClientRect()
  const r = c.getBoundingClientRect()

  el.hidden = false
  el.style.width = prefersReducedMotion() ? `${PROXY_W}px` : `${CARD_W}px`
  el.style.height = prefersReducedMotion() ? `${PROXY_H}px` : `${CARD_H}px`
  positionProxy(
    pointerX - (hostR?.left ?? 0),
    pointerY - (hostR?.top ?? 0),
  )
  c.classList.add('is-placeholder')
  animateFormation()
  setPhase('dragging')
}

function absorbProxy() {
  const el = proxy()
  const c = card()
  const zone = drop()
  if (!el || !c || !zone) return

  zone.classList.add('is-absorbing')
  el.classList.add('is-absorbing')
  setPhase('dropped')
  setStatus('REPORT // Q3 archived. Source placeholder cleared.')

  window.setTimeout(() => {
    el.hidden = true
    el.classList.remove('is-absorbing')
    c.classList.add('is-archived')
    c.classList.remove('is-placeholder')
    zone.classList.remove('is-absorbing')
    zone.classList.add('is-filled')
    dragging = false
    proxyFormed = false
  }, prefersReducedMotion() ? 80 : 280)
}

function returnProxy() {
  const el = proxy()
  const c = card()
  const zone = drop()
  if (!el || !c) return

  zone?.classList.remove('is-active')
  el.classList.add('is-returning')
  setPhase('returning')
  setStatus('Cancelled — proxy returning to source.')

  window.setTimeout(() => {
    el.hidden = true
    el.classList.remove('is-returning')
    el.style.width = ''
    el.style.height = ''
    c.classList.remove('is-placeholder')
    const charts = document.querySelector('[data-dpf-meta-charts]')
    const updated = document.querySelector('[data-dpf-meta-updated]')
    if (charts) charts.style.opacity = ''
    if (updated) updated.style.opacity = ''
    dragging = false
    proxyFormed = false
    setPhase('idle')
    setStatus('Drag REPORT // Q3 toward ARCHIVE. Move at least 6px to begin.')
  }, prefersReducedMotion() ? 60 : 320)
}

function onPointerDown(event) {
  const c = card()
  if (!c || c.classList.contains('is-archived') || event.button !== 0) return
  dragging = true
  proxyFormed = false
  startX = event.clientX
  startY = event.clientY
  pointerX = event.clientX
  pointerY = event.clientY
  c.setPointerCapture(event.pointerId)
}

function onPointerMove(event) {
  if (!dragging) return
  pointerX = event.clientX
  pointerY = event.clientY

  const dist = Math.hypot(pointerX - startX, pointerY - startY)
  if (!proxyFormed && dist >= DRAG_THRESHOLD) {
    showProxy()
  }

  if (proxyFormed) {
    const hostR = root()?.getBoundingClientRect()
    positionProxy(pointerX - (hostR?.left ?? 0), pointerY - (hostR?.top ?? 0))
    const zone = drop()
    if (zone) zone.classList.toggle('is-active', dropContainsCenter())
    setStatus(
      dropContainsCenter()
        ? 'Over ARCHIVE — release to drop.'
        : 'Dragging compact proxy.',
    )
  }
}

function onPointerUp(event) {
  if (!dragging) return
  card()?.releasePointerCapture(event.pointerId)

  if (!proxyFormed) {
    dragging = false
    return
  }

  if (dropContainsCenter()) {
    absorbProxy()
  } else {
    returnProxy()
  }
}

export function resetDragProxyFormation() {
  if (formRaf !== null) cancelAnimationFrame(formRaf)
  dragging = false
  proxyFormed = false
  const c = card()
  const el = proxy()
  const zone = drop()
  c?.classList.remove('is-placeholder', 'is-archived')
  el?.classList.remove('is-absorbing', 'is-returning')
  if (el) {
    el.hidden = true
    el.style.width = ''
    el.style.height = ''
  }
  zone?.classList.remove('is-active', 'is-absorbing', 'is-filled')
  const charts = document.querySelector('[data-dpf-meta-charts]')
  const updated = document.querySelector('[data-dpf-meta-updated]')
  if (charts) charts.style.opacity = ''
  if (updated) updated.style.opacity = ''
  setPhase('idle')
  setStatus('Drag REPORT // Q3 toward ARCHIVE. Move at least 6px to begin.')
}

function bindUi() {
  const c = card()
  if (!c) return
  c.addEventListener('pointerdown', onPointerDown)
  c.addEventListener('pointermove', onPointerMove)
  c.addEventListener('pointerup', onPointerUp)
  c.addEventListener('pointercancel', onPointerUp)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetDragProxyFormation()
    }
  })
}

bindUi()
resetDragProxyFormation()

export const DRAG_PROXY_FORMATION_CONTRACT = {
  DRAG_THRESHOLD,
  CARD_W,
  CARD_H,
  PROXY_W,
  PROXY_H,
  FORM_MS,
  POINTER_OFFSET,
}
