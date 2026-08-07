/**
 * Day Change Card — peel current day away (600ms).
 * iframe-safe; no storage / parent / network.
 */

const PEEL_MS = 600

const days = [
  { day: '06', week: 'THU', announce: 'Thursday, 6 August' },
  { day: '07', week: 'FRI', announce: 'Friday, 7 August' },
  { day: '08', week: 'SAT', announce: 'Saturday, 8 August' },
]

let idx = 0
let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-dcc]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setLive(text) {
  const el = document.querySelector('[data-dcc-live]')
  if (el) el.textContent = text
}

function render(i) {
  const root = rootEl()
  const current = document.querySelector('[data-dcc-current]')
  if (!root || !current) return
  const d = days[i]
  current.querySelector('.dcc__day').textContent = d.day
  current.querySelector('.dcc__week').textContent = d.week
  setLive(d.announce)
  const next = days[Math.min(i + 1, days.length - 1)]
  const nextCard = root.querySelector('.dcc__card--next')
  if (nextCard) {
    nextCard.querySelector('.dcc__day').textContent = next.day
    nextCard.querySelector('.dcc__week').textContent = next.week
  }
}

export function runDayChange() {
  const root = rootEl()
  if (!root || busy || idx >= days.length - 1) return Promise.resolve()

  busy = true
  clearTimers()

  if (prefersReducedMotion()) {
    idx += 1
    render(idx)
    root.setAttribute('data-phase', 'idle')
    busy = false
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'slide')
  return new Promise((resolve) => {
    later(PEEL_MS, () => {
      idx += 1
      render(idx)
      root.setAttribute('data-phase', 'idle')
      busy = false
      resolve()
    })
  })
}

export function resetDayChange() {
  clearTimers()
  busy = false
  idx = 0
  const root = rootEl()
  if (root) root.setAttribute('data-phase', 'idle')
  render(0)
}

function bindUi() {
  document.querySelector('[data-dcc-next]')?.addEventListener('click', () => {
    void runDayChange()
  })
  document.querySelector('[data-dcc-reset]')?.addEventListener('click', resetDayChange)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetDayChange()
  })
}

bindUi()
resetDayChange()
