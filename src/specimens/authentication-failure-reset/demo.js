/**
 * Authentication Failure Reset — failed scan rejects once and resets to retry.
 */

const SHAKE_MS = 240
const HOLD_MS = 650
const RESTORE_MS = 180

/** @type {boolean} */
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-authentication-failure-reset]')
}

function statusLabel() {
  return document.querySelector('[data-afr-status-label]')
}

function failBtn() {
  return document.querySelector('[data-afr-fail]')
}

function statusEl() {
  return document.querySelector('[data-afr-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function fail() {
  if (busy || root()?.getAttribute('data-phase') === 'retry') return
  busy = true
  failBtn()?.setAttribute('disabled', 'true')
  setPhase('failed')
  statusLabel()?.replaceChildren(document.createTextNode('NOT VERIFIED'))
  setStatus('Scan stopped — field rejecting.')

  const r = root()
  if (!prefersReducedMotion()) {
    r?.classList.add('is-shaking')
    window.setTimeout(() => r?.classList.remove('is-shaking'), SHAKE_MS)
    r?.classList.add('is-rejecting')
  } else {
    r?.classList.add('is-rejecting')
    setStatus('NOT VERIFIED — dwelling before retry reset.')
  }

  window.setTimeout(() => {
    setStatus('NOT VERIFIED — holding before reset.')
  }, prefersReducedMotion() ? 0 : SHAKE_MS)

  window.setTimeout(() => {
    r?.classList.remove('is-rejecting')
    r?.classList.add('is-restoring')
    setPhase('retry')
    statusLabel()?.replaceChildren(document.createTextNode('READY TO RETRY'))
    setStatus('Brackets and nodes restored — READY TO RETRY.')
    window.setTimeout(() => {
      r?.classList.remove('is-restoring')
      busy = false
    }, prefersReducedMotion() ? 0 : RESTORE_MS)
  }, prefersReducedMotion() ? HOLD_MS : SHAKE_MS + HOLD_MS)
}

export function resetAuthenticationFailureReset() {
  busy = false
  const r = root()
  r?.classList.remove('is-shaking', 'is-rejecting', 'is-restoring')
  setPhase('scanning')
  statusLabel()?.replaceChildren(document.createTextNode('SCANNING'))
  failBtn()?.removeAttribute('disabled')
  setStatus('Identity acquisition scanning — trigger FAIL to reject.')
}

function bindUi() {
  failBtn()?.addEventListener('click', fail)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetAuthenticationFailureReset()
    }
  })
}

bindUi()
resetAuthenticationFailureReset()

export const AUTHENTICATION_FAILURE_RESET_CONTRACT = {
  SHAKE_MS,
  HOLD_MS,
  RESTORE_MS,
  BRACKET_COUNT: 4,
  SHAKE_SEQUENCE_PX: [0, -4, 4, -3, 2, 0],
}
