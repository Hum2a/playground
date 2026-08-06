/**
 * Cross-Device Cursor Handoff — pointer crosses display boundary preserving trajectory.
 */

const GAP_PX = 36
const HANDOFF_DELAY_MS = 45
const TICK_MS = 120
const CONTINUE_PX = 120
const NORMALIZED_Y = 0.62
const APPROACH_MS = 600
const CONTINUE_MS = 400

/** @type {boolean} */
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-cross-device-cursor-handoff]')
}

function stage() {
  return document.querySelector('[data-cdc-stage]')
}

function pointer() {
  return document.querySelector('[data-cdc-pointer]')
}

function tickLeft() {
  return document.querySelector('[data-cdc-tick-left]')
}

function tickRight() {
  return document.querySelector('[data-cdc-tick-right]')
}

function demoBtn() {
  return document.querySelector('[data-cdc-demo]')
}

function statusEl() {
  return document.querySelector('[data-cdc-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function layout() {
  const st = stage()
  const left = document.querySelector('[data-cdc-left]')
  const right = document.querySelector('[data-cdc-right]')
  if (!st || !left || !right) return null
  const stRect = st.getBoundingClientRect()
  const leftRect = left.getBoundingClientRect()
  const rightRect = right.getBoundingClientRect()
  return { stRect, leftRect, rightRect }
}

function placePointer(x, y, visible = true) {
  const p = pointer()
  const layoutInfo = layout()
  if (!p || !layoutInfo) return
  p.style.left = `${x - layoutInfo.stRect.left - 4}px`
  p.style.top = `${y - layoutInfo.stRect.top - 2}px`
  p.style.opacity = visible ? '1' : '0'
}

function showTicks() {
  tickLeft()?.classList.add('is-visible')
  tickRight()?.classList.add('is-visible')
  window.setTimeout(() => {
    tickLeft()?.classList.remove('is-visible')
    tickRight()?.classList.remove('is-visible')
  }, prefersReducedMotion() ? 0 : TICK_MS)
}

function runDemo() {
  if (busy) return
  busy = true
  demoBtn()?.setAttribute('disabled', 'true')
  setPhase('approaching')
  setStatus('Pointer approaching right edge at 62% height.')

  const info = layout()
  const p = pointer()
  if (!info || !p) return

  const y = info.leftRect.top + info.leftRect.height * NORMALIZED_Y
  const startX = info.leftRect.left + info.leftRect.width * 0.35
  const edgeX = info.leftRect.right - 4
  const appearX = info.rightRect.left + 4
  const endX = appearX + CONTINUE_PX

  if (prefersReducedMotion()) {
    placePointer(appearX, y, true)
    showTicks()
    setPhase('continuing')
    placePointer(endX, y, true)
    setStatus('Pointer transferred — normalized y preserved at 62%.')
    busy = false
    demoBtn()?.removeAttribute('disabled')
    return
  }

  p.style.transition = `left ${APPROACH_MS}ms linear, top ${APPROACH_MS}ms linear, opacity 40ms ease`
  placePointer(startX, y, true)

  requestAnimationFrame(() => {
    placePointer(edgeX, y, true)
  })

  window.setTimeout(() => {
    placePointer(edgeX, y, false)
    setStatus('Pointer clipped at edge — 45ms gap before reappearance.')
  }, APPROACH_MS)

  window.setTimeout(() => {
    showTicks()
    placePointer(appearX, y, true)
    setPhase('handoff')
    setStatus('Pointer appeared on DISPLAY B at same normalized y.')
  }, APPROACH_MS + HANDOFF_DELAY_MS)

  window.setTimeout(() => {
    setPhase('continuing')
    p.style.transition = `left ${CONTINUE_MS}ms linear`
    placePointer(endX, y, true)
    setStatus('Pointer continued 120px on DISPLAY B — handoff complete.')
  }, APPROACH_MS + HANDOFF_DELAY_MS + 40)

  window.setTimeout(() => {
    busy = false
    demoBtn()?.removeAttribute('disabled')
    setPhase('complete')
  }, APPROACH_MS + HANDOFF_DELAY_MS + CONTINUE_MS)
}

export function resetCrossDeviceCursorHandoff() {
  busy = false
  setPhase('idle')
  pointer()?.style.removeProperty('left')
  pointer()?.style.removeProperty('top')
  pointer()?.style.removeProperty('opacity')
  pointer()?.style.removeProperty('transition')
  tickLeft()?.classList.remove('is-visible')
  tickRight()?.classList.remove('is-visible')
  demoBtn()?.removeAttribute('disabled')
  setStatus('Pointer in left display. Run DEMO to hand off across the 36px gap.')
}

function bindUi() {
  demoBtn()?.addEventListener('click', runDemo)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetCrossDeviceCursorHandoff()
    }
  })
}

bindUi()
resetCrossDeviceCursorHandoff()

export const CROSS_DEVICE_CURSOR_HANDOFF_CONTRACT = {
  GAP_PX,
  HANDOFF_DELAY_MS,
  TICK_MS,
  CONTINUE_PX,
  NORMALIZED_Y,
}
