/**
 * Hold-to-Charge Button — tiny portable hold/confirm API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const HOLD_MS = 1400
const COMPRESS_MS = 100
const NEAR_MS = HOLD_MS * 0.85
const CONFIRM_PULSE_MS = 180
const CANCEL_MAX_MS = 260

const LABEL_IDLE = 'HOLD TO DELETE'
const LABEL_HOLD = 'KEEP HOLDING'
const LABEL_NEAR = 'ALMOST THERE'
const LABEL_DONE = 'CONFIRMED!'

let holding = false
let confirmed = false
let busy = false
let holdStart = 0
let rafId = 0
let keyHeld = false
let activePointerId = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-hold-charge]')
}

function labelEl() {
  return document.querySelector('[data-hold-charge-label]')
}

function statusEl() {
  return document.querySelector('[data-hold-charge-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setLabel(text) {
  const el = labelEl()
  if (el) el.textContent = text
}

function setProgress(root, p) {
  const clamped = Math.max(0, Math.min(1, p))
  root.style.setProperty('--hold-p', String(clamped))
  root.dataset.progress = String(Math.round(clamped * 100))

  let band = '0'
  if (clamped >= 0.75) band = '75'
  else if (clamped >= 0.5) band = '50'
  else if (clamped >= 0.25) band = '25'
  root.dataset.band = band

  if (prefersReducedMotion()) {
    let step = 0
    if (clamped >= 1) step = 100
    else if (clamped >= 0.75) step = 75
    else if (clamped >= 0.5) step = 50
    else if (clamped >= 0.25) step = 25
    root.dataset.rmStep = String(step)
    if (holding && !confirmed) {
      if (step === 0) setLabel(LABEL_HOLD)
      else setLabel(`HOLDING ${step}%`)
    }
  }
}

function clearMotionClasses(root) {
  root.classList.remove(
    'hold-charge--holding',
    'hold-charge--near',
    'hold-charge--confirmed',
    'hold-charge--cancel',
    'hold-charge--pulse',
    'hold-charge--reduced',
  )
}

/**
 * Reset to idle ready state.
 */
export function resetHoldCharge() {
  const root = rootEl()
  if (!root) return
  cancelHoldInternal(true)
  confirmed = false
  busy = false
  clearMotionClasses(root)
  setProgress(root, 0)
  setLabel(LABEL_IDLE)
  setStatus('Ready')
  root.removeAttribute('aria-pressed')
}

function cancelHoldInternal(instant) {
  holding = false
  keyHeld = false
  activePointerId = null
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }

  const root = rootEl()
  if (!root || confirmed) return

  const p = Number(root.style.getPropertyValue('--hold-p')) || 0
  root.classList.remove('hold-charge--holding', 'hold-charge--near')

  if (instant || p <= 0.01 || prefersReducedMotion()) {
    root.classList.remove('hold-charge--cancel')
    setProgress(root, 0)
    setLabel(LABEL_IDLE)
    setStatus('Cancelled')
    return
  }

  const retreatMs = Math.min(CANCEL_MAX_MS, Math.max(80, Math.round(p * CANCEL_MAX_MS)))
  root.classList.add('hold-charge--cancel')
  root.style.setProperty('--cancel-ms', `${retreatMs}ms`)
  setLabel(LABEL_IDLE)
  setStatus('Cancelled')

  window.setTimeout(() => {
    if (confirmed || holding) return
    root.classList.remove('hold-charge--cancel')
    setProgress(root, 0)
  }, retreatMs)
}

function tick() {
  const root = rootEl()
  if (!root || !holding) return

  const elapsed = performance.now() - holdStart
  const p = Math.min(1, elapsed / HOLD_MS)
  setProgress(root, p)

  if (!prefersReducedMotion()) {
    if (elapsed >= NEAR_MS && elapsed < HOLD_MS) {
      root.classList.add('hold-charge--near')
      setLabel(LABEL_NEAR)
    } else if (elapsed >= COMPRESS_MS) {
      setLabel(LABEL_HOLD)
    }
  }

  if (elapsed >= HOLD_MS) {
    completeConfirm()
    return
  }

  rafId = requestAnimationFrame(tick)
}

function startHold() {
  const root = rootEl()
  if (!root || holding || confirmed || busy) return

  holding = true
  holdStart = performance.now()
  clearMotionClasses(root)
  if (prefersReducedMotion()) root.classList.add('hold-charge--reduced')
  root.classList.add('hold-charge--holding')
  root.setAttribute('aria-pressed', 'true')
  setProgress(root, 0)
  setLabel(prefersReducedMotion() ? 'HOLDING 0%' : LABEL_HOLD)
  setStatus('Holding')
  rafId = requestAnimationFrame(tick)
}

function completeConfirm() {
  const root = rootEl()
  if (!root) return

  holding = false
  keyHeld = false
  activePointerId = null
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }

  confirmed = true
  busy = true
  setProgress(root, 1)
  root.classList.remove('hold-charge--holding', 'hold-charge--near', 'hold-charge--cancel')
  root.classList.add('hold-charge--confirmed', 'hold-charge--pulse')
  setLabel(LABEL_DONE)
  setStatus('Confirmed')
  root.setAttribute('aria-pressed', 'false')

  window.setTimeout(() => {
    root.classList.remove('hold-charge--pulse')
    busy = false
  }, CONFIRM_PULSE_MS)
}

function endHold() {
  if (!holding) return
  cancelHoldInternal(false)
  const root = rootEl()
  root?.setAttribute('aria-pressed', 'false')
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.addEventListener('pointerdown', (e) => {
    if (e.button != null && e.button !== 0) return
    if (confirmed || busy) return
    activePointerId = e.pointerId
    try {
      root.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    e.preventDefault()
    startHold()
  })

  const release = (e) => {
    if (activePointerId != null && e.pointerId !== activePointerId) return
    if (holding) endHold()
    activePointerId = null
  }

  root.addEventListener('pointerup', release)
  root.addEventListener('pointercancel', release)
  root.addEventListener('lostpointercapture', () => {
    if (holding) endHold()
    activePointerId = null
  })

  root.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' && e.key !== ' ') return
    if (e.repeat) {
      e.preventDefault()
      return
    }
    if (confirmed || busy) return
    e.preventDefault()
    keyHeld = true
    startHold()
  })

  root.addEventListener('keyup', (e) => {
    if (e.code !== 'Space' && e.key !== ' ') return
    if (!keyHeld && !holding) return
    e.preventDefault()
    keyHeld = false
    endHold()
  })

  root.addEventListener('blur', () => {
    if (holding) endHold()
    keyHeld = false
  })

  document.querySelector('[data-hold-charge-reset]')?.addEventListener('click', () => {
    resetHoldCharge()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetHoldCharge()
  })
}

bindUi()
resetHoldCharge()
