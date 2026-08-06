/**
 * Multi-Item Drag Stack — four selected files condense into portable stack.
 * Sandbox-safe (no parent / storage / network).
 *
 * Top A.MD 108×58 · offsets 4/8/12 · scales 1/.98/.96/.94 · badge 4
 */

const FORMATION_STAGGER_MS = 45
const DROP_STAGGER_MS = 35
const ITEM_COUNT = 4
const PROXY_W = 108
const PROXY_H = 58
const OFFSETS = [0, 4, 8, 12]
const SCALES = [1, 0.98, 0.96, 0.94]

let phase = 'idle'
let stackX = 0
let stackY = 0
let dragging = false
/** @type {{ x: number; y: number } | null} */
let dragOffset = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-multi-item-drag-stack]')
}

function setStatus(text) {
  const el = document.querySelector('[data-mds-status]')
  if (el) el.textContent = text
}

function stackEl() {
  return document.querySelector('[data-mds-stack]')
}

function setPhase(next) {
  phase = next
  rootEl()?.setAttribute('data-phase', next)
}

function positionStack(x, y) {
  const stack = stackEl()
  if (!stack) return
  stack.style.transform = `translate(${x}px, ${y}px)`
  stackX = x
  stackY = y
}

function showStack() {
  const stack = stackEl()
  if (stack) {
    stack.hidden = false
    stack.setAttribute('aria-hidden', 'false')
  }
}

function hideStack() {
  const stack = stackEl()
  if (stack) {
    stack.hidden = true
    stack.setAttribute('aria-hidden', 'true')
  }
}

function toggleControls() {
  const start = document.querySelector('[data-mds-start]')
  const reset = document.querySelector('[data-mds-reset]')
  if (start) start.hidden = phase === 'dropped'
  if (reset) reset.hidden = phase !== 'dropped'
}

function isOverTarget(clientX, clientY) {
  const target = document.querySelector('[data-mds-target]')
  if (!target) return false
  const rect = target.getBoundingClientRect()
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  )
}

export function startMultiItemDrag() {
  if (phase !== 'idle') return

  showStack()
  setPhase('forming')
  setStatus('Forming four-item stack.')

  const stage = document.querySelector('[data-mds-stage]')
  const stack = stackEl()
  if (!stage || !stack) return

  const stageRect = stage.getBoundingClientRect()
  const startX = stageRect.width / 2 - PROXY_W / 2
  const startY = 40
  positionStack(startX, startY)

  const finish = () => {
    setPhase('dragging')
    setStatus('Dragging stack. Drop on target.')
    bindDrag()
  }

  if (prefersReducedMotion()) {
    finish()
    return
  }

  window.setTimeout(finish, FORMATION_STAGGER_MS * 3 + 120)
}

function bindDrag() {
  const stack = stackEl()
  if (!stack) return

  const onPointerDown = (event) => {
    if (phase !== 'dragging') return
    dragging = true
    stack.classList.add('is-grabbing')
    const rect = stack.getBoundingClientRect()
    dragOffset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    stack.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event) => {
    if (!dragging || !dragOffset) return
    const stage = document.querySelector('[data-mds-stage]')
    if (!stage) return
    const stageRect = stage.getBoundingClientRect()
    const x = event.clientX - stageRect.left - dragOffset.x
    const y = event.clientY - stageRect.top - dragOffset.y
    positionStack(x, y)

    const target = document.querySelector('[data-mds-target]')
    target?.classList.toggle('is-hot', isOverTarget(event.clientX, event.clientY))
  }

  const onPointerUp = (event) => {
    if (!dragging) return
    dragging = false
    stack.classList.remove('is-grabbing')
    dragOffset = null

    const target = document.querySelector('[data-mds-target]')
    target?.classList.remove('is-hot')

    if (isOverTarget(event.clientX, event.clientY)) {
      absorbDrop()
    } else {
      setStatus('Drag stack to DROP HERE target.')
    }
  }

  stack.addEventListener('pointerdown', onPointerDown)
  stack.addEventListener('pointermove', onPointerMove)
  stack.addEventListener('pointerup', onPointerUp)
  stack.addEventListener('pointercancel', onPointerUp)
}

function absorbDrop() {
  setPhase('dropping')
  setStatus('Absorbing files.')

  const finish = () => {
    hideStack()
    setPhase('dropped')
    setStatus('Four files absorbed. No duplication.')
    toggleControls()
  }

  if (prefersReducedMotion()) {
    finish()
    return
  }

  window.setTimeout(finish, DROP_STAGGER_MS * ITEM_COUNT + 80)
}

export function resetMultiItemDrag() {
  hideStack()
  positionStack(0, 0)
  setPhase('idle')
  setStatus('Four files selected. Start drag.')
  toggleControls()
  document.querySelector('[data-mds-target]')?.classList.remove('is-hot')
}

function bindUi() {
  document.querySelector('[data-mds-start]')?.addEventListener('click', () => {
    startMultiItemDrag()
  })

  document.querySelector('[data-mds-reset]')?.addEventListener('click', () => {
    resetMultiItemDrag()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetMultiItemDrag()
  })
}

bindUi()
toggleControls()

export const MULTI_ITEM_DRAG_STACK_CONTRACT = {
  FORMATION_STAGGER_MS,
  DROP_STAGGER_MS,
  ITEM_COUNT,
  PROXY: { width: PROXY_W, height: PROXY_H },
  OFFSETS,
  SCALES,
  FILES: ['A.MD', 'B.PDF', 'C.PNG', 'D.JSON'],
}
