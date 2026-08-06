/**
 * Slider Thumb Pickup — range input with enlarged thumb and value bubble.
 * Sandbox-safe (no parent / storage / network).
 */

const TRACK_W = 280
const THUMB_IDLE = 20
const THUMB_ACTIVE = 28
const BUBBLE_HIDE_MS = 180

/** @type {number | null} */
let hideTimer = null

function root() {
  return document.querySelector('[data-slider-thumb-pickup]')
}

function range() {
  return document.querySelector('[data-stp-range]')
}

function bubble() {
  return document.querySelector('[data-stp-bubble]')
}

function fill() {
  return document.querySelector('[data-stp-fill]')
}

function output() {
  return document.querySelector('[data-stp-output]')
}

function statusEl() {
  return document.querySelector('[data-stp-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function thumbOffset(value) {
  const pct = Number(value) / 100
  const travel = TRACK_W - THUMB_IDLE
  return pct * travel + THUMB_IDLE / 2
}

function syncUi() {
  const r = range()
  const b = bubble()
  const f = fill()
  const o = output()
  if (!r) return
  const val = Number(r.value)
  const x = thumbOffset(val)
  if (f) f.style.width = `${(val / 100) * TRACK_W}px`
  if (b) {
    b.textContent = String(val)
    b.style.left = `${x}px`
  }
  if (o) o.textContent = String(val)
  r.setAttribute('aria-valuetext', String(val))
}

function showBubble() {
  const b = bubble()
  const r = root()
  if (!b || !r) return
  if (hideTimer !== null) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  b.hidden = false
  b.classList.remove('is-hiding')
  r.classList.add('is-active')
  syncUi()
}

function scheduleHideBubble() {
  const b = bubble()
  const r = root()
  if (!b || !r) return
  if (hideTimer !== null) clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => {
    b.classList.add('is-hiding')
    window.setTimeout(() => {
      b.hidden = true
      b.classList.remove('is-hiding')
      r.classList.remove('is-active')
      hideTimer = null
    }, BUBBLE_HIDE_MS)
  }, BUBBLE_HIDE_MS)
}

export function resetSliderThumbPickup() {
  if (hideTimer !== null) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  const r = range()
  const b = bubble()
  const rootEl = root()
  if (r) r.value = '45'
  b?.classList.remove('is-hiding')
  if (b) b.hidden = true
  rootEl?.classList.remove('is-active')
  syncUi()
  setStatus('Drag or use arrow keys — values snap to multiples of 5.')
}

function bindUi() {
  const r = range()
  if (!r) return

  r.addEventListener('input', () => {
    syncUi()
    setStatus(`Value ${r.value} — track fill and bubble aligned.`)
  })
  r.addEventListener('pointerdown', () => showBubble())
  r.addEventListener('focus', () => showBubble())
  r.addEventListener('pointerup', () => scheduleHideBubble())
  r.addEventListener('blur', () => scheduleHideBubble())

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetSliderThumbPickup()
    }
  })
}

bindUi()
resetSliderThumbPickup()

export const SLIDER_THUMB_PICKUP_CONTRACT = {
  TRACK_W,
  THUMB_IDLE,
  THUMB_ACTIVE,
  STEP: 5,
  BUBBLE_W: 44,
  BUBBLE_H: 32,
  BUBBLE_HIDE_MS,
}
