/**
 * Screenshot Thumbnail Arrival — flash, miniature thumbnail, timeout, editor state.
 */

const FLASH_MS = 70
const ARRIVE_MS = 300
const DWELL_MS = 4200
const THUMB_W = 116
const THUMB_H = 206

/** @type {number[]} */
let timers = []
/** @type {boolean} */
let paused = false
/** @type {number} */
let dwellRemaining = DWELL_MS

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-screenshot-thumbnail-arrival]')
}

function flash() {
  return document.querySelector('[data-sta-flash]')
}

function thumb() {
  return document.querySelector('[data-sta-thumb]')
}

function editor() {
  return document.querySelector('[data-sta-editor]')
}

function statusEl() {
  return document.querySelector('[data-sta-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function clearTimers() {
  timers.forEach((id) => window.clearTimeout(id))
  timers = []
}

function hideThumb() {
  const t = thumb()
  if (!t) return
  if (prefersReducedMotion()) {
    t.setAttribute('hidden', 'true')
    t.classList.remove('is-visible', 'is-exiting')
    setPhase('idle')
    setStatus('Thumbnail dismissed. Press Capture again.')
    return
  }
  t.classList.add('is-exiting')
  const id = window.setTimeout(() => {
    t.setAttribute('hidden', 'true')
    t.classList.remove('is-visible', 'is-exiting')
    setPhase('idle')
    setStatus('Thumbnail dismissed. Press Capture again.')
  }, 280)
  timers.push(id)
}

function startDwell() {
  clearTimers()
  if (paused) return
  const id = window.setTimeout(hideThumb, dwellRemaining)
  timers.push(id)
}

function showThumb() {
  const t = thumb()
  if (!t) return
  t.removeAttribute('hidden')
  if (prefersReducedMotion()) {
    t.classList.add('is-visible')
    t.style.transform = ''
    t.style.opacity = ''
  } else {
    requestAnimationFrame(() => t.classList.add('is-visible'))
  }
  setPhase('thumbnail')
  setStatus('Screenshot thumbnail arrived — auto-dismiss in 4.2s. Tap to open editor.')
  dwellRemaining = DWELL_MS
  startDwell()
}

function capture() {
  clearTimers()
  paused = false
  editor()?.setAttribute('hidden', 'true')
  const f = flash()
  const t = thumb()
  if (t) {
    t.classList.remove('is-visible', 'is-exiting')
    t.setAttribute('hidden', 'true')
  }

  if (prefersReducedMotion()) {
    showThumb()
    return
  }

  if (f) {
    f.removeAttribute('hidden')
    const flashId = window.setTimeout(() => f.setAttribute('hidden', 'true'), FLASH_MS)
    timers.push(flashId)
  }

  const arriveId = window.setTimeout(showThumb, FLASH_MS)
  timers.push(arriveId)
}

function openEditor() {
  paused = true
  clearTimers()
  editor()?.removeAttribute('hidden')
  setPhase('editor')
  setStatus('Editor open — timeout paused. Close to resume dwell.')
}

function closeEditor() {
  editor()?.setAttribute('hidden', 'true')
  paused = false
  setPhase('thumbnail')
  setStatus('Editor closed — dwell timer resumed.')
  startDwell()
}

export function resetScreenshotThumbnailArrival() {
  clearTimers()
  paused = false
  dwellRemaining = DWELL_MS
  flash()?.setAttribute('hidden', 'true')
  editor()?.setAttribute('hidden', 'true')
  const t = thumb()
  if (t) {
    t.setAttribute('hidden', 'true')
    t.classList.remove('is-visible', 'is-exiting')
  }
  setPhase('idle')
  setStatus('Press Capture to simulate a screenshot thumbnail arrival.')
}

function bindUi() {
  document.querySelector('[data-sta-capture]')?.addEventListener('click', capture)
  thumb()?.addEventListener('click', openEditor)
  thumb()?.addEventListener('mouseenter', () => {
    if (thumb()?.classList.contains('is-visible') && !editor()?.hasAttribute('hidden')) return
    if (thumb()?.classList.contains('is-visible')) {
      paused = true
      clearTimers()
    }
  })
  thumb()?.addEventListener('mouseleave', () => {
    if (thumb()?.classList.contains('is-visible') && editor()?.hasAttribute('hidden')) {
      paused = false
      startDwell()
    }
  })
  document.querySelector('[data-sta-editor-close]')?.addEventListener('click', closeEditor)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetScreenshotThumbnailArrival()
    }
  })
}

bindUi()
resetScreenshotThumbnailArrival()

export const SCREENSHOT_THUMBNAIL_ARRIVAL_CONTRACT = {
  FLASH_MS,
  ARRIVE_MS,
  DWELL_MS,
  THUMB_W,
  THUMB_H,
}
