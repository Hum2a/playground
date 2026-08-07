function root() {
  return document.querySelector('[data-ctdm]')
}

function toggle() {
  const r = root()
  if (!r) return
  const open = r.getAttribute('data-phase') === 'details'
  r.setAttribute('data-phase', open ? 'tile' : 'details')
  r.querySelector('[data-ctdm-toggle]')?.setAttribute('aria-expanded', String(!open))
  const live = r.querySelector('[data-ctdm-live]')
  const status = r.querySelector('[data-ctdm-status]')
  if (live) live.textContent = open ? 'Compact tile.' : 'Details surface.'
  if (status) {
    status.textContent = open
      ? 'Tile view — open for details morph.'
      : 'Details morph — shared surface from tile corner.'
  }
}

function bind() {
  root()?.querySelector('[data-ctdm-toggle]')?.addEventListener('click', toggle)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') {
      const r = root()
      r?.setAttribute('data-phase', 'tile')
      r?.querySelector('[data-ctdm-toggle]')?.setAttribute('aria-expanded', 'false')
      const live = r?.querySelector('[data-ctdm-live]')
      const status = r?.querySelector('[data-ctdm-status]')
      if (live) live.textContent = 'Compact tile.'
      if (status) status.textContent = 'Tile view — open for details morph.'
    }
  })
}

bind()
