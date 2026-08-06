/**
 * Grid Reorder Gap — 4×3 tile grid with travelling insertion gap.
 * Sandbox-safe (no parent / storage / network).
 */

const COLS = 4
const ROWS = 3
const TILE = 64
const GAP = 12
const LONG_PRESS_MS = 240
const DRAG_THRESHOLD = 6
const LABELS = [
  'A1', 'A2', 'A3', 'A4',
  'B1', 'B2', 'B3', 'B4',
  'C1', 'C2', 'C3', 'C4',
]

/** @type {string[]} */
let order = [...LABELS]
/** @type {string[]} */
let originalOrder = [...LABELS]
/** @type {number | null} */
let gapIndex = null
/** @type {string | null} */
let draggedId = null
/** @type {boolean} */
let dragging = false
/** @type {number} */
let startX = 0
/** @type {number} */
let startY = 0
/** @type {number | null} */
let pressTimer = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function grid() {
  return document.querySelector('[data-grg-grid]')
}

function proxy() {
  return document.querySelector('[data-grg-proxy]')
}

function root() {
  return document.querySelector('[data-grid-reorder-gap]')
}

function statusEl() {
  return document.querySelector('[data-grg-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function cellPos(index) {
  const col = index % COLS
  const row = Math.floor(index / COLS)
  return { x: col * (TILE + GAP), y: row * (TILE + GAP) }
}

function indexAtPoint(clientX, clientY) {
  const g = grid()
  if (!g) return null
  const r = g.getBoundingClientRect()
  const x = clientX - r.left
  const y = clientY - r.top
  const col = Math.floor(x / (TILE + GAP))
  const row = Math.floor(y / (TILE + GAP))
  if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return null
  const localX = x - col * (TILE + GAP)
  const localY = y - row * (TILE + GAP)
  if (localX > TILE || localY > TILE) return null
  return row * COLS + col
}

function render() {
  const g = grid()
  if (!g) return
  g.innerHTML = ''

  const slots = [...order]
  if (gapIndex !== null && draggedId) {
    slots.splice(gapIndex, 0, '__gap__')
  }

  slots.forEach((id, slotIndex) => {
    const cell = document.createElement('div')
    cell.className = 'grg__cell'
    const pos = cellPos(slotIndex)
    cell.style.transform = `translate(${pos.x}px, ${pos.y}px)`

    if (id === '__gap__') {
      cell.classList.add('is-gap')
      cell.setAttribute('aria-hidden', 'true')
    } else {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'grg__tile'
      btn.textContent = id
      btn.dataset.tileId = id
      if (id === draggedId) btn.classList.add('is-lifted')
      btn.addEventListener('pointerdown', (e) => onPointerDown(e, id))
      cell.appendChild(btn)
    }
    g.appendChild(cell)
  })
}

function acquireDrag(id) {
  draggedId = id
  gapIndex = order.indexOf(id)
  order = order.filter((x) => x !== id)
  const p = proxy()
  if (p) {
    p.hidden = false
    p.textContent = id
  }
  render()
  setStatus(`Lifted ${id} — one gap visible at source.`)
}

function onPointerDown(event, id) {
  if (dragging || event.button !== 0) return
  startX = event.clientX
  startY = event.clientY
  const target = event.currentTarget
  if (!(target instanceof HTMLElement)) return
  target.setPointerCapture(event.pointerId)

  const move = (e) => {
    const dist = Math.hypot(e.clientX - startX, e.clientY - startY)
    if (!dragging && dist >= DRAG_THRESHOLD) {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
      dragging = true
      acquireDrag(id)
    }
    if (dragging) moveProxy(e.clientX, e.clientY)
  }

  const up = (e) => {
    target.releasePointerCapture(e.pointerId)
    target.removeEventListener('pointermove', move)
    target.removeEventListener('pointerup', up)
    target.removeEventListener('pointercancel', up)
    if (pressTimer !== null) {
      clearTimeout(pressTimer)
      pressTimer = null
    }
    if (dragging) finishDrag()
    else if (!dragging) {
      /* tap only */
    }
  }

  if (pressTimer !== null) clearTimeout(pressTimer)
  pressTimer = window.setTimeout(() => {
    if (!dragging) {
      dragging = true
      acquireDrag(id)
    }
    pressTimer = null
  }, prefersReducedMotion() ? 0 : LONG_PRESS_MS)

  target.addEventListener('pointermove', move)
  target.addEventListener('pointerup', up)
  target.addEventListener('pointercancel', up)
}

function moveProxy(x, y) {
  const p = proxy()
  const host = root()
  if (!p || !host) return
  const r = host.getBoundingClientRect()
  p.style.left = `${x - r.left - TILE / 2}px`
  p.style.top = `${y - r.top - TILE / 2}px`

  const idx = indexAtPoint(x, y)
  if (idx !== null && idx !== gapIndex) {
    gapIndex = idx
    render()
    setStatus(`Gap moved to slot ${idx + 1}.`)
  }
}

function finishDrag() {
  if (draggedId && gapIndex !== null) {
    order.splice(gapIndex, 0, draggedId)
  }
  draggedId = null
  gapIndex = null
  dragging = false
  const p = proxy()
  if (p) p.hidden = true
  render()
  setStatus('Drop complete — stable new order.')
}

function cancelDrag() {
  order = [...originalOrder]
  draggedId = null
  gapIndex = null
  dragging = false
  const p = proxy()
  if (p) p.hidden = true
  render()
  setStatus('Cancelled — original order restored.')
}

export function resetGridReorderGap() {
  if (pressTimer !== null) {
    clearTimeout(pressTimer)
    pressTimer = null
  }
  order = [...LABELS]
  originalOrder = [...LABELS]
  draggedId = null
  gapIndex = null
  dragging = false
  const p = proxy()
  if (p) p.hidden = true
  render()
  setStatus('Long-press or drag a tile to reorder. Escape cancels.')
}

function bindUi() {
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dragging) cancelDrag()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetGridReorderGap()
    }
  })
}

bindUi()
resetGridReorderGap()

export const GRID_REORDER_GAP_CONTRACT = {
  COLS,
  ROWS,
  TILE,
  GAP,
  LONG_PRESS_MS,
  DRAG_THRESHOLD,
  MOVE_MS: 160,
  PROXY_SCALE: 1.06,
}
