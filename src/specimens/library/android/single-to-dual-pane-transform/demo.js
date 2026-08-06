/**
 * Single-to-Dual Pane Transform — responsive master/detail at 600px breakpoint.
 */

const BREAKPOINT_PX = 600
const LIST_PANE_PX = 260
const TRANSITION_MS = 320

/** @type {string} */
let selectedId = 'alpha'
/** @type {string} */
let layout = 'list'
/** @type {number} */
let frameWidth = 360

const COPY = {
  alpha: 'Alpha module detail — telemetry and routing configuration.',
  beta: 'Beta module detail — storage quotas and sync policy.',
  gamma: 'Gamma module detail — notification routing and batch windows.',
}

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-single-to-dual-pane-transform]')
}

function frame() {
  return document.querySelector('[data-sdp-frame]')
}

function detail() {
  return document.querySelector('[data-sdp-detail]')
}

function detailTitle() {
  return document.querySelector('[data-sdp-detail-title]')
}

function detailCopy() {
  return document.querySelector('[data-sdp-detail-copy]')
}

function statusEl() {
  return document.querySelector('[data-sdp-status]')
}

function widthOut() {
  return document.querySelector('[data-sdp-width-out]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function selectItem(id, label) {
  selectedId = id
  document.querySelectorAll('[data-sdp-item]').forEach((btn) => {
    btn.classList.toggle('is-selected', btn.getAttribute('data-sdp-item') === id)
  })
  if (detailTitle()) detailTitle().textContent = label
  if (detailCopy()) detailCopy().textContent = COPY[id] || ''
  if (frameWidth < BREAKPOINT_PX) {
    layout = 'detail'
    root()?.setAttribute('data-layout', 'detail')
    detail()?.removeAttribute('hidden')
  }
}

function applyWidth(width) {
  frameWidth = width
  const f = frame()
  if (f) f.style.width = `${width}px`
  if (widthOut()) widthOut().textContent = `${width}px`

  const wide = width >= BREAKPOINT_PX
  root()?.setAttribute('data-phase', wide ? 'wide' : 'narrow')

  if (wide) {
    layout = 'list'
    root()?.setAttribute('data-layout', 'list')
    detail()?.removeAttribute('hidden')
    setStatus('Dual-pane: 260px list + flexible detail. Selected item preserved.')
  } else if (layout === 'detail') {
    detail()?.removeAttribute('hidden')
    setStatus('Narrow detail view — selected item preserved.')
  } else {
    detail()?.setAttribute('hidden', 'true')
    setStatus('Single-pane list — select an item to open detail.')
  }
}

export function resetSingleToDualPaneTransform() {
  selectedId = 'alpha'
  layout = 'list'
  selectItem('alpha', 'Alpha module')
  const slider = document.querySelector('[data-sdp-width]')
  if (slider instanceof HTMLInputElement) slider.value = '360'
  applyWidth(360)
}

function bindUi() {
  document.querySelectorAll('[data-sdp-item]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-sdp-item')
      const label = btn.textContent || ''
      if (id) selectItem(id, label)
    })
  })

  const slider = document.querySelector('[data-sdp-width]')
  slider?.addEventListener('input', (event) => {
    const target = event.target
    if (target instanceof HTMLInputElement) applyWidth(Number(target.value))
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetSingleToDualPaneTransform()
    }
  })
}

bindUi()
resetSingleToDualPaneTransform()

export const SINGLE_TO_DUAL_PANE_TRANSFORM_CONTRACT = {
  BREAKPOINT_PX,
  LIST_PANE_PX,
  TRANSITION_MS,
}
