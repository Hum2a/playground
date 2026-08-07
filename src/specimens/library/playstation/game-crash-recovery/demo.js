/**
 * Game Crash Recovery (SPX-3455) — sandbox-safe PlayStation specimen.
 */

let crashed = false

function root() {
  return document.querySelector('[data-ps="game-crash-recovery"]')
}

function paint() {
  const r = root()
  r?.querySelector('[data-gcr-stage]')?.setAttribute('data-phase', crashed ? 'crashed' : 'playing')
  const err = r?.querySelector('[data-gcr-error]')
  if (err) err.hidden = !crashed
  r?.querySelector('[data-gcr-status]')?.replaceChildren(
    document.createTextNode(
      crashed ? 'Crash report visible — choose retry or close.' : 'Game running normally.',
    ),
  )
  r?.querySelector('[data-gcr-crash]')?.replaceChildren(
    document.createTextNode(crashed ? 'RESET' : 'SIMULATE CRASH'),
  )
}

function reset() {
  crashed = false
  paint()
}

function bind() {
  const r = root()
  r?.querySelector('[data-gcr-crash]')?.addEventListener('click', () => {
    crashed = !crashed
    paint()
  })
  r?.querySelector('[data-gcr-retry]')?.addEventListener('click', reset)
  r?.querySelector('[data-gcr-close]')?.addEventListener('click', reset)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
  paint()
}

bind()
