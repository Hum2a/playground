/**
 * Lunar Calendar Change — tiny portable trigger API.
 * Deterministic demo dates only. iframe-safe; no parent / storage / network.
 */

const MOVE_MS = 360

const DATES = [
  {
    day: '17',
    weekday: 'WEDNESDAY',
    phase: 'CRESCENT',
    phaseKey: 'crescent',
    announce: 'Wednesday 17 June 2026, crescent moon',
  },
  {
    day: '18',
    weekday: 'THURSDAY',
    phase: 'CRESCENT',
    phaseKey: 'crescent',
    announce: 'Thursday 18 June 2026, crescent moon',
  },
  {
    day: '19',
    weekday: 'FRIDAY',
    phase: 'HALF',
    phaseKey: 'half',
    announce: 'Friday 19 June 2026, half moon',
  },
  {
    day: '20',
    weekday: 'SATURDAY',
    phase: 'GIBBOUS',
    phaseKey: 'gibbous',
    announce: 'Saturday 20 June 2026, gibbous moon',
  },
  {
    day: '21',
    weekday: 'SUNDAY',
    phase: 'GIBBOUS',
    phaseKey: 'gibbous',
    announce: 'Sunday 21 June 2026, gibbous moon',
  },
]

let idx = 0
let busy = false
/** @type {number} */
let timer = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const closest = document.querySelector('[data-force-reduced-motion="true"]')
  return forced || !!closest || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-lcc]')
}

function wait(ms) {
  return new Promise((resolve) => {
    window.clearTimeout(timer)
    timer = window.setTimeout(resolve, ms)
  })
}

function fillDate(node, entry) {
  if (!node || !entry) return
  const day = node.querySelector('.lcc__day')
  const weekday = node.querySelector('.lcc__weekday')
  const phase = node.querySelector('.lcc__phase')
  if (day) day.textContent = entry.day
  if (weekday) weekday.textContent = entry.weekday
  if (phase) phase.textContent = entry.phase
}

function syncControls() {
  const prev = document.querySelector('[data-lcc-prev]')
  const next = document.querySelector('[data-lcc-next]')
  if (prev) prev.disabled = idx <= 0 || busy
  if (next) next.disabled = idx >= DATES.length - 1 || busy
}

function renderSettled() {
  const root = rootEl()
  const entry = DATES[idx]
  const currentDate = document.querySelector('[data-lcc-date-a]')
  const nextDate = document.querySelector('[data-lcc-date-b]')
  const moonA = document.querySelector('[data-lcc-moon-a]')
  const moonB = document.querySelector('[data-lcc-moon-b]')
  const live = document.querySelector('[data-lcc-live]')
  if (!root || !entry) return

  fillDate(currentDate, entry)
  fillDate(nextDate, entry)
  moonA?.setAttribute('data-phase', entry.phaseKey)
  moonB?.setAttribute('data-phase', entry.phaseKey)
  if (live) live.textContent = entry.announce
  root.setAttribute('data-phase', 'idle')
  root.removeAttribute('data-dir')
  syncControls()
}

/**
 * Step −1 (previous) or +1 (next) through the demo dates.
 * @param {number} delta
 */
export async function stepCalendar(delta) {
  const root = rootEl()
  const nextIdx = idx + delta
  if (!root || busy || nextIdx < 0 || nextIdx >= DATES.length) return

  busy = true
  syncControls()

  const incoming = DATES[nextIdx]
  const nextDate = document.querySelector('[data-lcc-date-b]')
  const moonB = document.querySelector('[data-lcc-moon-b]')
  fillDate(nextDate, incoming)
  moonB?.setAttribute('data-phase', incoming.phaseKey)

  if (prefersReducedMotion()) {
    idx = nextIdx
    busy = false
    renderSettled()
    return
  }

  root.setAttribute('data-dir', delta > 0 ? 'next' : 'prev')
  root.setAttribute('data-phase', 'slide')
  await wait(MOVE_MS)
  idx = nextIdx
  busy = false
  renderSettled()
}

export function resetCalendar() {
  window.clearTimeout(timer)
  busy = false
  idx = 0
  renderSettled()
}

function bindUi() {
  document.querySelector('[data-lcc-prev]')?.addEventListener('click', () => {
    void stepCalendar(-1)
  })
  document.querySelector('[data-lcc-next]')?.addEventListener('click', () => {
    void stepCalendar(1)
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetCalendar()
  })
}

bindUi()
resetCalendar()
