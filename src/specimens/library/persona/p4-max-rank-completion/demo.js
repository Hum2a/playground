(() => {
  const root = document.querySelector('[data-pmrc]')
  if (!root) return
  const live = root.querySelector('[data-pmrc-live]')
  const rank = root.querySelector('[data-pmrc-rank]')
  const fill = root.querySelector('[data-pmrc-fill]')
  const complete = root.querySelector('[data-pmrc-complete]')
  const reset = root.querySelector('[data-pmrc-reset]')
  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.forceReducedMotion === 'true'
  complete.addEventListener('click', () => {
    if (reduced()) {
      root.dataset.phase = 'max'
      rank.textContent = 'MAX'
      fill.style.width = '100%'
      if (live) live.textContent = 'Social link max rank complete.'
      return
    }
    root.dataset.phase = 'transform'
    setTimeout(() => {
      root.dataset.phase = 'max'
      rank.textContent = 'MAX'
      fill.style.width = '100%'
      if (live) live.textContent = 'Social link max rank complete.'
    }, 700)
  })
  reset.addEventListener('click', () => {
    root.dataset.phase = 'rank9'
    rank.textContent = 'RANK 9'
    fill.style.width = '88%'
    if (live) live.textContent = 'Social link rank 9.'
  })
})()