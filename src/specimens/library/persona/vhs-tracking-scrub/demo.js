/**
 * VHS Tracking Scrub — slider introduces then removes horizontal tracking errors.
 * iframe-safe; no storage / parent / network.
 */

const CENTER = 50
const ERROR_BAND = 18

function rootEl() {
  return document.querySelector('[data-vts]')
}

function rangeEl() {
  return document.querySelector('[data-vts-range]')
}

function setLive(text) {
  const el = document.querySelector('[data-vts-live]')
  if (el) el.textContent = text
}

function phaseForValue(value) {
  const dist = Math.abs(value - CENTER)
  if (dist <= 4) return 'clean'
  if (dist <= ERROR_BAND) return 'error'
  return 'severe'
}

function applyValue(value) {
  const root = rootEl()
  const range = rangeEl()
  if (!root || !range) return

  const phase = phaseForValue(value)
  root.setAttribute('data-phase', phase)
  range.setAttribute('aria-valuenow', String(value))

  if (phase === 'clean') {
    setLive('Tracking stable.')
  } else if (phase === 'error') {
    setLive('Tracking error detected. Adjust dial.')
  } else {
    setLive('Severe tracking distortion.')
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
      range.value = String(CENTER)
      applyValue(CENTER)
    }
  })
}

bindUi()
applyValue(Number(rangeEl()?.value ?? CENTER))
