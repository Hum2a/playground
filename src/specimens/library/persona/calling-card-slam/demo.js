/**
 * Calling Card Slam — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const ENTER_MS = 655 // 620ms slam + 35ms backing lag
const EXIT_MS = 350

let busy = false
let settled = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-calling-card]')
}

function clearMotionClasses(root) {
  root.classList.remove(
    'calling-card--enter',
    'calling-card--exit',
    'calling-card--settled',
    'calling-card--reduced',
  )
}

/**
 * Slam the calling card onto the host. Reuses the existing DOM node.
 * @returns {Promise<void>}
 */
export function slamCallingCard() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  settled = false
  clearMotionClasses(root)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('calling-card--reduced', 'calling-card--settled')
    busy = false
    settled = true
    return Promise.resolve()
  }

  root.classList.add('calling-card--enter')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.remove('calling-card--enter')
      root.classList.add('calling-card--settled')
      busy = false
      settled = true
      resolve()
    }, ENTER_MS)
  })
}

/**
 * Rip the card sideways out of the host.
 * @returns {Promise<void>}
 */
export function dismissCallingCard() {
  const root = rootEl()
  if (!root || busy || !settled) return Promise.resolve()

  busy = true
  settled = false

  if (prefersReducedMotion()) {
    clearMotionClasses(root)
    busy = false
    return Promise.resolve()
  }

  root.classList.remove('calling-card--settled', 'calling-card--reduced')
  root.classList.add('calling-card--exit')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      clearMotionClasses(root)
      busy = false
      resolve()
    }, EXIT_MS)
  })
}

/**
 * Exit (if settled) then slam again — no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayCallingCard() {
  if (busy) return
  if (settled) await dismissCallingCard()
  await slamCallingCard()
}

function bindUi() {
  const root = rootEl()
  const replay = document.querySelector('[data-calling-card-replay]')

  replay?.addEventListener('click', () => {
    void replayCallingCard()
  })

  root?.addEventListener('click', () => {
    if (settled && !busy) void dismissCallingCard()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCallingCard()
  })
}

bindUi()
void slamCallingCard()
