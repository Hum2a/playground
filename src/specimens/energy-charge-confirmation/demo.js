/**
 * Energy Charge Confirmation — tiny portable hold/confirm API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const HOLD_MS = 900
const DRAIN_MAX_MS = 250
const FLASH_MS = 70
const SNAP_MS = 220

const LABEL_IDLE = 'HOLD TO CONFIRM'
const LABEL_DONE = 'CONFIRMED'

let holding = false
let confirmed = false
let busy = false
let draining = false
let holdStart = 0
let rafId = 0
let keyHeld = false
/** @type {number | null} */
let activePointerId = null
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-energy-charge]')
}

function btnEl() {
  return document.querySelector('[data-ecc-btn]')
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function setStatus(text) {
  const el = document.querySelector('[data-ecc-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function setLabel(text) {
  const el = document.querySelector('[data-ecc-label]')
  if (el) el.textContent = text
}

function setResetVisible(show) {
  const el = document.querySelector('[data-ecc-reset]')
  if (!el) return
  el.hidden = !show
}

/**
 * Map continuous progress to stepped values under reduced motion.
 * @param {number} p
 */
function displayProgress(p) {
  if (!prefersReducedMotion()) return Math.max(0, Math.min(1, p))
  if (p >= 1) return 1
  if (p >= 0.75) return 0.75
  if (p >= 0.5) return 0.5
  if (p >= 0.25) return 0.25
  return 0
}

/**
 * @param {HTMLElement} btn
 * @param {number} p 0–1 continuous hold progress
 */
function setProgress(btn, p) {
  const continuous = Math.max(0, Math.min(1, p))
  const shown = displayProgress(continuous)
  btn.style.setProperty('--ecc-p', String(shown))
  btn.dataset.progress = String(Math.round(continuous * 100))

  const root = rootEl()
  if (root) {
    root.dataset.progress = btn.dataset.progress
    if (prefersReducedMotion()) {
      root.classList.add('is-reduced')
      root.dataset.band = String(Math.round(shown * 100))
    } else {
      root.classList.remove('is-reduced')
      root.removeAttribute('data-band')
    }
  }
}

function clearBtnClasses(btn) {
  btn.classList.remove(
    'is-holding',
    'is-draining',
    'is-flash',
    'is-confirm',
  )
}

/**
 * Reset to idle — portable API.
 */
export function resetEnergyCharge() {
  const root = rootEl()
  const btn = btnEl()
  if (!root || !btn) return

  holding = false
  confirmed = false
  busy = false
  draining = false
  keyHeld = false
  activePointerId = null
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  clearTimers()
  clearBtnClasses(btn)
  setProgress(btn, 0)
  setLabel(LABEL_IDLE)
  setStatus('')
  setResetVisible(false)
  root.setAttribute('data-state', 'idle')
  btn.removeAttribute('aria-pressed')
}

function startHold() {
  const root = rootEl()
  const btn = btnEl()
  if (!root || !btn || holding || confirmed || busy || draining) return

  holding = true
  holdStart = performance.now()
  clearTimers()
  clearBtnClasses(btn)
  if (prefersReducedMotion()) root.classList.add('is-reduced')
  btn.classList.add('is-holding')
  btn.setAttribute('aria-pressed', 'true')
  root.setAttribute('data-state', 'holding')
  setProgress(btn, 0)
  setLabel(LABEL_IDLE)
  setStatus(prefersReducedMotion() ? 'Holding 0%' : 'Charging')
  rafId = requestAnimationFrame(tick)
}

function tick() {
  const btn = btnEl()
  if (!btn || !holding) return

  const elapsed = performance.now() - holdStart
  const p = Math.min(1, elapsed / HOLD_MS)
  setProgress(btn, p)

  if (prefersReducedMotion()) {
    const shown = displayProgress(p)
    setStatus(`Holding ${Math.round(shown * 100)}%`)
  }

  if (elapsed >= HOLD_MS) {
    completeConfirm()
    return
  }

  rafId = requestAnimationFrame(tick)
}

function completeConfirm() {
  const root = rootEl()
  const btn = btnEl()
  if (!root || !btn) return

  holding = false
  keyHeld = false
  activePointerId = null
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }

  confirmed = true
  busy = true
  setProgress(btn, 1)
  clearBtnClasses(btn)
  btn.classList.add('is-flash', 'is-confirm')
  setLabel(LABEL_DONE)
  setStatus('Confirmed')
  root.setAttribute('data-state', 'confirmed')
  btn.setAttribute('aria-pressed', 'false')
  setResetVisible(true)

  later(FLASH_MS, () => {
    btn.classList.remove('is-flash')
  })
  later(SNAP_MS, () => {
    busy = false
  })
}

function cancelHold() {
  const root = rootEl()
  const btn = btnEl()
  if (!btn || !holding) return

  holding = false
  keyHeld = false
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }

  const continuous = Math.min(1, (performance.now() - holdStart) / HOLD_MS)
  btn.classList.remove('is-holding')
  btn.setAttribute('aria-pressed', 'false')

  if (continuous <= 0.02 || prefersReducedMotion()) {
    setProgress(btn, 0)
    setLabel(LABEL_IDLE)
    setStatus('Cancelled')
    root?.setAttribute('data-state', 'idle')
    return
  }

  draining = true
  const drainMs = Math.min(
    DRAIN_MAX_MS,
    Math.max(80, Math.round(continuous * DRAIN_MAX_MS)),
  )
  btn.style.setProperty('--ecc-drain-ms', `${drainMs}ms`)
  btn.classList.add('is-draining')
  setStatus('Cancelled')
  root?.setAttribute('data-state', 'draining')

  // Drive --ecc-p backwards so segment fill reverses bottom←left←top←right order visually
  const drainStart = performance.now()
  const from = continuous

  function drainTick() {
    if (!draining || confirmed) return
    const t = Math.min(1, (performance.now() - drainStart) / drainMs)
    const p = from * (1 - t)
    // During drain use continuous (or stepped for RM — already returned early for RM)
    btn.style.setProperty('--ecc-p', String(p))
    if (t >= 1) {
      draining = false
      btn.classList.remove('is-draining')
      setProgress(btn, 0)
      setLabel(LABEL_IDLE)
      root?.setAttribute('data-state', 'idle')
      return
    }
    rafId = requestAnimationFrame(drainTick)
  }

  // Snap display to continuous for smooth reverse, then animate down
  btn.style.setProperty('--ecc-p', String(from))
  rafId = requestAnimationFrame(drainTick)
}

function endHold() {
  if (!holding) return
  cancelHold()
}

function bind() {
  const btn = btnEl()
  if (!btn) return

  btn.addEventListener('pointerdown', (e) => {
    if (e.button != null && e.button !== 0) return
    if (confirmed || busy || draining) return
    activePointerId = e.pointerId
    try {
      btn.setPointerCapture(e.pointerId)
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

  btn.addEventListener('pointerup', release)
  btn.addEventListener('pointercancel', release)
  btn.addEventListener('lostpointercapture', () => {
    if (holding) endHold()
    activePointerId = null
  })

  btn.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' && e.key !== ' ') return
    if (e.repeat) {
      e.preventDefault()
      return
    }
    if (confirmed || busy || draining) return
    e.preventDefault()
    keyHeld = true
    startHold()
  })

  btn.addEventListener('keyup', (e) => {
    if (e.code !== 'Space' && e.key !== ' ') return
    if (!keyHeld && !holding) return
    e.preventDefault()
    keyHeld = false
    endHold()
  })

  btn.addEventListener('blur', () => {
    if (holding) endHold()
    keyHeld = false
  })

  document.querySelector('[data-ecc-reset]')?.addEventListener('click', () => {
    resetEnergyCharge()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetEnergyCharge()
  })
}

bind()
resetEnergyCharge()
