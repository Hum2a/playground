/**
 * Angular Focus Brackets — four comic brackets snap around selected content.
 */

const PRIMARY_MS = 660
const TOTAL_MS = 1310

let busy = false
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

export function resetAngularFocusBrackets() {
  if (timer !== null) window.clearTimeout(timer)
  busy = false
  const el = root()
  if (!el) return
  el.classList.remove('afb--focused', 'afb--locked')
  el.setAttribute('data-phase', 'idle')
  setStatus('Brackets retracted.')
}

export function runAngularFocusBrackets() {
  const el = root()
  if (!el || busy) return Promise.resolve()
  busy = true

  if (prefersReducedMotion()) {
    el.classList.add('afb--focused', 'afb--locked')
    el.setAttribute('data-phase', 'locked')
    setStatus('Focus locked — TARGET READY.')
    busy = false
    return Promise.resolve()
  }

  el.classList.add('afb--focused')
  el.setAttribute('data-phase', 'focusing')
  setStatus('Brackets snapping in…')

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      el.classList.add('afb--locked')
      el.setAttribute('data-phase', 'locked')
      setStatus('Focus locked — TARGET READY.')
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
