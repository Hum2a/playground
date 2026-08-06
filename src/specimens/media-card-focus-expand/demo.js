const META = ['Action · 12h', 'RPG · 40h', 'Puzzle · 6h']
let focus = null
function cards() { return Array.from(document.querySelectorAll('[data-mcfe-card]')) }
function setFocus(i) {
  focus = i
  cards().forEach((c, idx) => {
    c.classList.toggle('is-focus', idx === i)
    if (idx === i && !c.querySelector('.mcfe__meta')) {
      const m = document.createElement('span')
      m.className = 'mcfe__meta'
      m.textContent = META[idx] + ' · Play · Info'
      c.appendChild(m)
    }
  })
  const live = document.querySelector('[data-mcfe-live]')
  const status = document.querySelector('[data-mcfe-status]')
  if (i === null) {
    if (live) live.textContent = 'No card focused.'
    if (status) status.textContent = 'Focus a card to expand metadata.'
  } else {
    if (live) live.textContent = 'Focused card ' + (i + 1) + '.'
    if (status) status.textContent = 'Card expanded with metadata and actions.'
  }
}
function bind() {
  cards().forEach((c, i) => {
    c.addEventListener('focus', () => setFocus(i))
    c.addEventListener('click', () => setFocus(focus === i ? null : i))
  })
  document.querySelector('[data-mcfe]')?.addEventListener('focusout', (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setFocus(null)
  })
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') setFocus(null) })
}
bind()
