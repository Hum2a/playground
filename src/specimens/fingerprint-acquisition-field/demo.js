/**
 * Fingerprint Acquisition Field — hold-driven segment progress with success/failure paths.
 * Sandbox-safe: no parent, storage, network, or biometric APIs.
 */

const HOLD_MS = 900
const REWIND_BEFORE_MS = 720
const SEGMENT_COUNT = 12
const FAIL_PULSE_MS = 220

let holding = false
let acquired = false
let failed = false
let holdStart = 0
/** @type {number | null} */
let rafId = null
/** @type {number | null} */
let failTimer = null
let leaveCount = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-fingerprint-acquisition]')
}

function setStatus(text) {
  const el = document.querySelector('[data-faf-status]')
  if (el) el.textContent = text
}

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-faf-phase', phase)
}

function litCount(progress) {
  if (prefersReducedMotion()) {
    if (progress >= 1) return SEGMENT_COUNT
    if (progress <= 0) return 0
    return Math.ceil(progress * SEGMENT_COUNT)
  }
  return Math.min(SEGMENT_COUNT, Math.floor(progress * SEGMENT_COUNT))
}

function updateSegments(progress) {
  const count = litCount(progress)
  document.querySelectorAll('[data-faf-seg]').forEach((seg, i) => {
    seg.classList.toggle('is-lit', i < count)
  })
}

function showCheck(show) {
  document.querySelector('[data-faf-check]')?.classList.toggle('is-visible', show)
}

function showRetry(show) {
  const btn = document.querySelector('[data-faf-retry]')
  if (btn instanceof HTMLElement) btn.hidden = !show
}

function completeSuccess() {
  holding = false
  acquired = true
  setPhase('success')
  updateSegments(1)
  document.querySelectorAll('[data-faf-seg]').forEach((s) => s.classList.add('is-contracted'))
  showCheck(true)
  document.querySelector('[data-faf-hint]').textContent = 'Identity verified'
  setStatus('Acquisition complete.')
}

function rewind() {
  holding = false
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  if (acquired) return
  updateSegments(0)
  document.querySelectorAll('[data-faf-seg]').forEach((s) => s.classList.remove('is-contracted'))
  showCheck(false)
  setPhase('idle')
  document.querySelector('[data-faf-hint]').textContent = 'Hold on the sensor to continue'
  setStatus('Progress rewound.')
}

function tick() {
  if (!holding) return
  const elapsed = performance.now() - holdStart
  const progress = Math.min(1, elapsed / HOLD_MS)
  updateSegments(progress)
  setStatus(`Acquiring… ${Math.round(progress * 100)}%`)

  if (progress >= 1) {
    completeSuccess()
    return
  }
  rafId = requestAnimationFrame(tick)
}

function triggerFailurePulse() {
  if (failed) return
  failed = true
  setPhase('failure')
  const root = rootEl()
  root?.classList.add('is-fail-pulse')
  if (failTimer !== null) window.clearTimeout(failTimer)
  failTimer = window.setTimeout(() => {
    root?.classList.remove('is-fail-pulse')
    showRetry(true)
    setStatus('Acquisition failed. Try again.')
    failTimer = null
  }, FAIL_PULSE_MS)
}

function onPointerDown(e) {
  if (acquired || e.button !== 0) return
  const target = document.querySelector('[data-faf-target]')
  if (!target?.contains(e.target)) return
  holding = true
  holdStart = performance.now()
  failed = false
  showRetry(false)
  setPhase('acquiring')
  target.setPointerCapture(e.pointerId)
  rafId = requestAnimationFrame(tick)
}

function onPointerUp(e) {
  const target = document.querySelector('[data-faf-target]')
  if (target?.hasPointerCapture(e.pointerId)) {
    target.releasePointerCapture(e.pointerId)
  }
  if (!holding || acquired) return
  holding = false
  if (rafId !== null) cancelAnimationFrame(rafId)
  const elapsed = performance.now() - holdStart
  if (elapsed >= HOLD_MS) completeSuccess()
  else rewind()
}

function onPointerLeave() {
  if (!holding || acquired) return
  leaveCount += 1
  if (leaveCount >= 2) triggerFailurePulse()
  rewind()
}

export function resetFingerprintAcquisitionField() {
  if (rafId !== null) cancelAnimationFrame(rafId)
  if (failTimer !== null) window.clearTimeout(failTimer)
  rafId = null
  failTimer = null
  holding = false
  acquired = false
  failed = false
  leaveCount = 0
  updateSegments(0)
  document.querySelectorAll('[data-faf-seg]').forEach((s) => {
    s.classList.remove('is-lit', 'is-contracted')
  })
  showCheck(false)
  showRetry(false)
  rootEl()?.classList.remove('is-fail-pulse')
  setPhase('idle')
  document.querySelector('[data-faf-hint]').textContent = 'Hold on the sensor to continue'
  setStatus('Ready to acquire.')
}

function bindUi() {
  const target = document.querySelector('[data-faf-target]')
  target?.addEventListener('pointerdown', onPointerDown)
  target?.addEventListener('pointerup', onPointerUp)
  target?.addEventListener('pointercancel', onPointerUp)
  target?.addEventListener('pointerleave', onPointerLeave)

  document.querySelector('[data-faf-retry]')?.addEventListener('click', () => {
    resetFingerprintAcquisitionField()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetFingerprintAcquisitionField()
  })
}

bindUi()
resetFingerprintAcquisitionField()

export const FINGERPRINT_ACQUISITION_FIELD_CONTRACT = {
  HOLD_MS,
  REWIND_BEFORE_MS,
  SEGMENT_COUNT,
  FAIL_PULSE_MS,
}
