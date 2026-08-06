/**
 * Volume/Brightness HUD — transient level overlay with ten segments.
 */

const ENTRANCE_MS = 140
const SEGMENT_MS = 180
const DWELL_MS = 900
const EXIT_MS = 120
const SEGMENT_COUNT = 10
const INITIAL_VALUE = 42
const TARGET_VALUE = 68

/** @type {number} */
let currentValue = INITIAL_VALUE
/** @type {ReturnType<typeof setTimeout> | null} */
let dwellTimer = null
/** @type {boolean} */
let hudVisible = false
/** @type {boolean} */
let hasEntered = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-volume-brightness-hud]')
}

function hud() {
  return document.querySelector('[data-vbh-hud]')
}

function valueEl() {
  return document.querySelector('[data-vbh-value]')
}

function statusEl() {
  return document.querySelector('[data-vbh-status]')
}

function segments() {
  return document.querySelectorAll('[data-vbh-seg]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function valueToSegments(val) {
  const filled = Math.floor(val / 10)
  const partial = val % 10 >= 5
  return { filled, partialIndex: partial ? filled : -1 }
}

function renderSegments(val) {
  const { filled, partialIndex } = valueToSegments(val)
  segments().forEach((seg, i) => {
    seg.classList.remove('is-filled', 'is-partial')
    if (i < filled) seg.classList.add('is-filled')
    else if (i === partialIndex) seg.classList.add('is-partial')
  })
  const v = valueEl()
  if (v) v.textContent = String(val)
}

function showHud() {
  hudVisible = true
  setPhase('visible')
  hud()?.setAttribute('aria-hidden', 'false')
  if (!hasEntered) {
    hasEntered = true
    if (!prefersReducedMotion()) {
      requestAnimationFrame(() => setPhase('visible'))
    }
  }
}

function hideHud() {
  hudVisible = false
  hasEntered = false
  setPhase('exiting')
  window.setTimeout(() => {
    setPhase('hidden')
    hud()?.setAttribute('aria-hidden', 'true')
    setStatus(`HUD dismissed. Output level remains ${currentValue}.`)
  }, prefersReducedMotion() ? 0 : EXIT_MS)
}

function resetDwell() {
  if (dwellTimer) clearTimeout(dwellTimer)
  dwellTimer = setTimeout(hideHud, DWELL_MS)
}

function increase() {
  const wasVisible = hudVisible
  showHud()
  renderSegments(currentValue)

  if (currentValue < TARGET_VALUE) {
    currentValue = TARGET_VALUE
    if (!prefersReducedMotion()) {
      window.setTimeout(() => renderSegments(currentValue), SEGMENT_MS)
    } else {
      renderSegments(currentValue)
    }
    setStatus(`Output level increased to ${currentValue}. HUD dwell resets.`)
  } else {
    renderSegments(currentValue)
    setStatus(`Output level ${currentValue}. Repeated INCREASE extends dwell.`)
  }

  if (!wasVisible) {
    setStatus(`HUD appeared at ${INITIAL_VALUE}; animating to ${currentValue}.`)
  }

  resetDwell()
}

export function resetVolumeBrightnessHud() {
  if (dwellTimer) clearTimeout(dwellTimer)
  dwellTimer = null
  currentValue = INITIAL_VALUE
  hudVisible = false
  hasEntered = false
  setPhase('hidden')
  hud()?.setAttribute('aria-hidden', 'true')
  renderSegments(INITIAL_VALUE)
  setStatus('Output level 42. Press INCREASE to raise to 68.')
}

function bindUi() {
  document.querySelector('[data-vbh-increase]')?.addEventListener('click', increase)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetVolumeBrightnessHud()
    }
  })
}

bindUi()
resetVolumeBrightnessHud()

export const VOLUME_BRIGHTNESS_HUD_CONTRACT = {
  ENTRANCE_MS,
  SEGMENT_MS,
  DWELL_MS,
  EXIT_MS,
  SEGMENT_COUNT,
  INITIAL_VALUE,
  TARGET_VALUE,
  HUD_W: 220,
  HUD_H: 86,
}
