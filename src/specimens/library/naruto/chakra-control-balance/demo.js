/**
 * Chakra Control Balance — two opposing holds must cancel out to settle
 * a needle inside a narrow centre band and lock a balanced state.
 * iframe-safe; no storage / parent / network.
 */

const INITIAL_VALUE = -0.68
const BAND = 0.08
const LOCK_THRESHOLD = 0.08
const WOBBLE_AMP = 0.04
const HALF_LIFE_MS = 90
const ACCEL_PER_MS = 1 / 450
const LOCK_HOLD_MS = 380
const LOCK_PULSE_MS = 150

/** @type {'idle'|'active'|'done'} */
let phase = 'idle'
let busy = false
let value = INITIAL_VALUE
let leftHeld = false
let rightHeld = false
let leftKeyHeld = false
let rightKeyHeld = false
/** @type {number|null} */
let bandEnteredAt = null
let rafId = 0
let lastTs = 0
/** @type {((value?: void) => void) | null} */
let runResolve = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-ccb]')
}

function trackEl() {
  return document.querySelector('[data-ccb-track]')
}

/** @type {number[]} */
let timers = []

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setLive(text) {
  const el = document.querySelector('[data-ccb-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ccb-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-ccb-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ccb-run], [data-ccb-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setNeedle(v) {
  const root = rootEl()
  root?.style.setProperty('--x', String(v))
  const track = trackEl()
  if (track) track.dataset.inband = String(Math.abs(v) <= LOCK_THRESHOLD)
}

function clamp(min, max, v) {
  return Math.max(min, Math.min(max, v))
}

function lockBalance() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  const root = rootEl()
  if (!root) return
  phase = 'done'
  value = 0
  setNeedle(0)
  root.setAttribute('data-phase', 'done')
  root.setAttribute('data-pulse', 'true')
  setStatus('BALANCED')
  setHint('Balance locked.')
  setLive('Chakra inputs balanced and locked.')
  later(LOCK_PULSE_MS, () => {
    root.removeAttribute('data-pulse')
    busy = false
    setButtons(true)
    const resolve = runResolve
    runResolve = null
    resolve?.()
  })
}

function tick(now) {
  if (phase !== 'active') return
  const dt = now - lastTs
  lastTs = now

  const netForce = (leftHeld ? -1 : 0) + (rightHeld ? 1 : 0)
  if (netForce !== 0) {
    value = clamp(-1, 1, value + netForce * ACCEL_PER_MS * dt)
  } else {
    value *= Math.pow(0.5, dt / HALF_LIFE_MS)
  }
  setNeedle(value)

  const inBand = Math.abs(value) <= BAND
  if (inBand) {
    if (bandEnteredAt == null) bandEnteredAt = now
    if (now - bandEnteredAt >= LOCK_HOLD_MS) {
      lockBalance()
      return
    }
  } else {
    bandEnteredAt = null
  }

  rafId = requestAnimationFrame(tick)
}

function beginActive(auto) {
  const root = rootEl()
  if (!root || busy || phase !== 'idle') return
  busy = true
  phase = 'active'
  value = INITIAL_VALUE
  bandEnteredAt = null
  root.setAttribute('data-phase', 'active')
  setButtons(false)
  setStatus('BALANCING')
  setHint(auto ? 'Settling toward centre…' : 'Hold both sides to counter the drift.')
  setLive('Balancing chakra inputs.')
  setNeedle(value)

  if (prefersReducedMotion()) {
    lockBalance()
    return
  }

  lastTs = performance.now()
  rafId = requestAnimationFrame(tick)
}

function resetVisual() {
  phase = 'idle'
  value = INITIAL_VALUE
  bandEnteredAt = null
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  root?.removeAttribute('data-pulse')
  setNeedle(value)
  setStatus('UNBALANCED')
  setHint('Hold both sides to draw the needle into the centre band.')
  setLive('Balance idle. Needle uncentred.')
}

/**
 * Auto-run a scripted settle-and-lock sweep (demo Run).
 * @returns {Promise<void>}
 */
export function runChakraControlBalance() {
  const root = rootEl()
  if (!root || busy || phase !== 'idle') return Promise.resolve()
  return new Promise((resolve) => {
    runResolve = resolve
    beginActive(true)
  })
}

export function resetChakraControlBalance() {
  clearTimers()
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  busy = false
  runResolve = null
  leftHeld = false
  rightHeld = false
  leftKeyHeld = false
  rightKeyHeld = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayChakraControlBalance() {
  if (busy) return
  resetChakraControlBalance()
  void rootEl()?.offsetWidth
  await runChakraControlBalance()
}

function bindHold(el, setHeld) {
  if (!el) return

  el.addEventListener('pointerdown', (e) => {
    if (e.button != null && e.button !== 0) return
    e.preventDefault()
    if (phase === 'done') return
    el.setAttribute('aria-pressed', 'true')
    if (phase === 'idle') beginActive(false)
    if (prefersReducedMotion()) return
    setHeld(true)
    try {
      el.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  })

  const release = () => {
    el.setAttribute('aria-pressed', 'false')
    setHeld(false)
  }

  el.addEventListener('pointerup', release)
  el.addEventListener('pointercancel', release)
  el.addEventListener('lostpointercapture', release)
}

function bindUi() {
  const leftBtn = document.querySelector('[data-ccb-left]')
  const rightBtn = document.querySelector('[data-ccb-right]')

  bindHold(leftBtn, (on) => {
    leftHeld = on
  })
  bindHold(rightBtn, (on) => {
    rightHeld = on
  })

  window.addEventListener('keydown', (e) => {
    if (e.repeat) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      leftKeyHeld = true
      leftBtn?.setAttribute('aria-pressed', 'true')
      if (phase === 'idle') beginActive(false)
      if (!prefersReducedMotion()) leftHeld = true
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      rightKeyHeld = true
      rightBtn?.setAttribute('aria-pressed', 'true')
      if (phase === 'idle') beginActive(false)
      if (!prefersReducedMotion()) rightHeld = true
    }
  })

  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
      leftKeyHeld = false
      leftHeld = false
      leftBtn?.setAttribute('aria-pressed', 'false')
    } else if (e.key === 'ArrowRight') {
      rightKeyHeld = false
      rightHeld = false
      rightBtn?.setAttribute('aria-pressed', 'false')
    }
  })

  document.querySelector('[data-ccb-run]')?.addEventListener('click', () => {
    void runChakraControlBalance()
  })
  document.querySelector('[data-ccb-replay]')?.addEventListener('click', () => {
    void replayChakraControlBalance()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayChakraControlBalance()
  })
}

void leftKeyHeld
void rightKeyHeld
bindUi()
resetChakraControlBalance()

void LOCK_THRESHOLD
void WOBBLE_AMP
