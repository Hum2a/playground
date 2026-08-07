;(function () {
  const root = document.querySelector('[data-mdp]')
  if (!root) return

  const runBtn = root.querySelector('[data-mdp-run]')
  const replayBtn = root.querySelector('[data-mdp-replay]')
  const live = root.querySelector('[data-mdp-live]')
  const out = root.querySelector('[data-mdp-out]')
  const DURATION = 620
  let timer = 0

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

  function clearTimer() {
    if (timer) {
      window.clearTimeout(timer)
      timer = 0
    }
  }

  function reset() {
    clearTimer()
    root.dataset.state = 'ready'
    if (out) {
      out.style.visibility = ''
      out.style.clipPath = ''
    }
    if (runBtn) runBtn.hidden = false
    if (replayBtn) replayBtn.hidden = true
    setLive('Manga diagonal panel wipe ready.')
  }

  function finish() {
    root.dataset.state = 'done'
    if (out) out.style.visibility = 'hidden'
    if (runBtn) runBtn.hidden = true
    if (replayBtn) replayBtn.hidden = false
    setLive('Manga diagonal panel wipe complete. Destination shown.')
  }

  function play() {
    clearTimer()
    if (out) {
      out.style.visibility = ''
      out.style.clipPath = ''
    }
    root.dataset.state = 'playing'
    setLive('Manga diagonal panel wipe running.')

    if (prefersReduced()) {
      finish()
      return
    }

    timer = window.setTimeout(finish, DURATION)
  }

  runBtn?.addEventListener('click', play)
  replayBtn?.addEventListener('click', () => {
    reset()
    // Force reflow so replay restarts animations from the exact start state.
    void root.offsetWidth
    play()
  })
})()
