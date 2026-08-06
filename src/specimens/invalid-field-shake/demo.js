/**
 * Invalid Field Shake — finite validation refusal with error region expansion.
 * Sandbox-safe (no parent / storage / network).
 */

const FIELD_WIDTH = 300
const SHAKE_OFFSETS = [0, -6, 5, -4, 3, -2, 0]
const SHAKE_MS = 310
const ERROR_EXPAND_MS = 90
const ERROR_HEIGHT = 34
const VALID_PATTERN = /^[A-Z0-9-]+$/

/** @type {number[]} */
let timers = []
let shaking = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-invalid-field-shake]')
}

function fieldEl() {
  return document.querySelector('[data-ifs-field]')
}

function wrapEl() {
  return document.querySelector('[data-ifs-wrap]')
}

function errorEl() {
  return document.querySelector('[data-ifs-error]')
}

function statusEl() {
  return document.querySelector('[data-ifs-status]')
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

function isValid(value) {
  return VALID_PATTERN.test(value) && value.length > 0
}

function showError() {
  const wrap = wrapEl()
  const error = errorEl()
  setPhase('error')
  if (wrap) wrap.classList.add('is-error')
  if (error) {
    error.classList.add('is-visible')
    error.style.maxHeight = `${ERROR_HEIGHT}px`
  }
  setStatus('Invalid project code. Use A–Z, 0–9 or -.')
}

function showSuccess() {
  const wrap = wrapEl()
  const error = errorEl()
  setPhase('success')
  if (wrap) {
    wrap.classList.remove('is-error')
    wrap.classList.add('is-success')
  }
  if (error) {
    error.classList.remove('is-visible')
    error.style.maxHeight = '0px'
  }
  setStatus('Project code accepted.')
}

function runShake() {
  const wrap = wrapEl()
  if (!wrap || shaking) return
  shaking = true
  setPhase('shaking')

  if (prefersReducedMotion()) {
    showError()
    shaking = false
    return
  }

  const stepMs = SHAKE_MS / (SHAKE_OFFSETS.length - 1)
  SHAKE_OFFSETS.forEach((offset, i) => {
    later(i * stepMs, () => {
      wrap.style.transform = offset ? `translateX(${offset}px)` : ''
      if (offset < 0 && i === 1) {
        wrap.classList.add('is-error-boundary')
        later(ERROR_EXPAND_MS, () => showError())
      }
    })
  })

  later(SHAKE_MS, () => {
    wrap.style.transform = ''
    shaking = false
  })
}

export function resetInvalidFieldShake() {
  clearTimers()
  shaking = false
  const field = fieldEl()
  const wrap = wrapEl()
  const error = errorEl()
  if (field) field.value = 'ORBIT?'
  if (wrap) {
    wrap.classList.remove('is-error', 'is-success', 'is-error-boundary')
    wrap.style.transform = ''
  }
  if (error) {
    error.classList.remove('is-visible')
    error.style.maxHeight = '0px'
  }
  setPhase('idle')
  setStatus('Enter a valid project code and submit.')
}

function onSubmit(event) {
  event.preventDefault()
  const field = fieldEl()
  const wrap = wrapEl()
  if (!field || !wrap) return

  const value = field.value.trim()

  if (isValid(value)) {
    clearTimers()
    wrap.classList.remove('is-error-boundary')
    showSuccess()
    return
  }

  wrap.classList.remove('is-success')
  runShake()
}

function bindUi() {
  const form = document.querySelector('[data-ifs-form]')
  if (form) form.addEventListener('submit', onSubmit)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetInvalidFieldShake()
    }
  })
}

bindUi()
resetInvalidFieldShake()

export const INVALID_FIELD_SHAKE_CONTRACT = {
  FIELD_WIDTH,
  SHAKE_OFFSETS,
  SHAKE_MS,
  ERROR_EXPAND_MS,
  ERROR_HEIGHT,
}
