/**
 * Evidence Chain Advance — nodes activate; links draw with scaleX.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const root = document.querySelector('[data-eca]')
const status = document.querySelector('[data-eca-status]')
let step = 0

function setStep(s) {
  step = s
  root?.setAttribute('data-step', String(s))
  if (status) status.textContent = `Chain at step ${s}.`
}

export function advance() {
  void prefersReducedMotion()
  if (step < 3) setStep(step + 1)
}

export function reset() {
  setStep(0)
}

document.querySelector('[data-eca-advance]')?.addEventListener('click', advance)
document.querySelector('[data-eca-reset]')?.addEventListener('click', reset)
window.addEventListener('message', (e) => {
  if (e.data?.type === 'restart') reset()
})
