/**
 * Water Wave Page Transition — a wavy mask sweeps across the stage, exchanging page content.
 * iframe-safe; no storage / parent / network.
 */

const TOTAL_MS = 650
const SWAP_AT_MS = 320
const SETTLE_MS = 150

let busy = false
/** @type {'a' | 'b'} */
let surface = 'a'
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-wwt]')
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
  const el = document.querySelector('[data-wwt-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-wwt-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-wwt-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-wwt-run], [data-wwt-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

/** @param {'a' | 'b'} next */
function showSurface(next) {
  surface = next
  const root = rootEl()
  root?.setAttribute('data-surface', next)
  document.querySelectorAll('[data-wwt-panel]').forEach((el) => {
    el.toggleAttribute('hidden', el.getAttribute('data-wwt-panel') !== next)
  })
  setStatus(next === 'a' ? 'PAGE 01' : 'PAGE 02')
  setLive(next === 'a' ? 'Page one in view.' : 'Page two in view.')
}

/**
 * Run one wave sweep, alternating pages.
 * @returns {Promise<void>}
 */
export function runWaterWavePageTransition() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  const next = surface === 'a' ? 'b' : 'a'

  if (prefersReducedMotion()) {
    showSurface(next)
    setHint('Press Run to wipe to the next page.')
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'idle')
  void root.offsetWidth
  root.setAttribute('data-phase', 'run')
  setHint('Wave sweeping.')
  setLive('Wave sweeping across the page.')

  return new Promise((resolve) => {
    later(SWAP_AT_MS, () => {
      showSurface(next)
    })
    later(TOTAL_MS, () => {
      later(SETTLE_MS, () => {
        root.setAttribute('data-phase', 'idle')
        setHint('Press Run to wipe to the next page.')
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetWaterWavePageTransition() {
  clearTimers()
  busy = false
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  showSurface('a')
  setHint('Press Run to wipe to the next page.')
  setButtons(true)
  void root?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayWaterWavePageTransition() {
  if (busy) return
  resetWaterWavePageTransition()
  void rootEl()?.offsetWidth
  await runWaterWavePageTransition()
}

function bindUi() {
  document.querySelector('[data-wwt-run]')?.addEventListener('click', () => {
    void runWaterWavePageTransition()
  })
  document.querySelector('[data-wwt-replay]')?.addEventListener('click', () => {
    void replayWaterWavePageTransition()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayWaterWavePageTransition()
  })
}

bindUi()
resetWaterWavePageTransition()
