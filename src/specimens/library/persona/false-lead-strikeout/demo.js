/**
 * False Lead Strikeout — angled ink strike; FALSE LEAD stays readable.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const root = document.querySelector('[data-fls]')
const status = document.querySelector('[data-fls-status]')

function setState(s) {
  root?.setAttribute('data-state', s)
  if (status) {
    status.textContent =
      s === 'struck' ? 'False lead struck out.' : 'Hypothesis active.'
  }
}

export function strike() {
  void prefersReducedMotion()
  setState('struck')
}

export function reset() {
  setState('active')
}

document.querySelector('[data-fls-strike]')?.addEventListener('click', strike)
document.querySelector('[data-fls-reset]')?.addEventListener('click', reset)
window.addEventListener('message', (e) => {
  if (e.data?.type === 'restart') reset()
})
