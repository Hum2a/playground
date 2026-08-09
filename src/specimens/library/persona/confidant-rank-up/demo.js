/**
 * Confidant Rank Up — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const ENTER_MS = 700

let busy = false
let settled = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-rank-up]')
}

function clearMotionClasses(root) {
  root.classList.remove('rank-up--enter', 'rank-up--settled', 'rank-up--reduced', 'rank-up--reset')
}

/**
 * Play the rank-up sequence: flash, ring burst, number swap, banner slam-to-corner.
 * @returns {Promise<void>}
 */
export function playRankUp() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  settled = false
  clearMotionClasses(root)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('rank-up--reduced', 'rank-up--settled')
    busy = false
    settled = true
    return Promise.resolve()
  }

  root.classList.add('rank-up--enter')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.remove('rank-up--enter')
      root.classList.add('rank-up--settled')
      busy = false
      settled = true
      resolve()
    }, ENTER_MS)
  })
}

/**
 * Snap back to the pre-rank-up idle state (old number, no banner).
 * @returns {Promise<void>}
 */
export function resetRankUp() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  clearMotionClasses(root)
  root.classList.add('rank-up--reset')
  settled = false
  return Promise.resolve()
}

/**
 * Reset (if settled) then play again — no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayRankUp() {
  if (busy) return
  if (settled) {
    await resetRankUp()
    await new Promise((r) => window.setTimeout(r, 60))
  }
  await playRankUp()
}

function bindUi() {
  const replay = document.querySelector('[data-rank-up-replay]')

  replay?.addEventListener('click', () => {
    void replayRankUp()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayRankUp()
  })
}

bindUi()
window.setTimeout(() => void playRankUp(), 250)
