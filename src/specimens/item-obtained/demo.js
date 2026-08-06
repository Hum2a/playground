/**
 * Item Obtained — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Canonical: ENERGY SHARD ×02 → obtain → ×03
 *
 * Timing (ms) from OBTAIN ITEM:
 *   0–240     discovery enter
 *   240–500   hold + label (260ms); rule grows 120ms from 240
 *   500–820   transfer into slot (320ms); slot reveals
 *   820–960   dock compress + qty ×02→×03 (140ms)
 *   960–1050  two accent lines (90ms)
 */

const DISCOVER_MS = 240
const HOLD_MS = 260
const TRANSFER_MS = 320
const DOCK_MS = 140
const ACCENT_MS = 90

const PHASES = [
  'iob--discover',
  'iob--present',
  'iob--slot-in',
  'iob--transfer',
  'iob--dock',
  'iob--qty-swap',
  'iob--accents',
  'iob--busy',
  'iob--done',
  'iob--reduced',
]

let busy = false
let done = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-item-obtained]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-iob-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setQtyLive(root, qty) {
  const live = root.querySelector('[data-iob-qty-live]')
  if (live) live.textContent = `×${qty}`
}

function setFinal(root) {
  clearPhases(root)
  root.classList.add('iob--done', 'iob--reduced')
  root.setAttribute('data-state', 'done')
  const obtained = root.querySelector('[data-iob-obtained]')
  if (obtained) obtained.hidden = false
  setQtyLive(root, '03')
  const out = root.querySelector('[data-iob-qty-out]')
  const inn = root.querySelector('[data-iob-qty-in]')
  if (out) out.textContent = '02'
  if (inn) inn.textContent = '03'
  const btn = root.querySelector('[data-iob-obtain]')
  if (btn) btn.disabled = true
  done = true
  busy = false
  setStatus(root, 'Item obtained. Energy Shard quantity 3.')
}

/**
 * Run ENERGY SHARD acquisition sequence.
 * @returns {Promise<void>}
 */
export function runItemObtained() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.classList.add('iob--busy')
  root.setAttribute('data-state', 'running')
  setStatus(root, '')
  setQtyLive(root, '02')
  const obtained = root.querySelector('[data-iob-obtained]')
  if (obtained) obtained.hidden = true
  const btn = root.querySelector('[data-iob-obtain]')
  if (btn) btn.disabled = true
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setFinal(root)
    return Promise.resolve()
  }

  const tPresent = DISCOVER_MS
  const tTransfer = tPresent + HOLD_MS
  const tDock = tTransfer + TRANSFER_MS
  const tAccent = tDock + DOCK_MS
  const tDone = tAccent + ACCENT_MS

  return new Promise((resolve) => {
    root.classList.add('iob--discover')

    later(tPresent, () => {
      root.classList.remove('iob--discover')
      root.classList.add('iob--present')
    })

    later(tTransfer, () => {
      root.classList.add('iob--slot-in', 'iob--transfer')
    })

    later(tDock, () => {
      root.classList.remove('iob--transfer', 'iob--present')
      root.classList.add('iob--dock', 'iob--qty-swap')
      // Quantity changes only after docking — not before
      setQtyLive(root, '03')
    })

    later(tAccent, () => {
      root.classList.remove('iob--dock')
      root.classList.add('iob--accents')
    })

    later(tDone, () => {
      clearPhases(root)
      root.classList.add('iob--done')
      root.setAttribute('data-state', 'done')
      setQtyLive(root, '03')
      done = true
      busy = false
      setStatus(root, 'Item obtained. Energy Shard quantity 3.')
      resolve()
    })
  })
}

/**
 * Restore ×02 idle state.
 * @returns {Promise<void>}
 */
export function resetItemObtained() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  done = false
  busy = false
  root.setAttribute('data-state', 'idle')

  const out = root.querySelector('[data-iob-qty-out]')
  const inn = root.querySelector('[data-iob-qty-in]')
  if (out) {
    out.textContent = '02'
    out.style.transform = ''
  }
  if (inn) {
    inn.textContent = '03'
    inn.style.transform = ''
  }

  setQtyLive(root, '02')
  const obtained = root.querySelector('[data-iob-obtained]')
  if (obtained) obtained.hidden = true
  setStatus(root, '')

  const btn = root.querySelector('[data-iob-obtain]')
  if (btn) {
    btn.disabled = false
    btn.focus({ preventScroll: true })
  }
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Harness restart.
 * @returns {Promise<void>}
 */
export async function replayItemObtained() {
  if (busy) return
  await resetItemObtained()
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-iob-obtain]')?.addEventListener('click', () => {
    void runItemObtained()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayItemObtained()
  })
}

bindUi()
