let busy = false
function rm() { return document.documentElement.getAttribute('data-force-reduced-motion') === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches }
function root() { return document.querySelector('[data-rtr]') }
function done() {
  const r = root(); if (!r) return
  r.setAttribute('data-phase', 'done')
  r.querySelector('[data-rtr-card]').hidden = false
  r.querySelector('[data-rtr-live]').textContent = 'Rare trophy revealed.'
  r.querySelector('[data-rtr-status]').textContent = 'Reveal complete — gold tier settled.'
}
function run() {
  const r = root(); if (!r || busy) return
  busy = true
  r.querySelector('[data-rtr-card]').hidden = false
  if (rm()) { done(); busy = false; return }
  r.setAttribute('data-phase', 'veil')
  window.setTimeout(() => {
    r.setAttribute('data-phase', 'reveal')
    window.setTimeout(() => { done(); busy = false }, 640)
  }, 220)
}
function bind() {
  root()?.querySelector('[data-rtr-run]')?.addEventListener('click', run)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') {
      busy = false
      const r = root()
      r?.setAttribute('data-phase', 'idle')
      r?.querySelector('[data-rtr-card]').hidden = true
      r?.querySelector('[data-rtr-status]').textContent = 'Press Reveal for rare trophy sequence.'
    }
  })
}
bind()
