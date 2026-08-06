(() => {
  const root = document.querySelector('[data-ccn]')
  if (!root) return
  const live = root.querySelector('[data-ccn-live]')
  const sign = root.querySelector('[data-ccn-sign]')
  const reset = root.querySelector('[data-ccn-reset]')
  const reduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.forceReducedMotion === 'true'
  sign.addEventListener('click', () => {
    if (reduced()) { root.dataset.phase = 'signed'; if (live) live.textContent = 'Contract signed and sealed.'; return }
    root.dataset.phase = 'assemble'
    setTimeout(() => { root.dataset.phase = 'seal'; if (live) live.textContent = 'Applying seal…' }, 500)
    setTimeout(() => { root.dataset.phase = 'signed'; if (live) live.textContent = 'Contract signed and sealed.' }, 1000)
  })
  reset.addEventListener('click', () => { root.dataset.phase = 'idle'; if (live) live.textContent = 'Contract pending.' })
})()