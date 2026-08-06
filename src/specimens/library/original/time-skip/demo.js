;(() => {
  const root = document.querySelector('[data-time-skip]')
  if (!(root instanceof HTMLElement)) return

  const passBtn = root.querySelector('[data-ts-pass]')
  const resetBtn = root.querySelector('[data-ts-reset]')
  const status = root.querySelector('[data-ts-status]')
  const after = root.querySelector('[data-ts-after]')
  const slices = [...root.querySelectorAll('[data-ts-slice]')]

  if (
    !(passBtn instanceof HTMLButtonElement) ||
    !(resetBtn instanceof HTMLButtonElement) ||
    !(status instanceof HTMLElement) ||
    !(after instanceof HTMLElement) ||
    slices.length !== 5
  ) {
    return
  }

  // Frozen timeline (~480ms total). Deterministic — not a glitch loop.
  const OFFSET_MS = 40
  const HOLD_MS = 60
  const STAGGER_MS = 40
  const REALIGN_MS = 120
  const MARKER_AT = 170
  const MARKER_MS = 140
  const TOTAL_MS = 480

  let timers = []

  function prefersReduced() {
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.getAttribute('data-force-reduced-motion') === 'true' ||
      document.body?.getAttribute('data-force-reduced-motion') === 'true'
    )
  }

  function clearTimers() {
    for (const id of timers) clearTimeout(id)
    timers = []
  }

  function later(ms, fn) {
    timers.push(setTimeout(fn, ms))
  }

  function setStatus(text) {
    status.textContent = text
  }

  function setBusy(busy) {
    passBtn.disabled = busy
  }

  function resetSliceFaces() {
    for (const slice of slices) {
      slice.removeAttribute('data-face')
      slice.style.removeProperty('--ts-x')
    }
  }

  function finishAfter() {
    root.dataset.state = 'after'
    root.removeAttribute('data-phase')
    root.removeAttribute('data-marker')
    after.removeAttribute('aria-hidden')
    resetSliceFaces()
    setBusy(false)
    setStatus('19:10. Evening.')
  }

  function passTime() {
    clearTimers()
    if (root.dataset.state === 'after' || root.dataset.state === 'skipping') return

    if (prefersReduced()) {
      finishAfter()
      return
    }

    setBusy(true)
    resetSliceFaces()
    after.setAttribute('aria-hidden', 'true')
    root.dataset.state = 'skipping'
    root.dataset.phase = 'offset'
    root.removeAttribute('data-marker')
    setStatus('Time skipping.')

    // Hold offsets, then replace slice-by-slice (1→5), then realign.
    later(OFFSET_MS, () => {
      root.dataset.phase = 'hold'
    })

    const replaceStart = OFFSET_MS + HOLD_MS
    later(replaceStart, () => {
      root.dataset.phase = 'replace'
    })

    slices.forEach((slice, i) => {
      later(replaceStart + i * STAGGER_MS, () => {
        slice.setAttribute('data-face', 'after')
      })
    })

    later(MARKER_AT, () => {
      root.dataset.marker = 'on'
    })
    later(MARKER_AT + MARKER_MS, () => {
      root.removeAttribute('data-marker')
    })

    const realignAt = replaceStart + (slices.length - 1) * STAGGER_MS + 20
    later(realignAt, () => {
      root.dataset.phase = 'realign'
    })

    later(TOTAL_MS, () => {
      finishAfter()
    })
  }

  function reset() {
    clearTimers()
    root.dataset.state = 'before'
    root.removeAttribute('data-phase')
    root.removeAttribute('data-marker')
    after.setAttribute('aria-hidden', 'true')
    resetSliceFaces()
    setBusy(false)
    setStatus('16:20. After school.')
  }

  passBtn.addEventListener('click', passTime)
  resetBtn.addEventListener('click', reset)

  window.timeSkip = { pass: passTime, reset }
})()
