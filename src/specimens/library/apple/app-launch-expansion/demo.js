/**
 * App Launch Expansion — grid tile → full-surface launch transition.
 * Sandbox-safe (no parent / storage / network).
 *
 * Tile 72×72 · gap 22 · expand 430ms · radius 18→0 · detail at 58%
 */

const PREVIEW_W = 300
const PREVIEW_H = 380
const TILE = 72
const GAP = 22
const GRID_PAD_X = 24
const GRID_PAD_Y = 48
const EXPAND_MS = 430
const RECEDE_MS = 180
const DETAIL_AT = 0.58
const TARGET_INDEX = 4

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
  return document.querySelector('[data-app-launch-expansion]')
}

function gridEl() {
  return document.querySelector('[data-ale-grid]')
}

function targetTile() {
  return document.querySelector('[data-ale-tile="05"]')
}

function layerEl() {
  return document.querySelector('[data-ale-layer]')
}

function statusEl() {
  return document.querySelector('[data-ale-status]')
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
 * @param {DOMRect} tileRect
 * @param {DOMRect} rootRect
 */
function rectRelative(tileRect, rootRect) {
  return {
    top: tileRect.top - rootRect.top,
    left: tileRect.left - rootRect.left,
    width: tileRect.width,
    height: tileRect.height,
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

function fullRect() {
  return { top: 0, left: 0, width: PREVIEW_W, height: PREVIEW_H }
}

/**
 * @returns {Promise<void>}
 */
export function launchAppExpansion() {
  const root = rootEl()
  const tile = targetTile()
  const layer = layerEl()
  const grid = gridEl()
  if (!root || !tile || !layer || !grid || busy) return Promise.resolve()
  if (root.getAttribute('data-phase') === 'detail') return Promise.resolve()

  busy = true
  clearTimer()
  const rootRect = root.getBoundingClientRect()
  const tileRect = tile.getBoundingClientRect()
  frozenRect = rectRelative(tileRect, rootRect)

  layer.hidden = false
  layer.setAttribute('aria-hidden', 'false')
  placeLayer(layer, frozenRect)
  tile.classList.add('is-source-hidden')
  grid.classList.add('is-receding')
  root.setAttribute('data-phase', 'expanding')
  setStatus('App 05 launching.')

  if (prefersReducedMotion()) {
    placeLayer(layer, fullRect())
    root.setAttribute('data-phase', 'detail')
    setStatus('ANALYTICS open.')
    busy = false
    return Promise.resolve()
  }

  void layer.offsetWidth
  placeLayer(layer, fullRect())

  return new Promise((resolve) => {
    timerId = window.setTimeout(() => {
      root.setAttribute('data-phase', 'detail')
      setStatus('ANALYTICS open.')
      busy = false
      timerId = null
      resolve()
    }, EXPAND_MS)
  })
}

/**
 * @returns {Promise<void>}
 */
export function closeAppExpansion() {
  const root = rootEl()
  const tile = targetTile()
  const layer = layerEl()
  const grid = gridEl()
  if (!root || !tile || !layer || !grid || busy || !frozenRect) return Promise.resolve()

  busy = true
  clearTimer()
  root.setAttribute('data-phase', 'closing')
  setStatus('Returning to grid.')

  if (prefersReducedMotion()) {
    layer.hidden = true
    layer.setAttribute('aria-hidden', 'true')
    tile.classList.remove('is-source-hidden')
    grid.classList.remove('is-receding')
    root.setAttribute('data-phase', 'grid')
    setStatus('Grid ready. Launch App 05.')
    busy = false
    return Promise.resolve()
  }

  placeLayer(layer, frozenRect)
  root.setAttribute('data-phase', 'expanding')

  return new Promise((resolve) => {
    timerId = window.setTimeout(() => {
      layer.hidden = true
      layer.setAttribute('aria-hidden', 'true')
      tile.classList.remove('is-source-hidden')
      grid.classList.remove('is-receding')
      root.setAttribute('data-phase', 'grid')
      setStatus('Grid ready. Launch App 05.')
      busy = false
      timerId = null
      resolve()
    }, EXPAND_MS)
  })
}

function bindUi() {
  targetTile()?.addEventListener('click', () => {
    void launchAppExpansion()
  })

  document.querySelector('[data-ale-close]')?.addEventListener('click', () => {
    void closeAppExpansion()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void closeAppExpansion()
  })
}

bindUi()

export const APP_LAUNCH_EXPANSION_CONTRACT = {
  TILE,
  GAP,
  EXPAND_MS,
  RECEDE_MS,
  DETAIL_AT,
  TARGET: '05',
  DESTINATION: 'ANALYTICS',
}
