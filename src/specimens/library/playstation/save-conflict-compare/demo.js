/**
 * Save Conflict Compare — PlayStation-inspired motion specimen.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-scc]')
}

let busy = false
/** @type {number[]} */
let timers = []
/** @type {string} */
let selection = ''

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setLive(text) {
  const el = document.querySelector('[data-scc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-scc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-scc-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-scc-run], [data-scc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

const COMMIT_MS = 280

function commitBtn() {
  return document.querySelector('[data-scc-commit]')
}

function cards() {
  return Array.from(document.querySelectorAll('[data-scc-save]'))
}

function syncSelectionUi() {
  const root = rootEl()
  root?.setAttribute('data-selection', selection)
  cards().forEach((card) => {
    const side = card.getAttribute('data-side')
    const on = side === selection
    card.setAttribute('aria-pressed', on ? 'true' : 'false')
    const label = card.querySelector('[data-scc-select-label]')
    if (label) label.textContent = on ? 'Selected' : 'Select'
  })
  const btn = commitBtn()
  if (btn) btn.disabled = !selection || root?.getAttribute('data-phase') === 'committed'
}

function resetVisual() {
  selection = ''
  rootEl()?.setAttribute('data-phase', 'compare')
  syncSelectionUi()
  setStatus('CONFLICT')
  setHint('Select a card, then commit — or Run.')
  setLive('Save conflict — select a version to keep.')
}

function commitSelection(side) {
  if (!side) return
  selection = side
  syncSelectionUi()
  rootEl()?.setAttribute('data-phase', 'committed')
  const label = side === 'cloud' ? 'Cloud' : 'Local'
  setStatus(`KEPT ${label.toUpperCase()}`)
  setHint(`${label} save committed. Other side dimmed.`)
  setLive(`${label} save kept. Conflict resolved.`)
  const btn = commitBtn()
  if (btn) {
    btn.disabled = true
    btn.textContent = `Kept ${label.toLowerCase()} save`
  }
  cards().forEach((card) => {
    card.disabled = true
  })
}

function selectSide(side) {
  if (rootEl()?.getAttribute('data-phase') === 'committed') return
  selection = side
  syncSelectionUi()
  setStatus(`SELECTED ${side.toUpperCase()}`)
  setLive(`${side === 'cloud' ? 'Cloud' : 'Local'} save selected.`)
  setHint('Press Keep selected save to commit.')
  const btn = commitBtn()
  if (btn) {
    btn.disabled = false
    btn.textContent = 'Keep selected save'
  }
}

export function runSaveConflictCompare() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'committed') return Promise.resolve()
  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  cards().forEach((card) => {
    card.disabled = false
  })
  const btn = commitBtn()
  if (btn) btn.textContent = 'Keep selected save'

  // Deterministic demo: select newer cloud save, then commit.
  selectSide('cloud')
  setLive('Auto-selecting newer cloud save.')

  const delay = prefersReducedMotion() ? 40 : COMMIT_MS
  return new Promise((resolve) => {
    later(delay, () => {
      commitSelection('cloud')
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetSaveConflictCompare() {
  clearTimers()
  busy = false
  cards().forEach((card) => {
    card.disabled = false
  })
  const btn = commitBtn()
  if (btn) btn.textContent = 'Keep selected save'
  resetVisual()
  setButtons(true)
}

export async function replaySaveConflictCompare() {
  if (busy) return
  resetSaveConflictCompare()
  await runSaveConflictCompare()
}

cards().forEach((card) => {
  card.addEventListener('click', () => {
    if (busy || rootEl()?.getAttribute('data-phase') === 'committed') return
    selectSide(card.getAttribute('data-side') || '')
  })
})

commitBtn()?.addEventListener('click', () => {
  if (busy || !selection || rootEl()?.getAttribute('data-phase') === 'committed') return
  commitSelection(selection)
})

function bindUi() {
  document.querySelector('[data-scc-run]')?.addEventListener('click', () => {
    void runSaveConflictCompare()
  })
  document.querySelector('[data-scc-replay]')?.addEventListener('click', () => {
    void replaySaveConflictCompare()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replaySaveConflictCompare()
  })
}

bindUi()
resetSaveConflictCompare()
