/**
 * Matched Card Expansion — shared-element card → detail transition.
 * Sandbox-safe (no parent / storage / network).
 *
 * ORBIT 180×118 → detail inset 20px · 460ms · detail at 55% · recede 180ms
 */

const PREVIEW_SIZE = 520
const DETAIL_INSET = 20
const CARD_W = 180
const CARD_H = 118
const EXPAND_MS = 460
const RECEDE_MS = 180
const DETAIL_REVEAL_AT = 0.55

/** @type {{ top: number, left: number, width: number, height: number } | null} */
let frozenRect = null
let busy = false
/** @type {number | null} */
let timerId = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-matched-card-expansion]')
}

function gridEl() {
  return document.querySelector('[data-mce-grid]')
}

function cardEl() {
  return document.querySelector('[data-mce-orbit-card]')
}

function layerEl() {
  return document.querySelector('[data-mce-layer]')
}

function statusEl() {
  return document.querySelector('[data-mce-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function clearTimer() {
  if (timerId !== null) {
    window.clearTimeout(timerId)
    timerId = null
  }
}

/**
 * @param {DOMRect} cardRect
 * @param {DOMRect} rootRect
 */
function rectRelative(cardRect, rootRect) {
  return {
    top: cardRect.top - rootRect.top,
    left: cardRect.left - rootRect.left,
    width: cardRect.width,
    height: cardRect.height,
  }
}

/**
 * @param {HTMLElement} layer
 * @param {{ top: number, left: number, width: number, height: number }} rect
 */
function placeLayer(layer, rect) {
  layer.style.top = `${rect.top}px`
  layer.style.left = `${rect.left}px`
  layer.style.width = `${rect.width}px`
  layer.style.height = `${rect.height}px`
}

function detailTargetRect() {
  const size = PREVIEW_SIZE - DETAIL_INSET * 2
  return {
    top: DETAIL_INSET,
    left: DETAIL_INSET,
    width: size,
    height: size,
  }
}

/**
 * @returns {Promise<void>}
 */
export function openMatchedCardExpansion() {
  const root = rootEl()
  const card = cardEl()
  const layer = layerEl()
  const grid = gridEl()
  if (!root || !card || !layer || !grid || busy) return Promise.resolve()
  if (root.getAttribute('data-phase') === 'detail') return Promise.resolve()

  busy = true
  clearTimer()

  const rootRect = root.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()
  frozenRect = rectRelative(cardRect, rootRect)

  root.setAttribute('data-phase', 'opening')
  card.setAttribute('aria-expanded', 'true')
  card.classList.add('is-source-hidden')
  grid.classList.add('is-receding')

  layer.hidden = false
  layer.setAttribute('aria-hidden', 'false')
  placeLayer(layer, frozenRect)

  if (prefersReducedMotion()) {
    placeLayer(layer, detailTargetRect())
    root.setAttribute('data-phase', 'detail')
    setStatus('ORBIT detail open.')
    busy = false
    return Promise.resolve()
  }

  void layer.offsetWidth
  placeLayer(layer, detailTargetRect())

  return new Promise((resolve) => {
    timerId = window.setTimeout(() => {
      root.setAttribute('data-phase', 'detail')
      setStatus('ORBIT detail open.')
      busy = false
      timerId = null
      resolve()
    }, EXPAND_MS)
  })
}

/**
 * @returns {Promise<void>}
 */
export function closeMatchedCardExpansion() {
  const root = rootEl()
  const card = cardEl()
  const layer = layerEl()
  const grid = gridEl()
  if (!root || !card || !layer || !grid || busy) return Promise.resolve()
  if (root.getAttribute('data-phase') === 'grid') return Promise.resolve()

  busy = true
  clearTimer()

  const target = frozenRect ?? rectRelative(card.getBoundingClientRect(), root.getBoundingClientRect())

  root.setAttribute('data-phase', 'closing')
  grid.classList.remove('is-receding')

  if (prefersReducedMotion()) {
    layer.hidden = true
    layer.setAttribute('aria-hidden', 'true')
    card.classList.remove('is-source-hidden')
    card.setAttribute('aria-expanded', 'false')
    root.setAttribute('data-phase', 'grid')
    setStatus('Project grid. ORBIT is interactive.')
    busy = false
    return Promise.resolve()
  }

  placeLayer(layer, target)

  return new Promise((resolve) => {
    timerId = window.setTimeout(() => {
      layer.hidden = true
      layer.setAttribute('aria-hidden', 'true')
      card.classList.remove('is-source-hidden')
      card.setAttribute('aria-expanded', 'false')
      root.setAttribute('data-phase', 'grid')
      setStatus('Project grid. ORBIT is interactive.')
      busy = false
      timerId = null
      resolve()
    }, EXPAND_MS)
  })
}

export function resetMatchedCardExpansion() {
  clearTimer()
  busy = false
  frozenRect = null
  const root = rootEl()
  const card = cardEl()
  const layer = layerEl()
  const grid = gridEl()
  root?.setAttribute('data-phase', 'grid')
  grid?.classList.remove('is-receding')
  card?.classList.remove('is-source-hidden')
  card?.setAttribute('aria-expanded', 'false')
  if (layer) {
    layer.hidden = true
    layer.setAttribute('aria-hidden', 'true')
    layer.style.cssText = ''
  }
  setStatus('Project grid. ORBIT is interactive.')
}

function bindUi() {
  document.querySelectorAll('[data-mce-orbit-card]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void openMatchedCardExpansion()
    })
  })

  document.querySelectorAll('[data-mce-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void closeMatchedCardExpansion()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetMatchedCardExpansion()
    }
  })
}

bindUi()
resetMatchedCardExpansion()

export const MATCHED_CARD_EXPANSION_CONTRACT = {
  PREVIEW_SIZE,
  DETAIL_INSET,
  CARD_W,
  CARD_H,
  EXPAND_MS,
  RECEDE_MS,
  DETAIL_REVEAL_AT,
}
