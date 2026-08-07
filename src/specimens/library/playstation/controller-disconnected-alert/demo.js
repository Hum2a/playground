/**
 * Controller Disconnected Alert (SPX-3415) — system-priority modal over play.
 */

function status(t) {
  const el = document.querySelector('[data-cda-status]')
  if (el) el.textContent = t
}

function show() {
  const overlay = document.querySelector('[data-cda-overlay]')
  if (overlay) overlay.hidden = false
  status('System alert — controller disconnected')
}

function hide() {
  const overlay = document.querySelector('[data-cda-overlay]')
  if (overlay) overlay.hidden = true
  status('Playing — controller connected')
}

function bind() {
  document.querySelector('[data-cda-trigger]')?.addEventListener('click', show)
  document.querySelector('[data-cda-dismiss]')?.addEventListener('click', hide)
  addEventListener('message', (e) => {
    if (e.data?.type === 'restart') hide()
  })
}

bind()
