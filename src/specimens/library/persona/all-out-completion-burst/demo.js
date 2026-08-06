(() => {
  const root = document.querySelector('[data-aocb]')
  if (!root) return
  const live = root.querySelector('[data-aocb-live]')
  const go = root.querySelector('[data-aocb-go]')
  const reset = root.querySelector('[data-aocb-reset]')
  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.forceReducedMotion === 'true'
  go.addEventListener('click', () => {
    if (reduced()) { root.dataset.phase = 'done'; if (live) live.textContent = 'All-out complete. Victory.'; return }
    root.dataset.phase = 'collapse'
    if (live) live.textContent = 'All-out attack…'
    setTimeout(() => { root.dataset.phase = 'burst'; }, 320)
    setTimeout(() => { root.dataset.phase = 'done'; if (live) live.textContent = 'All-out complete. Victory.'; }, 780)
  })
  reset.addEventListener('click', () => { root.dataset.phase = 'idle'; if (live) live.textContent = 'Enemies active.' })
})()