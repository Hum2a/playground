/**
 * Episode Title Card Interrupt — stark finite title-card reveal.
 */

const PRIMARY_MS = 420
const TOTAL_MS = 1070

let busy = false
let timer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-episode-title-card-interrupt]')
}

function setStatus(text) {
  const el = document.querySelector('[data-etic-status]')
  if (el) el.textContent = text
}

export function resetEpisodeTitleCardInterrupt() {
  if (timer !== null) window.clearTimeout(timer)
  busy = false
  const el = root()
  const card = document.querySelector('[data-etic-card]')
  if (!el || !card) return
  el.classList.remove('etic--interrupt', 'etic--hold', 'etic--done')
  el.setAttribute('data-phase', 'idle')
  card.setAttribute('aria-hidden', 'true')
  setStatus('Application running.')
}

export function runEpisodeTitleCardInterrupt() {
  const el = root()
  const card = document.querySelector('[data-etic-card]')
  if (!el || !card || busy) return Promise.resolve()
  busy = true

  if (prefersReducedMotion()) {
    el.classList.add('etic--interrupt', 'etic--hold', 'etic--done')
    el.setAttribute('data-phase', 'interrupted')
    card.setAttribute('aria-hidden', 'false')
    setStatus('Title card: OUTPUT MAXIMUM.')
    busy = false
    return Promise.resolve()
  }

  el.classList.add('etic--interrupt')
  el.setAttribute('data-phase', 'interrupting')
  setStatus('State paused for title card…')

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      el.classList.add('etic--hold')
      card.setAttribute('aria-hidden', 'false')
      el.setAttribute('data-phase', 'interrupted')
      setStatus('Title card: OUTPUT MAXIMUM.')
      window.setTimeout(() => {
        el.classList.add('etic--done')
        busy = false
        timer = null
        resolve()
      }, TOTAL_MS - PRIMARY_MS)
    }, PRIMARY_MS)
  })
}

function bind() {
  document.querySelector('[data-etic-trigger]')?.addEventListener('click', () => {
    if (root()?.classList.contains('etic--done')) {
      resetEpisodeTitleCardInterrupt()
      return
    }
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
