/**
 * Redacted Content Lock — tiny portable lock/unlock demo API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Visual overlay is not a security boundary; action stays disabled while locked.
 */

const LOCK_MS = 520
const UNLOCK_MS = 360

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
  return document.querySelector('[data-redacted-lock]')
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

function setStatus(text) {
  const el = document.querySelector('[data-rcl-status]')
  if (el) el.textContent = text
}

function setActionLocked(locked) {
  const btn = document.querySelector('[data-rcl-action]')
  if (!btn) return
  btn.disabled = locked
  btn.setAttribute('aria-disabled', locked ? 'true' : 'false')
}

function setContentA11y(locked) {
  const content = document.querySelector('[data-rcl-content]')
  if (content) content.setAttribute('aria-hidden', locked ? 'true' : 'false')
}

function applySettled(locked) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-state', locked ? 'locked' : 'unlocked')
  setActionLocked(locked)
  setContentA11y(locked)
  setStatus(
    locked
      ? 'Advanced Typescript. Restricted content.'
      : 'Advanced Typescript lesson available.',
  )
}

/** @returns {Promise<void>} */
export function lockRedactedContent() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (root.getAttribute('data-state') === 'locked') return Promise.resolve()

  busy = true
  clearTimers()

  if (prefersReducedMotion()) {
    applySettled(true)
    busy = false
    return Promise.resolve()
  }

  root.setAttribute('data-state', 'locking')
  setActionLocked(true)
  setContentA11y(true)
  setStatus('Advanced Typescript. Restricted content.')

  return new Promise((resolve) => {
    later(LOCK_MS, () => {
      applySettled(true)
      busy = false
      resolve()
    })
  })
}

/** @returns {Promise<void>} */
export function unlockRedactedContent() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (root.getAttribute('data-state') === 'unlocked') return Promise.resolve()

  busy = true
  clearTimers()

  if (prefersReducedMotion()) {
    applySettled(false)
    busy = false
    return Promise.resolve()
  }

  root.setAttribute('data-state', 'unlocking')

  return new Promise((resolve) => {
    later(UNLOCK_MS, () => {
      applySettled(false)
      busy = false
      resolve()
    })
  })
}

/** @returns {Promise<void>} */
export async function replayRedactedContentLock() {
  if (busy) return
  applySettled(false)
  void rootEl()?.offsetWidth
  await lockRedactedContent()
}

function bindUi() {
  document.querySelectorAll('[data-rcl-unlock]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void unlockRedactedContent()
    })
  })

  document.querySelectorAll('[data-rcl-lock]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void lockRedactedContent()
    })
  })

  document.querySelectorAll('[data-rcl-action]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      if (btn.disabled || btn.getAttribute('aria-disabled') === 'true') {
        event.preventDefault()
        return
      }
      setStatus('Open lesson activated.')
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayRedactedContentLock()
  })
}

bindUi()
applySettled(true)
