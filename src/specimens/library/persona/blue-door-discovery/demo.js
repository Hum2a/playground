/**
 * Blue Door Discovery — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timing from INSPECT (ms):
 *   0–180    clue brighten + vertical seam grow both ways
 *   180–360  impossible seam (side lines + ±3px content shift)
 *   320–500  door definition
 *   480–820  doors open; secret settles; DISCOVERED ~735 (≈75% open)
 */

const SEAM_AT = 180
const DEFINE_AT = 320
const OPEN_AT = 480
const MARKER_AT = 735
const OPEN_END = 820
const CLOSE_MS = 420

const PHASES = [
  'bdd--clue',
  'bdd--seam',
  'bdd--define',
  'bdd--open',
  'bdd--marker',
  'bdd--opened',
  'bdd--closing',
  'bdd--busy',
]

let busy = false
let discovered = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-blue-door-discovery]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-bdd-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setSemanticOpen(root, open) {
  const secret = root.querySelector('[data-bdd-secret]')
  const inspect = root.querySelector('[data-bdd-inspect]')
  const enter = root.querySelector('[data-bdd-enter]')
  const close = root.querySelector('[data-bdd-close]')

  if (open) {
    secret?.removeAttribute('aria-hidden')
    inspect?.setAttribute('tabindex', '-1')
    enter?.removeAttribute('tabindex')
    close?.removeAttribute('tabindex')
    close?.focus({ preventScroll: true })
  } else {
    secret?.setAttribute('aria-hidden', 'true')
    inspect?.removeAttribute('tabindex')
    enter?.setAttribute('tabindex', '-1')
    close?.setAttribute('tabindex', '-1')
    inspect?.focus({ preventScroll: true })
  }
}

/**
 * Run discovery from the ordinary surface.
 * @returns {Promise<void>}
 */
export function runBlueDoorDiscover() {
  const root = rootEl()
  if (!root || busy || discovered) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.classList.add('bdd--busy')
  root.setAttribute('data-state', 'discovering')
  setStatus(root, '')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('bdd--opened')
    root.setAttribute('data-state', 'opened')
    discovered = true
    busy = false
    setSemanticOpen(root, true)
    setStatus(root, 'Hidden specimen discovered.')
    return Promise.resolve()
  }

  root.classList.add('bdd--clue')

  return new Promise((resolve) => {
    later(SEAM_AT, () => {
      root.classList.add('bdd--seam')
    })

    later(DEFINE_AT, () => {
      root.classList.add('bdd--define')
    })

    later(OPEN_AT, () => {
      root.classList.remove('bdd--clue', 'bdd--seam', 'bdd--define')
      root.classList.add('bdd--open')
    })

    later(MARKER_AT, () => {
      root.classList.add('bdd--marker')
    })

    later(OPEN_END, () => {
      root.classList.remove('bdd--open', 'bdd--marker', 'bdd--busy')
      root.classList.add('bdd--opened')
      root.setAttribute('data-state', 'opened')
      discovered = true
      busy = false
      setSemanticOpen(root, true)
      setStatus(root, 'Hidden specimen discovered.')
      resolve()
    })
  })
}

/**
 * Close doorway and restore ordinary surface + subtle clue.
 * @returns {Promise<void>}
 */
export function runBlueDoorClose() {
  const root = rootEl()
  if (!root || busy || !discovered) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.classList.add('bdd--busy', 'bdd--opened', 'bdd--closing')
  root.setAttribute('data-state', 'closing')
  setStatus(root, '')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    clearPhases(root)
    root.setAttribute('data-state', 'idle')
    discovered = false
    busy = false
    setSemanticOpen(root, false)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    later(CLOSE_MS, () => {
      clearPhases(root)
      root.setAttribute('data-state', 'idle')
      discovered = false
      busy = false
      setSemanticOpen(root, false)
      resolve()
    })
  })
}

/**
 * Deterministic reset to hidden ordinary surface.
 * @returns {Promise<void>}
 */
export function resetBlueDoorDiscovery() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  discovered = false
  busy = false
  root.setAttribute('data-state', 'idle')
  setStatus(root, '')
  setSemanticOpen(root, false)
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Harness restart.
 * @returns {Promise<void>}
 */
export async function replayBlueDoorDiscovery() {
  if (busy) return
  await resetBlueDoorDiscovery()
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-bdd-inspect]')?.addEventListener('click', () => {
    void runBlueDoorDiscover()
  })

  root.querySelector('[data-bdd-close]')?.addEventListener('click', () => {
    void runBlueDoorClose()
  })

  root.querySelector('[data-bdd-enter]')?.addEventListener('click', () => {
    /* Demo destination — no navigation */
    setStatus(root, 'Hidden specimen discovered.')
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayBlueDoorDiscovery()
  })
}

bindUi()
