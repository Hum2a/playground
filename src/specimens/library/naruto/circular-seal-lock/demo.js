/**
 * Circular Seal Lock — radial ticks + rotate-to-align with progressive engage stroke.
 * iframe-safe; no storage / parent / network.
 */

const ROTATE_MS = 520
const ENGAGE_MS = 180
const LOCK_PULSE_MS = 150
const INITIAL_OFFSET_DEG = -42
const LOCK_DEG = 0
const TICK_COUNT = 12
const MARK_COUNT = 6

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-csl]')
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

function setLive(text) {
  const el = document.querySelector('[data-csl-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-csl-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-csl-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-csl-run], [data-csl-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  const root = rootEl()
  root?.setAttribute('data-phase', 'done')
  root?.setAttribute('data-pulse', 'true')
  setStatus('LOCKED')
  setHint('Seal locked at 0°.')
  setLive(`Seal ring aligned from ${INITIAL_OFFSET_DEG}° to ${LOCK_DEG}° and locked.`)
  later(LOCK_PULSE_MS, () => root?.removeAttribute('data-pulse'))
}

function resetVisual() {
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  root?.removeAttribute('data-pulse')
  setStatus('UNLOCKED')
  setHint('Press Run to rotate the ring into alignment.')
  setLive(`Seal unlocked. Ring misaligned at ${INITIAL_OFFSET_DEG}°.`)
}

/**
 * Auto-run the ring rotation into a locked seal (demo Run).
 * @returns {Promise<void>}
 */
export function runCircularSealLock() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('ALIGNING')
  setLive(
    `Rotating seal ring ${INITIAL_OFFSET_DEG}° → ${LOCK_DEG}° across ${TICK_COUNT} index ticks.`,
  )

  return new Promise((resolve) => {
    later(ROTATE_MS, () => {
      showResolved()
      later(LOCK_PULSE_MS + ENGAGE_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetCircularSealLock() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayCircularSealLock() {
  if (busy) return
  resetCircularSealLock()
  void rootEl()?.offsetWidth
  await runCircularSealLock()
}

function bindUi() {
  document.querySelector('[data-csl-run]')?.addEventListener('click', () => {
    void runCircularSealLock()
  })
  document.querySelector('[data-csl-replay]')?.addEventListener('click', () => {
    void replayCircularSealLock()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCircularSealLock()
  })
}

void MARK_COUNT
bindUi()
resetCircularSealLock()
