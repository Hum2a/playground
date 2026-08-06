/**
 * Waterline Page Wipe — tiny portable transition API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Graphic CSS water rises continuously, swaps under cover, exits upward.
 */

const COVER_MS = 460
const TOTAL_MS = 850
const SETTLE_MS = 180

/** @type {number[]} */
let timers = []
let busy = false
/** @type {'a' | 'b'} */
let surface = 'a'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-waterline-wipe]')
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
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = document.querySelector('[data-wl-status]')
  if (el) el.textContent = text
}

function statusFor(s) {
  return s === 'a' ? 'Surface 01. Day.' : 'Surface 02. Night.'
}

function syncRefract(s) {
  const kicker = document.querySelector('[data-wl-refract-kicker]')
  const title = document.querySelector('[data-wl-refract-title]')
  if (kicker) kicker.textContent = s === 'a' ? 'SURFACE // 01' : 'SURFACE // 02'
  if (title) title.textContent = s === 'a' ? 'DAY' : 'NIGHT'
}

/**
 * @param {'a' | 'b'} next
 */
function showSurface(next) {
  surface = next
  const root = rootEl()
  root?.setAttribute('data-surface', next)

  document.querySelectorAll('[data-wl-state]').forEach((el) => {
    const match = el.getAttribute('data-wl-state') === next
    el.toggleAttribute('hidden', !match)
  })

  syncRefract(next)
  setStatus(statusFor(next))
}

function setTriggerEnabled(on) {
  const btn = document.querySelector('[data-wl-trigger]')
  if (btn) btn.disabled = !on
}

/**
 * Run one submerge transition. Alternates A ↔ B under full coverage.
 * @returns {Promise<void>}
 */
export function runWaterlineWipe() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  setTriggerEnabled(false)

  const next = surface === 'a' ? 'b' : 'a'
  // Refract mirrors the *outgoing* surface until swap.
  syncRefract(surface)

  if (prefersReducedMotion()) {
    showSurface(next)
    setPhase('idle')
    busy = false
    setTriggerEnabled(true)
    return Promise.resolve()
  }

  setPhase('idle')
  void root.offsetWidth
  setPhase('run')

  return new Promise((resolve) => {
    later(COVER_MS, () => {
      showSurface(next)
    })

    later(TOTAL_MS, () => {
      setPhase('settle')
      later(SETTLE_MS, () => {
        setPhase('idle')
        busy = false
        setTriggerEnabled(true)
        resolve()
      })
    })
  })
}

export function resetWaterlineWipe() {
  clearTimers()
  busy = false
  setPhase('idle')
  showSurface('a')
  setTriggerEnabled(true)
}

/** @returns {Promise<void>} */
export async function replayWaterlineWipe() {
  if (busy) return
  await runWaterlineWipe()
}

function bindUi() {
  document.querySelectorAll('[data-wl-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runWaterlineWipe()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      resetWaterlineWipe()
      void rootEl()?.offsetWidth
      void runWaterlineWipe()
    }
  })
}

bindUi()
resetWaterlineWipe()
