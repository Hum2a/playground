/**
 * VHS Tracking Scrub — slider introduces then removes horizontal tracking errors.
 * Tear periods frozen: error 180ms, severe 100ms. Center 50, errorBand 18.
 * iframe-safe; no storage / parent / network.
 */

const CENTER = 50
const ERROR_BAND = 18
const CLEAN_BAND = 4

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
  if (dist <= CLEAN_BAND) return 'clean'
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

export function resetVhsTracking() {
  const range = rangeEl()
  if (range) range.value = String(CENTER)
  applyValue(CENTER)
}

function bindUi() {
  const range = rangeEl()
  if (!range) return

  range.addEventListener('input', () => {
    applyValue(Number(range.value))
  })

  document.querySelector('[data-vts-reset]')?.addEventListener('click', resetVhsTracking)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetVhsTracking()
  })
}

bindUi()
applyValue(Number(rangeEl()?.value ?? CENTER))
