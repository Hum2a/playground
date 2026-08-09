(() => {
  const root = document.querySelector('[data-spell-circle]')
  if (!root) return

  const reduced =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
    Boolean(document.querySelector('[data-force-reduced-motion="true"]'))
  const replay = root.querySelector('[data-replay]')
  let finishTimer

  const run = () => {
    clearTimeout(finishTimer)
    root.classList.remove('is-drawing', 'is-complete')

    if (reduced) {
      root.classList.add('is-complete')
      return
    }

    requestAnimationFrame(() => {
      root.classList.add('is-drawing')
      finishTimer = setTimeout(() => {
        root.classList.remove('is-drawing')
        root.classList.add('is-complete')
      }, 620)
    })
  }

  replay.addEventListener('click', run)
  run()
})()
