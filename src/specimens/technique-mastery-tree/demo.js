/**
 * Technique Mastery Tree — unlock four skill nodes in order along a filling path.
 * iframe-safe; no storage / parent / network.
 */

const NODE_COUNT = 4
const STEP_MS = 150
const SETTLE_MS = 100
const TOTAL_MS = NODE_COUNT * STEP_MS + SETTLE_MS // ~700ms principal sequence

let busy = false
let unlocked = 0
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tmt]')
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
  const el = document.querySelector('[data-tmt-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tmt-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-tmt-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tmt-run], [data-tmt-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function nodes() {
  return Array.from(document.querySelectorAll('[data-tmt-node]'))
}

function paths() {
  return Array.from(document.querySelectorAll('[data-tmt-path]'))
}

function paintNodes(count, pulseIndex) {
  nodes().forEach((node, i) => {
    const on = i < count
    node.setAttribute('data-unlocked', on ? 'true' : 'false')
    node.setAttribute(
      'aria-label',
      on ? `Node ${i + 1} unlocked` : `Node ${i + 1} locked`,
    )
    if (pulseIndex === i) {
      node.setAttribute('data-pulse', 'true')
      later(STEP_MS, () => node.removeAttribute('data-pulse'))
    } else {
      node.removeAttribute('data-pulse')
    }
  })
  paths().forEach((path, i) => {
    path.setAttribute('data-filled', i < count - 1 ? 'true' : 'false')
  })
}

function showResolved() {
  unlocked = NODE_COUNT
  paintNodes(NODE_COUNT, -1)
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('MASTERED')
  setHint('Technique mastered.')
  setLive('Technique mastery tree complete. All four nodes unlocked.')
}

function resetVisual() {
  unlocked = 0
  paintNodes(0, -1)
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('LOCKED')
  setHint('Press Run or keys 1–4 in order.')
  setLive('Technique tree locked. Four nodes pending.')
}

/**
 * Auto-run full unlock sequence.
 * @returns {Promise<void>}
 */
export function runTechniqueMasteryTree() {
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
  setStatus('UNLOCKING')
  setLive('Unlocking technique nodes.')

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
      unlocked = step + 1
      paintNodes(unlocked, step)
      setLive(`Node ${unlocked} of ${NODE_COUNT} unlocked.`)
      step += 1
      later(STEP_MS, tick)
    }
    tick()
  })
}

export function resetTechniqueMasteryTree() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayTechniqueMasteryTree() {
  if (busy) return
  resetTechniqueMasteryTree()
  void rootEl()?.offsetWidth
  await runTechniqueMasteryTree()
}

/**
 * Manual key path: keys 1–4 in order unlock one node each.
 * @param {number} index 0-based
 */
function unlockOne(index) {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return
  if (index !== unlocked) return
  if (prefersReducedMotion()) {
    showResolved()
    return
  }
  root.setAttribute('data-phase', 'active')
  setStatus('UNLOCKING')
  unlocked = index + 1
  paintNodes(unlocked, index)
  setLive(`Node ${unlocked} of ${NODE_COUNT} unlocked.`)
  if (unlocked >= NODE_COUNT) {
    later(SETTLE_MS, () => showResolved())
  }
}

function bindUi() {
  document.querySelector('[data-tmt-run]')?.addEventListener('click', () => {
    void runTechniqueMasteryTree()
  })
  document.querySelector('[data-tmt-replay]')?.addEventListener('click', () => {
    void replayTechniqueMasteryTree()
  })
  window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return
    const n = Number(event.key)
    if (n >= 1 && n <= NODE_COUNT) {
      event.preventDefault()
      unlockOne(n - 1)
    }
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTechniqueMasteryTree()
  })
}

void TOTAL_MS
bindUi()
resetTechniqueMasteryTree()
