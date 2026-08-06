/**
 * Notification Stack Expansion — layered stack expands to separated cards.
 */

const EXPAND_MS = 320

function root() {
  return document.querySelector('[data-notification-stack-expansion]')
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function setStatus(text) {
  const el = document.querySelector('[data-nse-status]')
  if (el) el.textContent = text
}

function toggle() {
  const phase = root()?.getAttribute('data-phase')
  const btn = document.querySelector('[data-nse-toggle]')
  if (phase === 'stacked') {
    setPhase('expanded')
    btn?.setAttribute('aria-expanded', 'true')
    setStatus('Four separate notifications — click to collapse.')
  } else {
    setPhase('stacked')
    btn?.setAttribute('aria-expanded', 'false')
    setStatus('Four notifications stacked — click to expand.')
  }
}

document.querySelector('[data-nse-toggle]')?.addEventListener('click', toggle)

export function resetNotificationStackExpansion() {
  setPhase('stacked')
  document.querySelector('[data-nse-toggle]')?.setAttribute('aria-expanded', 'false')
  setStatus('Four notifications stacked — click to expand.')
}

export const NOTIFICATION_STACK_EXPANSION_CONTRACT = { EXPAND_MS }
