/**
 * Quirk Cooldown Ring — ring drains from full to empty then flips to READY.
 */

const DRAIN_MS = 580
const READY_MS = 320
const CIRC = 289.03

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
  return document.querySelector('[data-qcr]')
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
  const el = document.querySelector('[data-qcr-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-qcr-run], [data-qcr-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setRingOffset(offset) {
  const ring = document.querySelector('[data-qcr-ring]')
  if (ring) ring.style.strokeDashoffset = String(offset)
}

function setPct(text) {
  const el = document.querySelector('[data-qcr-pct]')
  if (el) el.textContent = text
}

function setLabel(text) {
  const el = document.querySelector('[data-qcr-label]')
  if (el) el.textContent = text
}

function showCooldownStart() {
  setLabel('COOLDOWN')
  setPct('100%')
  setRingOffset(0)
  setLive('Cooldown draining.')
}

function showReady() {
  setLabel('READY')
  setPct('0%')
  setRingOffset(CIRC)
  setLive('Cooldown ready.')
}

function resetVisual() {
  setLabel('READY')
  setPct('100%')
  setRingOffset(0)
  setLive('Cooldown ready.')
}

/** @returns {Promise<void>} */
export function runQuirkCooldownRing() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  setButtons(false)
  setPhase('idle')
  showCooldownStart()
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    showReady()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('drain')

  return new Promise((resolve) => {
    later(DRAIN_MS, () => {
      setPhase('ready-flash')
      showReady()

      later(READY_MS, () => {
        setPhase('done')
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetQuirkCooldownRing() {
  clearTimers()
  busy = false
  resetVisual()
  setPhase('idle')
  setButtons(true)
  const root = rootEl()
  if (root) void root.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayQuirkCooldownRing() {
  if (busy) return
  resetQuirkCooldownRing()
  void rootEl()?.offsetWidth
  await runQuirkCooldownRing()
}

function bindUi() {
  document.querySelector('[data-qcr-run]')?.addEventListener('click', () => {
    void runQuirkCooldownRing()
  })
  document.querySelector('[data-qcr-replay]')?.addEventListener('click', () => {
    void replayQuirkCooldownRing()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayQuirkCooldownRing()
  })
}

bindUi()
resetQuirkCooldownRing()
