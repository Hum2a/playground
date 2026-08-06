/**
 * System Notification Slide (SPX-3408) — sandbox-safe PlayStation specimen.
 */

const DWELL = 2600
const ENTRY = 320
const EXIT = 280
let timers = []
function root() { return document.querySelector('[data-ps="system-notification-slide"]') }
function clearT() { timers.forEach((id) => clearTimeout(id)); timers = [] }
function later(ms, fn) { const id = setTimeout(fn, ms); timers.push(id) }
function show() {
  clearT()
  const n = root()?.querySelector('[data-sns-notify]')
  const status = root()?.querySelector('[data-sns-status]')
  if (!n) return
  n.hidden = false
  n.classList.remove('is-exit')
  requestAnimationFrame(() => n.classList.add('is-visible'))
  if (status) status.textContent = 'Notification entered — dwelling.'
  later(DWELL, () => {
    n.classList.remove('is-visible')
    n.classList.add('is-exit')
    if (status) status.textContent = 'Notification exiting.'
    later(EXIT, () => { n.hidden = true; n.classList.remove('is-exit'); if (status) status.textContent = 'Idle — no system toast.' })
  })
}
function reset() { clearT(); const n = root()?.querySelector('[data-sns-notify]'); if (n) { n.hidden = true; n.classList.remove('is-visible', 'is-exit') } }
function bind() {
  root()?.querySelector('[data-sns-show]')?.addEventListener('click', show)
  window.addEventListener('message', (e) => { if (e.data?.type === 'restart') reset() })
}
bind()
