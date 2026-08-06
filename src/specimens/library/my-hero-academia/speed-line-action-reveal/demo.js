/**
 * Speed-Line Action Reveal — converging lines burst outward to reveal TARGET.
 */

const BURST_MS = 580
const SETTLE_MS = 320

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
  return document.querySelector('[data-slar]')
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
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-slar-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-slar-activate], [data-slar-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showRevealed() {
  setLive('Target revealed.')
}

/** @returns {Promise<void>} */
export function runSpeedLineReveal() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  setButtons(false)
  setLive('Lines converging.')
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    showRevealed()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('burst')
  setLive('Burst reveal.')

  return new Promise((resolve) => {
    later(BURST_MS, () => {
      setPhase('settle')
      showRevealed()

      later(SETTLE_MS, () => {
        setPhase('done')
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetSpeedLineReveal() {
  clearTimers()
  busy = false
  setPhase('idle')
  setLive('Target concealed.')
  setButtons(true)
  const root = rootEl()
  if (root) void root.offsetWidth
}

/** @returns {Promise<void>} */
export async function replaySpeedLineReveal() {
  if (busy) return
  resetSpeedLineReveal()
  void rootEl()?.offsetWidth
  await runSpeedLineReveal()
}

function bindUi() {
  document.querySelector('[data-slar-activate]')?.addEventListener('click', () => {
    void runSpeedLineReveal()
  })
  document.querySelector('[data-slar-replay]')?.addEventListener('click', () => {
    void replaySpeedLineReveal()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replaySpeedLineReveal()
  })
}

bindUi()
resetSpeedLineReveal()
