;(function () {
  const root = document.querySelector('[data-mdps-root]')
  if (!root) return

  const openBtn = root.querySelector('[data-mdps-open]')
  const resetBtn = root.querySelector('[data-mdps-reset]')
  const status = root.querySelector('[data-mdps-status]')

  const reduced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
      'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function setOpen(open) {
    root.dataset.state = open ? 'open' : 'idle'
    if (openBtn) openBtn.hidden = open
    if (resetBtn) resetBtn.hidden = !open
    if (status) {
      status.textContent = open
        ? 'Double-page spread open.'
        : 'Spread closed — pages cropped.'
    }
  }

  openBtn?.addEventListener('click', () => setOpen(true))
  resetBtn?.addEventListener('click', () => setOpen(false))

  if (reduced) setOpen(true)
})()
