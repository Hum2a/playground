/**
 * System Notification Slide (SPX-3408) — sandbox-safe PlayStation specimen.
 */

const DWELL_MS = 2600
const EXIT_MS = 280
let timers = []

function root() {
  return document.querySelector('[data-ps="system-notification-slide"]')
}

function clearT() {
  timers.forEach((id) => clearTimeout(id))
  timers = []
}

function later(ms, fn) {
  const id = setTimeout(fn, ms)
  timers.push(id)
}

function show() {
  clearT()
  const n = root()?.querySelector('[data-sns-notify]')
  const status = root()?.querySelector('[data-sns-status]')
  if (!n) return
  n.hidden = false
  n.classList.remove('is-exit')
  requestAnimationFrame(() => n.classList.add('is-visible'))
  if (status) status.textContent = 'Notification entered — dwelling ' + DWELL_MS + 'ms.'
  later(DWELL_MS, () => {
    n.classList.remove('is-visible')
    n.classList.add('is-exit')
    if (status) status.textContent = 'Notification exiting.'
    later(EXIT_MS, () => {
      n.hidden = true
      n.classList.remove('is-exit')
      if (status) status.textContent = 'Idle — no system toast.'
    })
  })
}

function reset() {
  clearT()
  const n = root()?.querySelector('[data-sns-notify]')
  if (n) {
    n.hidden = true
    n.classList.remove('is-visible', 'is-exit')
  }
  const status = root()?.querySelector('[data-sns-status]')
  if (status) status.textContent = 'Idle — no system toast.'
}

function bind() {
  root()?.querySelector('[data-sns-show]')?.addEventListener('click', show)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') reset()
  })
}

bind()
