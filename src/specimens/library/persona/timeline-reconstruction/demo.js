/**
 * Timeline Reconstruction — cards slide into chronological order.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const root = document.querySelector('[data-tr]')
const status = document.querySelector('[data-tr-status]')

function setState(s) {
  root?.setAttribute('data-state', s)
  if (status) {
    status.textContent =
      s === 'sorted' ? 'Timeline reconstructed.' : 'Events scattered.'
  }
}

export function sort() {
  void prefersReducedMotion()
  setState('sorted')
}

export function reset() {
  setState('scattered')
}

document.querySelector('[data-tr-sort]')?.addEventListener('click', sort)
document.querySelector('[data-tr-reset]')?.addEventListener('click', reset)
window.addEventListener('message', (e) => {
  if (e.data?.type === 'restart') reset()
})
