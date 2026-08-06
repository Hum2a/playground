/**
 * Control Center Rise — bottom strip rises over active game surface.
 * iframe-safe; no storage / parent / network.
 */

function root() {
  return document.querySelector('[data-ccr]')
}

function setLive(text) {
  const el = document.querySelector('[data-ccr-live]')
  if (el) el.textContent = text
}

function setToggleLabel(open) {
  const btn = document.querySelector('[data-ccr-toggle]')
  if (btn) btn.textContent = open ? 'Dismiss' : 'Open'
}

export function openControlCenter() {
  const r = root()
  if (!r || r.getAttribute('data-phase') === 'open') return
  r.setAttribute('data-phase', 'open')
  setToggleLabel(true)
  setLive('Control center open.')
}

export function dismissControlCenter() {
  const r = root()
  if (!r || r.getAttribute('data-phase') === 'closed') return
  r.setAttribute('data-phase', 'closed')
  setToggleLabel(false)
  setLive('Control center closed.')
}

export function toggleControlCenter() {
  const r = root()
  if (!r) return
  if (r.getAttribute('data-phase') === 'open') dismissControlCenter()
  else openControlCenter()
}

function bind() {
  document.querySelector('[data-ccr-toggle]')?.addEventListener('click', () => {
    toggleControlCenter()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') dismissControlCenter()
  })
}

bind()
dismissControlCenter()
