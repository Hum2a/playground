/**
 * 360° Network Scan — radial sweep wires in five nodes around a central hub.
 * iframe-safe; no storage / parent / network.
 */

const NODE_COUNT = 5
const ANGLES = [0, 72, 144, 216, 288]
const STEP_MS = 150
const CLOSE_DEG = 330
const SETTLE_MS = 100
const TOTAL_MS = NODE_COUNT * STEP_MS + STEP_MS + SETTLE_MS

let busy = false
let wired = 0
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-ns360]')
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

function setLive(text) {
  const el = document.querySelector('[data-ns360-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ns360-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-ns360-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document
    .querySelectorAll('[data-ns360-run], [data-ns360-replay]')
    .forEach((btn) => {
      btn.disabled = !on
    })
}

function nodes() {
  return Array.from(document.querySelectorAll('[data-ns360-node]'))
}

function links() {
  return Array.from(document.querySelectorAll('[data-ns360-link]'))
}

function sweepEl() {
  return document.querySelector('[data-ns360-sweep]')
}

function rotateSweep(deg) {
  const sweep = sweepEl()
  if (sweep) sweep.style.transform = `rotate(${deg}deg)`
}

function paintNodes(count, pulseIndex) {
  nodes().forEach((node, i) => {
    const on = i < count
    node.setAttribute('data-active', on ? 'true' : 'false')
    node.setAttribute(
      'aria-label',
      on ? `Node ${i + 1} connected` : `Node ${i + 1} pending`,
    )
    if (pulseIndex === i) {
      node.setAttribute('data-pulse', 'true')
      later(STEP_MS, () => node.removeAttribute('data-pulse'))
    } else {
      node.removeAttribute('data-pulse')
    }
  })
  links().forEach((link, i) => {
    link.setAttribute('data-active', i < count ? 'true' : 'false')
  })
}

function showResolved() {
  wired = NODE_COUNT
  paintNodes(NODE_COUNT, -1)
  rotateSweep(CLOSE_DEG)
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('MAPPED')
  setHint('All nodes wired in.')
  setLive('Network scan complete. Five nodes mapped.')
}

function resetVisual() {
  wired = 0
  paintNodes(0, -1)
  rotateSweep(-40)
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setHint('Press Run to sweep the network.')
  setLive('Network scan idle. Five nodes pending.')
}

/**
 * Auto-run the full 360° sweep (Run / replay).
 * @returns {Promise<void>}
 */
export function networkScan360() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('SWEEPING')
  setLive('Sweeping network for connected nodes.')

  return new Promise((resolve) => {
    let step = 0
    const tick = () => {
      if (step >= NODE_COUNT) {
        rotateSweep(CLOSE_DEG)
        later(SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
        return
      }
      rotateSweep(ANGLES[step])
      wired = step + 1
      paintNodes(wired, step)
      setLive(`Node ${wired} of ${NODE_COUNT} connected.`)
      step += 1
      later(STEP_MS, tick)
    }
    tick()
  })
}

export function resetNetworkScan360() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayNetworkScan360() {
  if (busy) return
  resetNetworkScan360()
  void rootEl()?.offsetWidth
  await networkScan360()
}

function bindUi() {
  document.querySelector('[data-ns360-run]')?.addEventListener('click', () => {
    void networkScan360()
  })
  document
    .querySelector('[data-ns360-replay]')
    ?.addEventListener('click', () => {
      void replayNetworkScan360()
    })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayNetworkScan360()
  })
}

void TOTAL_MS
bindUi()
resetNetworkScan360()
