/**
 * High-Speed Dash Navigation — OVERVIEW → LOGS with perceptible velocity path.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Frozen travel (px / ms) after anticipation:
 *   first 40 @ 80ms · major ~225 @ 170ms · brake 55 @ 110ms · lock ticks 90ms
 * Distance OVERVIEW → LOGS: 320px. Single `travel` phase keeps the path continuous.
 */

const ANTICIPATE_MS = 55
const LAUNCH_MS = 80
const CRUISE_MS = 170
const BRAKE_MS = 110
const LOCK_MS = 90
const TRAVEL_MS = LAUNCH_MS + CRUISE_MS + BRAKE_MS

const TRAVEL_START = ANTICIPATE_MS
const LOCK_START = TRAVEL_START + TRAVEL_MS
const DONE_AT = LOCK_START + LOCK_MS

/** Indicator centre crosses METRICS (~160px along 320px path) during travel */
const METRICS_PASS_AT =
  TRAVEL_START +
  Math.round(LAUNCH_MS + CRUISE_MS * ((160 - 40) / 225))

let busy = false
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
  return document.querySelector('[data-hsd]')
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

function setPass(on) {
  const root = rootEl()
  if (root) root.setAttribute('data-pass', on ? 'true' : 'false')
}

function setAt(dest) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-at', dest)
  for (const node of root.querySelectorAll('[data-hsd-node]')) {
    node.setAttribute(
      'data-active',
      node.getAttribute('data-hsd-node') === dest ? 'true' : 'false',
    )
  }
}

function setStatus(text) {
  const el = document.querySelector('[data-hsd-status]')
  if (el) el.textContent = text
}

function setLive(text) {
  const el = document.querySelector('[data-hsd-live]')
  if (el) el.textContent = text
}

function setControls(done) {
  const btn = document.querySelector('[data-hsd-go]')
  if (btn) btn.disabled = busy || done
}

function finishAtLogs() {
  setPhase('done')
  setPass(false)
  setAt('logs')
  setStatus('ACTIVE // LOGS')
  setLive('Active destination Logs')
  busy = false
  setControls(true)
}

/**
 * Dash from OVERVIEW to LOGS with anticipation, traces, and brake.
 * @returns {Promise<void>}
 */
export function runHighSpeedDash() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-at') === 'logs') {
    return Promise.resolve()
  }

  busy = true
  setControls(false)
  clearTimers()
  setPass(false)
  setLive('Dashing to Logs')

  if (prefersReducedMotion()) {
    finishAtLogs()
    return Promise.resolve()
  }

  setPhase('idle')
  void root.offsetWidth
  setPhase('anticipate')
  setStatus('ACTIVE // OVERVIEW')

  return new Promise((resolve) => {
    later(TRAVEL_START, () => {
      // Snap to compressed start, then one continuous travel animation
      setPhase('travel')
    })

    later(METRICS_PASS_AT, () => {
      setPass(true)
      later(90, () => setPass(false))
    })

    later(LOCK_START, () => {
      setPhase('lock')
      setAt('logs')
      setStatus('ACTIVE // LOGS')
      setLive('Active destination Logs')
    })

    later(DONE_AT, () => {
      setPhase('done')
      busy = false
      setControls(true)
      resolve()
    })
  })
}

export function resetHighSpeedDash() {
  clearTimers()
  busy = false
  setPass(false)
  setPhase('idle')
  setAt('overview')
  setStatus('ACTIVE // OVERVIEW')
  setLive('Active destination Overview')
  setControls(false)
  const root = rootEl()
  if (root) void root.offsetWidth
}

function bindUi() {
  document.querySelector('[data-hsd-go]')?.addEventListener('click', () => {
    void runHighSpeedDash()
  })
  document.querySelector('[data-hsd-reset]')?.addEventListener('click', () => {
    resetHighSpeedDash()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetHighSpeedDash()
  })
}

bindUi()
resetHighSpeedDash()
