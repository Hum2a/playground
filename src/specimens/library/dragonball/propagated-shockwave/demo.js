/**
 * Propagated Shockwave — root impact → 3 rings → distance-ordered dependents.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Frozen geometry (radial px) and Ring-1 hit times from APPLY (ms):
 *   A 70 → 332 · B 88 → 381 · C 105 → 427 · D 126 → 485 · E 144 → 534 · F 166 → 594
 * Formula: ROOT_MS + RING_MS * (r / RING_MAX_R), RING_MAX_R = 190 (Ø 380).
 */

const ROOT_MS = 140
const RING_MS = 520
const RING_MAX_R = 190
const RING2_DELAY = 90
const RING3_DELAY = 180
const BUMP_MS = 100
const TICK_MS = 90

/**
 * Fixed polar layout + response when Ring 1 leading edge reaches `--r`.
 * @type {{ id: string, r: number, hitAt: number }[]}
 */
const NODES = [
  { id: 'a', r: 70, angle: -15, hitAt: Math.round(ROOT_MS + RING_MS * (70 / RING_MAX_R)) },
  { id: 'b', r: 88, angle: 45, hitAt: Math.round(ROOT_MS + RING_MS * (88 / RING_MAX_R)) },
  { id: 'c', r: 105, angle: 105, hitAt: Math.round(ROOT_MS + RING_MS * (105 / RING_MAX_R)) },
  { id: 'd', r: 126, angle: 165, hitAt: Math.round(ROOT_MS + RING_MS * (126 / RING_MAX_R)) },
  { id: 'e', r: 144, angle: 225, hitAt: Math.round(ROOT_MS + RING_MS * (144 / RING_MAX_R)) },
  { id: 'f', r: 166, angle: 285, hitAt: Math.round(ROOT_MS + RING_MS * (166 / RING_MAX_R)) },
]

const SPOKE_CX = 200
const SPOKE_CY = 200

/** Ring 3 finishes last: ROOT + RING3_DELAY + RING_MS */
const COMPLETE_MS = ROOT_MS + RING3_DELAY + RING_MS

let busy = false
/** @type {number[]} */
let timers = []
/** @type {Set<string>} */
const updated = new Set()

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-psw]')
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

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-psw-live]')
  if (el) el.textContent = text
}

function setControls(done) {
  const btn = document.querySelector('[data-psw-apply]')
  if (btn) btn.disabled = busy || done
}

function setRootPropagated(on) {
  const from = document.querySelector('[data-psw-root-from]')
  const to = document.querySelector('[data-psw-root-to]')
  if (from) from.setAttribute('aria-hidden', on ? 'true' : 'false')
  if (to) to.setAttribute('aria-hidden', on ? 'false' : 'true')
}

function pulseSpoke(id, r, angleDeg) {
  const spoke = document.querySelector(`[data-psw-spoke="${id}"]`)
  if (!spoke) return
  const rad = (angleDeg * Math.PI) / 180
  const x2 = SPOKE_CX + r * Math.cos(rad)
  const y2 = SPOKE_CY + r * Math.sin(rad)
  spoke.setAttribute('x1', String(SPOKE_CX))
  spoke.setAttribute('y1', String(SPOKE_CY))
  spoke.setAttribute('x2', String(x2))
  spoke.setAttribute('y2', String(y2))
  spoke.classList.remove('psw__spoke--lit')
  void node.offsetWidth
  spoke.classList.add('psw__spoke--lit')
}

function updateNode(id) {
  if (updated.has(id)) return
  updated.add(id)

  const meta = NODES.find((n) => n.id === id)
  const node = document.querySelector(`[data-psw-node="${id}"]`)
  if (!node) return

  if (meta) pulseSpoke(id, meta.r, meta.angle)

  node.setAttribute('data-status', 'updating')
  void node.offsetWidth
  node.setAttribute('data-status', 'updated')

  const from = node.querySelector('.psw__clip--from')
  const to = node.querySelector('.psw__clip--to')
  if (from) from.setAttribute('aria-hidden', 'true')
  if (to) to.setAttribute('aria-hidden', 'false')

  setLive(`Node ${id.toUpperCase()} updated`)

  later(TICK_MS, () => {
    if (node.getAttribute('data-status') === 'updated') {
      node.setAttribute('data-ticks', 'done')
    }
  })
}

function finishPropagated() {
  setPhase('done')
  setRootPropagated(true)
  setLive('Propagation complete — all dependents updated')
  busy = false
  setControls(true)
}

function showCompletedImmediate() {
  for (const n of NODES) {
    updated.add(n.id)
    const node = document.querySelector(`[data-psw-node="${n.id}"]`)
    if (!node) continue
    node.setAttribute('data-status', 'updated')
    node.setAttribute('data-ticks', 'done')
    const from = node.querySelector('.psw__clip--from')
    const to = node.querySelector('.psw__clip--to')
    if (from) from.setAttribute('aria-hidden', 'true')
    if (to) to.setAttribute('aria-hidden', 'false')
  }
  finishPropagated()
}

/**
 * Run root impact → rings → spatially ordered dependency updates.
 * @returns {Promise<void>}
 */
export function runPropagatedShockwave() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  setControls(false)
  clearTimers()
  updated.clear()
  setRootPropagated(false)
  setLive('Applying root change')

  if (prefersReducedMotion()) {
    showCompletedImmediate()
    return Promise.resolve()
  }

  setPhase('idle')
  void root.offsetWidth
  setPhase('root')

  return new Promise((resolve) => {
    // Node hit times are absolute from APPLY (include ROOT_MS) — schedule once.
    for (const n of NODES) {
      later(n.hitAt, () => updateNode(n.id))
    }

    later(ROOT_MS, () => {
      setPhase('rings')
      setLive('Shockwave propagating')
    })

    later(COMPLETE_MS, () => {
      finishPropagated()
      resolve()
    })
  })
}

export function resetPropagatedShockwave() {
  clearTimers()
  busy = false
  updated.clear()
  setPhase('idle')
  setRootPropagated(false)
  setLive('Dependents stale')
  setControls(false)

  for (const n of NODES) {
    const node = document.querySelector(`[data-psw-node="${n.id}"]`)
    if (!node) continue
    node.setAttribute('data-status', 'stale')
    node.removeAttribute('data-ticks')
    const from = node.querySelector('.psw__clip--from')
    const to = node.querySelector('.psw__clip--to')
    if (from) from.setAttribute('aria-hidden', 'false')
    if (to) to.setAttribute('aria-hidden', 'true')
    const spoke = document.querySelector(`[data-psw-spoke="${n.id}"]`)
    if (spoke) spoke.classList.remove('psw__spoke--lit')
  }

  const root = rootEl()
  if (root) void root.offsetWidth
}

function bindUi() {
  document.querySelector('[data-psw-apply]')?.addEventListener('click', () => {
    void runPropagatedShockwave()
  })
  document.querySelector('[data-psw-reset]')?.addEventListener('click', () => {
    resetPropagatedShockwave()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetPropagatedShockwave()
  })
}

bindUi()
resetPropagatedShockwave()
