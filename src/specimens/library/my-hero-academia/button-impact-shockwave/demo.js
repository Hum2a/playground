/**
 * Button Impact Shockwave — angular shockwave through parent card.
 * iframe-safe; no storage / parent / network.
 */

const IMPACT_MS = 660
const SETTLE_MS = 650
const TOTAL_MS = IMPACT_MS + SETTLE_MS

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
  return document.querySelector('[data-bis]')
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
  const el = document.querySelector('[data-bis-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  const activate = document.querySelector('[data-bis-activate]')
  const replay = document.querySelector('[data-bis-replay]')
  if (activate) activate.disabled = !on
  if (replay) replay.disabled = !on
}

function showDone() {
  const result = document.querySelector('[data-bis-result]')
  if (result) result.hidden = false
  setLive('Action complete.')
}

function resetVisual() {
  const result = document.querySelector('[data-bis-result]')
  if (result) result.hidden = true
  setLive('Action ready.')
}

/** @returns {Promise<void>} */
export function runButtonImpactShockwave() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    showDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('impact')
  setLive('Impact shockwave.')

  return new Promise((resolve) => {
    later(IMPACT_MS, () => {
      showDone()
      setPhase('done')
      later(SETTLE_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetButtonImpactShockwave() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayButtonImpactShockwave() {
  if (busy) return
  resetButtonImpactShockwave()
  void rootEl()?.offsetWidth
  await runButtonImpactShockwave()
}

function bindUi() {
  document.querySelector('[data-bis-activate]')?.addEventListener('click', () => {
    void runButtonImpactShockwave()
  })
  document.querySelector('[data-bis-replay]')?.addEventListener('click', () => {
    void replayButtonImpactShockwave()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayButtonImpactShockwave()
  })
}

bindUi()
resetButtonImpactShockwave()
