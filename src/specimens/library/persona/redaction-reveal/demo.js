/**
 * Redaction Reveal — bars sweep left→right via scaleX from left.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const root = document.querySelector('[data-rr]')
const status = document.querySelector('[data-rr-status]')

function setState(s) {
  root?.setAttribute('data-state', s)
  if (status) {
    status.textContent =
      s === 'revealed' ? 'Content authorised.' : 'Content redacted.'
  }
}

export function sweep() {
  void prefersReducedMotion()
  setState('revealed')
}

export function reset() {
  setState('redacted')
}

document.querySelector('[data-rr-sweep]')?.addEventListener('click', sweep)
document.querySelector('[data-rr-reset]')?.addEventListener('click', reset)
window.addEventListener('message', (e) => {
  if (e.data?.type === 'restart') reset()
})
