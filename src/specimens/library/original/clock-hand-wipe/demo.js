;(() => {
  const root = document.querySelector('[data-clock-wipe]')
  if (!(root instanceof HTMLElement)) return

  const wipeBtn = root.querySelector('[data-cw-wipe]')
  const resetBtn = root.querySelector('[data-cw-reset]')
  const status = root.querySelector('[data-cw-status]')
  const dest = root.querySelector('[data-cw-dest]')

  if (
    !(wipeBtn instanceof HTMLButtonElement) ||
    !(resetBtn instanceof HTMLButtonElement) ||
    !(status instanceof HTMLElement) ||
    !(dest instanceof HTMLElement)
  ) {
    return
  }

  const SWEEP_MS = 700
  const CONTRACT_MS = 280
  let raf = 0
  let timers = []

  function prefersReduced() {
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
      document.body?.getAttribute('data-force-reduced-motion') === 'true'
    )
  }

  function clearTimers() {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    for (const id of timers) clearTimeout(id)
    timers = []
  }

  function setSweep(deg) {
    root.style.setProperty('--cw-sweep', String(deg))
  }

  function setStatus(text) {
    status.textContent = text
  }

  function setBusy(busy) {
    wipeBtn.disabled = busy
  }

  function finishDone() {
    setSweep(360)
    root.dataset.state = 'done'
    dest.removeAttribute('aria-hidden')
    setBusy(false)
    setStatus('Destination. Full radial coverage.')
  }

  function runWipe() {
    clearTimers()
    if (root.dataset.state === 'done' || root.dataset.state === 'wiping') return

    if (prefersReduced()) {
      finishDone()
      return
    }

    setBusy(true)
    setSweep(0)
    root.dataset.state = 'wiping'
    dest.setAttribute('aria-hidden', 'true')
    setStatus('Clock-hand wipe in progress.')

    const start = performance.now()

    const tick = (now) => {
      const t = Math.min(1, (now - start) / SWEEP_MS)
      // Ease slightly into the sweep without softening the hard sector edge.
      const eased = 1 - Math.pow(1 - t, 1.35)
      setSweep(eased * 360)

      if (t < 1) {
        raf = requestAnimationFrame(tick)
        return
      }

      setSweep(360)
      root.dataset.state = 'contracting'
      setStatus('Hands contracting.')

      timers.push(
        setTimeout(() => {
          finishDone()
        }, CONTRACT_MS),
      )
    }

    raf = requestAnimationFrame(tick)
  }

  function reset() {
    clearTimers()
    setSweep(0)
    root.dataset.state = 'idle'
    dest.setAttribute('aria-hidden', 'true')
    setBusy(false)
    setStatus('Current state. Ready to wipe.')
  }

  wipeBtn.addEventListener('click', runWipe)
  resetBtn.addEventListener('click', reset)

  window.clockHandWipe = { wipe: runWipe, reset }
})()
