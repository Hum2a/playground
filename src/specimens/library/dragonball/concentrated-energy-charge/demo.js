/**
 * SPX-968 Concentrated Energy Charge (DB-003 Kamehameha Charge)
 * Four sources send 3 packets each along frozen paths into a central node.
 *
 * Timing (ms) from CHARGE:
 *   Source starts: BUILD 0 / TEST 80 / PACKAGE 160 / SIGN 240
 *   Packets per source: 3 @ 55ms spacing, travel 300ms each
 *   Last arrival ~650 → stabilize 220 → ARMED (~870)
 *   RELEASE does not execute; state stays static.
 */

const NODE_MIN = 26
const NODE_MAX = 72
const PACKET_GROWTH = (NODE_MAX - NODE_MIN) / 12

const TRAVEL_MS = 300
const SPACING_MS = 55
const STABILISE_MS = 220

/** @type {{ id: string, delay: number, path: string }[]} */
const SOURCES = [
  {
    id: 'build',
    delay: 0,
    path: 'M 48 40 C 100 88, 168 132, 232 150',
  },
  {
    id: 'test',
    delay: 80,
    path: 'M 48 260 C 100 212, 168 168, 232 150',
  },
  {
    id: 'package',
    delay: 160,
    path: 'M 352 40 C 300 88, 268 132, 232 150',
  },
  {
    id: 'sign',
    delay: 240,
    path: 'M 352 260 C 300 212, 268 168, 232 150',
  },
]

/** @type {number[]} */
let timers = []
let busy = false
let armed = false
let arrivals = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-concentrated-charge]')
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
  const el = root.querySelector('[data-cec-announce]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function setStatus(root, text) {
  const el = root.querySelector('[data-cec-status]')
  if (el) el.textContent = text
}

function setNodeSize(root, px) {
  root.style.setProperty('--cec-node', `${px}px`)
}

function clearPackets(root) {
  const host = root.querySelector('[data-cec-packets]')
  if (host) host.replaceChildren()
}

function setActionLabel(root, label, { disabled = false } = {}) {
  const btn = root.querySelector('[data-cec-action]')
  if (!btn) return
  btn.textContent = label
  btn.disabled = disabled
}

function setResetVisible(root, visible) {
  const btn = root.querySelector('[data-cec-reset]')
  if (btn) btn.hidden = !visible
}

function applyArmed(root, { announce = true } = {}) {
  clearPackets(root)
  root.dataset.state = 'armed'
  root.classList.remove('is-charging', 'is-stabilising')
  root.classList.add('is-armed')
  setNodeSize(root, NODE_MAX)
  setStatus(root, 'ARMED')
  setActionLabel(root, 'RELEASE', { disabled: false })
  setResetVisible(root, true)
  busy = false
  armed = true
  if (announce) {
    setAnnounce(
      root,
      'Deploy action armed. Prepared but not executed.',
    )
  }
}

function applyInstantArmed(root) {
  clearTimers()
  clearPackets(root)
  arrivals = 12
  applyArmed(root)
}

function onPacketArrive(root) {
  arrivals += 1
  const size = NODE_MIN + arrivals * PACKET_GROWTH
  setNodeSize(root, Math.min(NODE_MAX, size))

  if (arrivals >= 12) {
    root.classList.remove('is-charging')
    root.classList.add('is-stabilising')
    root.dataset.state = 'stabilising'
    later(STABILISE_MS, () => {
      applyArmed(root)
    })
  }
}

function spawnPacket(root, sourceId, pathD) {
  const host = root.querySelector('[data-cec-packets]')
  if (!host) return

  const packet = document.createElement('span')
  packet.className = `cec__packet cec__packet--${sourceId}`
  packet.style.setProperty('--cec-path', `path('${pathD}')`)
  host.appendChild(packet)
  void packet.offsetWidth
  packet.classList.add('is-travelling')

  later(TRAVEL_MS, () => {
    packet.remove()
    if (!busy && !armed) return
    if (armed) return
    onPacketArrive(root)
  })
}

/**
 * Run charge convergence. Leaves the action ARMED — does not release.
 * @returns {Promise<void>}
 */
export function runConcentratedCharge() {
  const root = rootEl()
  if (!root || busy || armed) return Promise.resolve()

  busy = true
  arrivals = 0
  clearTimers()
  clearPackets(root)
  root.classList.remove('is-armed', 'is-stabilising')
  root.classList.add('is-charging')
  root.dataset.state = 'charging'
  setNodeSize(root, NODE_MIN)
  setStatus(root, 'UNARMED')
  setActionLabel(root, 'CHARGE', { disabled: true })
  setResetVisible(root, false)
  setAnnounce(root, 'Charging deploy inputs toward execution node.')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applyInstantArmed(root)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    for (const source of SOURCES) {
      for (let i = 0; i < 3; i += 1) {
        const launchAt = source.delay + i * SPACING_MS
        later(launchAt, () => {
          if (!busy || armed) return
          spawnPacket(root, source.id, source.path)
        })
      }
    }

    // Resolve after armed settles (last launch 350 + travel 300 + stabilise 220)
    later(350 + TRAVEL_MS + STABILISE_MS + 20, () => {
      resolve()
    })
  })
}

/**
 * Restore idle UNARMED state with 26px node.
 * @returns {Promise<void>}
 */
export function resetConcentratedCharge() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  clearPackets(root)
  busy = false
  armed = false
  arrivals = 0
  root.classList.remove('is-charging', 'is-stabilising', 'is-armed')
  root.dataset.state = 'idle'
  setNodeSize(root, NODE_MIN)
  setStatus(root, 'UNARMED')
  setActionLabel(root, 'CHARGE', { disabled: false })
  setResetVisible(root, false)
  setAnnounce(root, '')
  void root.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  const root = rootEl()
  if (!root || root.dataset.cecBound === '1') return
  root.dataset.cecBound = '1'

  setNodeSize(root, NODE_MIN)

  root.querySelector('[data-cec-action]')?.addEventListener('click', () => {
    if (armed) {
      setAnnounce(
        root,
        'Deploy action armed. Prepared but not executed.',
      )
      return
    }
    void runConcentratedCharge()
  })

  root.querySelector('[data-cec-reset]')?.addEventListener('click', () => {
    void resetConcentratedCharge()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void resetConcentratedCharge()
  })

  setAnnounce(root, '')
}

bindUi()
