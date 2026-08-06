/**
 * Dual Activity Split — portable split/collapse API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Initial 196×40 → split: main 126 + gap 12 + secondary 58; 320ms
 * Bridge visible first 90ms only.
 */

const SPLIT_MS = 320
const BRIDGE_MS = 90

/** @type {number[]} */
let timers = []
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  return (
    forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function rootEl() {
  return document.querySelector('[data-dual-activity]')
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

function setStatus(text) {
  const el = document.querySelector('[data-das-status]')
  if (el) el.textContent = text
}

function setButtons(split) {
  const start = document.querySelector('[data-das-start]')
  const end = document.querySelector('[data-das-end]')
  if (start) start.disabled = split || busy
  if (end) end.disabled = !split || busy
}

function setLabel(split) {
  const label = document.querySelector('[data-das-label]')
  if (label) label.textContent = split ? 'UPLOAD 64%' : 'UPLOAD // 64%'
}

export function startDualActivitySplit() {
  const el = rootEl()
  if (!el || busy || el.dataset.state === 'split') return Promise.resolve()

  busy = true
  setButtons(true)
  clearTimers()

  const rm = prefersReducedMotion()

  if (rm) {
    el.dataset.state = 'split'
    el.dataset.bridge = 'false'
    el.dataset.revealDigits = 'true'
    setLabel(true)
    busy = false
    setButtons(true)
    setStatus('Dual activity: upload 64 percent and timer 04:12.')
    return Promise.resolve()
  }

  el.dataset.state = 'splitting'
  el.dataset.bridge = 'visible'
  el.dataset.revealDigits = 'false'

  return new Promise((resolve) => {
    later(60, () => {
      el.dataset.revealDigits = 'true'
    })
    later(BRIDGE_MS, () => {
      el.dataset.bridge = 'false'
    })
    later(SPLIT_MS, () => {
      el.dataset.state = 'split'
      setLabel(true)
      busy = false
      setButtons(true)
      setStatus('Dual activity: upload 64 percent and timer 04:12.')
      resolve()
    })
  })
}

export function endDualActivitySplit() {
  const el = rootEl()
  if (!el || busy || el.dataset.state === 'single') return Promise.resolve()

  busy = true
  setButtons(true)
  clearTimers()

  const rm = prefersReducedMotion()

  if (rm) {
    el.dataset.state = 'single'
    el.dataset.bridge = 'false'
    el.dataset.revealDigits = 'false'
    setLabel(false)
    busy = false
    setButtons(false)
    setStatus('Single upload activity at 64 percent.')
    return Promise.resolve()
  }

  el.dataset.revealDigits = 'false'
  el.dataset.bridge = 'false'
  el.dataset.state = 'single'

  return new Promise((resolve) => {
    later(SPLIT_MS, () => {
      setLabel(false)
      busy = false
      setButtons(false)
      setStatus('Single upload activity at 64 percent.')
      resolve()
    })
  })
}

export function resetDualActivitySplit() {
  const el = rootEl()
  if (!el || busy) return Promise.resolve()

  clearTimers()
  busy = false
  el.dataset.state = 'single'
  el.dataset.bridge = 'false'
  el.dataset.revealDigits = 'false'
  setLabel(false)
  setButtons(false)
  setStatus('Single upload activity at 64 percent.')
  return Promise.resolve()
}

function wire() {
  const el = rootEl()
  if (!el) return

  document
    .querySelector('[data-das-start]')
    ?.addEventListener('click', () => void startDualActivitySplit())
  document
    .querySelector('[data-das-end]')
    ?.addEventListener('click', () => void endDualActivitySplit())
}

wire()
