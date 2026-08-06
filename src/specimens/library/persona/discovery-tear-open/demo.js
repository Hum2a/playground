/**
 * Discovery Tear-Open — tiny portable reveal API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const LIFT_MS = 160
const GROW_END_MS = 520
const SPLIT_END_MS = 760
const SECRET_POP_MS = 700
const TOTAL_MS = 780

const PHASES = [
  'discovery-tear--lift',
  'discovery-tear--grow',
  'discovery-tear--split',
  'discovery-tear--revealed',
  'discovery-tear--reduced',
]

let busy = false
let revealed = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-discovery-tear]')
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

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(text) {
  const el = document.querySelector('[data-discovery-tear-status]')
  if (el) el.textContent = text
}

function setSecretAvailable(on) {
  const secret = document.querySelector('[data-discovery-tear-secret]')
  if (!secret) return
  secret.setAttribute('aria-hidden', on ? 'false' : 'true')
}

function setTriggerEnabled(on) {
  const btn = document.querySelector('[data-discovery-tear-trigger]')
  if (!btn) return
  btn.disabled = !on
  btn.tabIndex = on ? 0 : -1
}

/**
 * Tear open the surface to reveal the secret.
 * @returns {Promise<void>}
 */
export function openDiscoveryTear() {
  const root = rootEl()
  if (!root || busy || revealed) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('discovery-tear--reduced', 'discovery-tear--revealed')
    revealed = true
    setSecretAvailable(true)
    setTriggerEnabled(false)
    setStatus('Secret specimen revealed')
    busy = false
    return Promise.resolve()
  }

  root.classList.add('discovery-tear--lift')
  setStatus('Tearing open')

  return new Promise((resolve) => {
    later(LIFT_MS, () => {
      root.classList.remove('discovery-tear--lift')
      root.classList.add('discovery-tear--grow')
    })

    later(GROW_END_MS, () => {
      root.classList.remove('discovery-tear--grow')
      root.classList.add('discovery-tear--split')
    })

    later(SECRET_POP_MS, () => {
      root.classList.add('discovery-tear--pop')
    })

    later(SPLIT_END_MS, () => {
      root.classList.remove('discovery-tear--pop')
      root.classList.add('discovery-tear--revealed')
      revealed = true
      setSecretAvailable(true)
      setTriggerEnabled(false)
      setStatus('Secret specimen revealed')
      busy = false
      resolve()
    })
  })
}

/**
 * Restore the intact surface.
 */
export function resetDiscoveryTear() {
  const root = rootEl()
  if (!root) return

  clearTimers()
  busy = false
  revealed = false
  clearPhases(root)
  root.classList.remove('discovery-tear--pop')
  setSecretAvailable(false)
  setTriggerEnabled(true)
  setStatus('Surface intact')
}

function bindUi() {
  document.querySelector('[data-discovery-tear-trigger]')?.addEventListener('click', () => {
    void openDiscoveryTear()
  })

  document.querySelector('[data-discovery-tear-reset]')?.addEventListener('click', () => {
    resetDiscoveryTear()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetDiscoveryTear()
  })
}

bindUi()
resetDiscoveryTear()
