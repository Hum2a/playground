/**
 * Team Formation Snap — profile cards fly into fixed formation slots.
 * iframe-safe; no storage / parent / network.
 */

const SNAP_MS = 580
const SETTLE_MS = 650
const TOTAL_MS = SNAP_MS + SETTLE_MS

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
  return document.querySelector('[data-tfs]')
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
  const el = document.querySelector('[data-tfs-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tfs-run], [data-tfs-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showReady() {
  const ready = document.querySelector('[data-tfs-ready]')
  if (ready) ready.hidden = false
  setLive('Formation complete.')
}

function resetVisual() {
  const ready = document.querySelector('[data-tfs-ready]')
  if (ready) ready.hidden = true
  setLive('Units scattered.')
}

/** @returns {Promise<void>} */
export function runTeamFormationSnap() {
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
    showReady()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('snap')
  setLive('Snapping into formation.')

  return new Promise((resolve) => {
    later(SNAP_MS, () => {
      showReady()
      setPhase('done')
      later(SETTLE_MS, () => {
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetTeamFormationSnap() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayTeamFormationSnap() {
  if (busy) return
  resetTeamFormationSnap()
  void rootEl()?.offsetWidth
  await runTeamFormationSnap()
}

function bindUi() {
  document.querySelector('[data-tfs-run]')?.addEventListener('click', () => {
    void runTeamFormationSnap()
  })
  document.querySelector('[data-tfs-replay]')?.addEventListener('click', () => {
    void replayTeamFormationSnap()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTeamFormationSnap()
  })
}

bindUi()
resetTeamFormationSnap()
