;(function () {
  const root = document.querySelector('[data-mps]')
  if (!root) return

  const runBtn = root.querySelector('[data-mps-run]')
  const replayBtn = root.querySelector('[data-mps-replay]')
  const live = root.querySelector('[data-mps-live]')
  const page = root.querySelector('[data-mps-page]')

  const ANTICIPATE_MS = 70
  const MAX_STAGGER_MS = 120
  const FLIGHT_MS = 460
  const TOTAL_MS = ANTICIPATE_MS + MAX_STAGGER_MS + FLIGHT_MS

  const timers = []

  function prefersReduced() {
    return (
      document.documentElement.getAttribute('data-force-reduced-motion') ===
        'true' ||
      (typeof matchMedia === 'function' &&
        matchMedia('(prefers-reduced-motion: reduce)').matches)
    )
  }

  function setLive(text) {
    if (live) live.textContent = text
  }

  function clearTimers() {
    while (timers.length) {
      window.clearTimeout(timers.pop())
    }
  }

  function later(fn, ms) {
    timers.push(window.setTimeout(fn, ms))
  }

  function resetPanels() {
    root.querySelectorAll('[data-panel]').forEach((el) => {
      el.style.transform = ''
      el.style.opacity = ''
      el.style.transitionDelay = ''
    })
    if (page) page.style.visibility = ''
  }

  function reset() {
    clearTimers()
    root.dataset.state = 'ready'
    resetPanels()
    if (runBtn) runBtn.hidden = false
    if (replayBtn) replayBtn.hidden = true
    setLive('Manga panel shatter ready.')
  }

  function finish() {
    root.dataset.state = 'done'
    if (page) page.style.visibility = 'hidden'
    if (runBtn) runBtn.hidden = true
    if (replayBtn) replayBtn.hidden = false
    setLive('Manga panel shatter complete. Destination shown.')
  }

  function play() {
    clearTimers()
    resetPanels()

    if (prefersReduced()) {
      root.dataset.state = 'done'
      finish()
      return
    }

    root.dataset.state = 'anticipate'
    setLive('Manga panel shatter anticipating.')

    later(() => {
      root.dataset.state = 'shatter'
      setLive('Manga panel shatter flying.')
    }, ANTICIPATE_MS)

    later(finish, TOTAL_MS)
  }

  runBtn?.addEventListener('click', play)
  replayBtn?.addEventListener('click', () => {
    reset()
    void root.offsetWidth
    play()
  })
})()
