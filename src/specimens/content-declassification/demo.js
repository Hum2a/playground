/**
 * Content Declassification — tiny portable API.
 * Visual redaction is NOT access control. Production must enforce permissions
 * outside CSS / client markup. Sandbox-safe (no parent / storage / network).
 */

const STAMP_MS = 260
const SLASH_MS = 90
const LEAVE_MS = 180
const STAGGER_MS = 130
const ACCEPTED_MS = 160
/** Stamp 0–260; bars begin 260 + n*130; last leave ends ~1050; accepted ~1210; total ≈1380 */
const TOTAL_MS = 1380

const BEHAVIOURS = ['split', 'strike', 'peel', 'split', 'strike']

/** @type {number[]} */
let timers = []
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function root() {
  return document.querySelector('[data-content-declass]')
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
  const el = document.querySelector('[data-cdc-status]')
  if (el) el.textContent = text
}

function censors(el) {
  return Array.from(el.querySelectorAll('[data-cdc-censor]'))
}

function resetCensors(el) {
  censors(el).forEach((node, i) => {
    node.classList.remove('is-striking', 'is-removing', 'is-clear')
    node.setAttribute('data-behaviour', BEHAVIOURS[i] ?? 'split')
  })
}

function setSheetA11y(revealed) {
  const sheet = document.querySelector('[data-cdc-sheet]')
  if (sheet) sheet.setAttribute('aria-hidden', revealed ? 'false' : 'true')
}

function setGrantEnabled(on) {
  const btn = document.querySelector('[data-cdc-grant]')
  if (!btn) return
  btn.disabled = !on
}

function applyLocked() {
  const el = root()
  if (!el) return
  el.setAttribute('data-state', 'locked')
  resetCensors(el)
  setSheetA11y(false)
  setGrantEnabled(true)
  setStatus('Classified archive document. Five fields restricted.')
}

function applyCleared() {
  const el = root()
  if (!el) return
  el.setAttribute('data-state', 'cleared')
  censors(el).forEach((node) => {
    node.classList.remove('is-striking', 'is-removing')
    node.classList.add('is-clear')
  })
  setSheetA11y(true)
  setGrantEnabled(false)
  setStatus(
    'Archive document 042 declassified. Project Nightfall approved. Access level internal.',
  )
}

function revealBar(node, behaviour) {
  const needsSlash = behaviour === 'strike' || behaviour === 'split'

  return new Promise((resolve) => {
    if (needsSlash) {
      node.classList.add('is-striking')
      later(SLASH_MS, () => {
        node.classList.remove('is-striking')
        node.classList.add('is-removing')
        later(LEAVE_MS, () => {
          node.classList.remove('is-removing')
          node.classList.add('is-clear')
          resolve()
        })
      })
    } else {
      node.classList.add('is-removing')
      later(LEAVE_MS, () => {
        node.classList.remove('is-removing')
        node.classList.add('is-clear')
        resolve()
      })
    }
  })
}

/**
 * Run declassification sequence.
 * @returns {Promise<void>}
 */
export function grantClearance() {
  const el = root()
  if (!el || busy) return Promise.resolve()
  if (el.getAttribute('data-state') === 'cleared') return Promise.resolve()

  busy = true
  clearTimers()
  setGrantEnabled(false)

  if (prefersReducedMotion()) {
    applyCleared()
    busy = false
    return Promise.resolve()
  }

  resetCensors(el)
  el.setAttribute('data-state', 'stamping')
  setSheetA11y(false)
  setStatus('Clearance granted. Declassifying archive document…')

  return new Promise((resolve) => {
    later(STAMP_MS, () => {
      el.setAttribute('data-state', 'revealing')
      const list = censors(el)

      list.forEach((node, i) => {
        const behaviour = BEHAVIOURS[i] ?? 'split'
        const start = i * STAGGER_MS
        later(start, () => {
          void revealBar(node, behaviour)
        })
      })

      const lastDuration =
        (BEHAVIOURS[4] === 'peel' ? LEAVE_MS : SLASH_MS + LEAVE_MS)
      const sequenceEnd = 4 * STAGGER_MS + lastDuration

      later(sequenceEnd, () => {
        el.setAttribute('data-state', 'cleared')
        setSheetA11y(true)
        setStatus(
          'Archive document 042 declassified. Project Nightfall approved. Access level internal.',
        )
        later(ACCEPTED_MS, () => {
          busy = false
          resolve()
        })
      })
    })
  })
}

/**
 * Restore all five redactions and stamp to the locked demo state.
 */
export function resetContentDeclassification() {
  const el = root()
  if (!el) return
  busy = false
  clearTimers()

  if (prefersReducedMotion()) {
    applyCleared()
    return
  }

  applyLocked()
}

function bind() {
  document.querySelector('[data-cdc-grant]')?.addEventListener('click', () => {
    void grantClearance()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetContentDeclassification()
  })
}

bind()

if (prefersReducedMotion()) {
  applyCleared()
} else {
  applyLocked()
}

void TOTAL_MS
