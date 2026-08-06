/**
 * Rival Cards Clash — two cards slam into a central diagonal divider.
 * Sandbox-safe (no parent / storage / network).
 */

const PRIMARY_MS = 660
const TOTAL_MS = 1310

let busy = false
let resetTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-rival-cards-clash]')
}

function setStatus(text) {
  const el = document.querySelector('[data-rcc-status]')
  if (el) el.textContent = text
}

export function resetRivalCardsClash() {
  if (resetTimer !== null) window.clearTimeout(resetTimer)
  busy = false
  const el = root()
  if (!el) return
  el.classList.remove('rcc--active', 'rcc--settled')
  el.setAttribute('data-phase', 'idle')
  setStatus('Awaiting rival clash.')
}

export function runRivalCardsClash() {
  const el = root()
  if (!el || busy) return Promise.resolve()
  busy = true

  if (prefersReducedMotion()) {
    el.classList.add('rcc--active', 'rcc--settled')
    el.setAttribute('data-phase', 'ready')
    setStatus('Rivals locked — READY.')
    busy = false
    return Promise.resolve()
  }

  el.classList.remove('rcc--settled')
  el.classList.add('rcc--active')
  el.setAttribute('data-phase', 'clashing')
  setStatus('Cards slamming into divider…')

  return new Promise((resolve) => {
    window.setTimeout(() => {
      el.classList.add('rcc--settled')
      el.setAttribute('data-phase', 'ready')
      setStatus('Rivals locked — READY.')
    }, PRIMARY_MS)

    resetTimer = window.setTimeout(() => {
      busy = false
      resetTimer = null
      resolve()
    }, TOTAL_MS)
  })
}

function bind() {
  document.querySelector('[data-rcc-trigger]')?.addEventListener('click', () => {
    const el = root()
    if (!el) return
    if (el.classList.contains('rcc--settled')) {
      resetRivalCardsClash()
      window.setTimeout(() => void runRivalCardsClash(), 40)
      return
    }
    void runRivalCardsClash()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetRivalCardsClash()
    }
  })
}

bind()
