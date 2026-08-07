/**
 * No Signal Card — broadcast-style fallback for unavailable content.
 * Snow loops while unavailable; toggle is one-shot state swap.
 * iframe-safe; no storage / parent / network.
 */

function rootEl() {
  return document.querySelector('[data-nsc]')
}

function setLive(text) {
  const el = document.querySelector('[data-nsc-live]')
  if (el) el.textContent = text
}

function setState(state) {
  const root = rootEl()
  const title = document.querySelector('.nsc__title')
  const copy = document.querySelector('.nsc__copy')
  const icon = document.querySelector('.nsc__icon')
  if (!root || !title || !copy || !icon) return

  root.setAttribute('data-state', state)

  if (state === 'available') {
    title.textContent = 'Feed Online'
    copy.textContent = 'Broadcast content is now available.'
    icon.textContent = '●'
    setLive('Content available. Signal restored.')
  } else {
    title.textContent = 'NO SIGNAL'
    copy.textContent = 'Broadcast feed unavailable for this slot.'
    icon.textContent = '▲'
    setLive('Content unavailable. No signal fallback shown.')
  }
}

export function resetNoSignal() {
  setState('unavailable')
}

export function toggleNoSignal() {
  const root = rootEl()
  if (!root) return
  const next = root.getAttribute('data-state') === 'available' ? 'unavailable' : 'available'
  setState(next)
}

function bindUi() {
  document.querySelector('[data-nsc-toggle]')?.addEventListener('click', toggleNoSignal)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetNoSignal()
  })
}

bindUi()
resetNoSignal()
