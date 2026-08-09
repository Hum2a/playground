(() => {
  const root = document.querySelector('[data-results]')
  if (!root) return
  const start = root.querySelector('[data-start]')
  const rows = [...root.querySelectorAll('[data-row]')]
  const status = root.querySelector('[data-status]')
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || Boolean(document.querySelector('[data-force-reduced-motion="true"]'))
  const reveal = () => {
    root.dataset.state = 'open'
    rows.forEach((row, index) => {
      const output = row.querySelector('b')
      const final = row.dataset.value
      const duration = reduced ? 0 : 450
      const began = performance.now() + index * 80
      const tick = (now) => {
        const progress = Math.min(1, Math.max(0, (now - began) / duration))
        output.textContent = progress === 1 ? final : final.includes(':') ? '00:00' : '00'.padEnd(final.length, '0')
        if (progress < 1) requestAnimationFrame(tick)
        else if (index === rows.length - 1) { root.classList.add('is-clear'); status.textContent = 'Operation clear' }
      }
      requestAnimationFrame(tick)
    })
  }
  start.addEventListener('click', reveal)
})()
