/**
 * Four-Shape Orbit Loader — four primitives orbit, then settle into a diamond.
 * iframe-safe; no storage / parent / network.
 */

function rm() {
  return (
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function rootEl() {
  return document.querySelector('[data-fso]')
}

function status(t) {
  const el = document.querySelector('[data-fso-status]')
  if (el) el.textContent = t
}

function reset() {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-phase', 'orbit')
  root.classList.remove('is-complete')
  const diamond = root.querySelector('[data-fso-diamond]')
  if (diamond) diamond.hidden = true
  status('Orbiting — loader active')
}

function complete() {
  const root = rootEl()
  if (!root || root.getAttribute('data-phase') === 'complete') return
  root.setAttribute('data-phase', 'complete')
  root.classList.add('is-complete')
  const diamond = root.querySelector('[data-fso-diamond]')
  if (diamond) diamond.hidden = false
  status(rm() ? 'Complete — diamond locked (static)' : 'Complete — shapes settled into diamond')
}

function bind() {
  const root = rootEl()
  if (!root) return
  root.querySelector('[data-fso-complete]')?.addEventListener('click', () => complete())
  root.querySelector('[data-fso-reset]')?.addEventListener('click', () => reset())
  addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  reset()
}

bind()
