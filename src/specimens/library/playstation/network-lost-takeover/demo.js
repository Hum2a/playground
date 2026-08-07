/**
 * Network Lost Takeover (SPX-3441) — sandbox-safe PlayStation specimen.
 */

let online = true

function root() {
  return document.querySelector('[data-ps="network-lost-takeover"]')
}

function paint() {
  const r = root()
  r?.querySelector('[data-nlt-stage]')?.setAttribute('data-phase', online ? 'online' : 'offline')
  const off = r?.querySelector('[data-nlt-offline]')
  if (off) off.hidden = online
  r?.querySelector('[data-nlt-trigger]')?.replaceChildren(
    document.createTextNode(online ? 'LOSE CONNECTION' : 'RESTORE'),
  )
  r?.querySelector('[data-nlt-status]')?.replaceChildren(
    document.createTextNode(
      online ? 'Online — session active.' : 'Offline takeover — play surface dimmed under panel.',
    ),
  )
}

function reset() {
  online = true
  paint()
}

function bind() {
  const r = root()
  r?.querySelector('[data-nlt-trigger]')?.addEventListener('click', () => {
    online = !online
    paint()
  })
  r?.querySelector('[data-nlt-retry]')?.addEventListener('click', () => {
    online = true
    paint()
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  paint()
}

bind()
