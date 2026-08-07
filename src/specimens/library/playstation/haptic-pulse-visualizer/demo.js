/**
 * Haptic Pulse Visualizer — PlayStation-inspired motion specimen.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-hpv]')
}

let busy = false
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
  const el = document.querySelector('[data-hpv-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-hpv-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-hpv-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-hpv-run], [data-hpv-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

const PULSE_MS = 520
const GAP_MS = 180
const WAVES = 3

function clearWaves() {
  document.querySelectorAll('[data-wave]').forEach((w) => {
    w.setAttribute('data-active', 'false')
  })
}

function fireBurst() {
  clearWaves()
  void rootEl()?.offsetWidth
  ;[1, 2, 3, 4].forEach((n) => {
    const ring = document.querySelector(`[data-wave="${n}"]`)
    if (ring) ring.setAttribute('data-active', 'true')
  })
  later(PULSE_MS + 220, clearWaves)
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  clearWaves()
  setStatus('READY')
  setHint('Press pulse or Run for radial waves.')
  setLive('Haptic visualizer idle.')
}

function runBursts() {
  return new Promise((resolve) => {
    let i = 1
    const next = () => {
      if (i > WAVES) {
        setLive('Three radial haptic bursts complete.')
        resolve()
        return
      }
      fireBurst()
      setLive(`Radial haptic burst ${i} of ${WAVES}.`)
      setStatus(`BURST ${i}`)
      i += 1
      later(PULSE_MS + GAP_MS, next)
    }
    next()
  })
}

export function runHapticPulseVisualizer() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  root.setAttribute('data-phase', 'active')
  setStatus('PULSING')
  setLive('Emitting radial haptic waves.')

  if (prefersReducedMotion()) {
    root.setAttribute('data-phase', 'static')
    document.querySelector('[data-wave="1"]')?.setAttribute('data-active', 'false')
    setLive('Haptic pulse (static radial highlight).')
    setStatus('PULSE')
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  return runBursts().then(() => {
    busy = false
    setButtons(true)
    setStatus('READY')
    root.setAttribute('data-phase', 'idle')
  })
}

export function resetHapticPulseVisualizer() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

export async function replayHapticPulseVisualizer() {
  if (busy) return
  resetHapticPulseVisualizer()
  await runHapticPulseVisualizer()
}

document.querySelector('[data-hpv-pulse]')?.addEventListener('click', () => {
  if (busy) return
  if (prefersReducedMotion()) {
    rootEl()?.setAttribute('data-phase', 'static')
    setLive('Haptic pulse (static radial highlight).')
    return
  }
  busy = true
  rootEl()?.setAttribute('data-phase', 'active')
  fireBurst()
  setLive('Single radial haptic burst.')
  later(PULSE_MS + 40, () => {
    busy = false
    rootEl()?.setAttribute('data-phase', 'idle')
  })
})

function bindUi() {
  document.querySelector('[data-hpv-run]')?.addEventListener('click', () => {
    void runHapticPulseVisualizer()
  })
  document.querySelector('[data-hpv-replay]')?.addEventListener('click', () => {
    void replayHapticPulseVisualizer()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayHapticPulseVisualizer()
  })
}

bindUi()
resetHapticPulseVisualizer()
