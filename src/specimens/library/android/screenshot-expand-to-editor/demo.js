/**
 * Screenshot Expand to Editor — thumbnail container transforms to editor surface.
 */

const EXPAND_MS = 380
const CONTROLS_DELAY_MS = 180
const THUMB_W = 116
const THUMB_H = 206

let phase = 'idle'
let thumbVisible = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-screenshot-expand-to-editor]')
}

function setPhase(next) {
  phase = next
  root()?.setAttribute('data-phase', next)
}

function setStatus(text) {
  const el = document.querySelector('[data-ste-status]')
  if (el) el.textContent = text
}

function showThumb() {
  const thumb = document.querySelector('[data-ste-thumb]')
  if (!thumb) return
  thumb.hidden = false
  thumbVisible = true
  setStatus('Screenshot thumbnail ready — tap to edit.')
}

function expandEditor() {
  const editor = document.querySelector('[data-ste-editor]')
  const controls = document.querySelector('[data-ste-controls]')
  if (!editor) return

  setPhase('expanded')
  editor.hidden = false
  editor.setAttribute('aria-hidden', 'false')
  setStatus('Editor expanded from thumbnail.')

  const showControls = () => {
    controls?.classList.add('is-visible')
    controls?.removeAttribute('hidden')
  }

  if (prefersReducedMotion()) {
    showControls()
  } else {
    window.setTimeout(showControls, CONTROLS_DELAY_MS)
  }
}

function collapseEditor() {
  const editor = document.querySelector('[data-ste-editor]')
  const controls = document.querySelector('[data-ste-controls]')
  if (!editor) return

  controls?.classList.remove('is-visible')
  controls?.setAttribute('hidden', '')
  editor.hidden = true
  editor.setAttribute('aria-hidden', 'true')
  setPhase('idle')
  setStatus(thumbVisible ? 'Editor closed — thumbnail remains.' : 'Tap Capture or thumbnail.')
}

function bindUi() {
  document.querySelector('[data-ste-capture]')?.addEventListener('click', () => {
    showThumb()
  })

  document.querySelector('[data-ste-thumb]')?.addEventListener('click', () => {
    if (phase === 'expanded') return
    expandEditor()
  })

  document.querySelector('[data-ste-close]')?.addEventListener('click', () => {
    collapseEditor()
  })
}

bindUi()

export function resetScreenshotExpandToEditor() {
  collapseEditor()
  const thumb = document.querySelector('[data-ste-thumb]')
  if (thumb) thumb.hidden = true
  thumbVisible = false
  setStatus('Tap Capture or thumbnail.')
}

export const SCREENSHOT_EXPAND_TO_EDITOR_CONTRACT = {
  EXPAND_MS,
  CONTROLS_DELAY_MS,
  THUMB_W,
  THUMB_H,
}
