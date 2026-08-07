/**
 * Case Breakthrough — chaotic board reorganises into solved graph.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const root = document.querySelector('[data-cb]')
const status = document.querySelector('[data-cb-status]')

function setState(s) {
  root?.setAttribute('data-state', s)
  if (status) {
    status.textContent =
      s === 'solved' ? 'Relationship graph solved.' : 'Evidence scattered.'
  }
}

export function solve() {
  void prefersReducedMotion()
  setState('solved')
}

export function reset() {
  setState('chaotic')
}

document.querySelector('[data-cb-solve]')?.addEventListener('click', solve)
document.querySelector('[data-cb-reset]')?.addEventListener('click', reset)
window.addEventListener('message', (event) => {
  if (event.data?.type === 'restart') reset()
})
