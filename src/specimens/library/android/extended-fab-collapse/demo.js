/**
 * Extended FAB Collapse — scroll-driven extended→icon-only FAB.
 */

const COLLAPSE_THRESHOLD = 48
const EXPAND_THRESHOLD = 36
const COLLAPSE_MS = 240

let lastScroll = 0
let accumDown = 0
let accumUp = 0
let direction = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-extended-fab-collapse]')
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = document.querySelector('[data-efc-status]')
  if (el) el.textContent = text
}

function bindScroll() {
  const feed = document.querySelector('[data-efc-feed]')
  if (!feed) return

  feed.addEventListener('scroll', () => {
    const y = feed.scrollTop
    const delta = y - lastScroll

    if (delta > 0) {
      if (direction !== 1) {
        direction = 1
        accumDown = 0
        accumUp = 0
      }
      accumDown += delta
      if (accumDown >= COLLAPSE_THRESHOLD && root()?.getAttribute('data-phase') === 'extended') {
        setPhase('collapsed')
        setStatus('FAB collapsed — scroll up to expand.')
        accumDown = 0
      }
    } else if (delta < 0) {
      if (direction !== -1) {
        direction = -1
        accumDown = 0
        accumUp = 0
      }
      accumUp += -delta
      if (accumUp >= EXPAND_THRESHOLD && root()?.getAttribute('data-phase') === 'collapsed') {
        setPhase('extended')
        setStatus('FAB extended — scroll down to collapse.')
        accumUp = 0
      }
    }

    if (y <= 0) {
      setPhase('extended')
      accumDown = 0
      accumUp = 0
    }

    lastScroll = y
  })
}

bindScroll()

export function resetExtendedFabCollapse() {
  const feed = document.querySelector('[data-efc-feed]')
  if (feed) feed.scrollTop = 0
  lastScroll = 0
  accumDown = 0
  accumUp = 0
  direction = 0
  setPhase('extended')
  setStatus('Scroll down to collapse FAB.')
}

export const EXTENDED_FAB_COLLAPSE_CONTRACT = {
  COLLAPSE_THRESHOLD,
  EXPAND_THRESHOLD,
  COLLAPSE_MS,
}
