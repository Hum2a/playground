/**
 * Wire Connection Draw — a thin wire rapidly connects two nodes, then both
 * endpoints pulse to confirm a linked connection.
 * iframe-safe; no storage / parent / network.
 */

const DRAW_MS = 180
const SETTLE_MS = 80
const TOTAL_MS = DRAW_MS + SETTLE_MS

let busy = false
let linked = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-wcd]')
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
  const el = document.querySelector('[data-wcd-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-wcd-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-wcd-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-wcd-run], [data-wcd-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setNodeLabels(text) {
  document.querySelectorAll('[data-wcd-node]').forEach((node) => {
    const id = node.getAttribute('data-wcd-node')
    node.setAttribute('aria-label', `Node ${id === 'a' ? 'A' : 'B'} ${text}`)
  })
}

function showLinked() {
  linked = true
  setNodeLabels('connected')
  rootEl()?.setAttribute('data-phase', 'linked')
  setStatus('LINKED')
  setHint('Connection established.')
  setLive('Wire connected. Nodes A and B linked.')
}

function resetVisual() {
  linked = false
  setNodeLabels('unconnected')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('UNLINKED')
  setHint('Press Run to draw the connection.')
  setLive('Idle. Nodes A and B are unconnected.')
}

/**
 * Auto-run full draw → link choreography.
 * @returns {Promise<void>}
 */
export function runWireConnectionDraw() {
  const root = rootEl()
  if (!root || busy || linked) return Promise.resolve()

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showLinked()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'drawing')
  setStatus('DRAWING')
  setHint('Wire drawing between nodes.')
  setLive('Drawing wire between nodes.')

  return new Promise((resolve) => {
    later(TOTAL_MS, () => {
      showLinked()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetWireConnectionDraw() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayWireConnectionDraw() {
  if (busy) return
  resetWireConnectionDraw()
  void rootEl()?.offsetWidth
  await runWireConnectionDraw()
}

function bindUi() {
  document.querySelector('[data-wcd-run]')?.addEventListener('click', () => {
    void runWireConnectionDraw()
  })
  document.querySelector('[data-wcd-replay]')?.addEventListener('click', () => {
    void replayWireConnectionDraw()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayWireConnectionDraw()
  })
}

bindUi()
resetWireConnectionDraw()
