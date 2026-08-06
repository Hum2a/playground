/**
 * Control Centre Module Expansion — compact AUDIO tile to rich controls.
 */

const EXPAND_MS = 340
const ROW_STAGGER_MS = 45
const COMPACT_W = 142
const COMPACT_H = 72
const EXPANDED_W = 320
const EXPANDED_H = 210

/** @type {boolean} */
let expanded = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-control-centre-module-expansion]')
}

function moduleEl() {
  return document.querySelector('[data-ccm-module]')
}

function compactBtn() {
  return document.querySelector('[data-ccm-compact]')
}

function expandedPanel() {
  return document.querySelector('[data-ccm-expanded]')
}

function valueEls() {
  return document.querySelectorAll('[data-ccm-value], [data-ccm-value-header]')
}

function slider() {
  return /** @type {HTMLInputElement | null} */ (document.querySelector('[data-ccm-slider]'))
}

function statusEl() {
  return document.querySelector('[data-ccm-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function updateVolume(val) {
  const text = `${val}%`
  valueEls().forEach((el) => {
    el.textContent = text
  })
  setStatus(`Volume ${text}.`)
}

function expand() {
  if (expanded) return
  expanded = true
  const panel = expandedPanel()
  const btn = compactBtn()
  const mod = moduleEl()
  if (!panel || !btn || !mod) return

  btn.hidden = true
  panel.hidden = false
  btn.setAttribute('aria-expanded', 'true')
  mod.classList.add('is-expanding')
  setPhase('expanding')

  if (prefersReducedMotion()) {
    mod.classList.add('is-expanded')
    revealRows(true)
    setPhase('expanded')
    setStatus('AUDIO expanded. Adjust volume; collapse preserves value.')
    slider()?.focus()
    return
  }

  requestAnimationFrame(() => {
    mod.classList.add('is-expanded')
    setPhase('expanded')
  })

  window.setTimeout(() => {
    document.querySelector('[data-ccm-slider-wrap]')?.classList.add('is-visible')
  }, EXPAND_MS * 0.7)

  revealRows(false)
  setStatus('AUDIO module expanding — slider and detail rows constructing.')
  window.setTimeout(() => {
    setStatus('AUDIO expanded. Adjust volume; collapse preserves value.')
    slider()?.focus()
  }, EXPAND_MS + ROW_STAGGER_MS * 2)
}

function revealRows(instant) {
  const rows = [
    document.querySelector('[data-ccm-row-output]'),
    document.querySelector('[data-ccm-row-balance]'),
  ]
  rows.forEach((row, i) => {
    if (!row) return
    if (instant) {
      row.classList.add('is-visible')
      return
    }
    window.setTimeout(() => row.classList.add('is-visible'), EXPAND_MS * 0.7 + (i + 1) * ROW_STAGGER_MS)
  })
}

function collapse() {
  if (!expanded) return
  const panel = expandedPanel()
  const btn = compactBtn()
  const mod = moduleEl()
  if (!panel || !btn || !mod) return

  setPhase('collapsing')
  mod.classList.remove('is-expanded')
  document.querySelector('[data-ccm-slider-wrap]')?.classList.remove('is-visible')
  document.querySelector('[data-ccm-row-output]')?.classList.remove('is-visible')
  document.querySelector('[data-ccm-row-balance]')?.classList.remove('is-visible')

  const finish = () => {
    panel.hidden = true
    btn.hidden = false
    btn.setAttribute('aria-expanded', 'false')
    mod.classList.remove('is-expanding')
    expanded = false
    setPhase('compact')
    const val = slider()?.value ?? '62'
    setStatus(`Collapsed — AUDIO still at ${val}%.`)
    btn.focus()
  }

  if (prefersReducedMotion()) {
    finish()
    return
  }

  window.setTimeout(finish, EXPAND_MS)
}

export function resetControlCentreModuleExpansion() {
  expanded = false
  const mod = moduleEl()
  const panel = expandedPanel()
  const btn = compactBtn()
  const sl = slider()
  if (sl) sl.value = '62'
  updateVolume(62)
  mod?.classList.remove('is-expanded', 'is-expanding')
  if (panel) panel.hidden = true
  if (btn) {
    btn.hidden = false
    btn.setAttribute('aria-expanded', 'false')
  }
  document.querySelector('[data-ccm-slider-wrap]')?.classList.remove('is-visible')
  document.querySelector('[data-ccm-row-output]')?.classList.remove('is-visible')
  document.querySelector('[data-ccm-row-balance]')?.classList.remove('is-visible')
  setPhase('compact')
  setStatus('Compact AUDIO module at 62%. Click to expand controls.')
}

function bindUi() {
  compactBtn()?.addEventListener('click', expand)
  document.querySelector('[data-ccm-collapse]')?.addEventListener('click', collapse)
  slider()?.addEventListener('input', (event) => {
    const target = /** @type {HTMLInputElement} */ (event.target)
    updateVolume(target.value)
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetControlCentreModuleExpansion()
    }
  })
}

bindUi()
resetControlCentreModuleExpansion()

export const CONTROL_CENTRE_MODULE_EXPANSION_CONTRACT = {
  EXPAND_MS,
  ROW_STAGGER_MS,
  COMPACT_W,
  COMPACT_H,
  EXPANDED_W,
  EXPANDED_H,
}
