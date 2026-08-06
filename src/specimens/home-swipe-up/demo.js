/**
 * Home Swipe Up — upward gesture shrinks app toward launcher.
 * Sandbox-safe (no parent / storage / network).
 */

const W = 390
const H = 700
const ZONE_H = 28
const MAX_DRAG = 240
const COMMIT_DIST = 150
const COMMIT_VEL = 0.6
const COMMIT_MS = 220

let dragging = false
let startY = 0
let dragY = 0
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
  return document.querySelector('[data-home-swipe-up]')
}

function appEl() {
  return document.querySelector('[data-hsu-app]')
}

function launcherEl() {
  return document.querySelector('.hsu__launcher')
}

function statusEl() {
  return document.querySelector('[data-hsu-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

/**
 * @param {number} y
 */
export function mapGesture(y) {
  const t = Math.min(Math.max(y, 0), MAX_DRAG) / MAX_DRAG
  return {
    translateY: -70 * t,
    scale: 1 - 0.28 * t,
    radius: 30 * t,
    launcherOpacity: 0.25 + 0.75 * t,
  }
}

function applyDrag(y) {
  const m = mapGesture(y)
  const app = appEl()
  const launcher = launcherEl()
  if (!app || !launcher) return
  app.style.transform = `translateY(${m.translateY}px) scale(${m.scale})`
  app.style.borderRadius = `${m.radius}px`
  launcher.style.opacity = String(m.launcherOpacity)
}

function resetApp() {
  const root = rootEl()
  const app = appEl()
  const launcher = launcherEl()
  root?.classList.remove('is-committing')
  root?.setAttribute('data-phase', 'app')
  if (app) {
    app.style.transform = ''
    app.style.borderRadius = '0'
  }
  if (launcher) launcher.style.opacity = '0.25'
  dragY = 0
  setStatus('Swipe up from the bottom navigation zone to go home.')
}

function commitHome() {
  const root = rootEl()
  const app = appEl()
  const launcher = launcherEl()
  if (!root || !app || !launcher) return

  root.setAttribute('data-phase', 'home')
  launcher.style.opacity = '1'

  if (prefersReducedMotion()) {
    app.style.transform = 'translate(108px, 520px) scale(0.12)'
    app.style.borderRadius = '18px'
    setStatus('Home — app settled on launcher icon.')
    return
  }

  root.classList.add('is-committing')
  app.style.transform = 'translate(108px, 520px) scale(0.12)'
  app.style.borderRadius = '18px'
  window.setTimeout(() => {
    setStatus('Home — app settled on launcher icon.')
  }, COMMIT_MS)
}

function onPointerDown(e) {
  if (rootEl()?.getAttribute('data-phase') === 'home') return
  const rect = e.currentTarget.getBoundingClientRect()
  if (e.clientY < rect.top || e.clientY > rect.bottom) return
  dragging = true
  activePointer = e.pointerId
  startY = e.clientY
  lastY = e.clientY
  lastT = performance.now()
  velocity = 0
  e.currentTarget.setPointerCapture(e.pointerId)
  setStatus('Dragging — release to commit or cancel.')
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return
  const now = performance.now()
  const dt = now - lastT
  if (dt > 0) velocity = (lastY - e.clientY) / dt
  lastY = e.clientY
  lastT = now
  dragY = Math.max(0, startY - e.clientY)
  applyDrag(dragY)
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return
  dragging = false
  activePointer = null
  e.currentTarget.releasePointerCapture(e.pointerId)

  if (dragY >= COMMIT_DIST || velocity > COMMIT_VEL) {
    commitHome()
    return
  }
  if (prefersReducedMotion()) {
    resetApp()
    return
  }
  const app = appEl()
  const launcher = launcherEl()
  if (app) {
    app.style.transition = 'transform 180ms ease, border-radius 180ms ease'
    launcher && (launcher.style.transition = 'opacity 180ms ease')
  }
  resetApp()
  window.setTimeout(() => {
    if (app) app.style.transition = ''
    if (launcher) launcher.style.transition = ''
  }, 200)
  setStatus('Cancelled — full-screen app restored.')
}

export function resetHomeSwipeUp() {
  dragging = false
  activePointer = null
  resetApp()
}

function bindUi() {
  document.querySelector('[data-hsu-zone]')?.addEventListener('pointerdown', onPointerDown)
  document.querySelector('[data-hsu-zone]')?.addEventListener('pointermove', onPointerMove)
  document.querySelector('[data-hsu-zone]')?.addEventListener('pointerup', onPointerUp)
  document.querySelector('[data-hsu-zone]')?.addEventListener('pointercancel', onPointerUp)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetHomeSwipeUp()
    }
  })
}

bindUi()
resetHomeSwipeUp()

export const HOME_SWIPE_UP_CONTRACT = { W, H, ZONE_H, MAX_DRAG, COMMIT_DIST, COMMIT_VEL }
