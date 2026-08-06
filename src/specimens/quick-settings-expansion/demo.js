/**
 * Quick Settings Expansion — compact strip morphs to expanded panel.
 */

const EXPAND_MS = 360
const EXTRA_DELAY_MS = 162

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-quick-settings-expansion]')
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = document.querySelector('[data-qse-status]')
  if (el) el.textContent = text
}

function expand() {
  setPhase('expanded')
  document.querySelector('[data-qse-header]')?.removeAttribute('hidden')
  document.querySelector('[data-qse-brightness]')?.removeAttribute('hidden')

  const showExtra = () => {
    document.querySelectorAll('[data-qse-extra]').forEach((el) => el.removeAttribute('hidden'))
  }

  if (prefersReducedMotion()) showExtra()
  else window.setTimeout(showExtra, EXTRA_DELAY_MS)

  document.querySelector('[data-qse-expand]').textContent = 'Collapse'
  setStatus('Expanded quick settings — first four controls morphed.')
}

function collapse() {
  setPhase('compact')
  document.querySelectorAll('[data-qse-extra]').forEach((el) => el.setAttribute('hidden', ''))
  document.querySelector('[data-qse-header]')?.setAttribute('hidden', '')
  document.querySelector('[data-qse-brightness]')?.setAttribute('hidden', '')
  document.querySelector('[data-qse-expand]').textContent = 'Expand'
  setStatus('Collapsed to compact strip.')
}

function bindUi() {
  document.querySelector('[data-qse-expand]')?.addEventListener('click', () => {
    const phase = root()?.getAttribute('data-phase')
    if (phase === 'compact') expand()
    else collapse()
  })
}

bindUi()

export function resetQuickSettingsExpansion() {
  collapse()
}

export const QUICK_SETTINGS_EXPANSION_CONTRACT = { EXPAND_MS, EXTRA_DELAY_MS }
