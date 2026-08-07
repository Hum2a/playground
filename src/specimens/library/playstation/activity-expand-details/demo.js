function root() {
  return document.querySelector('[data-aed]')
}

function setOpen(open) {
  const r = root()
  if (!r) return
  const btn = r.querySelector('[data-aed-toggle]')
  const det = r.querySelector('[data-aed-details]')
  const live = r.querySelector('[data-aed-live]')
  const status = r.querySelector('[data-aed-status]')

  r.setAttribute('data-phase', open ? 'expanded' : 'compact')
  btn?.setAttribute('aria-expanded', String(open))
  if (det) det.hidden = !open

  if (live) {
    live.textContent = open
      ? 'Expanded activity details with tasks and rewards.'
      : 'Compact activity card.'
  }
  if (status) {
    status.textContent = open
      ? 'Expanded — 5 tasks, 2 rewards, and 3 actions visible.'
      : 'Compact — expand to reveal tasks, rewards, and actions.'
  }
}

function toggle() {
  const r = root()
  if (!r) return
  setOpen(r.getAttribute('data-phase') !== 'expanded')
}

function bind() {
  root()?.querySelector('[data-aed-toggle]')?.addEventListener('click', toggle)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') setOpen(false)
  })
  setOpen(false)
}

bind()
