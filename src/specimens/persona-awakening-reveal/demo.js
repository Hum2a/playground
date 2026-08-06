/**
 * Persona Awakening Reveal — tiny portable awaken API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Contained identity → pressure → fracture → revelation → still empowered state.
 */

const FRACTURE_AT = 180
const BREACH_AT = 360
const SEPARATE_AT = 420
const SETTLE_AT = 720
const TOTAL_MS = 1000

/** @type {number[]} */
let timers = []
let busy = false
let awakened = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-persona-awakening]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = document.querySelector('[data-par-status]')
  if (el) el.textContent = text
}

function setCopy(awakenedState) {
  const title = document.querySelector('[data-par-title]')
  const sig = document.querySelector('[data-par-sig]')
  if (title) title.textContent = awakenedState ? 'AWAKENED' : 'UNKNOWN'
  if (sig) sig.textContent = awakenedState ? 'SIGNATURE // BLUE' : 'SIGNATURE // ???'
}

function setAwakenEnabled(on) {
  const btn = document.querySelector('[data-par-awaken]')
  if (!btn) return
  btn.disabled = !on
}

function setFrameAria(on) {
  const frame = document.querySelector('[data-par-frame]')
  if (frame) frame.setAttribute('aria-hidden', on ? 'false' : 'true')
}

export function resetPersonaAwakening() {
  clearTimers()
  busy = false
  awakened = false
  setCopy(false)
  setPhase('idle')
  setFrameAria(false)
  setStatus('Identity unknown.')
  setAwakenEnabled(true)
}

/**
 * Run the awakening sequence once.
 * @returns {Promise<void>}
 */
export function runPersonaAwakening() {
  const root = rootEl()
  if (!root || busy || awakened) return Promise.resolve()

  busy = true
  clearTimers()
  setAwakenEnabled(false)
  setPhase('idle')
  void root.offsetWidth

  // Awakened copy exists underneath before the shell clears.
  setCopy(true)

  if (prefersReducedMotion()) {
    setPhase('settled')
    setFrameAria(true)
    setStatus('Identity awakened. Signature Blue.')
    awakened = true
    busy = false
    return Promise.resolve()
  }

  setPhase('pressure')

  return new Promise((resolve) => {
    later(FRACTURE_AT, () => {
      setPhase('fracture')
    })

    later(BREACH_AT, () => {
      setPhase('breach')
    })

    later(SEPARATE_AT, () => {
      setPhase('separate')
      setStatus('Identity awakened. Signature Blue.')
      setFrameAria(true)
    })

    later(SETTLE_AT, () => {
      setPhase('settled')
    })

    later(TOTAL_MS, () => {
      awakened = true
      busy = false
      resolve()
    })
  })
}

/** @returns {Promise<void>} */
export async function replayPersonaAwakening() {
  if (busy) return
  resetPersonaAwakening()
  void rootEl()?.offsetWidth
  await runPersonaAwakening()
}

function bindUi() {
  document.querySelectorAll('[data-par-awaken]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runPersonaAwakening()
    })
  })

  document.querySelectorAll('[data-par-reset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      resetPersonaAwakening()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayPersonaAwakening()
  })
}

bindUi()
resetPersonaAwakening()
