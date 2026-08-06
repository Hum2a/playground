/**
 * Nearby Device Discovery — radial recipient nodes with finite scan sequence.
 */

const INTERVAL_MS = 120
const SETTLE_MS = 260
const READY_DELAY_MS = 900
const NODE_COUNT = 4

/** @type {number[]} */
let timers = []
/** @type {boolean} */
let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-nearby-device-discovery]')
}

function nodes() {
  return Array.from(document.querySelectorAll('[data-ndd-node]'))
}

function discoverBtn() {
  return document.querySelector('[data-ndd-discover]')
}

function statusEl() {
  return document.querySelector('[data-ndd-status]')
}

function setStatus(text) {
  const el = statusEl()
  if (el) el.textContent = text
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function clearTimers() {
  timers.forEach((id) => window.clearTimeout(id))
  timers = []
}

function revealNode(index) {
  const node = nodes()[index]
  if (!node) return
  node.hidden = false
  if (prefersReducedMotion()) {
    node.classList.add('is-visible')
    return
  }
  requestAnimationFrame(() => node.classList.add('is-visible'))
}

function markReady() {
  const readyNode = nodes()[2]
  readyNode?.classList.add('is-ready')
  setPhase('ready')
  setStatus('NODE C is ready for transfer.')
  busy = false
  discoverBtn()?.removeAttribute('disabled')
}

function startDiscovery() {
  if (busy) return
  resetNearbyDeviceDiscovery()
  busy = true
  discoverBtn()?.setAttribute('disabled', 'true')
  setPhase('discovering')
  setStatus('Scanning for nearby recipients…')

  if (prefersReducedMotion()) {
    nodes().forEach((node) => {
      node.hidden = false
      node.classList.add('is-visible')
    })
    markReady()
    return
  }

  for (let i = 0; i < NODE_COUNT; i += 1) {
    const id = window.setTimeout(() => {
      revealNode(i)
      if (i === NODE_COUNT - 1) {
        const readyId = window.setTimeout(markReady, READY_DELAY_MS)
        timers.push(readyId)
      }
    }, i * INTERVAL_MS)
    timers.push(id)
  }
}

export function resetNearbyDeviceDiscovery() {
  clearTimers()
  busy = false
  discoverBtn()?.removeAttribute('disabled')
  nodes().forEach((node) => {
    node.hidden = true
    node.classList.remove('is-visible', 'is-ready')
  })
  setPhase('idle')
  setStatus('Tap DISCOVER to scan for nearby recipients.')
}

function bindUi() {
  discoverBtn()?.addEventListener('click', startDiscovery)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetNearbyDeviceDiscovery()
    }
  })
}

bindUi()
resetNearbyDeviceDiscovery()

export const NEARBY_DEVICE_DISCOVERY_CONTRACT = {
  INTERVAL_MS,
  SETTLE_MS,
  READY_DELAY_MS,
  NODE_COUNT,
}
