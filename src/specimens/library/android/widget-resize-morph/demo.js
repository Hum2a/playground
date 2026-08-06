/**
 * Widget Resize Morph — launcher widget between three fixed grid sizes.
 */

const MORPH_MS = 300
const SIZES = ['2x1', '2x2', '4x2']

/** @type {string} */
let currentSize = '2x1'
/** @type {boolean} */
let selected = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-widget-resize-morph]')
}

function widget() {
  return document.querySelector('[data-wrm-widget]')
}

function handles() {
  return document.querySelector('[data-wrm-handles]')
}

function chart() {
  return document.querySelector('[data-wrm-chart]')
}

function metrics() {
  return document.querySelector('[data-wrm-metrics]')
}

function statusEl() {
  return document.querySelector('[data-wrm-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setSize(size) {
  currentSize = size
  root()?.setAttribute('data-size', size)
  chart()?.toggleAttribute('hidden', size === '2x1')
  metrics()?.toggleAttribute('hidden', size !== '4x2')
  setStatus(`Widget resized to ${size.replace('x', '×')}. Content reflowed.`)
}

function setSelected(on) {
  selected = on
  widget()?.classList.toggle('is-selected', on)
  const h = handles()
  if (on) h?.removeAttribute('hidden')
  else h?.setAttribute('hidden', 'true')
}

function morphTo(size) {
  if (!SIZES.includes(size)) return
  setSize(size)
}

function toggleSelect() {
  setSelected(!selected)
  if (selected) {
    setStatus('Widget selected — choose 2×1, 2×2, or 4×2.')
  } else {
    setStatus('Tap the widget to select and resize between grid sizes.')
  }
}

export function resetWidgetResizeMorph() {
  currentSize = '2x1'
  setSelected(false)
  setSize('2x1')
  root()?.setAttribute('data-phase', 'idle')
  setStatus('Tap the widget to select and resize between 2×1, 2×2, and 4×2 grid sizes.')
}

function bindUi() {
  widget()?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.closest('[data-wrm-size]')) return
    toggleSelect()
  })

  document.querySelectorAll('[data-wrm-size]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation()
      const size = btn.getAttribute('data-wrm-size')
      if (size) morphTo(size)
    })
  })

  document.addEventListener('click', (event) => {
    if (!selected) return
    const w = widget()
    if (w && !w.contains(event.target)) setSelected(false)
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetWidgetResizeMorph()
    }
  })
}

bindUi()
resetWidgetResizeMorph()

export const WIDGET_RESIZE_MORPH_CONTRACT = {
  MORPH_MS,
  SIZES,
}
