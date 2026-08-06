/**
 * Misprint Notification — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const ENTER_MS = 460
const EXIT_MS = 260

let busy = false
let settled = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-misprint]')
}

function clearMotionClasses(root) {
  root.classList.remove(
    'misprint--enter',
    'misprint--settled',
    'misprint--exit',
    'misprint--reduced',
  )
}

/**
 * Show the misprint registration sequence.
 * @returns {Promise<void>}
 */
export function showMisprint() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  settled = false
  clearMotionClasses(root)
  root.hidden = false
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('misprint--reduced', 'misprint--settled')
    busy = false
    settled = true
    return Promise.resolve()
  }

  root.classList.add('misprint--enter')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.remove('misprint--enter')
      root.classList.add('misprint--settled')
      busy = false
      settled = true
      resolve()
    }, ENTER_MS)
  })
}

/**
 * Separate print layers and clip out.
 * @returns {Promise<void>}
 */
export function dismissMisprint() {
  const root = rootEl()
  if (!root || busy || !settled) return Promise.resolve()

  busy = true
  settled = false

  if (prefersReducedMotion()) {
    clearMotionClasses(root)
    root.hidden = true
    busy = false
    return Promise.resolve()
  }

  root.classList.remove('misprint--settled', 'misprint--reduced')
  root.classList.add('misprint--exit')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      clearMotionClasses(root)
      root.hidden = true
      busy = false
      resolve()
    }, EXIT_MS)
  })
}

/**
 * Dismiss (if settled) then show again — no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayMisprint() {
  if (busy) return
  if (settled) await dismissMisprint()
  await showMisprint()
}

function bindUi() {
  document.querySelector('[data-misprint-send]')?.addEventListener('click', () => {
    void replayMisprint()
  })

  document.querySelector('[data-misprint-dismiss]')?.addEventListener('click', () => {
    if (settled && !busy) void dismissMisprint()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMisprint()
  })
}

bindUi()
