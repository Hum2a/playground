/**
 * Graphic Finisher Completion — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const ENTER_MS = 1050
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
  return document.querySelector('[data-finisher]')
}

function clearMotionClasses(root) {
  root.classList.remove('finisher--enter', 'finisher--exit', 'finisher--settled', 'finisher--reduced')
}

/**
 * Play the full finisher sequence: panel shutter, flash, word slam, ring burst,
 * shard burst, subline rise.
 * @returns {Promise<void>}
 */
export function playFinisher() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  settled = false
  clearMotionClasses(root)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('finisher--reduced', 'finisher--settled')
    busy = false
    settled = true
    return Promise.resolve()
  }

  root.classList.add('finisher--enter')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.remove('finisher--enter')
      root.classList.add('finisher--settled')
      busy = false
      settled = true
      resolve()
    }, ENTER_MS)
  })
}

/**
 * Fade the whole finisher composition out.
 * @returns {Promise<void>}
 */
export function dismissFinisher() {
  const root = rootEl()
  if (!root || busy || !settled) return Promise.resolve()

  busy = true
  settled = false

  if (prefersReducedMotion()) {
    clearMotionClasses(root)
    busy = false
    return Promise.resolve()
  }

  root.classList.remove('finisher--settled', 'finisher--reduced')
  root.classList.add('finisher--exit')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      clearMotionClasses(root)
      busy = false
      resolve()
    }, EXIT_MS)
  })
}

/**
 * Dismiss (if settled) then play again — no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayFinisher() {
  if (busy) return
  if (settled) await dismissFinisher()
  await playFinisher()
}

function bindUi() {
  const root = rootEl()
  const replay = document.querySelector('[data-finisher-replay]')

  replay?.addEventListener('click', () => {
    void replayFinisher()
  })

  root?.addEventListener('click', () => {
    if (settled && !busy) void dismissFinisher()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayFinisher()
  })
}

bindUi()
void playFinisher()
