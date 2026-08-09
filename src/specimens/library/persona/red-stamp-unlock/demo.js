/**
 * Red Stamp Unlock — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const ENTER_MS = 520
const EXIT_MS = 240

let busy = false
let settled = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-stamp-unlock]')
}

function clearMotionClasses(root) {
  root.classList.remove(
    'stamp-unlock--enter',
    'stamp-unlock--exit',
    'stamp-unlock--settled',
    'stamp-unlock--reduced',
  )
}

/**
 * Smash the stamp onto the host. Reuses the existing DOM node.
 * @returns {Promise<void>}
 */
export function slamStamp() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  settled = false
  clearMotionClasses(root)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('stamp-unlock--reduced', 'stamp-unlock--settled')
    busy = false
    settled = true
    return Promise.resolve()
  }

  root.classList.add('stamp-unlock--enter')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.remove('stamp-unlock--enter')
      root.classList.add('stamp-unlock--settled')
      busy = false
      settled = true
      resolve()
    }, ENTER_MS)
  })
}

/**
 * Lift the ink stamp away.
 * @returns {Promise<void>}
 */
export function liftStamp() {
  const root = rootEl()
  if (!root || busy || !settled) return Promise.resolve()

  busy = true
  settled = false

  if (prefersReducedMotion()) {
    clearMotionClasses(root)
    busy = false
    return Promise.resolve()
  }

  root.classList.remove('stamp-unlock--settled', 'stamp-unlock--reduced')
  root.classList.add('stamp-unlock--exit')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      clearMotionClasses(root)
      busy = false
      resolve()
    }, EXIT_MS)
  })
}

/**
 * Lift (if settled) then slam again — no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayStamp() {
  if (busy) return
  if (settled) await liftStamp()
  await slamStamp()
}

function bindUi() {
  const root = rootEl()
  const replay = document.querySelector('[data-stamp-unlock-replay]')

  replay?.addEventListener('click', () => {
    void replayStamp()
  })

  root?.addEventListener('click', () => {
    if (settled && !busy) void liftStamp()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayStamp()
  })
}

bindUi()
void slamStamp()
