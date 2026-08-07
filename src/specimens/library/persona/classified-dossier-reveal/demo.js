/**
 * Classified Dossier Reveal — stamp/seal lift then lines clear.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const root = document.querySelector('[data-cdr]')
const status = document.querySelector('[data-cdr-status]')
const cleared = document.querySelector('[data-cdr-cleared]')

function setState(s) {
  root?.setAttribute('data-state', s)
  if (cleared) cleared.setAttribute('aria-hidden', s === 'revealed' ? 'false' : 'true')
  if (status) {
    status.textContent =
      s === 'revealed' ? 'Case file verified.' : 'Case file locked.'
  }
}

export function verify() {
  void prefersReducedMotion()
  setState('revealed')
}

export function reset() {
  setState('locked')
}

document.querySelector('[data-cdr-verify]')?.addEventListener('click', verify)
document.querySelector('[data-cdr-reset]')?.addEventListener('click', reset)
window.addEventListener('message', (e) => {
  if (e.data?.type === 'restart') reset()
})
