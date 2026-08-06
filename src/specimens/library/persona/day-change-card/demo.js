(() => {
  const root = document.querySelector('[data-dcc]')
  if (!root) return
  const live = root.querySelector('[data-dcc-live]')
  const current = root.querySelector('[data-dcc-current]')
  const nextBtn = root.querySelector('[data-dcc-next]')
  const resetBtn = root.querySelector('[data-dcc-reset]')
  const days = [
    { day: '06', week: 'THU', announce: 'Thursday, 6 August' },
    { day: '07', week: 'FRI', announce: 'Friday, 7 August' },
    { day: '08', week: 'SAT', announce: 'Saturday, 8 August' },
  ]
  let idx = 0
  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.forceReducedMotion === 'true'
  function render(i) {
    const d = days[i]
    current.querySelector('.dcc__day').textContent = d.day
    current.querySelector('.dcc__week').textContent = d.week
    if (live) live.textContent = d.announce
    const next = days[(i + 1) % days.length]
    const nextCard = root.querySelector('.dcc__card--next')
    nextCard.querySelector('.dcc__day').textContent = next.day
    nextCard.querySelector('.dcc__week').textContent = next.week
  }
  function advance() {
    if (idx >= days.length - 1) return
    if (reduced()) { idx++; render(idx); return }
    root.dataset.phase = 'slide'
    setTimeout(() => {
      idx++
      render(idx)
      root.dataset.phase = 'idle'
      current.style.transform = ''
      current.style.opacity = ''
    }, 620)
  }
  function reset() {
    idx = 0
    root.dataset.phase = 'idle'
    render(0)
  }
  nextBtn.addEventListener('click', advance)
  resetBtn.addEventListener('click', reset)
  render(0)
})()