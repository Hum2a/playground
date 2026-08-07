/**
 * Fog Deadline Escalation — denser fog as deadline closes.
 * Day→density thresholds frozen in contract.json.
 * iframe-safe; no storage / parent / network.
 */

const THRESHOLDS = {
  calm: { minDays: 8 },
  pressure: { minDays: 4, maxDays: 7 },
  critical: { minDays: 1, maxDays: 3 },
  expired: { minDays: 0, maxDays: 0 },
}
const MAX_DAYS = 14

function rootEl() {
  return document.querySelector('[data-fde]')
}

function rangeEl() {
  return document.querySelector('[data-fde-range]')
}

function setLive(text) {
  const el = document.querySelector('[data-fde-live]')
  if (el) el.textContent = text
}

function phaseForDays(days) {
  if (days <= THRESHOLDS.expired.maxDays) return 'expired'
  if (days <= THRESHOLDS.critical.maxDays) return 'critical'
  if (days <= THRESHOLDS.pressure.maxDays) return 'pressure'
  return 'calm'
}

function applyDays(days) {
  const root = rootEl()
  const range = rangeEl()
  const meter = document.querySelector('[data-fde-meter]')
  const daysEl = document.querySelector('[data-fde-days]')
  if (!root || !range) return

  const phase = phaseForDays(days)
  root.setAttribute('data-phase', phase)
  range.setAttribute('aria-valuenow', String(days))

  if (meter) {
    meter.style.transform = `scaleX(${days / MAX_DAYS})`
  }

  if (daysEl) {
    daysEl.textContent = days <= 0 ? 'Deadline passed' : `${days} day${days === 1 ? '' : 's'} left`
  }

  if (phase === 'expired') {
    setLive('Deadline passed. Visibility critically low.')
  } else if (phase === 'critical') {
    setLive('Critical deadline. Dense fog and warnings active.')
  } else if (phase === 'pressure') {
    setLive('Deadline approaching. Fog thickening.')
  } else {
    setLive('Deadline distant. Visibility clear.')
  }
}

export function resetFogDeadline() {
  const range = rangeEl()
  if (range) range.value = String(MAX_DAYS)
  applyDays(MAX_DAYS)
}

function bindUi() {
  const range = rangeEl()
  if (!range) return

  range.addEventListener('input', () => {
    applyDays(Number(range.value))
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetFogDeadline()
  })
}

bindUi()
applyDays(Number(rangeEl()?.value ?? MAX_DAYS))
