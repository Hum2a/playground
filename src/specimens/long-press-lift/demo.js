/**
 * Long-Press Lift — pointer hold elevation interaction.
 * Sandbox-safe: no parent access, storage, or network.
 *
 * Hold 420ms on MESSAGE // 04; >8px movement cancels.
 * Lift: scale 1.035, translateY -4px, neighbours 0.975, 160ms.
 */

const HOLD_MS = 420
const MOVE_CANCEL_PX = 8
const LIFT_MS = 160
const LIFT_SCALE = 1.035
const LIFT_TY = -4
const RECEDE_SCALE = 0.975

/** @type {number | null} */
let holdTimer = null
let pointerDown = false
let startX = 0
let startY = 0
let lifted = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-long-press-lift]')
}

function targetEl() {
  return document.querySelector('[data-lpl-target]')
}

function setStatus(text) {
  const el = document.querySelector('[data-lpl-status]')
  if (el) el.textContent = text
}

function clearHold() {
  if (holdTimer !== null) {
    window.clearTimeout(holdTimer)
    holdTimer = null
  }
}

function applyLift() {
  const root = rootEl()
  if (!root || lifted) return

  lifted = true
  root.setAttribute('data-phase', 'lifted')
  const actions = document.querySelector('[data-lpl-actions]')
  if (actions) actions.hidden = false
  setStatus('MESSAGE // 04 lifted. Actions available.')
}

function resetLift() {
  clearHold()
  pointerDown = false
  lifted = false
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  const actions = document.querySelector('[data-lpl-actions]')
  if (actions) actions.hidden = true
  setStatus('Hold MESSAGE // 04 to lift.')
}

function distance(x1, y1, x2, y2) {
  const dx = x2 - x1
  const dy = y2 - y1
  return Math.hypot(dx, dy)
}

/**
 * @param {number} clientX
 * @param {number} clientY
 */
function onPointerDown(clientX, clientY) {
  if (lifted) return
  pointerDown = true
  startX = clientX
  startY = clientY
  clearHold()

  holdTimer = window.setTimeout(() => {
    if (!pointerDown || lifted) return
    applyLift()
  }, HOLD_MS)
}

function onPointerMove(clientX, clientY) {
  if (!pointerDown || lifted) return
  if (distance(startX, startY, clientX, clientY) > MOVE_CANCEL_PX) {
    clearHold()
    pointerDown = false
    setStatus('Hold cancelled — pointer moved.')
    window.setTimeout(() => {
      if (!lifted) setStatus('Hold MESSAGE // 04 to lift.')
    }, 900)
  }
}

function onPointerUp() {
  if (!lifted) {
    clearHold()
    pointerDown = false
  }
}

export function resetLongPressLift() {
  resetLift()
}

function bindUi() {
  const target = targetEl()
  const root = rootEl()
  if (!target || !root) return

  target.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return
    target.setPointerCapture(event.pointerId)
    onPointerDown(event.clientX, event.clientY)
  })

  target.addEventListener('pointermove', (event) => {
    onPointerMove(event.clientX, event.clientY)
  })

  target.addEventListener('pointerup', () => {
    onPointerUp()
  })

  target.addEventListener('pointercancel', () => {
    onPointerUp()
  })

  target.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (lifted) return
      if (prefersReducedMotion()) {
        applyLift()
      } else {
        onPointerDown(0, 0)
        holdTimer = window.setTimeout(() => {
          if (!lifted) applyLift()
        }, HOLD_MS)
      }
    }
  })

  document.querySelectorAll('[data-lpl-reset]').forEach((btn) => {
    btn.addEventListener('click', () => resetLongPressLift())
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetLongPressLift()
  })
}

bindUi()
resetLongPressLift()

export const LONG_PRESS_LIFT_CONTRACT = {
  HOLD_MS,
  MOVE_CANCEL_PX,
  LIFT_MS,
  LIFT_SCALE,
  LIFT_TY,
  RECEDE_SCALE,
  ACTIONS: ['COPY', 'PIN', 'DELETE'],
  TICK_COUNT: 4,
}
