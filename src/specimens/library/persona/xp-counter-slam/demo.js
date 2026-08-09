/**
 * XP Counter Slam — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const ENTER_MS = 600

let busy = false
let settled = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-xp-slam]')
}

function clearMotionClasses(root) {
  root.classList.remove('xp-slam--enter', 'xp-slam--settled', 'xp-slam--reduced', 'xp-slam--reset')
}

/**
 * Fly the delta chip in and slam it into the total.
 * @returns {Promise<void>}
 */
export function slamXp() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  settled = false
  clearMotionClasses(root)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('xp-slam--reduced', 'xp-slam--settled')
    busy = false
    settled = true
    return Promise.resolve()
  }

  root.classList.add('xp-slam--enter')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.remove('xp-slam--enter')
      root.classList.add('xp-slam--settled')
      busy = false
      settled = true
      resolve()
    }, ENTER_MS)
  })
}

/**
 * Snap back to the pre-slam idle total.
 * @returns {Promise<void>}
 */
export function resetXp() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  clearMotionClasses(root)
  root.classList.add('xp-slam--reset')
  settled = false
  return Promise.resolve()
}

/**
 * Reset (if settled) then slam again — no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayXp() {
  if (busy) return
  if (settled) {
    await resetXp()
    await new Promise((r) => window.setTimeout(r, 60))
  }
  await slamXp()
}

function bindUi() {
  const replay = document.querySelector('[data-xp-slam-replay]')

  replay?.addEventListener('click', () => {
    void replayXp()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayXp()
  })
}

bindUi()
window.setTimeout(() => void slamXp(), 250)
