/**
 * Picture-in-Picture Collapse — player transforms to floating PiP window.
 * Sandbox-safe: no parent, storage, network, or video APIs.
 */

const STAGE_W = 390
const STAGE_H = 700
const PIP_W = 176
const PIP_H = 99
const PIP_MARGIN = 16
const ANIM_MS = 380

let isPip = false
let dragging = false
let didDrag = false
/** @type {number | null} */
let activePointer = null
let dragOffsetX = 0
let dragOffsetY = 0
let pointerDownX = 0
let pointerDownY = 0
/** @type {number | null} */
let animTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-pip-collapse]')
}

function playerEl() {
  return document.querySelector('[data-pipc-player]')
}

function setStatus(text) {
  const el = document.querySelector('[data-pipc-status]')
  if (el) el.textContent = text
}

function inlineRect() {
  const wrap = document.querySelector('[data-pipc-player-wrap]')
  const stage = document.querySelector('[data-pipc-stage]')
  if (!wrap || !stage) return { x: 16, y: 72, w: STAGE_W - 32, h: Math.round((STAGE_W - 32) * 9 / 16) }
  const s = stage.getBoundingClientRect()
  const w = wrap.getBoundingClientRect()
  return { x: w.left - s.left, y: w.top - s.top, w: w.width, h: w.height }
}

function pipRect() {
  return {
    x: STAGE_W - PIP_W - PIP_MARGIN,
    y: STAGE_H - PIP_H - PIP_MARGIN,
    w: PIP_W,
    h: PIP_H,
  }
}

function applyRect(rect, animate) {
  const player = playerEl()
  const root = rootEl()
  if (!player || !root) return
  player.style.left = `${rect.x}px`
  player.style.top = `${rect.y}px`
  player.style.width = `${rect.w}px`
  player.style.height = `${rect.h}px`
  root.classList.toggle('is-animating', animate && !prefersReducedMotion())
}

function setMode(pip) {
  const root = rootEl()
  if (!root) return
  isPip = pip
  root.setAttribute('data-pipc-mode', pip ? 'pip' : 'inline')
  const mini = document.querySelector('[data-pipc-mini]')
  if (mini instanceof HTMLElement) mini.hidden = pip
}

function collapseToPip() {
  if (isPip) return
  const from = inlineRect()
  const to = pipRect()
  setMode(true)
  applyRect(from, false)
  requestAnimationFrame(() => applyRect(to, true))
  setStatus('Player collapsed to picture-in-picture.')
  if (animTimer !== null) window.clearTimeout(animTimer)
  animTimer = window.setTimeout(() => {
    rootEl()?.classList.remove('is-animating')
    animTimer = null
  }, prefersReducedMotion() ? 0 : ANIM_MS)
}

function expandToInline() {
  if (!isPip) return
  const from = pipRect()
  const to = inlineRect()
  applyRect(from, false)
  requestAnimationFrame(() => applyRect(to, true))
  setStatus('Player restored to inline region.')
  if (animTimer !== null) window.clearTimeout(animTimer)
  animTimer = window.setTimeout(() => {
    setMode(false)
    const player = playerEl()
    if (player) {
      player.style.left = ''
      player.style.top = ''
      player.style.width = ''
      player.style.height = ''
    }
    rootEl()?.classList.remove('is-animating')
    animTimer = null
  }, prefersReducedMotion() ? 0 : ANIM_MS)
}

function clampPip(x, y) {
  const maxX = STAGE_W - PIP_W - PIP_MARGIN
  const maxY = STAGE_H - PIP_H - PIP_MARGIN
  return {
    x: Math.max(PIP_MARGIN, Math.min(maxX, x)),
    y: Math.max(PIP_MARGIN, Math.min(maxY, y)),
  }
}

function onPointerDown(e) {
  if (!isPip || e.button !== 0) return
  const player = playerEl()
  if (!player) return
  dragging = true
  didDrag = false
  activePointer = e.pointerId
  pointerDownX = e.clientX
  pointerDownY = e.clientY
  const rect = player.getBoundingClientRect()
  const stage = document.querySelector('[data-pipc-stage]')?.getBoundingClientRect()
  if (!stage) return
  dragOffsetX = e.clientX - rect.left
  dragOffsetY = e.clientY - rect.top
  player.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== activePointer) return
  if (Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY) > 6) didDrag = true
  const stage = document.querySelector('[data-pipc-stage]')?.getBoundingClientRect()
  if (!stage) return
  const x = e.clientX - stage.left - dragOffsetX
  const y = e.clientY - stage.top - dragOffsetY
  const c = clampPip(x, y)
  const player = playerEl()
  if (player) {
    player.style.left = `${c.x}px`
    player.style.top = `${c.y}px`
  }
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== activePointer) return
  dragging = false
  activePointer = null
  playerEl()?.releasePointerCapture(e.pointerId)
}

export function resetPictureInPictureCollapse() {
  if (animTimer !== null) {
    window.clearTimeout(animTimer)
    animTimer = null
  }
  dragging = false
  activePointer = null
  setMode(false)
  const player = playerEl()
  if (player) {
    player.style.left = ''
    player.style.top = ''
    player.style.width = ''
    player.style.height = ''
  }
  rootEl()?.classList.remove('is-animating')
  setStatus('Player inline.')
}

function bindUi() {
  document.querySelector('[data-pipc-mini]')?.addEventListener('click', collapseToPip)
  playerEl()?.addEventListener('click', () => {
    if (isPip && !didDrag) expandToInline()
  })
  const stage = document.querySelector('[data-pipc-stage]')
  stage?.addEventListener('pointerdown', onPointerDown)
  stage?.addEventListener('pointermove', onPointerMove)
  stage?.addEventListener('pointerup', onPointerUp)
  stage?.addEventListener('pointercancel', onPointerUp)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetPictureInPictureCollapse()
  })
}

bindUi()
resetPictureInPictureCollapse()

export const PICTURE_IN_PICTURE_COLLAPSE_CONTRACT = {
  STAGE_W,
  STAGE_H,
  PIP_W,
  PIP_H,
  PIP_MARGIN,
  ANIM_MS,
}
