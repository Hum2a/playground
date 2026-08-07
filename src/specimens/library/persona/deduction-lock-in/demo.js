/**
 * Deduction Lock-In — observations converge; LOCKED flash.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const root = document.querySelector('[data-dli]')
const status = document.querySelector('[data-dli-status]')
const lockEl = document.querySelector('[data-dli-lock]')

function setState(s) {
  root?.setAttribute('data-state', s)
  if (lockEl) lockEl.setAttribute('aria-hidden', s === 'locked' ? 'false' : 'true')
  if (status) {
    status.textContent =
      s === 'locked' ? 'Deduction locked in.' : 'Observations pending.'
  }
}

export function lock() {
  void prefersReducedMotion()
  setState('locked')
}

export function reset() {
  setState('idle')
}

document.querySelector('[data-dli-run]')?.addEventListener('click', lock)
document.querySelector('[data-dli-reset]')?.addEventListener('click', reset)
window.addEventListener('message', (e) => {
  if (e.data?.type === 'restart') reset()
})
