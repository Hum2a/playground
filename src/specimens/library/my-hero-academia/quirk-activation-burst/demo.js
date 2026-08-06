/**
 * Quirk Activation Burst — radial burst; STANDBY → ACTIVE.
 */

const BURST_MS = 500
const SETTLE_MS = 280

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
  return document.querySelector('[data-qab]')
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
  const el = document.querySelector('[data-qab-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-qab-activate], [data-qab-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showActive() {
  const label = document.querySelector('[data-qab-label]')
  const sub = document.querySelector('[data-qab-sublabel]')
  if (label) label.textContent = 'ACTIVE'
  if (sub) sub.textContent = 'Output engaged'
  setLive('Ability active.')
}

function resetCopy() {
  const label = document.querySelector('[data-qab-label]')
  const sub = document.querySelector('[data-qab-sublabel]')
  if (label) label.textContent = 'STANDBY'
  if (sub) sub.textContent = 'Awaiting activation'
  setLive('Ability standby.')
}

/** @returns {Promise<void>} */
export function runQuirkActivationBurst() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetCopy()
  setButtons(false)
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    showActive()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('burst')
  setLive('Burst firing.')

  return new Promise((resolve) => {
    later(BURST_MS, () => {
      showActive()
      setPhase('settle')
      setLive('Settling.')

      later(SETTLE_MS, () => {
        setPhase('done')
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetQuirkActivationBurst() {
  clearTimers()
  busy = false
  resetCopy()
  setPhase('idle')
  setButtons(true)
  const root = rootEl()
  if (root) void root.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayQuirkActivationBurst() {
  if (busy) return
  resetQuirkActivationBurst()
  void rootEl()?.offsetWidth
  await runQuirkActivationBurst()
}

function bindUi() {
  document.querySelector('[data-qab-activate]')?.addEventListener('click', () => {
    void runQuirkActivationBurst()
  })
  document.querySelector('[data-qab-replay]')?.addEventListener('click', () => {
    void replayQuirkActivationBurst()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayQuirkActivationBurst()
  })
}

bindUi()
resetQuirkActivationBurst()
