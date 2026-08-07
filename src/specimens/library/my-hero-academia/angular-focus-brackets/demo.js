/**
 * Angular Focus Brackets — four comic brackets snap around selected content.
 */

const PRIMARY_MS = 660

let busy = false
/** @type {number | null} */
let timer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-angular-focus-brackets]')
}

function setStatus(text) {
  const el = document.querySelector('[data-afb-status]')
  if (el) el.textContent = text
}

function setMeta(text) {
  const el = document.querySelector('[data-afb-meta]')
  if (el) el.textContent = text
}

function applyLocked() {
  const el = root()
  if (!el) return
  el.classList.add('afb--focused', 'afb--locked')
  el.setAttribute('data-phase', 'locked')
  setMeta('LOCK ENGAGED')
  setStatus('Focus locked — TARGET READY.')
}

export function resetAngularFocusBrackets() {
  if (timer !== null) window.clearTimeout(timer)
  timer = null
  busy = false
  const el = root()
  if (!el) return
  el.classList.remove('afb--focused', 'afb--locked')
  el.setAttribute('data-phase', 'idle')
  setMeta('Awaiting focus lock.')
  setStatus('Brackets retracted.')
}

export function runAngularFocusBrackets() {
  const el = root()
  if (!el || busy) return Promise.resolve()
  busy = true

  if (prefersReducedMotion()) {
    applyLocked()
    busy = false
    return Promise.resolve()
  }

  el.classList.add('afb--focused')
  el.setAttribute('data-phase', 'focusing')
  setStatus('Brackets snapping in…')

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      applyLocked()
      busy = false
      timer = null
      resolve()
    }, PRIMARY_MS)
  })
}

function bind() {
  document.querySelector('[data-afb-trigger]')?.addEventListener('click', () => {
    if (root()?.classList.contains('afb--locked')) {
      resetAngularFocusBrackets()
      return
    }
    void runAngularFocusBrackets()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetAngularFocusBrackets()
    }
  })
}

bind()
