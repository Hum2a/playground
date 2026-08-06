/**
 * Copy Confirmation Morph — control geometry morphs to success then returns.
 * Sandbox-safe (no parent / storage / network). No clipboard API required.
 */

const CONTROL_W = 72
const CONTROL_H = 32
const COMPRESS_MS = 90
const CHECK_MS = 120
const DWELL_MS = 900
const RETURN_MS = 180

/** @type {number[]} */
let timers = []
let dwellEnd = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-copy-confirmation]')
}

function btnEl() {
  return document.querySelector('[data-ccm-btn]')
}

function labelEl() {
  return document.querySelector('[data-ccm-label]')
}

function statusEl() {
  return document.querySelector('[data-ccm-status]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setLabel(text) {
  const el = labelEl()
  if (el) el.textContent = text
}

function resetGlyph() {
  const btn = btnEl()
  if (btn) btn.classList.remove('is-compressing', 'is-check', 'is-returning')
}

export function resetCopyConfirmationMorph() {
  clearTimers()
  dwellEnd = 0
  resetGlyph()
  setLabel('COPY')
  setPhase('idle')
  setStatus('Press COPY to morph control geometry into confirmation.')
}

function startReturn() {
  setPhase('returning')
  setStatus('Returning to COPY state.')
  const btn = btnEl()
  if (btn) {
    btn.classList.remove('is-check')
    btn.classList.add('is-returning')
  }

  if (prefersReducedMotion()) {
    resetCopyConfirmationMorph()
    return
  }

  later(RETURN_MS, () => resetCopyConfirmationMorph())
}

function startDwell() {
  setPhase('copied')
  setLabel('COPIED')
  setStatus('Copied. Dwelling before return.')
  dwellEnd = Date.now() + DWELL_MS
  later(DWELL_MS, () => startReturn())
}

function runMorph() {
  const btn = btnEl()
  if (!btn) return

  if (Date.now() < dwellEnd) {
    clearTimers()
    dwellEnd = Date.now() + DWELL_MS
    later(DWELL_MS, () => startReturn())
    setStatus('Copied. Dwell restarted.')
    return
  }

  clearTimers()
  resetGlyph()
  setPhase('compressing')
  setStatus('Compressing copy outlines.')
  btn.classList.add('is-compressing')

  if (prefersReducedMotion()) {
    btn.classList.remove('is-compressing')
    btn.classList.add('is-check')
    startDwell()
    return
  }

  later(COMPRESS_MS, () => {
    btn.classList.remove('is-compressing')
    btn.classList.add('is-check')
    setPhase('checking')
    setStatus('Constructing check from line segments.')
    later(CHECK_MS, () => startDwell())
  })
}

function bindUi() {
  const btn = btnEl()
  if (btn) btn.addEventListener('click', () => runMorph())

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetCopyConfirmationMorph()
    }
  })
}

bindUi()
resetCopyConfirmationMorph()

export const COPY_CONFIRMATION_MORPH_CONTRACT = {
  CONTROL_W,
  CONTROL_H,
  COMPRESS_MS,
  CHECK_MS,
  DWELL_MS,
  RETURN_MS,
}
