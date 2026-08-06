/**
 * Vertical Content Stretch — top/bottom overscroll deformation.
 * Sandbox-safe: no parent, storage, or network.
 */

const MAX_DRAG = 140
const MAX_SCALE = 1.055
const MAX_TRANSLATE = 10
const SETTLE_MS = 260

let overscrolling = false
/** @type {'none' | 'top' | 'bottom'} */
let edge = 'none'
/** @type {number | null} */
let activePointer = null
let startY = 0
let dragY = 0
/** @type {number | null} */
let settleTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function viewportEl() {
  return document.querySelector('[data-vcs-viewport]')
}

function stretchEl() {
  return document.querySelector('[data-vcs-stretch]')
}

function setStatus(text) {
  const el = document.querySelector('[data-vcs-status]')
  if (el) el.textContent = text
}

function applyStretch(amount, origin) {
  const el = stretchEl()
  const root = document.querySelector('[data-vertical-content-stretch]')
  if (!el || !root) return
  const t = Math.min(1, amount / MAX_DRAG)
  const rm = prefersReducedMotion()
  if (rm) {
    root.style.setProperty('--vcs-scale', '1')
    root.style.setProperty('--vcs-ty', '0px')
  } else {
    const scale = 1 + (MAX_SCALE - 1) * t
    const ty = MAX_TRANSLATE * t
    root.style.setProperty('--vcs-scale', String(scale))
    root.style.setProperty('--vcs-ty', `${origin === 'top' ? ty : -ty}px`)
  }
  root.setAttribute('data-vcs-origin', origin)
  const boundary = origin === 'top'
    ? document.querySelector('[data-vcs-boundary-top]')
    : document.querySelector('[data-vcs-boundary-bottom]')
  if (boundary) {
    const emphasis = rm ? Math.min(2, t * 2) : 0
    boundary.style.setProperty('--vcs-emphasis', `${emphasis}px`)
  }
}

function resetStretch(animate) {
  const root = document.querySelector('[data-vertical-content-stretch]')
  const el = stretchEl()
  if (!root || !el) return
  if (settleTimer !== null) {
    window.clearTimeout(settleTimer)
    settleTimer = null
  }
  const rm = prefersReducedMotion()
  if (animate && !rm) {
    el.classList.add('is-settling')
    settleTimer = window.setTimeout(() => {
      el.classList.remove('is-settling')
      settleTimer = null
    }, SETTLE_MS)
  }
  root.style.setProperty('--vcs-scale', '1')
  root.style.setProperty('--vcs-ty', '0px')
  root.setAttribute('data-vcs-origin', 'none')
  document.querySelector('[data-vcs-boundary-top]')?.style.setProperty('--vcs-emphasis', '0px')
  document.querySelector('[data-vcs-boundary-bottom]')?.style.setProperty('--vcs-emphasis', '0px')
  dragY = 0
  edge = 'none'
  overscrolling = false
}

function atTop(vp) {
  return vp.scrollTop <= 0
}

function atBottom(vp) {
  return vp.scrollTop + vp.clientHeight >= vp.scrollHeight - 1
}

function onPointerDown(e) {
  const vp = viewportEl()
  if (!vp || e.button !== 0) return
  if (!atTop(vp) && !atBottom(vp)) return
  activePointer = e.pointerId
  startY = e.clientY
  dragY = 0
  vp.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  const vp = viewportEl()
  if (!vp || e.pointerId !== activePointer) return

  const dy = e.clientY - startY
  if (atTop(vp) && dy > 0) {
    overscrolling = true
    edge = 'top'
    dragY = Math.min(MAX_DRAG, dy)
    e.preventDefault()
    applyStretch(dragY, 'top')
    setStatus('Top boundary stretch active.')
  } else if (atBottom(vp) && dy < 0) {
    overscrolling = true
    edge = 'bottom'
    dragY = Math.min(MAX_DRAG, -dy)
    e.preventDefault()
    applyStretch(dragY, 'bottom')
    setStatus('Bottom boundary stretch active.')
  } else if (!overscrolling) {
    return
  }
}

function onPointerUp(e) {
  if (e.pointerId !== activePointer) return
  viewportEl()?.releasePointerCapture(e.pointerId)
  activePointer = null
  if (overscrolling) {
    resetStretch(true)
    setStatus('Stretch released; returned to scale 1.')
  }
}

export function resetVerticalContentStretch() {
  activePointer = null
  resetStretch(false)
  const vp = viewportEl()
  if (vp) vp.scrollTop = 0
  setStatus('Scroll to boundaries to stretch content.')
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
    if (data.type === 'restart') resetVerticalContentStretch()
  })
}

bindUi()
resetVerticalContentStretch()

export const VERTICAL_CONTENT_STRETCH_CONTRACT = {
  MAX_DRAG,
  MAX_SCALE,
  MAX_TRANSLATE,
  SETTLE_MS,
}
