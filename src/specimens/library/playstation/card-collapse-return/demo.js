let active = null

function cards() {
  return Array.from(document.querySelectorAll('[data-ccr-card]'))
}

function render() {
  cards().forEach((c, i) => {
    const on = i === active
    c.classList.toggle('is-expanded', on)
    c.setAttribute('aria-pressed', String(on))
    c.disabled = active !== null && !on
  })
  const status = document.querySelector('[data-ccr-status]')
  if (!status) return
  status.textContent =
    active === null
      ? 'Idle — original rail geometry'
      : 'Tile 0' + (active + 1) + ' expanded — activate again to collapse to 96×132'
}

function bind() {
  cards().forEach((c, i) => {
    c.addEventListener('click', () => {
      active = active === i ? null : i
      render()
    })
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') {
      active = null
      render()
    }
  })
  render()
}

bind()
