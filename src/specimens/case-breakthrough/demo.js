
function prefersReducedMotion() {
  const forced = document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

window.addEventListener('message', (event) => {
  if (event.data?.type === 'restart') replay()
})

const root = document.querySelector('[data-cb]')
const status = document.querySelector('[data-cb-status]')
function setState(s) {
  root?.setAttribute('data-state', s)
  status.textContent = s === 'solved' ? 'Relationship graph solved.' : 'Evidence scattered.'
}
function solve() {
  if (prefersReducedMotion()) setState('solved')
  else { setState('solved') }
}
function reset() { setState('chaotic') }
function replay() { reset(); void root?.offsetWidth; solve() }
document.querySelector('[data-cb-solve]')?.addEventListener('click', solve)
document.querySelector('[data-cb-reset]')?.addEventListener('click', reset)
