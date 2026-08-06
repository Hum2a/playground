/**
 * Objective Chain Advance — each completed checkpoint sends a pulse to the next.
 * iframe-safe; no storage / parent / network.
 */

const NODE_COUNT = 4
const COMPLETE_MS = 200
const PULSE_MS = 220
const SETTLE_MS = 100
const TOTAL_MS = (NODE_COUNT - 1) * (COMPLETE_MS + PULSE_MS) + COMPLETE_MS + SETTLE_MS

let busy = false
let current = 0
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-oca]')
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
  const el = document.querySelector('[data-oca-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-oca-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-oca-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-oca-run], [data-oca-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function nodes() {
  return Array.from(document.querySelectorAll('[data-oca-node]'))
}

function pulses() {
  return Array.from(document.querySelectorAll('[data-oca-pulse]'))
}

function setNodeState(index, state, pulse) {
  const node = nodes()[index]
  if (!node) return
  node.setAttribute('data-state', state)
  node.setAttribute(
    'aria-label',
    `Objective ${index + 1} ${state === 'complete' ? 'complete' : state === 'current' ? 'active' : 'pending'}`,
  )
  if (pulse) {
    node.setAttribute('data-pulse', 'true')
    later(COMPLETE_MS, () => node.removeAttribute('data-pulse'))
  } else {
    node.removeAttribute('data-pulse')
  }
}

function firePulse(index, done) {
  const pulse = pulses()[index]
  if (!pulse) {
    done()
    return
  }
  pulse.style.left = '0%'
  pulse.setAttribute('data-active', 'true')
  void pulse.offsetWidth
  pulse.style.left = '100%'
  later(PULSE_MS, () => {
    pulse.setAttribute('data-active', 'false')
    done()
  })
}

function showResolved() {
  current = NODE_COUNT - 1
  nodes().forEach((_, i) => setNodeState(i, 'complete', false))
  pulses().forEach((pulse) => {
    pulse.setAttribute('data-active', 'false')
    pulse.style.left = '100%'
  })
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('MISSION CLEAR')
  setHint('All objectives complete.')
  setLive('Objective chain complete. Mission clear.')
}

function resetVisual() {
  current = 0
  nodes().forEach((_, i) => setNodeState(i, i === 0 ? 'current' : 'pending', false))
  pulses().forEach((pulse) => {
    pulse.setAttribute('data-active', 'false')
    pulse.style.left = '0%'
  })
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IN PROGRESS')
  setHint('Press Run to advance the chain.')
  setLive('Mission idle. Objective one active.')
}

/**
 * Auto-run the full chain (Run / replay).
 * @returns {Promise<void>}
 */
export function runObjectiveChainAdvance() {
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
  setStatus('ADVANCING')
  setLive('Advancing objective chain.')

  return new Promise((resolve) => {
    let step = 0
    const tick = () => {
      if (step >= NODE_COUNT) {
        later(SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
        return
      }
      setNodeState(step, 'complete', true)
      setLive(`Objective ${step + 1} of ${NODE_COUNT} complete.`)
      later(COMPLETE_MS, () => {
        if (step < NODE_COUNT - 1) {
          firePulse(step, () => {
            current = step + 1
            setNodeState(current, 'current', false)
            step += 1
            tick()
          })
        } else {
          step += 1
          tick()
        }
      })
    }
    tick()
  })
}

export function resetObjectiveChainAdvance() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayObjectiveChainAdvance() {
  if (busy) return
  resetObjectiveChainAdvance()
  void rootEl()?.offsetWidth
  await runObjectiveChainAdvance()
}

function bindUi() {
  document.querySelector('[data-oca-run]')?.addEventListener('click', () => {
    void runObjectiveChainAdvance()
  })
  document.querySelector('[data-oca-replay]')?.addEventListener('click', () => {
    void replayObjectiveChainAdvance()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayObjectiveChainAdvance()
  })
}

void TOTAL_MS
bindUi()
resetObjectiveChainAdvance()
