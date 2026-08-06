let busy = false
function rm() { return document.documentElement.getAttribute('data-force-reduced-motion') === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches }
function root() { return document.querySelector('[data-tup]') }
function settled() {
  const r = root(); if (!r) return
  r.setAttribute('data-phase', 'settled')
  const t = r.querySelector('[data-tup-toast]'); t.hidden = false
  r.querySelector('[data-tup-live]').textContent = 'Trophy unlocked and settled.'
}
function run() {
  const r = root(); if (!r || busy) return
  busy = true
  const t = r.querySelector('[data-tup-toast]'); t.hidden = false
  if (rm()) { settled(); busy = false; return }
  r.setAttribute('data-phase', 'enter')
  window.setTimeout(() => { r.setAttribute('data-phase', 'shine'); window.setTimeout(() => { settled(); busy = false }, 500) }, 340)
}
function bind() {
  root()?.querySelector('[data-tup-run]')?.addEventListener('click', run)
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') { busy = false; const r = root(); r?.setAttribute('data-phase', 'idle'); r?.querySelector('[data-tup-toast]').hidden = true } })
}
bind()
