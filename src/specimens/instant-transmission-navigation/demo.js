/**
 * Instant Transmission Navigation — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Lock → collapse → fade → residue → gap → arrive → complete.
 * Session never travels through intervening space.
 */

const LOCK_MS = 140
const COLLAPSE_MS = 100
const FADE_MS = 35
const FRAG_MS = 100
const GAP_MS = 70
const ARRIVE_MS = 150

const COLLAPSE_AT = LOCK_MS
const FADE_AT = COLLAPSE_AT + COLLAPSE_MS
const RESIDUE_AT = FADE_AT + FADE_MS
const GAP_AT = RESIDUE_AT + FRAG_MS
const ARRIVE_AT = GAP_AT + GAP_MS
const COMPLETE_AT = ARRIVE_AT + ARRIVE_MS

let busy = false
let atB = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-instant-nav]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-itn-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setRegionCopy(root, location) {
  const a = root.querySelector('[data-itn-state-a]')
  const b = root.querySelector('[data-itn-state-b]')
  if (location === 'b') {
    if (a) a.textContent = 'VACANT'
    if (b) b.textContent = 'SESSION // 04'
  } else {
    if (a) a.textContent = 'LOCATION A'
    if (b) b.textContent = 'STANDBY'
  }
}

function setBusyUi(root, isBusy) {
  const btn = root.querySelector('[data-itn-transmit]')
  if (btn) btn.disabled = isBusy || atB
}

function applyReducedComplete(root) {
  clearTimers()
  busy = false
  atB = true
  root.classList.add('itn--reduced')
  root.setAttribute('data-state', 'complete')
  root.setAttribute('data-location', 'b')
  setRegionCopy(root, 'b')
  setStatus(root, 'Session 04 at location B.')
  setBusyUi(root, false)
}

/**
 * Transmit SESSION // 04 from A to B with zero-distance relocation.
 * @returns {Promise<void>}
 */
export function transmitInstantNav() {
  const root = rootEl()
  if (!root || busy || atB) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('itn--reduced')
  setBusyUi(root, true)
  setStatus(root, 'SEARCHING')

  if (prefersReducedMotion()) {
    applyReducedComplete(root)
    return Promise.resolve()
  }

  root.setAttribute('data-state', 'lock')
  void root.offsetWidth

  return new Promise((resolve) => {
    later(Math.floor(LOCK_MS * 0.55), () => {
      setStatus(root, 'TARGET LOCKED')
    })

    later(COLLAPSE_AT, () => {
      root.setAttribute('data-state', 'collapse')
    })

    later(FADE_AT, () => {
      root.setAttribute('data-state', 'fade')
    })

    later(RESIDUE_AT, () => {
      root.setAttribute('data-state', 'residue')
    })

    later(GAP_AT, () => {
      root.setAttribute('data-state', 'gap')
    })

    later(ARRIVE_AT, () => {
      root.setAttribute('data-state', 'arrive')
      root.setAttribute('data-location', 'b')
      setRegionCopy(root, 'b')
      setStatus(root, 'Session 04 at location B.')
    })

    later(COMPLETE_AT, () => {
      root.setAttribute('data-state', 'complete')
      atB = true
      busy = false
      setBusyUi(root, false)
      resolve()
    })
  })
}

/**
 * Return SESSION // 04 to region A.
 * @returns {Promise<void>}
 */
export function resetInstantNav() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  atB = false
  root.classList.remove('itn--reduced')
  root.setAttribute('data-state', 'idle')
  root.setAttribute('data-location', 'a')
  setRegionCopy(root, 'a')
  void root.offsetWidth
  setStatus(root, 'Session 04 at location A.')
  setBusyUi(root, false)
  return Promise.resolve()
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-itn-transmit]')?.addEventListener('click', () => {
    void transmitInstantNav()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void resetInstantNav()
    }
  })
}

bind()
