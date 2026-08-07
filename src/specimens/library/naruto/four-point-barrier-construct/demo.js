/**
 * Four-Point Barrier Construct — corners connect edge-by-edge, then the field fills.
 * iframe-safe; no storage / parent / network.
 */

const EDGE_COUNT = 4
const CORNER_COORDS = [
  { x: 30, y: 30 },
  { x: 170, y: 30 },
  { x: 170, y: 170 },
  { x: 30, y: 170 },
]
const CORNER_MS = 90
const SETTLE_MS = 90
const TOTAL_MS = EDGE_COUNT * EDGE_MS + FILL_MS + SETTLE_MS

let busy = false
let closed = 0
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-fpbc]')
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
  const el = document.querySelector('[data-fpbc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-fpbc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-fpbc-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document
    .querySelectorAll('[data-fpbc-run], [data-fpbc-replay]')
    .forEach((btn) => {
      btn.disabled = !on
    })
}

function nodes() {
  return Array.from(document.querySelectorAll('[data-fpbc-node]'))
}

function edges() {
  return Array.from(document.querySelectorAll('[data-fpbc-edge]'))
}

function fill() {
  return document.querySelector('[data-fpbc-fill]')
}

function activateNode(index, pulse) {
  const node = nodes()[index]
  if (!node) return
  node.setAttribute('data-active', 'true')
  node.setAttribute('aria-label', `Corner ${index + 1} active`)
  if (pulse) {
    node.setAttribute('data-pulse', 'true')
    later(EDGE_MS, () => node.removeAttribute('data-pulse'))
  }
}

function showResolved() {
  closed = EDGE_COUNT
  nodes().forEach((_, i) => activateNode(i, false))
  edges().forEach((edge) => edge.setAttribute('data-drawn', 'true'))
  fill()?.setAttribute('data-visible', 'true')
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('SECURED')
  setHint('Perimeter closed. Field active.')
  setLive('Barrier construct complete. Field secured.')
}

function resetVisual() {
  closed = 0
  nodes().forEach((node, i) => {
    node.setAttribute('data-active', 'false')
    node.removeAttribute('data-pulse')
    node.setAttribute('aria-label', `Corner ${i + 1} inactive`)
  })
  edges().forEach((edge) => edge.setAttribute('data-drawn', 'false'))
  fill()?.setAttribute('data-visible', 'false')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setHint('Press Run to construct the barrier.')
  setLive('Barrier idle. Perimeter open.')
}

/**
 * Auto-run the full construct sequence (Run / replay).
 * @returns {Promise<void>}
 */
export function runFourPointBarrierConstruct() {
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
  setStatus('CONSTRUCTING')
  setLive('Constructing barrier.')
  activateNode(0, true)

  return new Promise((resolve) => {
    const edgeList = edges()
    let step = 0
    const tick = () => {
      if (step >= EDGE_COUNT) {
        setStatus('SEALING')
        setLive('Sealing protected field.')
        later(FILL_MS, () => {
          fill()?.setAttribute('data-visible', 'true')
          later(SETTLE_MS, () => {
            showResolved()
            busy = false
            setButtons(true)
            resolve()
          })
        })
        return
      }
      edgeList[step]?.setAttribute('data-drawn', 'true')
      const nextNode = (step + 1) % EDGE_COUNT
      closed = step + 1
      setLive(`Edge ${closed} of ${EDGE_COUNT} connected.`)
      later(EDGE_MS, () => {
        activateNode(nextNode, true)
        step += 1
        tick()
      })
    }
    tick()
  })
}

export function resetFourPointBarrierConstruct() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayFourPointBarrierConstruct() {
  if (busy) return
  resetFourPointBarrierConstruct()
  void rootEl()?.offsetWidth
  await runFourPointBarrierConstruct()
}

function bindUi() {
  document
    .querySelector('[data-fpbc-run]')
    ?.addEventListener('click', () => {
      void runFourPointBarrierConstruct()
    })
  document
    .querySelector('[data-fpbc-replay]')
    ?.addEventListener('click', () => {
      void replayFourPointBarrierConstruct()
    })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayFourPointBarrierConstruct()
  })
}

void TOTAL_MS
bindUi()
resetFourPointBarrierConstruct()

void CORNER_COORDS
void CORNER_MS
