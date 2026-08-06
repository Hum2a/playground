function prefersReducedMotion() {
  const forced = document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const root = document.querySelector('[data-scr]')
const status = document.querySelector('[data-scr-status]')

function setState(s) {
  root?.setAttribute('data-state', s)
  status.textContent = s === 'revealed' ? 'Suspect identity revealed.' : 'Suspect identity redacted.'
}

function reveal() { setState('revealed') }
function reset() { setState('redacted') }
function replay() { reset(); void root?.offsetWidth; reveal() }

document.querySelector('[data-scr-reveal]')?.addEventListener('click', reveal)
document.querySelector('[data-scr-reset]')?.addEventListener('click', reset)
window.addEventListener('message', (e) => { if (e.data?.type === 'restart') replay() })
