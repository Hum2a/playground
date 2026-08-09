/**
 * Typographic Impact — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const ENTER_MS = 630 // 480ms slam + 300ms foreground delay + 320ms rise, longest chain read at bind time
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
  return document.querySelector('[data-type-impact]')
}

function clearMotionClasses(root) {
  root.classList.remove(
    'type-impact--enter',
    'type-impact--exit',
    'type-impact--settled',
    'type-impact--reduced',
  )
}

/**
 * Slam the giant word behind the foreground callout.
 * @returns {Promise<void>}
 */
export function slamImpact() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  settled = false
  clearMotionClasses(root)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('type-impact--reduced', 'type-impact--settled')
    busy = false
    settled = true
    return Promise.resolve()
  }

  root.classList.add('type-impact--enter')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.remove('type-impact--enter')
      root.classList.add('type-impact--settled')
      busy = false
      settled = true
      resolve()
    }, ENTER_MS)
  })
}

/**
 * Crush the composition sideways.
 * @returns {Promise<void>}
 */
export function crushImpact() {
  const root = rootEl()
  if (!root || busy || !settled) return Promise.resolve()

  busy = true
  settled = false

  if (prefersReducedMotion()) {
    clearMotionClasses(root)
    busy = false
    return Promise.resolve()
  }

  root.classList.remove('type-impact--settled', 'type-impact--reduced')
  root.classList.add('type-impact--exit')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      clearMotionClasses(root)
      busy = false
      resolve()
    }, EXIT_MS)
  })
}

/**
 * Crush (if settled) then slam again.
 * @returns {Promise<void>}
 */
export async function replayImpact() {
  if (busy) return
  if (settled) await crushImpact()
  await slamImpact()
}

function bindUi() {
  const root = rootEl()
  const replay = document.querySelector('[data-type-impact-replay]')

  replay?.addEventListener('click', () => {
    void replayImpact()
  })

  root?.addEventListener('click', () => {
    if (settled && !busy) void crushImpact()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayImpact()
  })
}

bindUi()
void slamImpact()
