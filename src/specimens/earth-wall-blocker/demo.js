/**
 * Earth Wall Blocker — five segmented slabs rise staggered to protect a zone.
 * iframe-safe; no storage / parent / network.
 */

const RISE_TOTAL_MS = 500
const SETTLE_MS = 150

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
  return document.querySelector('[data-ewb]')
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
  const el = document.querySelector('[data-ewb-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ewb-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-ewb-hint]')
  if (el) el.textContent = text
}

function setZone(text) {
  const el = document.querySelector('[data-ewb-zone]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ewb-run], [data-ewb-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function showResolved() {
  setPhase('raised')
  setZone('PROTECTED')
  setStatus('WALL UP')
  setHint('Wall raised. Press Replay to lower and raise again.')
  setLive('Wall raised. Zone protected.')
}

function resetVisual() {
  setPhase('idle')
  setZone('EXPOSED')
  setStatus('DOWN')
  setHint('Press Run to raise the wall.')
  setLive('Zone exposed. Wall down.')
}

/**
 * Auto-run the staggered slab rise.
 * @returns {Promise<void>}
 */
export function runEarthWallBlocker() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'raised') {
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

  setPhase('run')
  setStatus('RISING')
  setHint('Rising.')
  setLive('Wall rising.')

  return new Promise((resolve) => {
    later(RISE_TOTAL_MS, () => {
      later(SETTLE_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetEarthWallBlocker() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayEarthWallBlocker() {
  if (busy) return
  resetEarthWallBlocker()
  void rootEl()?.offsetWidth
  await runEarthWallBlocker()
}

function bindUi() {
  document.querySelector('[data-ewb-run]')?.addEventListener('click', () => {
    void runEarthWallBlocker()
  })
  document.querySelector('[data-ewb-replay]')?.addEventListener('click', () => {
    void replayEarthWallBlocker()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayEarthWallBlocker()
  })
}

bindUi()
resetEarthWallBlocker()
