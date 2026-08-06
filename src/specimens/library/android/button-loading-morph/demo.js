/**
 * Button Loading Morph — fixed-size button with loading arc and success check.
 * Sandbox-safe (no parent / storage / network).
 */

const LOAD_MS = 900
const SAVED_DWELL_MS = 1200

/** @type {number | null} */
let timer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-button-loading-morph]')
}

function btn() {
  return document.querySelector('[data-blm-btn]')
}

function loader() {
  return document.querySelector('[data-blm-loader]')
}

function check() {
  return document.querySelector('[data-blm-check]')
}

function saved() {
  return document.querySelector('[data-blm-saved]')
}

function statusEl() {
  return document.querySelector('[data-blm-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function clearTimer() {
  if (timer !== null) {
    clearTimeout(timer)
    timer = null
  }
}

function showLoader(show) {
  const el = loader()
  if (!el) return
  el.hidden = !show
}

function showCheck(show) {
  const el = check()
  if (!el) return
  el.hidden = !show
}

function showSaved(show) {
  const el = saved()
  if (!el) return
  el.hidden = !show
}

export function resetButtonLoadingMorph() {
  clearTimer()
  const b = btn()
  if (b) b.disabled = false
  setPhase('idle')
  showLoader(false)
  showCheck(false)
  showSaved(false)
  setStatus('Activate Save changes to begin loading morph.')
}

function runSequence() {
  const b = btn()
  if (!b || b.disabled) return
  b.disabled = true
  setPhase('loading')
  showLoader(true)
  showCheck(false)
  showSaved(false)
  setStatus('Label faded — progress arc rotating for 900ms.')

  timer = window.setTimeout(() => {
    setPhase('success')
    showLoader(false)
    showCheck(true)
    setStatus('Arc morphed into check mark.')

    timer = window.setTimeout(() => {
      setPhase('saved')
      showSaved(true)
      setStatus('Saved label visible.')

      timer = window.setTimeout(() => {
        resetButtonLoadingMorph()
      }, SAVED_DWELL_MS)
    }, prefersReducedMotion() ? 60 : 100)
  }, LOAD_MS)
}

function bindUi() {
  btn()?.addEventListener('click', runSequence)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetButtonLoadingMorph()
    }
  })
}

bindUi()
resetButtonLoadingMorph()

export const BUTTON_LOADING_MORPH_CONTRACT = {
  BTN_W: 160,
  BTN_H: 48,
  LABEL_FADE_MS: 80,
  LOAD_MS,
  CHECK_MORPH_MS: 180,
  SAVED_DWELL_MS,
}
