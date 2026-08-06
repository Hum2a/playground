(() => {
  const root = document.querySelector('[data-ccs]')
  if (!root) return
  const live = root.querySelector('[data-ccs-live]')
  const confront = root.querySelector('[data-ccs-confront]')
  const dismiss = root.querySelector('[data-ccs-dismiss]')
  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.forceReducedMotion === 'true'
  confront.addEventListener('click', () => {
    root.dataset.phase = reduced() ? 'shown' : 'slam'
    if (live) live.textContent = 'Confrontation card active.'
    if (!reduced()) setTimeout(() => { root.dataset.phase = 'shown' }, 480)
  })
  dismiss.addEventListener('click', () => {
    root.dataset.phase = 'idle'
    if (live) live.textContent = 'Exploration in progress.'
  })
})()