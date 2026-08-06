let active = null
function cards() { return Array.from(document.querySelectorAll('[data-ccr-card]')) }
function render() {
  cards().forEach((c, i) => {
    const on = i === active
    c.classList.toggle('is-expanded', on)
    c.setAttribute('aria-pressed', String(on))
    c.disabled = active !== null && !on
  })
  document.querySelector('[data-ccr-status]').textContent = active === null ? 'Idle' : 'Tile 0' + (active+1) + ' expanded — activate again to collapse'
}
function bind() {
  cards().forEach((c, i) => c.addEventListener('click', () => { active = active === i ? null : i; render() }))
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') { active = null; render() } })
  render()
}
bind()
