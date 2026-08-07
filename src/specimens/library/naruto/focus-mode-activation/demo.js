/**
 * Focus Mode Activation — corner brackets converge on a central reticle, peripheral content dims.
 * iframe-safe; no storage / parent / network.
 */

const NARROW_MS = 240
const BRACKET_INSET_PX = 18
const SETTLE_MS = 140

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
  return document.querySelector('[data-fma]')
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
  const el = document.querySelector('[data-fma-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-fma-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-fma-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-fma-run], [data-fma-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function showResolved() {
  setPhase('focused')
  setStatus('FOCUSED')
  setHint('Focus mode active. Press Replay to deactivate and reactivate.')
  setLive('Focus mode active. Brackets converged on the reticle.')
}

function resetVisual() {
  setPhase('idle')
  setStatus('NORMAL')
  setHint('Press Run to activate focus mode.')
  setLive('Normal view. Focus mode inactive.')
}

/**
 * Auto-run the converge → focus sequence.
 * @returns {Promise<void>}
 */
export function runFocusModeActivation() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'focused') {
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

  setPhase('active')
  setStatus('NARROWING')
  setLive('Brackets converging on host content.')

  return new Promise((resolve) => {
    later(NARROW_MS, () => {
      showResolved()
      later(SETTLE_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetFocusModeActivation() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayFocusModeActivation() {
  if (busy) return
  resetFocusModeActivation()
  void rootEl()?.offsetWidth
  await runFocusModeActivation()
}

function bindUi() {
  document.querySelector('[data-fma-run]')?.addEventListener('click', () => {
    void runFocusModeActivation()
  })
  document.querySelector('[data-fma-replay]')?.addEventListener('click', () => {
    void replayFocusModeActivation()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayFocusModeActivation()
  })
}

bindUi()
resetFocusModeActivation()

void BRACKET_INSET_PX
