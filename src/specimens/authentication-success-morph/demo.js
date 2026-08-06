/**
 * Authentication Success Morph — scan field morphs into verified state.
 */

const BRACKET_MS = 100
const NODE_MS = 180
const SETTLE_MS = 280

/** @type {boolean} */
let verified = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-authentication-success-morph]')
}

function statusLabel() {
  return document.querySelector('[data-asm-status-label]')
}

function continueBtn() {
  return document.querySelector('[data-asm-continue]')
}

function resolveBtn() {
  return document.querySelector('[data-asm-resolve]')
}

function statusEl() {
  return document.querySelector('[data-asm-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function resolve() {
  if (verified) return
  verified = true
  setPhase('verified')
  statusLabel()?.replaceChildren(document.createTextNode('VERIFIED'))
  setStatus('Brackets inward — nodes converging to completion strokes.')

  const enableContinue = () => {
    continueBtn()?.removeAttribute('disabled')
    resolveBtn()?.setAttribute('disabled', 'true')
    setStatus('VERIFIED — CONTINUE enabled.')
  }

  if (prefersReducedMotion()) {
    enableContinue()
    return
  }

  window.setTimeout(enableContinue, BRACKET_MS + NODE_MS + SETTLE_MS)
}

export function resetAuthenticationSuccessMorph() {
  verified = false
  setPhase('verifying')
  const label = statusLabel()
  if (label) label.textContent = 'VERIFYING'
  continueBtn()?.setAttribute('disabled', 'true')
  resolveBtn()?.removeAttribute('disabled')
  setStatus('Identity acquisition in progress — VERIFYING.')
}

function bindUi() {
  resolveBtn()?.addEventListener('click', resolve)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetAuthenticationSuccessMorph()
    }
  })
}

bindUi()
resetAuthenticationSuccessMorph()

export const AUTHENTICATION_SUCCESS_MORPH_CONTRACT = {
  BRACKET_MS,
  NODE_MS,
  SETTLE_MS,
  BRACKET_INSET_PX: 6,
  NODE_COUNT: 8,
}
