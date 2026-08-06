/**
 * FAB-to-Composer Transform — container morph from floating action button.
 */

const DURATION_MS = 360
const GLYPH_FADE_MS = 90
const CONTENT_START_MS = 120
const ACTIONS_START_MS = 180

/** @type {number | null} */
let animFrame = null
let expanded = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  return (
    forced ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function rootEl() {
  return document.querySelector('[data-fab-to-composer]')
}

function clearAnim() {
  if (animFrame !== null) {
    window.cancelAnimationFrame(animFrame)
    animFrame = null
  }
}

function setStatus(text) {
  document.querySelector('[data-ftc-status]').textContent = text
}

function setProgress(p) {
  const root = rootEl()
  if (!root) return
  root.style.setProperty('--ftc-progress', String(p))
  root.classList.toggle('is-glyph-faded', p > GLYPH_FADE_MS / DURATION_MS)
  root.classList.toggle('is-content-visible', p >= CONTENT_START_MS / DURATION_MS)
  root.classList.toggle('is-actions-visible', p >= ACTIONS_START_MS / DURATION_MS)
}

function applyState(open) {
  const root = rootEl()
  const fab = document.querySelector('[data-ftc-fab]')
  const composer = document.querySelector('[data-ftc-composer]')
  if (!root || !fab || !composer) return

  expanded = open
  root.setAttribute('data-ftc-state', open ? 'composer' : 'fab')
  fab.hidden = open
  composer.hidden = !open
  setProgress(open ? 1 : 0)

  if (open) {
    setStatus('Composer open.')
  } else {
    setStatus('Compose action available.')
    document.querySelector('[data-ftc-textarea]')?.blur()
  }
}

function animate(open) {
  clearAnim()
  const root = rootEl()
  const fab = document.querySelector('[data-ftc-fab]')
  const composer = document.querySelector('[data-ftc-composer]')
  if (!root || !fab || !composer) return

  if (prefersReducedMotion()) {
    applyState(open)
    if (open) document.querySelector('[data-ftc-textarea]')?.focus()
    return
  }

  composer.hidden = false
  fab.hidden = false
  root.setAttribute('data-ftc-state', open ? 'composer' : 'fab')

  const start = performance.now()
  const from = open ? 0 : 1
  const to = open ? 1 : 0

  function frame(now) {
    const raw = Math.min(1, (now - start) / DURATION_MS)
    const eased = 1 - Math.pow(1 - raw, 3)
    const p = from + (to - from) * eased
    setProgress(p)

    if (raw < 1) {
      animFrame = window.requestAnimationFrame(frame)
    } else {
      applyState(open)
      if (open) document.querySelector('[data-ftc-textarea]')?.focus()
    }
  }

  animFrame = window.requestAnimationFrame(frame)
}

function openComposer() {
  if (expanded) return
  animate(true)
}

function closeComposer() {
  if (!expanded) return
  animate(false)
}

export function resetFabToComposer() {
  clearAnim()
  applyState(false)
}

export function replayFabToComposer() {
  resetFabToComposer()
}

function bindUi() {
  document.querySelector('[data-ftc-fab]')?.addEventListener('click', openComposer)
  document.querySelector('[data-ftc-cancel]')?.addEventListener('click', closeComposer)

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && expanded) {
      e.preventDefault()
      closeComposer()
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') replayFabToComposer()
  })
}

bindUi()
resetFabToComposer()

export const FAB_TO_COMPOSER_CONTRACT = { DURATION_MS, GLYPH_FADE_MS, CONTENT_START_MS, ACTIONS_START_MS }
