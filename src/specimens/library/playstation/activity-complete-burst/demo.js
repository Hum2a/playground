let busy = false
function rm() { return document.documentElement.getAttribute('data-force-reduced-motion') === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches }
function root() { return document.querySelector('[data-acb]') }
function done() {
  const r = root(); if (!r) return
  r.setAttribute('data-phase', 'done')
  r.querySelector('[data-acb-live]').textContent = 'Activity complete.'
  r.querySelector('[data-acb-status]').textContent = 'Burst settled — activity marked complete.'
}
function run() {
  const r = root(); if (!r || busy) return
  busy = true
  r.setAttribute('data-phase', 'idle')
  r.querySelector('[data-acb-status]').textContent = 'Burst in progress…'
  if (rm()) { done(); busy = false; return }
  r.setAttribute('data-phase', 'burst')
  window.setTimeout(() => { done(); busy = false }, 560)
}
function bind() {
  const r = root(); if (!r) return
  r.querySelector('[data-acb-run]')?.addEventListener('click', run)
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') { busy = false; r.setAttribute('data-phase', 'idle'); r.querySelector('[data-acb-status]').textContent = 'Press Complete to trigger burst.' } })
}
bind()
