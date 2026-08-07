/**
 * Suspect Card Reveal — redaction bars slide; confidence meter fills.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const root = document.querySelector('[data-scr]')
const status = document.querySelector('[data-scr-status]')

function setState(s) {
  root?.setAttribute('data-state', s)
  if (status) {
    status.textContent =
      s === 'revealed' ? 'Suspect identity revealed.' : 'Suspect identity redacted.'
  }
}

export function reveal() {
  void prefersReducedMotion()
  setState('revealed')
}

export function reset() {
  setState('redacted')
}

document.querySelector('[data-scr-reveal]')?.addEventListener('click', reveal)
document.querySelector('[data-scr-reset]')?.addEventListener('click', reset)
window.addEventListener('message', (e) => {
  if (e.data?.type === 'restart') reset()
})
