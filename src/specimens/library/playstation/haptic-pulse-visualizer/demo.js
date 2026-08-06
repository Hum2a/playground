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

const PULSE_MS = 480
const GAP_MS = 200

function fireWave(n) {
  const wave = document.querySelector(`[data-wave="${n}"]`)
  if (!wave) return
  wave.setAttribute('data-active', 'false')
  void wave.offsetWidth
  wave.setAttribute('data-active', 'true')
  later(PULSE_MS, () => wave.setAttribute('data-active', 'false'))
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  document.querySelectorAll('[data-wave]').forEach((w) => w.setAttribute('data-active', 'false'))
  setStatus('READY')
  setHint('Press action or Run for pulses.')
  setLive('Haptic visualizer idle.')
}

function runPulses() {
  return new Promise((resolve) => {
    let i = 1
    const next = () => {
      if (i > 3) {
        setLive('Three haptic pulses complete.')
        resolve()
        return
      }
      fireWave(i)
      setLive(`Haptic pulse ${i} of 3.`)
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
  setLive('Emitting haptic pulses.')

  if (prefersReducedMotion()) {
    fireWave(1)
    setLive('Haptic pulse (static highlight).')
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  return runPulses().then(() => {
    busy = false
    setButtons(true)
    setStatus('READY')
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
  if (!busy) {
    busy = true
    void runPulses().then(() => { busy = false })
  }
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
