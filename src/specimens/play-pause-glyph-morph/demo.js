/**
 * Play/Pause Glyph Morph — one control whose geometry morphs between play and pause.
 */

const PLAY_TO_PAUSE_MS = 180
const PAUSE_TO_PLAY_MS = 160

/** @type {'play' | 'pause'} */
let state = 'play'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-play-pause-glyph-morph]')
}

function control() {
  return document.querySelector('[data-ppg-control]')
}

function labelEl() {
  return document.querySelector('[data-ppg-label]')
}

function statusEl() {
  return document.querySelector('[data-ppg-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function applyState(next) {
  state = next
  const r = root()
  const btn = control()
  const label = labelEl()
  if (!r || !btn || !label) return

  r.setAttribute('data-state', next)
  const isPause = next === 'pause'
  btn.setAttribute('aria-pressed', String(isPause))
  btn.setAttribute(
    'aria-label',
    isPause ? 'Pause SIGNAL // 04' : 'Play SIGNAL // 04',
  )
  label.textContent = isPause ? 'PAUSE' : 'PLAY'
  setStatus(
    isPause
      ? 'Playing SIGNAL // 04. Glyph morphed to pause bars.'
      : 'Playback paused. Click to play SIGNAL // 04.',
  )
}

function toggle() {
  const next = state === 'play' ? 'pause' : 'play'
  const duration = prefersReducedMotion()
    ? 0
    : next === 'pause'
      ? PLAY_TO_PAUSE_MS
      : PAUSE_TO_PLAY_MS

  root()?.setAttribute('data-state', next)

  window.setTimeout(() => applyState(next), Math.floor(duration * 0.5))

  if (prefersReducedMotion()) {
    applyState(next)
  }
}

export function resetPlayPauseGlyphMorph() {
  state = 'play'
  const r = root()
  r?.setAttribute('data-state', 'play')
  const btn = control()
  const label = labelEl()
  if (btn) {
    btn.setAttribute('aria-pressed', 'false')
    btn.setAttribute('aria-label', 'Play SIGNAL // 04')
  }
  if (label) label.textContent = 'PLAY'
  setStatus('Playback paused. Click to play SIGNAL // 04.')
}

function bindUi() {
  control()?.addEventListener('click', toggle)
  control()?.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      toggle()
    }
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetPlayPauseGlyphMorph()
    }
  })
}

bindUi()
resetPlayPauseGlyphMorph()

export const PLAY_PAUSE_GLYPH_MORPH_CONTRACT = {
  PLAY_TO_PAUSE_MS,
  PAUSE_TO_PLAY_MS,
  CONTROL_SIZE: 48,
}
