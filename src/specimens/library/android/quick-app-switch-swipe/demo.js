/**
 * Quick App Switch Swipe — bottom-zone horizontal task switching.
 */

const ZONE_H = 32
const COMMIT_PX = 96
const VELOCITY_THRESHOLD = 0.6
const MAX_DRAG = 72
const VIEW_W = 390

/** @type {number} */
let activeTask = 0
/** @type {boolean} */
let dragging = false
/** @type {number} */
let startX = 0
/** @type {number} */
let startY = 0
/** @type {number} */
let lastX = 0
/** @type {number} */
let lastT = 0
/** @type {number} */
let velocity = 0
/** @type {number} */
let dragX = 0
/** @type {number} */
let pointerId = -1

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function tasks() {
  return Array.from(document.querySelectorAll('[data-qas-task]'))
}

function statusEl() {
  return document.querySelector('[data-qas-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function applyTransforms(offset) {
  const clamped = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, offset))
  const scale = 1 - Math.abs(clamped) / MAX_DRAG * 0.04
  const [current, adjacent] = activeTask === 0 ? [0, 1] : [1, 0]
  const t = tasks()
  const cur = t[current]
  const adj = t[adjacent]
  if (cur) {
    cur.style.transform = `translateX(${clamped}px) scale(${scale})`
    cur.style.zIndex = '2'
  }
  if (adj) {
    const enter = clamped < 0 ? VIEW_W + clamped : -VIEW_W + clamped
    adj.style.transform = `translateX(${enter * 0.35}px) scale(0.96)`
    adj.style.opacity = String(Math.min(1, Math.abs(clamped) / MAX_DRAG))
    adj.style.zIndex = '1'
  }
}

function resetTransforms() {
  tasks().forEach((task, i) => {
    task.style.transform = i === activeTask ? 'none' : 'translateX(100%)'
    task.style.opacity = i === activeTask ? '1' : '0'
    task.style.zIndex = i === activeTask ? '2' : '1'
  })
}

function commit(direction) {
  if (direction === 0) {
    resetTransforms()
    setStatus('Gesture cancelled — current task restored.')
    return
  }
  activeTask = activeTask === 0 ? 1 : 0
  document.querySelector('[data-quick-app-switch-swipe]')?.setAttribute('data-task', String(activeTask))
  resetTransforms()
  setStatus(activeTask === 0 ? 'Task A active.' : 'Task B active.')
}

function settle() {
  const abs = Math.abs(dragX)
  const dir = dragX < -COMMIT_PX || velocity < -VELOCITY_THRESHOLD ? -1
    : dragX > COMMIT_PX || velocity > VELOCITY_THRESHOLD ? 1 : 0

  if (prefersReducedMotion()) {
    commit(dir)
    dragX = 0
    return
  }

  if (dir !== 0) {
    const target = dir < 0 ? -VIEW_W : VIEW_W
    const from = dragX
    const t0 = performance.now()
    const tick = (now) => {
      const t = Math.min((now - t0) / 180, 1)
      applyTransforms(from + (target - from) * t)
      if (t < 1) requestAnimationFrame(tick)
      else commit(dir)
    }
    requestAnimationFrame(tick)
  } else {
    const from = dragX
    const t0 = performance.now()
    const tick = (now) => {
      const t = Math.min((now - t0) / 180, 1)
      applyTransforms(from * (1 - t))
      if (t < 1) requestAnimationFrame(tick)
      else commit(0)
    }
    requestAnimationFrame(tick)
  }
  dragX = 0
}

function onPointerDown(event) {
  const zone = document.querySelector('[data-qas-zone]')
  if (!zone) return
  const rect = zone.getBoundingClientRect()
  if (event.clientY < rect.top || event.clientY > rect.bottom) return
  dragging = true
  startX = event.clientX
  startY = event.clientY
  lastX = event.clientX
  lastT = performance.now()
  velocity = 0
  pointerId = event.pointerId
  zone.setPointerCapture(event.pointerId)
}

function onPointerMove(event) {
  if (!dragging) return
  const now = performance.now()
  const dt = now - lastT
  if (dt > 0) velocity = (event.clientX - lastX) / dt
  lastX = event.clientX
  lastT = now
  dragX = event.clientX - startX
  event.preventDefault()
  applyTransforms(dragX)
}

function onPointerUp() {
  if (!dragging) return
  dragging = false
  document.querySelector('[data-qas-zone]')?.releasePointerCapture(pointerId)
  settle()
}

export function resetQuickAppSwitchSwipe() {
  activeTask = 0
  dragX = 0
  dragging = false
  document.querySelector('[data-quick-app-switch-swipe]')?.setAttribute('data-task', '0')
  resetTransforms()
  setStatus('Drag horizontally from the bottom 32px to switch tasks. Commit at 96px or velocity.')
}

function bindUi() {
  const zone = document.querySelector('[data-qas-zone]')
  zone?.addEventListener('pointerdown', onPointerDown)
  zone?.addEventListener('pointermove', onPointerMove)
  zone?.addEventListener('pointerup', onPointerUp)
  zone?.addEventListener('pointercancel', onPointerUp)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetQuickAppSwitchSwipe()
    }
  })
}

bindUi()
resetQuickAppSwitchSwipe()

export const QUICK_APP_SWITCH_SWIPE_CONTRACT = {
  ZONE_H,
  COMMIT_PX,
  VELOCITY_THRESHOLD,
  MAX_DRAG,
}
