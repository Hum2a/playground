/**
 * Channel Tuning Scrub — dial through unstable fragments before signal lock.
 * iframe-safe; no storage / parent / network.
 */

const LOCK_THRESHOLD = 78
const PARTIAL_THRESHOLD = 42

function rootEl() {
  return document.querySelector('[data-cts]')
}

function rangeEl() {
  return document.querySelector('[data-cts-range]')
}

function setLive(text) {
  const el = document.querySelector('[data-cts-live]')
  if (el) el.textContent = text
}

function phaseForValue(value) {
  if (value >= LOCK_THRESHOLD) return 'locked'
  if (value >= PARTIAL_THRESHOLD) return 'partial'
  return 'noise'
}

function applyValue(value) {
  const root = rootEl()
  const range = rangeEl()
  if (!root || !range) return

  const phase = phaseForValue(value)
  root.setAttribute('data-phase', phase)
  range.setAttribute('aria-valuenow', String(value))

  if (phase === 'locked') {
    setLive('Signal locked on channel 08.')
  } else if (phase === 'partial') {
    setLive('Fragment stabilising. Keep tuning.')
  } else {
    setLive('Signal unstable. Adjust tuning.')
  }
}

function bindUi() {
  const range = rangeEl()
  if (!range) return

  range.addEventListener('input', () => {
    applyValue(Number(range.value))
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      range.value = '12'
      applyValue(12)
    }
  })
}

bindUi()
applyValue(Number(rangeEl()?.value ?? 12))
