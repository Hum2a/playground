/**
 * Spotlight Materialise — command search overlay materialisation.
 * Sandbox-safe (no parent / storage / network).
 *
 * Seed 44×44 → bar 520×58 · 180ms → panel 286px · 160ms · results 30ms stagger
 */

const PANEL_W = 520
const PANEL_H = 286
const BAR_H = 58
const SEED = 44
const BAR_MS = 180
const RESULTS_MS = 160
const STAGGER_MS = 30
const RESULTS = ['Open Project', 'Run Build', 'View Logs', 'Deploy Release']

let open = false
let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-spotlight-materialise]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setStatus(text) {
  const el = document.querySelector('[data-smt-status]')
  if (el) el.textContent = text
}

function triggerBtn() {
  return document.querySelector('[data-smt-trigger]')
}

function panelWrap() {
  return document.querySelector('[data-smt-panel]')
}

function inputEl() {
  return document.querySelector('[data-smt-input]')
}

function resultEls() {
  return /** @type {HTMLButtonElement[]} */ (
    Array.from(document.querySelectorAll('[data-smt-result]'))
  )
}

function showOpenInstant() {
  const root = rootEl()
  const trigger = triggerBtn()
  const panel = panelWrap()
  if (!root || !trigger || !panel) return

  panel.hidden = false
  root.setAttribute('data-phase', 'open')
  trigger.setAttribute('aria-expanded', 'true')
  resultEls().forEach((r) => r.classList.add('is-visible'))
  inputEl()?.focus()
  setStatus('Search open. Four results.')
  open = true
  busy = false
}

function showClosedInstant() {
  const root = rootEl()
  const trigger = triggerBtn()
  const panel = panelWrap()
  if (!root || !trigger || !panel) return

  root.setAttribute('data-phase', 'closed')
  panel.hidden = true
  trigger.setAttribute('aria-expanded', 'false')
  resultEls().forEach((r) => r.classList.remove('is-visible'))
  trigger.focus()
  setStatus('Search closed.')
  open = false
  busy = false
}

export function openSpotlightMaterialise() {
  const root = rootEl()
  const panel = panelWrap()
  if (!root || !panel || open || busy) return

  busy = true
  clearTimers()
  panel.hidden = false
  triggerBtn()?.setAttribute('aria-expanded', 'true')
  setStatus('Search materialising.')

  if (prefersReducedMotion()) {
    showOpenInstant()
    return
  }

  root.setAttribute('data-phase', 'bar')

  later(BAR_MS, () => {
    root.setAttribute('data-phase', 'opening')
  })

  later(BAR_MS + RESULTS_MS, () => {
    root.setAttribute('data-phase', 'open')
    resultEls().forEach((result, i) => {
      later(i * STAGGER_MS, () => {
        result.classList.add('is-visible')
      })
    })
    later((RESULTS.length - 1) * STAGGER_MS + 30, () => {
      inputEl()?.focus()
      setStatus('Search open. Four results.')
      open = true
      busy = false
    })
  })
}

export function closeSpotlightMaterialise() {
  const root = rootEl()
  if (!root || !open || busy) return

  busy = true
  clearTimers()
  setStatus('Search closing.')

  if (prefersReducedMotion()) {
    showClosedInstant()
    return
  }

  resultEls().forEach((r) => r.classList.remove('is-visible'))
  root.setAttribute('data-phase', 'bar')

  later(BAR_MS, () => {
    showClosedInstant()
  })
}

function bindUi() {
  triggerBtn()?.addEventListener('click', () => {
    if (open) closeSpotlightMaterialise()
    else openSpotlightMaterialise()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault()
      closeSpotlightMaterialise()
    }
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart' && open) closeSpotlightMaterialise()
  })
}

bindUi()
showClosedInstant()

export const SPOTLIGHT_MATERIALISE_CONTRACT = {
  PANEL_W,
  PANEL_H,
  BAR_H,
  SEED,
  BAR_MS,
  RESULTS_MS,
  STAGGER_MS,
  RESULTS,
}
