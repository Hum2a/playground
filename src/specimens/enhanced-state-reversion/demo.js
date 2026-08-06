;(() => {
  const root = document.querySelector('[data-esr]')
  if (!(root instanceof HTMLElement)) return

  const revertBtn = root.querySelector('[data-esr-revert]')
  const resetBtn = root.querySelector('[data-esr-reset]')
  const status = root.querySelector('[data-esr-status]')
  const stateEl = root.querySelector('[data-esr-state]')
  const capacityEl = root.querySelector('[data-esr-capacity]')
  const channelsEl = root.querySelector('[data-esr-channels]')
  const tasksEl = root.querySelector('[data-esr-tasks]')
  const modeEl = root.querySelector('[data-esr-mode]')

  if (
    !(revertBtn instanceof HTMLButtonElement) ||
    !(resetBtn instanceof HTMLButtonElement) ||
    !(status instanceof HTMLElement) ||
    !(stateEl instanceof HTMLElement) ||
    !(capacityEl instanceof HTMLElement) ||
    !(channelsEl instanceof HTMLElement) ||
    !(tasksEl instanceof HTMLElement) ||
    !(modeEl instanceof HTMLElement)
  ) {
    return
  }

  // Frozen timeline (portable contract).
  const FIELD_STOP_HOLD_MS = 70
  const FIELD_RETRACT_MS = 140
  const PAIR_MS = 90
  const FOLD_MS = 180
  const SETTLE_MS = 160

  const TASKS_DONE = '42'

  /** @type {number[]} */
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
    revertBtn.disabled = busy || root.dataset.state === 'base'
  }

  function ensureTasksDone() {
    // Semantic heart: completed work never resets or animates backward.
    tasksEl.textContent = TASKS_DONE
  }

  function setMetrics({ state, capacity, channels }) {
    if (state != null) stateEl.textContent = state
    if (capacity != null) capacityEl.textContent = capacity
    if (channels != null) {
      channelsEl.textContent = String(channels)
      root.dataset.channels = String(channels)
    }
    ensureTasksDone()
  }

  function applyBase({ announce } = { announce: true }) {
    clearTimers()
    root.dataset.state = 'base'
    root.dataset.channels = '2'
    root.dataset.phase = 'done'
    root.removeAttribute('data-field')
    modeEl.textContent = 'BASE'
    setMetrics({
      state: 'BASE',
      capacity: '1.0×',
      channels: 2,
    })
    setBusy(false)
    if (announce) {
      setStatus(
        'Capability reverted to base. Two channels remain. Forty-two completed tasks retained.',
      )
    }
  }

  function revert() {
    clearTimers()
    if (root.dataset.state === 'base' || root.dataset.state === 'reverting') return

    if (prefersReduced()) {
      applyBase({ announce: true })
      return
    }

    setBusy(true)
    ensureTasksDone()
    root.dataset.state = 'reverting'
    root.dataset.phase = 'stop'
    root.dataset.field = 'stopped'
    root.dataset.channels = '8'
    modeEl.textContent = 'REVERTING'
    setMetrics({
      state: 'REVERTING',
      capacity: '4.0×',
      channels: 8,
    })
    setStatus(
      'Reverting enhancement. Capability structures retracting. Completed work remains at forty-two.',
    )

    // Phase 1 — release: hold stopped field, then retract.
    later(FIELD_STOP_HOLD_MS, () => {
      root.dataset.phase = 'release'
      ensureTasksDone()
    })

    const channelsAt = FIELD_STOP_HOLD_MS + FIELD_RETRACT_MS

    // Phase 2 — channel reduction in deterministic pairs + capacity stages.
    const pairs = [
      { channels: 6, capacity: '2.5×' },
      { channels: 4, capacity: '1.5×' },
      { channels: 2, capacity: '1.0×' },
    ]

    later(channelsAt, () => {
      root.dataset.phase = 'channels'
    })

    pairs.forEach((step, i) => {
      later(channelsAt + i * PAIR_MS, () => {
        setMetrics({
          state: 'REVERTING',
          capacity: step.capacity,
          channels: step.channels,
        })
      })
    })

    // Phase 3 — geometry fold toward core.
    const foldAt = channelsAt + pairs.length * PAIR_MS
    later(foldAt, () => {
      root.dataset.phase = 'fold'
      ensureTasksDone()
    })

    // Settle: scale 1.02 → 1, STATE → BASE.
    const settleAt = foldAt + FOLD_MS
    later(settleAt, () => {
      root.dataset.phase = 'settle'
      ensureTasksDone()
    })

    later(settleAt + SETTLE_MS, () => {
      applyBase({ announce: true })
    })
  }

  function reset() {
    clearTimers()
    root.dataset.state = 'enhanced'
    root.dataset.channels = '8'
    root.removeAttribute('data-phase')
    root.removeAttribute('data-field')
    modeEl.textContent = 'ENHANCED'
    setMetrics({
      state: 'STAGE III',
      capacity: '4.0×',
      channels: 8,
    })
    revertBtn.disabled = false
    setStatus('Stage III enhanced. Eight channels active. Forty-two tasks completed.')
  }

  revertBtn.addEventListener('click', revert)
  resetBtn.addEventListener('click', reset)

  ensureTasksDone()
  window.enhancedStateReversion = { revert, reset }
})()
