/**
 * Technique Mastery Tree — named scroll nodes unlock with edge draw cascade.
 * iframe-safe; no storage / parent / network.
 */

const NODE_IDS = ["ROOT","FORM","FLOW","PEAK"]
const NODE_ORDER = [0,1,2,3]
const NODE_COUNT = NODE_IDS.length
const NODE_MS = 140
const EDGE_MS = 160
const SETTLE_MS = 100
const TOTAL_MS = NODE_COUNT * NODE_MS + (NODE_COUNT - 1) * EDGE_MS + SETTLE_MS

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

function nodeEls() {
  return Array.from(document.querySelectorAll('[data-tmt-node]'))
}

function edgeEls() {
  return Array.from(document.querySelectorAll('[data-tmt-path]'))
}

function paint(count, pulseIndex) {
  nodeEls().forEach((node, i) => {
    const id = NODE_IDS[i]
    const on = i < count
    node.setAttribute('data-unlocked', on ? 'true' : 'false')
    node.setAttribute('aria-label', on ? `${id} unlocked` : `${id} locked`)
    if (pulseIndex === i) {
      node.setAttribute('data-pulse', 'true')
      later(NODE_MS, () => node.removeAttribute('data-pulse'))
    } else {
      node.removeAttribute('data-pulse')
    }
  })
  edgeEls().forEach((edge, i) => {
    edge.setAttribute('data-filled', i < count - 1 ? 'true' : 'false')
  })
}

function showResolved() {
  unlocked = NODE_COUNT
  paint(NODE_COUNT, -1)
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('MASTERED')
  setHint('Technique scroll mastered.')
  setLive('Technique mastery complete. ROOT→FORM→FLOW→PEAK unlocked.')
}

function resetVisual() {
  unlocked = 0
  paint(0, -1)
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('LOCKED')
  setHint('Press Run or keys 1–4 in order.')
  setLive('Scroll sealed. Four technique nodes pending.')
}

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
  setLive('Drawing technique cascade.')

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
      const idx = NODE_ORDER[step]
      unlocked = step + 1
      paint(unlocked, idx)
      setLive(`${NODE_IDS[idx]} unlocked (${unlocked}/${NODE_COUNT}).`)
      step += 1
      later(NODE_MS + (step < NODE_COUNT ? EDGE_MS : 0), tick)
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

export async function replayTechniqueMasteryTree() {
  if (busy) return
  resetTechniqueMasteryTree()
  void rootEl()?.offsetWidth
  await runTechniqueMasteryTree()
}

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
  paint(unlocked, index)
  setLive(`${NODE_IDS[index]} unlocked (${unlocked}/${NODE_COUNT}).`)
  if (unlocked >= NODE_COUNT) later(SETTLE_MS, () => showResolved())
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
