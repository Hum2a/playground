/**
 * Spring Selection Pill — shared backing moves between four segments with spring settle.
 * Sandbox-safe (no parent / storage / network).
 */

const CONTAINER_W = 336
const CONTAINER_H = 44
const INSET = 3
const SEGMENTS = ['day', 'week', 'month', 'year']
const LONG_MS = 340
const ADJ_MS = 240
const LONG_OVERSHOOT = 5
const ADJ_OVERSHOOT = 3

/** @type {number | null} */
let animId = null
let selected = 'day'
/** @type {number} */
let visualX = 0
/** @type {number} */
let targetX = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-spring-selection]')
}

function backingEl() {
  return document.querySelector('[data-ssp-backing]')
}

function statusEl() {
  return document.querySelector('[data-ssp-status]')
}

function segWidth() {
  return (CONTAINER_W - INSET * 2) / SEGMENTS.length
}

function indexOf(name) {
  return SEGMENTS.indexOf(name)
}

function xForIndex(i) {
  return INSET + i * segWidth()
}

function setStatus(name) {
  const el = statusEl()
  if (el) el.textContent = `${name.toUpperCase()} selected.`
}

function applyBackingX(x) {
  const backing = backingEl()
  if (backing) backing.style.transform = `translateX(${x}px)`
  visualX = x
}

function updateAria(name) {
  for (const seg of document.querySelectorAll('[data-ssp-seg]')) {
    const id = seg.getAttribute('data-ssp-seg')
    const on = id === name
    seg.setAttribute('aria-selected', on ? 'true' : 'false')
  }
}

function cancelAnim() {
  if (animId !== null) {
    cancelAnimationFrame(animId)
    animId = null
  }
}

function animateTo(x, toIdx, duration, overshoot) {
  cancelAnim()
  const start = visualX
  const delta = x - start
  const fromIdx = Math.round((visualX - INSET) / segWidth())
  const dist = Math.abs(toIdx - fromIdx)

  if (prefersReducedMotion()) {
    applyBackingX(x)
    return
  }

  const ms = dist <= 1 ? ADJ_MS : LONG_MS
  const maxOs = dist <= 1 ? ADJ_OVERSHOOT : LONG_OVERSHOOT
  const total = duration ?? ms
  const os = overshoot ?? maxOs
  const startTime = performance.now()

  function tick(now) {
    const t = Math.min(1, (now - startTime) / total)
    const spring =
      t < 1
        ? 1 - Math.exp(-6 * t) * Math.cos(8 * t)
        : 1
    let pos = start + delta * spring
    if (t < 1 && os > 0) {
      const overshootAmt = os * Math.sin(Math.PI * t) * (1 - t)
      pos += overshootAmt * (delta >= 0 ? 1 : -1)
    }
    applyBackingX(pos)
    if (t < 1) {
      animId = requestAnimationFrame(tick)
    } else {
      applyBackingX(x)
      animId = null
    }
  }

  animId = requestAnimationFrame(tick)
}

function select(name) {
  if (!SEGMENTS.includes(name)) return
  selected = name
  const root = rootEl()
  if (root) root.setAttribute('data-selected', name)
  const toIdx = indexOf(name)
  targetX = xForIndex(toIdx)
  const fromIdx = Math.round((visualX - INSET) / segWidth())
  const dist = Math.abs(toIdx - fromIdx)
  const duration = dist <= 1 ? ADJ_MS : LONG_MS
  animateTo(targetX, toIdx, duration)
  updateAria(name)
  setStatus(name)
}

export function resetSpringSelectionPill() {
  cancelAnim()
  selected = 'day'
  const root = rootEl()
  if (root) root.setAttribute('data-selected', 'day')
  applyBackingX(xForIndex(0))
  targetX = xForIndex(0)
  updateAria('day')
  setStatus('day')
}

function bindUi() {
  for (const btn of document.querySelectorAll('[data-ssp-seg]')) {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-ssp-seg')
      if (name) select(name)
    })
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetSpringSelectionPill()
    }
  })
}

bindUi()
resetSpringSelectionPill()

export const SPRING_SELECTION_PILL_CONTRACT = {
  CONTAINER_W,
  CONTAINER_H,
  INSET,
  SEGMENTS,
  LONG_MS,
  ADJ_MS,
  LONG_OVERSHOOT,
  ADJ_OVERSHOOT,
}
