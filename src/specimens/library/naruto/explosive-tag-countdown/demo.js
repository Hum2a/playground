/**
 * Explosive Tag Countdown — arm, count 3-2-1 through rising intensity, detonate, clear.
 * iframe-safe; no storage / parent / network.
 */

const ARM_MS = 220
const STEP_MS = 480
const BURST_MS = 240
const SETTLE_MS = 200

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
  return document.querySelector('[data-etc]')
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
  const el = document.querySelector('[data-etc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-etc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-etc-hint]')
  if (el) el.textContent = text
}

function setDigit(text) {
  const el = document.querySelector('[data-etc-digit]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-etc-run], [data-etc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setPhase(phase, level) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-phase', phase)
  root.setAttribute('data-level', String(level ?? 0))
}

function showResolved() {
  setPhase('done', 0)
  setDigit('\u2713')
  setStatus('CLEAR')
  setHint('Tag cleared. Press Replay to arm again.')
  setLive('Tag cleared.')
}

function resetVisual() {
  setPhase('idle', 0)
  setDigit('\u2013')
  setStatus('IDLE')
  setHint('Press Run to arm the tag.')
  setLive('Tag idle. Countdown pending.')
}

/**
 * Auto-run the full arm → countdown → detonate → clear sequence.
 * @returns {Promise<void>}
 */
export function runExplosiveTagCountdown() {
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

  setPhase('armed', 0)
  setDigit('!')
  setStatus('ARMED')
  setHint('Countdown starting.')
  setLive('Tag armed.')

  return new Promise((resolve) => {
    later(ARM_MS, () => {
      let level = 3
      const tick = () => {
        setPhase('count', level)
        setDigit(String(level))
        setStatus(String(level).padStart(2, '0'))
        setLive(`${level}.`)
        if (level <= 1) {
          later(STEP_MS, () => {
            setPhase('burst', 0)
            setDigit('\u2715')
            setStatus('DETONATED')
            setHint('Resolving.')
            setLive('Detonation.')
            later(BURST_MS, () => {
              later(SETTLE_MS, () => {
                showResolved()
                busy = false
                setButtons(true)
                resolve()
              })
            })
          })
          return
        }
        level -= 1
        later(STEP_MS, tick)
      }
      tick()
    })
  })
}

export function resetExplosiveTagCountdown() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayExplosiveTagCountdown() {
  if (busy) return
  resetExplosiveTagCountdown()
  void rootEl()?.offsetWidth
  await runExplosiveTagCountdown()
}

function bindUi() {
  document.querySelector('[data-etc-run]')?.addEventListener('click', () => {
    void runExplosiveTagCountdown()
  })
  document.querySelector('[data-etc-replay]')?.addEventListener('click', () => {
    void replayExplosiveTagCountdown()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayExplosiveTagCountdown()
  })
}

bindUi()
resetExplosiveTagCountdown()
