/**
 * Permission Rejection — tiny portable denied-attempt feedback API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * The OPEN ARCHIVE control stays logically unavailable; this only demos rejection.
 */

const ATTEMPT_MS = 80
const COLLIDE_MS = 60
const RECOIL_MS = 140
const DENIED_HOLD_MS = 800
const CLEAR_MS = 160
const RM_HOLD_MS = 900

/** @type {number[]} */
let timers = []
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-permission-rejection]')
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
  const el = document.querySelector('[data-pr-status]')
  if (el) el.textContent = text
}

function setDeniedAria(visible) {
  const el = document.querySelector('[data-pr-denied]')
  if (el) el.setAttribute('aria-hidden', visible ? 'false' : 'true')
}

export function resetPermissionRejection() {
  clearTimers()
  busy = false
  setPhase('idle')
  setDeniedAria(false)
  setStatus('Admin Archive is restricted.')
}

/**
 * Run one rejection sequence. Does not unlock the action.
 * @returns {Promise<void>}
 */
export function runPermissionRejection() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  busy = true
  clearTimers()
  setPhase('idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('hold')
    setDeniedAria(true)
    setStatus('Access denied. Admin Archive is restricted.')
    return new Promise((resolve) => {
      later(RM_HOLD_MS, () => {
        setPhase('idle')
        setDeniedAria(false)
        setStatus('Admin Archive is restricted.')
        busy = false
        resolve()
      })
    })
  }

  setPhase('attempt')

  return new Promise((resolve) => {
    later(ATTEMPT_MS, () => {
      setPhase('collide')
      setDeniedAria(true)
      setStatus('Access denied. Admin Archive is restricted.')
    })

    later(ATTEMPT_MS + COLLIDE_MS, () => {
      setPhase('recoil')
    })

    later(ATTEMPT_MS + COLLIDE_MS + RECOIL_MS, () => {
      setPhase('hold')
    })

    later(ATTEMPT_MS + COLLIDE_MS + RECOIL_MS + DENIED_HOLD_MS, () => {
      setPhase('clear')
    })

    later(
      ATTEMPT_MS + COLLIDE_MS + RECOIL_MS + DENIED_HOLD_MS + CLEAR_MS,
      () => {
        setPhase('idle')
        setDeniedAria(false)
        setStatus('Admin Archive is restricted.')
        busy = false
        resolve()
      },
    )
  })
}

/** @returns {Promise<void>} */
export async function replayPermissionRejection() {
  if (busy) return
  resetPermissionRejection()
  void rootEl()?.offsetWidth
  await runPermissionRejection()
}

function bindUi() {
  document.querySelectorAll('[data-pr-try]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runPermissionRejection()
    })
  })

  document.querySelectorAll('[data-pr-reset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      resetPermissionRejection()
    })
  })

  document.querySelectorAll('[data-pr-action]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault()
      void runPermissionRejection()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayPermissionRejection()
  })
}

bindUi()
resetPermissionRejection()
