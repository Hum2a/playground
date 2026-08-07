/**
 * Post-Burst Recovery (SPX-1212) — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * After a successful boost, capacity recovers through six frozen stages.
 * TASK COMPLETE remains visible; READY only at recovery 100%.
 */

const STAGES = [
  { recovery: 0, load: 71, capacity: 38, structs: 2 },
  { recovery: 20, load: 66, capacity: 46, structs: 3 },
  { recovery: 45, load: 59, capacity: 59, structs: 4 },
  { recovery: 70, load: 52, capacity: 74, structs: 5 },
  { recovery: 88, load: 46, capacity: 89, structs: 6 },
  { recovery: 100, load: 42, capacity: 100, structs: 6 },
]

/** Hold at each stage before advancing (ms). Final hold precedes ready settle. */
const STAGE_MS = [0, 160, 160, 160, 160, 160]
const READY_SETTLE_MS = 140

let busy = false
let done = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
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

function rootEl() {
  return document.querySelector('[data-post-burst]')
}

function setStructs(count) {
  const root = rootEl()
  if (!root) return
  for (let i = 1; i <= 6; i += 1) {
    const el = root.querySelector(`[data-pbr-struct="${i}"]`)
    if (!el) continue
    el.classList.toggle('is-on', i <= count)
  }
}

function applyStage(stage, index) {
  const root = rootEl()
  if (!root) return
  root.setAttribute('data-stage', String(index))
  root.style.setProperty('--pbr-ring', String(stage.recovery))
  const load = document.querySelector('[data-pbr-load]')
  const cap = document.querySelector('[data-pbr-capacity]')
  const status = document.querySelector('[data-pbr-status]')
  const rail = document.querySelector('[data-pbr-rail]')
  const fill = document.querySelector('[data-pbr-rail-fill]')

  if (load) load.textContent = String(stage.load)
  if (cap) cap.textContent = String(stage.capacity)
  if (rail) rail.textContent = String(stage.recovery)
  if (fill) fill.style.width = `${stage.recovery}%`

  const ready = stage.recovery >= 100
  if (status) status.textContent = ready ? 'READY' : 'RECOVERING'
  setStructs(stage.structs)
}

function setAnnounce(text) {
  const el = document.querySelector('[data-pbr-announce]')
  if (el) el.textContent = text
}

function clearPhases() {
  const root = rootEl()
  if (!root) return
  root.classList.remove('is-running', 'is-ready', 'is-rm')
}

function applyRecoveringStart() {
  const root = rootEl()
  if (!root) return
  clearPhases()
  root.setAttribute('data-state', 'recovering')
  root.style.setProperty('--pbr-ring', '0')
  applyStage(STAGES[0], 0)
  setAnnounce(
    'Task complete. Worker 04 recovering. Load 71 percent. Capacity 38 percent. Status recovering.',
  )
  done = false
  const btn = root.querySelector('[data-pbr-restore]')
  if (btn) {
    btn.textContent = 'RESTORE'
    btn.disabled = false
  }
}

function applyReady(root) {
  root.classList.add('is-ready')
  root.setAttribute('data-state', 'ready')
  applyStage(STAGES[5], 5)
  setAnnounce(
    'Task complete. Worker 04 ready. Load 42 percent. Capacity 100 percent. Status ready.',
  )
  done = true
}

/**
 * Run the post-burst recovery ladder to READY.
 * @returns {Promise<void>}
 */
export function runPostBurstRecovery() {
  if (busy) return Promise.resolve()
  const root = rootEl()
  if (!root) return Promise.resolve()

  if (done) {
    return runPostBurstReset().then(() => runPostBurstRecovery())
  }

  busy = true
  clearTimers()
  applyRecoveringStart()
  void root.offsetWidth

  const btn = root.querySelector('[data-pbr-restore]')
  if (btn) btn.disabled = true

  if (prefersReducedMotion()) {
    root.classList.add('is-rm')
    applyReady(root)
    if (btn) btn.disabled = false
    busy = false
    return Promise.resolve()
  }

  root.classList.add('is-running')
  root.setAttribute('data-state', 'recovering')

  return new Promise((resolve) => {
    let i = 0

    function step() {
      applyStage(STAGES[i], i)

      if (i >= STAGES.length - 1) {
        later(READY_SETTLE_MS, () => {
          root.classList.remove('is-running')
          applyReady(root)
          if (btn) btn.disabled = false
          busy = false
          resolve()
        })
        return
      }

      const wait = STAGE_MS[i + 1] ?? 160
      i += 1
      later(wait, step)
    }

    step()
  })
}

/**
 * Restore depleted recovering start state.
 * @returns {Promise<void>}
 */
export function runPostBurstReset() {
  clearTimers()
  busy = false
  applyRecoveringStart()
  void rootEl()?.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  document.querySelector('[data-pbr-restore]')?.addEventListener('click', () => {
    void runPostBurstRecovery()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void runPostBurstReset().then(() => runPostBurstRecovery())
    }
  })
}

bindUi()
