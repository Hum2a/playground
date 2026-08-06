/**
 * SPX-843 Badge Earned
 * Six pieces arrive (stagger 0/35/70/105/140/175ms × 220ms) →
 * lock settle 140ms (−3→2→0 + seam flash) → status EARNED →
 * eight radial lines ~160ms → static.
 *
 * Frozen travel offsets (px):
 *   1:(0,55) 2:(-48,-42) 3:(65,8) 4:(50,48) 5:(12,-58) 6:(-62,20)
 */

const PIECE_MS = 220
const LAST_STAGGER_MS = 175
const LOCK_MS = 140
const RAYS_MS = 160

/** Last piece settles */
const ASSEMBLY_END_MS = LAST_STAGGER_MS + PIECE_MS
/** Lock settle completes */
const LOCK_END_MS = ASSEMBLY_END_MS + LOCK_MS
/** Rays finish; permanent static */
const TOTAL_MS = LOCK_END_MS + RAYS_MS

const PHASES = ['be--assembling', 'be--lock', 'be--earned']

let busy = false
let earned = false
/** @type {number[]} */
let timers = []
let bound = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
      'true' ||
    Boolean(document.querySelector('[data-force-reduced-motion="true"]'))
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-badge-earned]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setTriggers({ go, reset }) {
  const root = rootEl()
  if (!root) return
  const goBtn = root.querySelector('[data-be-complete]')
  const resetBtn = root.querySelector('[data-be-reset]')
  if (goBtn) {
    goBtn.disabled = !go
    goBtn.hidden = !go
  }
  if (resetBtn) {
    resetBtn.disabled = !reset
    resetBtn.hidden = !reset
  }
}

function setCopy(root, isEarned) {
  const sr = root.querySelector('[data-be-sr]')
  const live = root.querySelector('[data-be-live]')
  if (isEarned) {
    if (sr) {
      sr.textContent =
        'VECTOR TRIAL achievement earned. Badge permanently assembled.'
    }
    if (live) {
      live.textContent =
        'VECTOR TRIAL earned. The abstract badge is permanently assembled.'
    }
  } else {
    if (sr) {
      sr.textContent = 'VECTOR TRIAL achievement incomplete. Badge locked.'
    }
    if (live) {
      live.textContent =
        'VECTOR TRIAL incomplete. Press COMPLETE TRIAL to earn the badge.'
    }
  }
}

function applyIdle(root) {
  clearTimers()
  busy = false
  earned = false
  root.classList.remove(...PHASES, 'be--reduced')
  root.setAttribute('data-state', 'idle')
  setCopy(root, false)
  setTriggers({ go: true, reset: false })
}

function applyEarnedImmediate(root) {
  clearTimers()
  busy = false
  earned = true
  root.classList.remove(...PHASES)
  root.classList.add('be--reduced')
  root.setAttribute('data-state', 'reduced')
  setCopy(root, true)
  setTriggers({ go: false, reset: true })
}

/**
 * Run badge assembly choreography.
 * @returns {Promise<void>}
 */
export function completeTrial() {
  const root = rootEl()
  if (!root || busy || earned) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove(...PHASES, 'be--reduced')
  setTriggers({ go: false, reset: false })
  setCopy(root, false)

  if (prefersReducedMotion()) {
    applyEarnedImmediate(root)
    return Promise.resolve()
  }

  root.setAttribute('data-state', 'assembling')
  root.classList.add('be--assembling')
  void root.offsetWidth

  return new Promise((resolve) => {
    later(ASSEMBLY_END_MS, () => {
      root.classList.remove('be--assembling')
      root.classList.add('be--lock')
      root.setAttribute('data-state', 'lock')
    })

    later(LOCK_END_MS, () => {
      root.classList.remove('be--lock')
      root.classList.add('be--earned')
      root.setAttribute('data-state', 'earned')
      earned = true
      setCopy(root, true)
    })

    later(TOTAL_MS, () => {
      busy = false
      setTriggers({ go: false, reset: true })
      resolve()
    })
  })
}

/**
 * Restore incomplete / locked outline.
 * @returns {void}
 */
export function resetBadgeEarned() {
  const root = rootEl()
  if (!root) return
  applyIdle(root)
}

function bind() {
  if (bound) return
  const root = rootEl()
  if (!root) return
  bound = true

  const go = root.querySelector('[data-be-complete]')
  const reset = root.querySelector('[data-be-reset]')
  if (go) go.addEventListener('click', () => completeTrial())
  if (reset) reset.addEventListener('click', () => resetBadgeEarned())
}

export const badgeEarned = {
  complete: completeTrial,
  reset: resetBadgeEarned,
}

if (typeof window !== 'undefined') {
  window.badgeEarned = badgeEarned
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true })
  } else {
    bind()
  }
}
