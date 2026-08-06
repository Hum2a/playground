/**
 * Fog Deadline Escalation — denser fog and warning geometry as deadline closes.
 * iframe-safe; no storage / parent / network.
 */

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
  if (days <= 0) return 'expired'
  if (days <= 3) return 'critical'
  if (days <= 7) return 'pressure'
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
    meter.style.transform = `scaleX(${days / 14})`
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

function bindUi() {
  const range = rangeEl()
  if (!range) return

  range.addEventListener('input', () => {
    applyDays(Number(range.value))
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      range.value = '14'
      applyDays(14)
    }
  })
}

bindUi()
applyDays(Number(rangeEl()?.value ?? 14))
