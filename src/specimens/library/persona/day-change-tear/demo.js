/**
 * Day Change Tear — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * NEXT tears the current sheet; PREVIOUS inserts a replacement sheet.
 */

const RUPTURE_MS = 120
const TEAR_MS = 200
const PULL_MS = 300
const SETTLE_MS = 160
/** NEXT total ≈ 760ms (rupture + tear + pull; settle overlaps end of pull) */
const NEXT_TOTAL_MS = 760
const PREV_MS = 420

const PHASES = [
  'dct--rupture',
  'dct--tear',
  'dct--pull',
  'dct--settle',
  'dct--insert',
]

/** Deterministic demo dates — no Date API. */
const DATES = [
  {
    month: 'AUGUST',
    day: '06',
    weekday: 'THURSDAY',
    announce: 'Thursday, 6 August',
  },
  {
    month: 'AUGUST',
    day: '07',
    weekday: 'FRIDAY',
    announce: 'Friday, 7 August',
  },
  {
    month: 'AUGUST',
    day: '08',
    weekday: 'SATURDAY',
    announce: 'Saturday, 8 August',
  },
]

let index = 0
let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function root() {
  return document.querySelector('[data-day-change]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function wrap(i) {
  const n = DATES.length
  return ((i % n) + n) % n
}

function fillFace(face, date) {
  if (!face || !date) return
  const month = face.querySelector('[data-dct-month]')
  const day = face.querySelector('[data-dct-day]')
  const weekday = face.querySelector('[data-dct-weekday]')
  if (month) month.textContent = date.month
  if (day) day.textContent = date.day
  if (weekday) weekday.textContent = date.weekday
}

function fillSheet(sheet, date) {
  if (!sheet) return
  sheet.querySelectorAll('[data-dct-face]').forEach((face) => {
    fillFace(face, date)
  })
}

function announce(date) {
  const live = document.querySelector('[data-dct-live]')
  if (live) live.textContent = date.announce
}

function clearPhases(el) {
  el.classList.remove(...PHASES)
}

function setControlsEnabled(on) {
  const el = root()
  if (!el) return
  el.querySelectorAll('[data-dct-prev], [data-dct-next]').forEach((btn) => {
    btn.disabled = !on
  })
}

/**
 * Rebuild idle stack: under = next date already present; current = visible date.
 * Fixed DOM nodes — no accumulation.
 */
function syncIdle() {
  const el = root()
  if (!el) return

  const current = el.querySelector('[data-dct-current]')
  const under = el.querySelector('[data-dct-under]')
  const incoming = el.querySelector('[data-dct-incoming]')

  clearPhases(el)
  clearTimers()

  fillSheet(current, DATES[index])
  fillSheet(under, DATES[wrap(index + 1)])
  fillSheet(incoming, DATES[wrap(index - 1)])

  if (incoming) {
    incoming.hidden = true
    incoming.removeAttribute('data-active')
  }
  if (current) current.hidden = false

  el.setAttribute('data-index', String(index))
  announce(DATES[index])
  busy = false
  setControlsEnabled(true)
}

/**
 * Advance one day with tear choreography.
 * @returns {Promise<void>}
 */
export function nextDayTear() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  if (prefersReducedMotion()) {
    index = wrap(index + 1)
    syncIdle()
    return Promise.resolve()
  }

  busy = true
  setControlsEnabled(false)
  clearTimers()
  clearPhases(el)

  const under = el.querySelector('[data-dct-under]')
  fillSheet(under, DATES[wrap(index + 1)])
  fillSheet(el.querySelector('[data-dct-current]'), DATES[index])

  void el.offsetWidth
  el.classList.add('dct--rupture')

  return new Promise((resolve) => {
    later(RUPTURE_MS, () => {
      el.classList.remove('dct--rupture')
      el.classList.add('dct--tear')
    })

    later(RUPTURE_MS + TEAR_MS, () => {
      el.classList.remove('dct--tear')
      el.classList.add('dct--pull')
    })

    // Settle overlaps late pull: 600–760ms window
    later(600, () => {
      el.classList.add('dct--settle')
    })

    later(NEXT_TOTAL_MS, () => {
      index = wrap(index + 1)
      syncIdle()
      resolve()
    })
  })
}

/**
 * Step back with paper insertion (not reverse tear).
 * @returns {Promise<void>}
 */
export function previousDayInsert() {
  const el = root()
  if (!el || busy) return Promise.resolve()

  if (prefersReducedMotion()) {
    index = wrap(index - 1)
    syncIdle()
    return Promise.resolve()
  }

  busy = true
  setControlsEnabled(false)
  clearTimers()
  clearPhases(el)

  const incoming = el.querySelector('[data-dct-incoming]')
  const prev = DATES[wrap(index - 1)]
  fillSheet(incoming, prev)
  if (incoming) {
    incoming.hidden = false
    incoming.setAttribute('data-active', 'true')
  }

  void el.offsetWidth
  el.classList.add('dct--insert')

  return new Promise((resolve) => {
    later(PREV_MS, () => {
      index = wrap(index - 1)
      syncIdle()
      resolve()
    })
  })
}

/** Reset to Thursday 6 August. */
export function resetDayChange() {
  clearTimers()
  index = 0
  syncIdle()
}

function bind() {
  const el = root()
  if (!el) return

  el.querySelector('[data-dct-next]')?.addEventListener('click', () => {
    void nextDayTear()
  })
  el.querySelector('[data-dct-prev]')?.addEventListener('click', () => {
    void previousDayInsert()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetDayChange()
  })
}

bind()
syncIdle()
