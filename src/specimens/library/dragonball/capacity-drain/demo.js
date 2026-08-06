/**
 * SPX-1210 Capacity Drain
 * Process B extracts capacity from Service A until SAFE MIN 30.
 *
 * Timing (ms) from START DRAIN:
 *   0–180       connection line B→A
 *   180         four brackets lock; A CONNECTED
 *   packets:    6 × 10 capacity, travel 240ms, spacing 110ms
 *   on arrival: metrics + strip A bar / grow B bar
 *   after last: brackets detach; line breaks into 5 segments → B (140ms)
 *
 * Metrics after arrivals: 80/20 … 30/70. Total always 100.
 */

const CONNECT_MS = 180
const TRAVEL_MS = 240
const SPACING_MS = 110
const DISCONNECT_MS = 140
const PACKET_COUNT = 6
const PACKET_VALUE = 10
const SAFE_MIN = 30

const METRICS = [
  [80, 20],
  [70, 30],
  [60, 40],
  [50, 50],
  [40, 60],
  [30, 70],
]

/** @type {number[]} */
let timers = []
let busy = false
let done = false
let capA = 90
let capB = 10

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-capacity-drain]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setAnnounce(root, text) {
  const el = root.querySelector('[data-cdr-announce]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function setStatus(root, text) {
  const el = root.querySelector('[data-cdr-status]')
  if (el) el.textContent = text
}

function setCaps(root, a, b) {
  capA = a
  capB = b
  const ea = root.querySelector('[data-cdr-cap-a]')
  const eb = root.querySelector('[data-cdr-cap-b]')
  if (ea) ea.textContent = String(a)
  if (eb) eb.textContent = String(b)
}

function setControls(root, { start, resetVisible }) {
  const s = root.querySelector('[data-cdr-start]')
  const r = root.querySelector('[data-cdr-reset]')
  if (s) s.disabled = !start
  if (r) r.hidden = !resetVisible
}

function syncBars(root, a, b) {
  // A: 9 bars for 90; visible count = a/10
  const aCount = Math.round(a / 10)
  root.querySelectorAll('[data-cdr-bar-a]').forEach((bar, i) => {
    bar.classList.toggle('is-on', i < aCount)
    bar.classList.toggle('is-safe', i < SAFE_MIN / 10)
  })
  // B: up to 7 bars for 70
  const bCount = Math.round(b / 10)
  root.querySelectorAll('[data-cdr-bar-b]').forEach((bar, i) => {
    bar.classList.toggle('is-on', i < bCount)
  })
}

function clearPhases(root) {
  root.classList.remove(
    'is-connecting',
    'is-locked',
    'is-draining',
    'is-disconnecting',
    'is-complete',
    'is-reduced',
  )
}

function applyIdle(root) {
  clearPhases(root)
  root.dataset.state = 'idle'
  setCaps(root, 90, 10)
  syncBars(root, 90, 10)
  setStatus(root, 'IDLE')
  const packet = root.querySelector('[data-cdr-packet]')
  if (packet) {
    packet.hidden = true
    packet.classList.remove('is-travelling')
  }
}

function applyFinal(root) {
  clearPhases(root)
  root.classList.add('is-complete')
  root.dataset.state = 'complete'
  setCaps(root, 30, 70)
  syncBars(root, 30, 70)
  setStatus(root, 'DRAIN STOPPED')
  setAnnounce(
    root,
    'Process B drained 60 capacity from Service A. Drain stopped at source safe minimum of 30.',
  )
  busy = false
  done = true
  setControls(root, { start: false, resetVisible: true })
}

/**
 * Run capacity drain: B extracts from A until SAFE MIN.
 * @returns {Promise<void>}
 */
export function runCapacityDrain() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  setCaps(root, 90, 10)
  syncBars(root, 90, 10)
  root.dataset.state = 'running'
  setControls(root, { start: false, resetVisible: false })
  setStatus(root, 'CONNECTING')
  setAnnounce(root, 'Process B initiating drain against Service A.')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('is-reduced')
    applyFinal(root)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    root.classList.add('is-connecting')

    later(CONNECT_MS, () => {
      root.classList.remove('is-connecting')
      root.classList.add('is-locked', 'is-draining')
      setStatus(root, 'CONNECTED')
      setAnnounce(root, 'Extraction locked. Draining capacity from Service A.')
    })

    const packet = root.querySelector('[data-cdr-packet]')

    for (let i = 0; i < PACKET_COUNT; i += 1) {
      const launchAt = CONNECT_MS + i * SPACING_MS
      const arriveAt = launchAt + TRAVEL_MS
      const [nextA, nextB] = METRICS[i]

      later(launchAt, () => {
        if (!packet) return
        packet.hidden = false
        packet.classList.remove('is-travelling')
        void packet.offsetWidth
        packet.classList.add('is-travelling')
      })

      later(arriveAt, () => {
        if (packet) {
          packet.classList.remove('is-travelling')
          packet.hidden = true
        }
        setCaps(root, nextA, nextB)
        syncBars(root, nextA, nextB)
        if (nextA === SAFE_MIN) {
          setStatus(root, 'SOURCE LIMIT REACHED')
          setAnnounce(
            root,
            'Source safe minimum reached. Stopping drain.',
          )
        }
      })
    }

    const lastArrive = CONNECT_MS + (PACKET_COUNT - 1) * SPACING_MS + TRAVEL_MS

    later(lastArrive + 40, () => {
      root.classList.remove('is-draining', 'is-locked')
      root.classList.add('is-disconnecting')
      setStatus(root, 'DRAIN STOPPED')
    })

    later(lastArrive + 40 + DISCONNECT_MS, () => {
      applyFinal(root)
      resolve()
    })
  })
}

/**
 * Restore 90/10 idle state.
 * @returns {Promise<void>}
 */
export function resetCapacityDrain() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  applyIdle(root)
  setAnnounce(root, '')
  setControls(root, { start: true, resetVisible: false })
  void root.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  const root = rootEl()
  if (!root || root.dataset.cdrBound === '1') return
  root.dataset.cdrBound = '1'

  applyIdle(root)
  setControls(root, { start: true, resetVisible: false })

  root.querySelector('[data-cdr-start]')?.addEventListener('click', () => {
    void runCapacityDrain()
  })

  root.querySelector('[data-cdr-reset]')?.addEventListener('click', () => {
    void resetCapacityDrain()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void resetCapacityDrain()
  })
}

bindUi()
