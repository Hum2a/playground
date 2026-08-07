let focus = null

function cards() {
  return Array.from(document.querySelectorAll('[data-mcfe-card]'))
}

function setFocus(i) {
  focus = i
  cards().forEach((c, idx) => {
    const on = idx === i
    c.classList.toggle('is-focus', on)
    c.setAttribute('aria-pressed', on ? 'true' : 'false')
  })
  const live = document.querySelector('[data-mcfe-live]')
  const status = document.querySelector('[data-mcfe-status]')
  if (i === null) {
    if (live) live.textContent = 'No card focused.'
    if (status) status.textContent = 'Focus a card to expand metadata.'
  } else {
    if (live) live.textContent = 'Focused card ' + (i + 1) + '.'
    if (status) status.textContent = 'Card expanded — metadata and actions visible.'
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
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') setFocus(null)
  })
}

bind()
