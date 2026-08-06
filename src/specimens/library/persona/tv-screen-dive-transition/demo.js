/**
 * TV Screen Dive Transition — UI dives into aperture; destination emerges.
 * iframe-safe; no storage / parent / network.
 */

const DIVE_MS = 680
const EMERGE_MS = 520

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-tsd]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-tsd-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tsd-run], [data-tsd-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showDestination() {
  setPhase('done')
  setLive('TV world destination visible.')
}

function resetVisual() {
  setPhase('idle')
  setLive('Awaiting dive.')
}

export function runTvScreenDive() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showDestination()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('dive')
  setLive('Diving into screen.')

  return new Promise((resolve) => {
    later(DIVE_MS, () => {
      setPhase('emerge')
      setLive('Destination emerging.')

      later(EMERGE_MS, () => {
        showDestination()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetTvScreenDive() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

export async function replayTvScreenDive() {
  if (busy) return
  resetTvScreenDive()
  void rootEl()?.offsetWidth
  await runTvScreenDive()
}

function bindUi() {
  document.querySelector('[data-tsd-run]')?.addEventListener('click', () => {
    void runTvScreenDive()
  })
  document.querySelector('[data-tsd-replay]')?.addEventListener('click', () => {
    void replayTvScreenDive()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTvScreenDive()
  })
}

bindUi()
resetTvScreenDive()
