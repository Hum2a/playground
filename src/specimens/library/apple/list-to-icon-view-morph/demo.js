/**
 * List-to-Icon View Morph — six persistent files reorganise between list and grid.
 */

const MORPH_MS = 420

/** @type {'list' | 'grid'} */
let view = 'list'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-list-to-icon-view-morph]')
}

function statusEl() {
  return document.querySelector('[data-ltv-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setView(next) {
  view = next
  root()?.setAttribute('data-view', next)
  setStatus(
    next === 'grid'
      ? 'Grid view — six items in 3×2 layout; filenames preserved.'
      : 'List view — six rows restored in original order.',
  )
}

function toGrid() {
  setView('grid')
  if (!prefersReducedMotion()) {
    window.setTimeout(() => {
      setStatus('Grid morph complete — 3×2 cells at 116×104.')
    }, MORPH_MS)
  }
}

function toList() {
  setView('list')
  if (!prefersReducedMotion()) {
    window.setTimeout(() => {
      setStatus('List restored — six 44px rows in original order.')
    }, MORPH_MS)
  }
}

export function resetListToIconViewMorph() {
  view = 'list'
  root()?.setAttribute('data-view', 'list')
  setStatus('Six files in list view. Switch to grid to morph layout.')
}

function bindUi() {
  document.querySelector('[data-ltv-grid]')?.addEventListener('click', toGrid)
  document.querySelector('[data-ltv-list]')?.addEventListener('click', toList)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetListToIconViewMorph()
    }
  })
}

bindUi()
resetListToIconViewMorph()

export const LIST_TO_ICON_VIEW_MORPH_CONTRACT = {
  MORPH_MS,
  ROW_H: 44,
  CELL_W: 116,
  CELL_H: 104,
  ITEM_COUNT: 6,
}
