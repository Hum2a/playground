/**
 * Compact Activity Expansion — portable expand/collapse API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Compact 126×36 → Expanded 318×152; radius 18→24; 360ms
 * Reveal order: header 35%, rows 50%, ETA 68%
 */

const EXPAND_MS = 360
const HEADER_AT = Math.round(EXPAND_MS * 0.35)
const ROWS_AT = Math.round(EXPAND_MS * 0.5)
const ETA_AT = Math.round(EXPAND_MS * 0.68)
const COLLAPSE_MS = 360
const RM_MS = 100

/** @type {number[]} */
let timers = []
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  return (
    forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function duration() {
  return prefersReducedMotion() ? RM_MS : EXPAND_MS
}

function rootEl() {
  return document.querySelector('[data-compact-activity]')
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
  const el = document.querySelector('[data-cae-status]')
  if (el) el.textContent = text
}

function setButtons(expanded) {
  const expand = document.querySelector('[data-cae-expand]')
  const collapse = document.querySelector('[data-cae-collapse]')
  if (expand) expand.disabled = expanded || busy
  if (collapse) collapse.disabled = !expanded || busy
}

function setReveals(header, rows, eta) {
  const el = rootEl()
  if (!el) return
  el.dataset.revealHeader = header ? 'true' : 'false'
  el.dataset.revealRows = rows ? 'true' : 'false'
  el.dataset.revealEta = eta ? 'true' : 'false'
}

function showExpandedContent(show) {
  const expanded = document.querySelector('[data-cae-expanded]')
  if (expanded) expanded.hidden = !show
}

export function expandCompactActivity() {
  const el = rootEl()
  if (!el || busy || el.dataset.state === 'expanded') return Promise.resolve()

  busy = true
  setButtons(true)
  clearTimers()

  const rm = prefersReducedMotion()
  const dur = duration()
  const hAt = rm ? 0 : Math.round(dur * 0.35)
  const rAt = rm ? 0 : Math.round(dur * 0.5)
  const eAt = rm ? 0 : Math.round(dur * 0.68)

  el.dataset.collapsing = 'false'
  el.dataset.state = 'expanded'
  showExpandedContent(true)
  setReveals(false, false, false)

  return new Promise((resolve) => {
    later(hAt, () => setReveals(true, false, false))
    later(rAt, () => setReveals(true, true, false))
    later(eAt, () => setReveals(true, true, true))
    later(dur, () => {
      busy = false
      setButtons(true)
      setStatus('Expanded deploy status with build, test, and ETA.')
      resolve()
    })
  })
}

export function collapseCompactActivity() {
  const el = rootEl()
  if (!el || busy || el.dataset.state !== 'expanded') return Promise.resolve()

  busy = true
  setButtons(true)
  clearTimers()

  const rm = prefersReducedMotion()
  const dur = rm ? RM_MS : COLLAPSE_MS
  const step = rm ? 0 : 70

  el.dataset.collapsing = 'true'

  setReveals(true, true, true)

  return new Promise((resolve) => {
    later(0, () => setReveals(true, true, false))
    later(step, () => setReveals(true, false, false))
    later(step * 2, () => setReveals(false, false, false))
    later(step * 3, () => {
      el.dataset.state = 'compact'
      showExpandedContent(false)
      el.dataset.collapsing = 'false'
    })
    later(dur, () => {
      busy = false
      setButtons(false)
      setStatus('Compact deploy status at 72 percent.')
      resolve()
    })
  })
}

export function resetCompactActivity() {
  const el = rootEl()
  if (!el || busy) return Promise.resolve()

  clearTimers()
  busy = false
  el.dataset.state = 'compact'
  el.dataset.collapsing = 'false'
  setReveals(false, false, false)
  showExpandedContent(false)
  setButtons(false)
  setStatus('Compact deploy status at 72 percent.')
  return Promise.resolve()
}

function wire() {
  const el = rootEl()
  if (!el) return

  document
    .querySelector('[data-cae-expand]')
    ?.addEventListener('click', () => void expandCompactActivity())
  document
    .querySelector('[data-cae-collapse]')
    ?.addEventListener('click', () => void collapseCompactActivity())
}

wire()
