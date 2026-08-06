/**
 * Dock Launch Bounce — finite launch bounce into running state.
 * Sandbox-safe: no parent access, storage, or network.
 *
 * Three bounces: peaks 34 / 24 / 14px over ~820ms total.
 * Hold 80ms after final landing; then 5×5 running indicator.
 */

const BOUNCES = [
  { peak: -34, duration: 320 },
  { peak: -24, duration: 240 },
  { peak: -14, duration: 260 },
]
const HOLD_MS = 80
const TOTAL_BOUNCE_MS = BOUNCES.reduce((sum, b) => sum + b.duration, 0)

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-dock-launch-bounce]')
}

function targetEl() {
  return document.querySelector('[data-dlb-target]')
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

function setStatus(text) {
  const el = document.querySelector('[data-dlb-status]')
  if (el) el.textContent = text
}

function setButtons(enabled) {
  document.querySelectorAll('[data-dlb-launch], [data-dlb-replay]').forEach((btn) => {
    btn.disabled = !enabled
  })
}

function setTranslateY(px) {
  const target = targetEl()
  if (target) target.style.setProperty('--dlb-y', `${px}px`)
}

/**
 * @param {number} peak
 * @param {number} durationMs
 * @returns {Promise<void>}
 */
function animateBounce(peak, durationMs) {
  const target = targetEl()
  if (!target) return Promise.resolve()

  const upMs = Math.round(durationMs * 0.38)
  const downMs = durationMs - upMs

  return new Promise((resolve) => {
    const up = target.animate(
      [{ transform: 'translateY(0)' }, { transform: `translateY(${peak}px)` }],
      { duration: upMs, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' },
    )
    up.onfinish = () => {
      const down = target.animate(
        [{ transform: `translateY(${peak}px)` }, { transform: 'translateY(0)' }],
        { duration: downMs, easing: 'cubic-bezier(0.55, 0, 0.85, 0.36)', fill: 'forwards' },
      )
      down.onfinish = () => {
        setTranslateY(0)
        resolve()
      }
    }
  })
}

function applyRunning() {
  const root = rootEl()
  root?.setAttribute('data-state', 'running')
  root?.setAttribute('data-phase', 'done')
  setStatus('RUNNING')
  setButtons(true)
  busy = false
}

function applyRunningImmediate() {
  setTranslateY(0)
  applyRunning()
}

export function resetDockLaunchBounce() {
  clearTimers()
  busy = false
  const root = rootEl()
  root?.setAttribute('data-state', 'closed')
  root?.setAttribute('data-phase', 'idle')
  setTranslateY(0)
  setStatus('CLOSED')
  setButtons(true)
}

/**
 * @returns {Promise<void>}
 */
export async function runDockLaunchBounce() {
  const root = rootEl()
  if (!root || busy) return
  if (root.getAttribute('data-state') === 'running') return

  busy = true
  clearTimers()
  root.setAttribute('data-phase', 'bouncing')
  root.setAttribute('data-state', 'closed')
  setStatus('CLOSED')
  setButtons(false)
  setTranslateY(0)

  if (prefersReducedMotion()) {
    applyRunningImmediate()
    return
  }

  for (const bounce of BOUNCES) {
    await animateBounce(bounce.peak, bounce.duration)
  }

  await new Promise((resolve) => {
    later(HOLD_MS, resolve)
  })

  applyRunning()
}

/** @returns {Promise<void>} */
export async function replayDockLaunchBounce() {
  if (busy) return
  resetDockLaunchBounce()
  void rootEl()?.offsetWidth
  await runDockLaunchBounce()
}

function bindUi() {
  document.querySelectorAll('[data-dlb-launch]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runDockLaunchBounce()
    })
  })

  document.querySelectorAll('[data-dlb-replay]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void replayDockLaunchBounce()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void replayDockLaunchBounce()
    }
  })
}

bindUi()
resetDockLaunchBounce()

export const DOCK_LAUNCH_BOUNCE_CONTRACT = {
  BOUNCES,
  HOLD_MS,
  TOTAL_BOUNCE_MS,
  TILE: 44,
  INDICATOR: { widthPx: 5, heightPx: 5 },
}
