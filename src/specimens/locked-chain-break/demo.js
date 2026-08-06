/**
 * Locked Chain Break — tiny portable unlock API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const TENSION_MS = 180
const FRACTURE_MS = 300
const RECOIL_START_MS = 260
const RECOIL_END_MS = 560
const LABEL_SLASH_MS = 280
const LABEL_EXIT_MS = 240
const TOTAL_MS = RECOIL_END_MS + 40

const PHASES = [
  'locked-chain--tension',
  'locked-chain--fracture',
  'locked-chain--recoil',
  'locked-chain--slash',
  'locked-chain--label-exit',
  'locked-chain--unlocked',
  'locked-chain--reduced',
]

let busy = false
let unlocked = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-locked-chain]')
}

function hostEl() {
  return document.querySelector('[data-locked-chain-host]')
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
  const el = document.querySelector('[data-locked-chain-status]')
  if (el) el.textContent = text
}

function setActionEnabled(enabled) {
  const btn = document.querySelector('[data-locked-chain-action]')
  if (!btn) return
  btn.disabled = !enabled
}

function setGrantedVisible(on) {
  const el = document.querySelector('[data-locked-chain-granted]')
  if (!el) return
  el.setAttribute('aria-hidden', on ? 'false' : 'true')
}

function setUnlockedUi(on) {
  hostEl()?.classList.toggle('locked-chain-demo__card--unlocked', on)
  const content = document.querySelector('[data-locked-chain-content]')
  content?.classList.toggle('locked-chain-demo__content--revealed', on)
  setGrantedVisible(on)
}

/**
 * Run the chain-break unlock sequence.
 * @returns {Promise<void>}
 */
export function breakLockedChain() {
  const root = rootEl()
  if (!root || busy || unlocked) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.hidden = false
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('locked-chain--reduced', 'locked-chain--unlocked')
    root.hidden = true
    unlocked = true
    setUnlockedUi(true)
    setStatus('Access granted. Advanced Material unlocked.')
    setActionEnabled(true)
    busy = false
    return Promise.resolve()
  }

  root.classList.add('locked-chain--tension')

  return new Promise((resolve) => {
    later(TENSION_MS, () => {
      root.classList.remove('locked-chain--tension')
      root.classList.add('locked-chain--fracture')
    })

    later(RECOIL_START_MS, () => {
      root.classList.add('locked-chain--recoil')
    })

    later(LABEL_SLASH_MS, () => {
      root.classList.add('locked-chain--slash', 'locked-chain--label-exit')
    })

    later(FRACTURE_MS, () => {
      root.classList.remove('locked-chain--fracture')
    })

    later(TOTAL_MS, () => {
      root.classList.add('locked-chain--unlocked')
      root.hidden = true
      unlocked = true
      setUnlockedUi(true)
      setStatus('Access granted. Advanced Material unlocked.')
      setActionEnabled(true)
      busy = false
      resolve()
    })
  })
}

/**
 * Restore locked state.
 */
export function resetLockedChain() {
  const root = rootEl()
  if (!root) return

  clearTimers()
  busy = false
  unlocked = false
  clearPhases(root)
  root.hidden = false
  setUnlockedUi(false)
  setActionEnabled(false)
  setStatus('Locked')
}

function bindUi() {
  document.querySelector('[data-locked-chain-grant]')?.addEventListener('click', () => {
    void breakLockedChain()
  })

  document.querySelector('[data-locked-chain-reset]')?.addEventListener('click', () => {
    resetLockedChain()
  })

  document.querySelector('[data-locked-chain-action]')?.addEventListener('click', () => {
    if (unlocked) setStatus('Chapter opened (specimen only).')
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetLockedChain()
  })
}

bindUi()
resetLockedChain()
