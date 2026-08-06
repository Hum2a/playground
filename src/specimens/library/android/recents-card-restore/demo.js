/**
 * Recents Card Restore — task card expands to full viewport.
 * Sandbox-safe (no parent / storage / network).
 */

const TRANSITION_MS = 380
const TITLES = ['NOTES', 'GALLERY', 'MAIL']
const EXIT_X = [-180, 0, 180]

let phase = 'overview'
let selected = 1
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-recents-restore]')
}

function statusEl() {
  return document.querySelector('[data-rcr-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function updateCards() {
  document.querySelectorAll('[data-rcr-card]').forEach((card, i) => {
    card.classList.toggle('rcr__card--selected', i === selected)
    card.classList.toggle('rcr__card--centre', i === selected && phase === 'overview')
    card.style.setProperty('--rcr-exit-x', `${EXIT_X[i]}px`)
  })
  const label = document.querySelector('[data-rcr-label]')
  if (label) label.textContent = TITLES[selected]
  const title = document.querySelector('[data-rcr-title]')
  if (title) title.textContent = TITLES[selected]
}

function expand(index) {
  if (busy || phase === 'expanded') return
  busy = true
  selected = index
  updateCards()
  const root = rootEl()
  root?.setAttribute('data-phase', 'expanded')
  phase = 'expanded'

  const expanded = document.querySelector('[data-rcr-expanded]')
  if (expanded) expanded.hidden = false

  setStatus(`${TITLES[selected]} expanded full-screen. Controls active after transition.`)

  const ms = prefersReducedMotion() ? 80 : TRANSITION_MS
  window.setTimeout(() => {
    busy = false
    setStatus(`${TITLES[selected]} full-screen — press OVERVIEW to return.`)
  }, ms)
}

function collapse() {
  if (busy || phase === 'overview') return
  busy = true
  const expanded = document.querySelector('[data-rcr-expanded]')
  if (expanded) expanded.hidden = true
  rootEl()?.setAttribute('data-phase', 'overview')
  phase = 'overview'
  updateCards()
  setStatus('Overview restored with original task order.')

  const ms = prefersReducedMotion() ? 0 : TRANSITION_MS
  window.setTimeout(() => {
    busy = false
    setStatus('Select a task card to restore it full-screen.')
  }, ms)
}

export function resetRecentsCardRestore() {
  busy = false
  phase = 'overview'
  selected = 1
  const expanded = document.querySelector('[data-rcr-expanded]')
  if (expanded) expanded.hidden = true
  rootEl()?.setAttribute('data-phase', 'overview')
  updateCards()
  setStatus('Select a task card to restore it full-screen.')
}

function bindUi() {
  document.querySelectorAll('[data-rcr-card]').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = Number(card.getAttribute('data-rcr-card'))
      expand(idx)
    })
  })
  document.querySelector('[data-rcr-back]')?.addEventListener('click', collapse)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetRecentsCardRestore()
    }
  })
}

bindUi()
resetRecentsCardRestore()

export const RECENTS_CARD_RESTORE_CONTRACT = { TRANSITION_MS, TITLES }
