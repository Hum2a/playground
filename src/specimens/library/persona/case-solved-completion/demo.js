/**
 * Case Solved Completion — clues collapse into CASE SOLVED flourish.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const root = document.querySelector('[data-csc]')
const status = document.querySelector('[data-csc-status]')

function setState(s) {
  root?.setAttribute('data-state', s)
  if (status) {
    status.textContent = s === 'solved' ? 'Case solved.' : 'Clues active.'
  }
}

export function solve() {
  void prefersReducedMotion()
  setState('solved')
}

export function reset() {
  setState('clues')
}

document.querySelector('[data-csc-solve]')?.addEventListener('click', solve)
document.querySelector('[data-csc-reset]')?.addEventListener('click', reset)
window.addEventListener('message', (e) => {
  if (e.data?.type === 'restart') reset()
})
