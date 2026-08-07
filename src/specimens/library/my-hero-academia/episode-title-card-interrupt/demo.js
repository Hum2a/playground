/**
 * Episode Title Card Interrupt — stark finite title-card reveal.
 */

const PRIMARY_MS = 420
const HOLD_MS = 500
const RESUME_MS = 320

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-episode-title-card-interrupt]')
}

function card() {
  return document.querySelector('[data-etic-card]')
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

function setLive(text) {
  const el = document.querySelector('[data-etic-live]')
  if (el) el.textContent = text
}

function setAppMeta(text) {
  const el = document.querySelector('[data-etic-app-meta]')
  if (el) el.textContent = text
}

export function resetEpisodeTitleCardInterrupt() {
  clearTimers()
  busy = false
  const el = root()
  const c = card()
  if (!el || !c) return
  el.classList.remove('etic--interrupt', 'etic--hold', 'etic--resume')
  el.setAttribute('data-phase', 'idle')
  c.setAttribute('aria-hidden', 'true')
  setAppMeta('Status: ACTIVE — awaiting next directive.')
  setLive('Application running.')
}

function resumeSession() {
  const el = root()
  const c = card()
  if (!el || !c) return
  el.classList.remove('etic--interrupt', 'etic--hold')
  el.classList.add('etic--resume')
  el.setAttribute('data-phase', 'resuming')
  c.setAttribute('aria-hidden', 'true')
  setAppMeta('Status: ACTIVE — awaiting next directive.')
  setLive('Resuming live session…')

  later(RESUME_MS, () => {
    el.classList.remove('etic--resume')
    el.setAttribute('data-phase', 'idle')
    setLive('Application running.')
    busy = false
  })
}

export function runEpisodeTitleCardInterrupt() {
  const el = root()
  const c = card()
  if (!el || !c || busy) return Promise.resolve()
  busy = true
  clearTimers()

  if (prefersReducedMotion()) {
    el.classList.add('etic--interrupt', 'etic--hold')
    el.setAttribute('data-phase', 'interrupted')
    c.setAttribute('aria-hidden', 'false')
    setLive('Title card: OUTPUT MAXIMUM. Application paused.')
    later(HOLD_MS, () => {
      resumeSession()
    })
    return Promise.resolve()
  }

  el.classList.add('etic--interrupt')
  el.setAttribute('data-phase', 'interrupting')
  setLive('Application paused for title card…')

  return new Promise((resolve) => {
    later(PRIMARY_MS, () => {
      el.classList.add('etic--hold')
      c.setAttribute('aria-hidden', 'false')
      el.setAttribute('data-phase', 'interrupted')
      setLive('Title card: OUTPUT MAXIMUM. Application paused.')

      later(HOLD_MS, () => {
        resumeSession()
        later(RESUME_MS, resolve)
      })
    })
  })
}

function bind() {
  document.querySelector('[data-etic-trigger]')?.addEventListener('click', () => {
    if (busy) return
    void runEpisodeTitleCardInterrupt()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetEpisodeTitleCardInterrupt()
    }
  })
}

bind()
resetEpisodeTitleCardInterrupt()
