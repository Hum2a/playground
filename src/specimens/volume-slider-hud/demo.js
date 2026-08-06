/**
 * Volume Slider HUD — transient vertical volume overlay.
 */

const ENTRANCE_MS = 220
const DWELL_MS = 2200
const STEP = 10
const MIN = 0
const MAX = 100

let level = 50
let phase = 'hidden'
/** @type {ReturnType<typeof setTimeout> | null} */
let dwellTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-volume-slider-hud]')
}

function setPhase(next) {
  phase = next
  root()?.setAttribute('data-phase', next)
}

function setStatus(text) {
  const el = document.querySelector('[data-vsh-status]')
  if (el) el.textContent = text
}

function renderLevel() {
  const fill = document.querySelector('[data-vsh-fill]')
  const thumb = document.querySelector('[data-vsh-thumb]')
  const levelEl = document.querySelector('[data-vsh-level]')
  const hud = document.querySelector('[data-vsh-hud]')
  if (fill) fill.style.height = `${level}%`
  if (thumb) thumb.style.bottom = `calc(${level}% - 10px)`
  if (levelEl) levelEl.textContent = String(level)
  root()?.setAttribute('data-muted', level === 0 ? 'true' : 'false')
  if (hud) hud.setAttribute('aria-hidden', phase === 'hidden' ? 'true' : 'false')
}

function resetDwell() {
  if (dwellTimer) clearTimeout(dwellTimer)
  dwellTimer = setTimeout(() => {
    setPhase('hidden')
    document.querySelector('[data-vsh-expanded]')?.setAttribute('hidden', '')
    setStatus(`HUD dismissed. Volume ${level}.`)
  }, DWELL_MS)
}

function showHud() {
  setPhase('visible')
  renderLevel()
  resetDwell()
}

function changeLevel(delta) {
  level = Math.max(MIN, Math.min(MAX, level + delta))
  showHud()
  setStatus(`Volume ${level}${level === 0 ? ' — muted' : ''}.`)
}

function bindUi() {
  document.querySelector('[data-vsh-up]')?.addEventListener('click', () => changeLevel(STEP))
  document.querySelector('[data-vsh-down]')?.addEventListener('click', () => changeLevel(-STEP))
  document.querySelector('[data-vsh-expand]')?.addEventListener('click', () => {
    showHud()
    setPhase('expanded')
    const expanded = document.querySelector('[data-vsh-expanded]')
    expanded?.removeAttribute('hidden')
    setStatus('HUD expanded — three sliders visible.')
    resetDwell()
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      changeLevel(STEP)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      changeLevel(-STEP)
    }
  })
}

bindUi()
renderLevel()

export function resetVolumeSliderHud() {
  level = 50
  if (dwellTimer) clearTimeout(dwellTimer)
  setPhase('hidden')
  document.querySelector('[data-vsh-expanded]')?.setAttribute('hidden', '')
  renderLevel()
  setStatus('Press + or − to show volume HUD.')
}

export const VOLUME_SLIDER_HUD_CONTRACT = { ENTRANCE_MS, DWELL_MS, STEP, MIN, MAX }
