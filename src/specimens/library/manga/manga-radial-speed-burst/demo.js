;(function () {
  const root = document.querySelector('[data-mrsb-root]')
  if (!root) return

  const fireBtn = root.querySelector('[data-mrsb-fire]')
  const resetBtn = root.querySelector('[data-mrsb-reset]')
  const cardBtn = root.querySelector('[data-mrsb-burst]')
  const status = root.querySelector('[data-mrsb-status]')

  const reduced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
      'true' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const DURATION_MS = 420
  let timer = 0

  function clearTimer() {
    if (timer) {
      window.clearTimeout(timer)
      timer = 0
    }
  }

  function setStatus(text) {
    if (status) status.textContent = text
  }

  function idle() {
    clearTimer()
    root.dataset.state = 'idle'
    if (fireBtn) fireBtn.hidden = false
    if (resetBtn) resetBtn.hidden = true
    setStatus('Ready — radial speed burst idle.')
  }

  function burst() {
    clearTimer()
    if (reduced) {
      root.dataset.state = 'emphasised'
      if (fireBtn) fireBtn.hidden = true
      if (resetBtn) resetBtn.hidden = false
      setStatus('Emphasised — static rays, no motion.')
      return
    }

    root.dataset.state = 'idle'
    void root.offsetWidth
    root.dataset.state = 'burst'
    if (fireBtn) fireBtn.hidden = true
    if (resetBtn) resetBtn.hidden = false
    setStatus('Burst — 36 speed lines.')

    timer = window.setTimeout(() => {
      root.dataset.state = 'idle'
      if (fireBtn) fireBtn.hidden = false
      if (resetBtn) resetBtn.hidden = true
      setStatus('Complete — burst cleared.')
      timer = 0
    }, DURATION_MS)
  }

  fireBtn?.addEventListener('click', burst)
  cardBtn?.addEventListener('click', burst)
  resetBtn?.addEventListener('click', idle)

  if (reduced) {
    root.dataset.state = 'emphasised'
    if (fireBtn) fireBtn.hidden = true
    if (resetBtn) resetBtn.hidden = false
    setStatus('Emphasised — static rays, no motion.')
  }
})()
