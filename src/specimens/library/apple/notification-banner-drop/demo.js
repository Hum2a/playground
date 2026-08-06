/**
 * Notification Banner Drop — temporary top-edge alert with dwell and retreat.
 * Sandbox-safe (no parent / storage / network).
 */

const BANNER_W = 340
const BANNER_H = 74
const START_Y = -96
const ENTRY_MS = 280
const OVERSHOOT_Y = 6
const SETTLE_MS = 80
const DWELL_MS = 2200
const EXIT_MS = 220

/** @type {number[]} */
let timers = []
let dwellDeadline = 0
let paused = false
let running = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-notification-banner]')
}

function bannerEl() {
  return document.querySelector('[data-nbd-banner]')
}

function statusEl() {
  return document.querySelector('[data-nbd-status]')
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
  const el = statusEl()
  if (el) el.textContent = text
}

function scheduleExit() {
  clearTimers()
  dwellDeadline = Date.now() + DWELL_MS
  later(DWELL_MS, () => {
    if (paused) return
    runExit()
  })
}

function runExit() {
  setPhase('exiting')
  setStatus('Banner retreating upward.')
  const banner = bannerEl()
  if (!banner) return

  if (prefersReducedMotion()) {
    setPhase('hidden')
    banner.style.transform = `translateY(${START_Y}px)`
    setStatus('Banner hidden. Press REPLAY to show notification drop.')
    running = false
    return
  }

  banner.classList.add('is-exiting')
  later(EXIT_MS, () => {
    banner.classList.remove('is-exiting')
    banner.style.transform = `translateY(${START_Y}px)`
    setPhase('hidden')
    setStatus('Banner hidden. Press REPLAY to show notification drop.')
    running = false
  })
}

export function runNotificationBannerDrop() {
  if (running) return
  running = true
  paused = false
  clearTimers()
  const banner = bannerEl()
  if (!banner) return

  setPhase('entering')
  setStatus('Banner dropping from above viewport.')
  banner.style.transform = `translateY(${START_Y}px)`
  banner.classList.remove('is-exiting', 'is-settling', 'is-visible')

  if (prefersReducedMotion()) {
    banner.style.transform = 'translateY(0)'
    setPhase('dwelling')
    setStatus('Banner visible. Dwelling.')
    scheduleExit()
    return
  }

  banner.classList.add('is-entering')
  later(ENTRY_MS, () => {
    banner.classList.remove('is-entering')
    banner.classList.add('is-settling')
    banner.style.transform = `translateY(${OVERSHOOT_Y}px)`
    later(SETTLE_MS, () => {
      banner.classList.remove('is-settling')
      banner.style.transform = 'translateY(0)'
      setPhase('dwelling')
      setStatus('Banner visible. Hover or focus pauses auto retreat.')
      scheduleExit()
    })
  })
}

export function resetNotificationBannerDrop() {
  clearTimers()
  running = false
  paused = false
  const banner = bannerEl()
  if (banner) {
    banner.classList.remove('is-entering', 'is-settling', 'is-exiting', 'is-visible')
    banner.style.transform = `translateY(${START_Y}px)`
  }
  setPhase('hidden')
  setStatus('Banner hidden. Press REPLAY to show notification drop.')
}

function pauseDwell() {
  if (!running || paused) return
  paused = true
  clearTimers()
  setStatus('Auto retreat paused.')
}

function resumeDwell() {
  if (!running || !paused) return
  paused = false
  const remaining = Math.max(0, dwellDeadline - Date.now())
  setStatus('Auto retreat resumed.')
  later(remaining, () => {
    if (!paused) runExit()
  })
}

function bindUi() {
  const replay = document.querySelector('[data-nbd-replay]')
  const banner = bannerEl()

  if (replay) replay.addEventListener('click', () => runNotificationBannerDrop())
  if (banner) {
    banner.addEventListener('mouseenter', pauseDwell)
    banner.addEventListener('mouseleave', resumeDwell)
    banner.addEventListener('focus', pauseDwell)
    banner.addEventListener('blur', resumeDwell)
  }

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetNotificationBannerDrop()
    }
  })
}

bindUi()
resetNotificationBannerDrop()

export const NOTIFICATION_BANNER_DROP_CONTRACT = {
  BANNER_W,
  BANNER_H,
  START_Y,
  ENTRY_MS,
  OVERSHOOT_Y,
  SETTLE_MS,
  DWELL_MS,
  EXIT_MS,
}
