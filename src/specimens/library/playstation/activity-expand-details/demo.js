function root() { return document.querySelector('[data-aed]') }
function toggle() {
  const r = root(); const btn = r?.querySelector('[data-aed-toggle]'); if (!r || !btn) return
  const open = r.getAttribute('data-phase') === 'expanded'
  r.setAttribute('data-phase', open ? 'compact' : 'expanded')
  btn.setAttribute('aria-expanded', String(!open))
  const det = r.querySelector('.aed__details')
  if (det) det.hidden = open
  r.querySelector('[data-aed-live]').textContent = open ? 'Compact activity card.' : 'Expanded activity details.'
  r.querySelector('[data-aed-status]').textContent = open ? 'Compact — activate to expand details.' : 'Expanded — tasks, reward, and actions visible.'
}
function bind() {
  root()?.querySelector('[data-aed-toggle]')?.addEventListener('click', toggle)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') {
      const r = root(); if (!r) return
      r.setAttribute('data-phase', 'compact')
      r.querySelector('[data-aed-toggle]')?.setAttribute('aria-expanded', 'false')
      r.querySelector('.aed__details').hidden = true
    }
  })
}
bind()
