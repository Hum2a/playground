/**
 * Shape Morph Button-to-Card — single container pill to information card.
 */

const MORPH_MS = 360
const CONTENT_DELAY_MS = 140

/** @type {boolean} */
let expanded = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-shape-morph-button-to-card]')
}

function container() {
  return document.querySelector('[data-smc-container]')
}

function body() {
  return document.querySelector('[data-smc-body]')
}

function statusEl() {
  return document.querySelector('[data-smc-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function expand() {
  expanded = true
  root()?.setAttribute('data-phase', 'expanded')
  container()?.setAttribute('aria-expanded', 'true')
  const b = body()
  if (b) {
    b.removeAttribute('hidden')
    if (prefersReducedMotion()) b.style.opacity = '1'
  }
  setStatus('Card expanded — label shifted to heading; supporting content visible.')
}

function collapse() {
  expanded = false
  root()?.setAttribute('data-phase', 'compact')
  container()?.setAttribute('aria-expanded', 'false')
  const b = body()
  if (b) {
    if (prefersReducedMotion()) {
      b.setAttribute('hidden', 'true')
      b.style.opacity = ''
    } else {
      b.style.opacity = '0'
      window.setTimeout(() => {
        if (!expanded) b.setAttribute('hidden', 'true')
      }, CONTENT_DELAY_MS)
    }
  }
  setStatus('Tap Details to morph the pill into a 320×220 information card.')
}

function toggle() {
  if (expanded) collapse()
  else expand()
}

export function resetShapeMorphButtonToCard() {
  expanded = false
  root()?.setAttribute('data-phase', 'compact')
  container()?.setAttribute('aria-expanded', 'false')
  body()?.setAttribute('hidden', 'true')
  if (body()) body().style.opacity = ''
  setStatus('Tap Details to morph the pill into a 320×220 information card.')
}

function bindUi() {
  container()?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.closest('[data-smc-close]')) return
    if (!expanded) expand()
  })

  document.querySelector('[data-smc-close]')?.addEventListener('click', (event) => {
    event.stopPropagation()
    collapse()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && expanded) collapse()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetShapeMorphButtonToCard()
    }
  })
}

bindUi()
resetShapeMorphButtonToCard()

export const SHAPE_MORPH_BUTTON_TO_CARD_CONTRACT = {
  MORPH_MS,
  CONTENT_DELAY_MS,
}
