/**
 * Badge Case Insert — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Targets slot 6, docks an incoming badge, then updates 5/8 → 6/8.
 */

const TARGET_MS = 100
const TRAVEL_MS = 320
const DOCK_MS = 180
const PROGRESS_MS = 200

const PHASES = [
  'bci--target',
  'bci--travel',
  'bci--dock',
  'bci--progress',
]

let busy = false
let stored = false
/** @type {number[]} */
let timers = []
let bound = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-badge-case]')
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

function setTriggers({ go, reset }) {
  const root = rootEl()
  if (!root) return
  const goBtn = root.querySelector('[data-bci-store]')
  const resetBtn = root.querySelector('[data-bci-reset]')
  if (goBtn) {
    goBtn.disabled = !go
    goBtn.hidden = !go
  }
  if (resetBtn) {
    resetBtn.disabled = !reset
    resetBtn.hidden = !reset
  }
}

function setCopy(root, isStored) {
  const sr = root.querySelector('[data-bci-sr]')
  const live = root.querySelector('[data-bci-live]')
  const target = root.querySelector('[data-bci-target]')
  if (isStored) {
    if (sr) sr.textContent = 'Trial archive 6 of 8 occupied. Slot 6 filled.'
    if (live) live.textContent = 'Trial archive 6 of 8. Badge stored in slot 6.'
    if (target) target.setAttribute('aria-label', 'Slot 6 occupied')
    root.setAttribute('data-count', '6')
  } else {
    if (sr) sr.textContent = 'Trial archive 5 of 8 occupied. Slot 6 empty.'
    if (live) live.textContent = 'Trial archive 5 of 8. Badge ready to store.'
    if (target) target.setAttribute('aria-label', 'Slot 6 empty target')
    root.setAttribute('data-count', '5')
  }
}

function resetIncoming(root) {
  const incoming = root.querySelector('[data-bci-incoming]')
  if (!incoming) return
  incoming.style.transition = 'none'
  incoming.style.transform = 'translate(0px, 0px) scale(1.25)'
  incoming.style.opacity = '1'
  void incoming.offsetWidth
}

function travelIncoming(root) {
  const incoming = root.querySelector('[data-bci-incoming]')
  const slot = root.querySelector('[data-bci-target]')
  if (!incoming || !slot) return

  const a = incoming.getBoundingClientRect()
  const b = slot.getBoundingClientRect()
  const dx = b.left + b.width / 2 - (a.left + a.width / 2)
  const dy = b.top + b.height / 2 - (a.top + a.height / 2)

  incoming.style.transition = `transform ${TRAVEL_MS}ms cubic-bezier(0.25, 0.1, 0.3, 1)`
  incoming.style.transform = `translate(${dx}px, ${dy}px) scale(0.78)`
}

function applyStored(root) {
  clearTimers()
  clearPhases(root)
  root.classList.add('bci--progress')
  root.setAttribute('data-state', 'stored')
  const incoming = root.querySelector('[data-bci-incoming]')
  if (incoming) {
    incoming.style.opacity = '0'
    incoming.style.transition = 'none'
  }
  stored = true
  busy = false
  setTriggers({ go: false, reset: true })
  setCopy(root, true)
}

function applyIdle(root) {
  clearTimers()
  clearPhases(root)
  root.setAttribute('data-state', 'idle')
  resetIncoming(root)
  stored = false
  busy = false
  setTriggers({ go: true, reset: false })
  setCopy(root, false)
}

/**
 * Store badge into slot 6.
 * @returns {Promise<void>}
 */
export function storeBadge() {
  const root = rootEl()
  if (!root) return Promise.resolve()
  if (busy || stored) return Promise.resolve()

  if (prefersReducedMotion()) {
    applyStored(root)
    return Promise.resolve()
  }

  busy = true
  clearPhases(root)
  resetIncoming(root)
  root.setAttribute('data-state', 'running')
  setTriggers({ go: false, reset: false })
  const live = root.querySelector('[data-bci-live]')
  if (live) live.textContent = 'Targeting slot 6.'

  // 1. Target markers
  root.classList.add('bci--target')

  return new Promise((resolve) => {
    later(TARGET_MS, () => {
      // 2. Travel (progress still 5/8)
      if (live) live.textContent = 'Inserting badge into slot 6.'
      root.classList.add('bci--travel')
      travelIncoming(root)

      later(TRAVEL_MS, () => {
        // 3. Dock compress + slot frame; hide flyer, show docked
        root.classList.remove('bci--target')
        root.classList.add('bci--dock')
        const incoming = root.querySelector('[data-bci-incoming]')
        if (incoming) {
          incoming.style.opacity = '0'
          incoming.style.transition = 'none'
        }

        later(DOCK_MS, () => {
          // 4. Progress updates only after docking
          root.classList.add('bci--progress')
          if (live) live.textContent = 'Trial archive 6 of 8. Badge stored in slot 6.'

          later(PROGRESS_MS, () => {
            applyStored(root)
            resolve()
          })
        })
      })
    })
  })
}

/**
 * Restore 5/8 empty slot 6 state.
 * @returns {void}
 */
export function resetBadgeCase() {
  const root = rootEl()
  if (!root) return
  applyIdle(root)
}

function bind() {
  if (bound) return
  const root = rootEl()
  if (!root) return
  bound = true

  const go = root.querySelector('[data-bci-store]')
  const reset = root.querySelector('[data-bci-reset]')
  if (go) go.addEventListener('click', () => storeBadge())
  if (reset) reset.addEventListener('click', () => resetBadgeCase())
}

export const badgeCaseInsert = {
  store: storeBadge,
  reset: resetBadgeCase,
}

if (typeof window !== 'undefined') {
  window.badgeCaseInsert = badgeCaseInsert
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true })
  } else {
    bind()
  }
}
