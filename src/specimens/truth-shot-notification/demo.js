/**
 * Truth Shot Notification — tiny portable trigger API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const PROJECTILE_MS = 220
const IMPACT_MS = 80
const OPEN_MS = 280
const ENTER_MS = PROJECTILE_MS + IMPACT_MS + OPEN_MS // 580
const EXIT_MS = 320

let busy = false
let settled = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-truth-shot]')
}

function clearMotionClasses(root) {
  root.classList.remove(
    'truth-shot--fire',
    'truth-shot--impact',
    'truth-shot--open',
    'truth-shot--settled',
    'truth-shot--exit',
    'truth-shot--reduced',
  )
}

/**
 * Fire the truth-shot sequence. Reuses the existing DOM node.
 * @returns {Promise<void>}
 */
export function fireTruthShot() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  settled = false
  clearMotionClasses(root)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('truth-shot--reduced', 'truth-shot--settled')
    busy = false
    settled = true
    return Promise.resolve()
  }

  root.classList.add('truth-shot--fire')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.add('truth-shot--impact')
    }, PROJECTILE_MS)

    window.setTimeout(() => {
      root.classList.remove('truth-shot--fire')
      root.classList.add('truth-shot--open')
    }, PROJECTILE_MS + IMPACT_MS)

    window.setTimeout(() => {
      root.classList.remove('truth-shot--impact', 'truth-shot--open')
      root.classList.add('truth-shot--settled')
      busy = false
      settled = true
      resolve()
    }, ENTER_MS)
  })
}

/**
 * Collapse and exit the card to the right.
 * @returns {Promise<void>}
 */
export function dismissTruthShot() {
  const root = rootEl()
  if (!root || busy || !settled) return Promise.resolve()

  busy = true
  settled = false

  if (prefersReducedMotion()) {
    clearMotionClasses(root)
    busy = false
    return Promise.resolve()
  }

  root.classList.remove('truth-shot--settled', 'truth-shot--reduced')
  root.classList.add('truth-shot--exit')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      clearMotionClasses(root)
      busy = false
      resolve()
    }, EXIT_MS)
  })
}

/**
 * Dismiss (if settled) then fire again — no DOM accumulation.
 * @returns {Promise<void>}
 */
export async function replayTruthShot() {
  if (busy) return
  if (settled) await dismissTruthShot()
  await fireTruthShot()
}

function bindUi() {
  document.querySelector('[data-truth-shot-replay]')?.addEventListener('click', () => {
    void replayTruthShot()
  })

  document.querySelector('[data-truth-shot-dismiss]')?.addEventListener('click', () => {
    if (settled && !busy) void dismissTruthShot()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTruthShot()
  })
}

bindUi()
void fireTruthShot()
