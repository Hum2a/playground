/**
 * Paper Rip Unlock — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Splits one sheet into two halves — not a peel of an intact object.
 */

const RUPTURE_MS = 120
const TEAR_MS = 240
const SEPARATE_MS = 360
const SETTLE_MS = 180
const TOTAL_MS = RUPTURE_MS + TEAR_MS + SEPARATE_MS + SETTLE_MS // 900

const PHASES = [
  'paper-rip--rupture',
  'paper-rip--tear',
  'paper-rip--separate',
  'paper-rip--unlocked',
  'paper-rip--reduced',
]

let busy = false
let unlocked = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-paper-rip]')
}

function hostEl() {
  return document.querySelector('[data-paper-rip-host]')
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

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(text) {
  const el = document.querySelector('[data-paper-rip-status]')
  if (el) el.textContent = text
}

function setActionEnabled(enabled) {
  const btn = document.querySelector('[data-paper-rip-action]')
  if (!btn) return
  btn.disabled = !enabled
}

function setUnlockedUi(on) {
  hostEl()?.classList.toggle('paper-rip-host--unlocked', on)
  const stamp = document.querySelector('[data-paper-rip-stamp]')
  if (stamp) stamp.setAttribute('aria-hidden', on ? 'false' : 'true')
}

/** @returns {Promise<void>} */
export function ripPaperUnlock() {
  const root = rootEl()
  if (!root || busy || unlocked) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.hidden = false
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('paper-rip--reduced', 'paper-rip--unlocked')
    root.hidden = true
    unlocked = true
    setUnlockedUi(true)
    setStatus('Unlocked')
    setActionEnabled(true)
    busy = false
    return Promise.resolve()
  }

  root.classList.add('paper-rip--rupture')

  return new Promise((resolve) => {
    later(RUPTURE_MS, () => {
      root.classList.remove('paper-rip--rupture')
      root.classList.add('paper-rip--tear')
    })

    later(RUPTURE_MS + TEAR_MS, () => {
      root.classList.remove('paper-rip--tear')
      root.classList.add('paper-rip--separate')
    })

    later(RUPTURE_MS + TEAR_MS + SEPARATE_MS, () => {
      root.classList.remove('paper-rip--separate')
      root.classList.add('paper-rip--unlocked')
      root.hidden = true
      setUnlockedUi(true)
      setStatus('Unlocked')
      setActionEnabled(true)
    })

    later(TOTAL_MS, () => {
      unlocked = true
      busy = false
      resolve()
    })
  })
}

export function resetPaperRip() {
  const root = rootEl()
  if (!root) return
  clearTimers()
  clearPhases(root)
  root.hidden = false
  setUnlockedUi(false)
  setStatus('Sealed')
  setActionEnabled(false)
  unlocked = false
  busy = false
}

/** @returns {Promise<void>} */
export async function replayPaperRip() {
  if (busy) return
  resetPaperRip()
  void rootEl()?.offsetWidth
  await ripPaperUnlock()
}

function bindUi() {
  document.querySelectorAll('[data-paper-rip-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void ripPaperUnlock()
    })
  })

  document.querySelectorAll('[data-paper-rip-reset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      resetPaperRip()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayPaperRip()
  })
}

bindUi()
setActionEnabled(false)
setStatus('Sealed')
