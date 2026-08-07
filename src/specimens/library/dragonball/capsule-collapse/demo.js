/**
 * Capsule Collapse — tiny portable storage compression API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timeline (frozen):
 *   0–120ms    prepare — brackets inward, row gap 12→4px
 *   120–340ms  fold width 280→100px; REGION drops
 *   340–470ms  stage1 height 180→74px; LATENCY drops
 *   470–580ms  stage2 56×42px; WORKERS/footer drop; lid closes
 *   580–680ms  four encoding lines @ 100ms
 *   680–820ms  capsule docks 28px into bay; STORED
 */

const PREPARE_MS = 120
const FOLD_MS = 220
const STAGE1_MS = 130
const STAGE2_MS = 110
const ENCODE_MS = 100
const DOCK_MS = 140
const TOTAL_MS = PREPARE_MS + FOLD_MS + STAGE1_MS + STAGE2_MS + ENCODE_MS + DOCK_MS

const PHASES = ['prepare', 'fold', 'stage1', 'stage2', 'encode', 'stored']
const PHASE_MS = [PREPARE_MS, FOLD_MS, STAGE1_MS, STAGE2_MS, ENCODE_MS, DOCK_MS]

/** @type {number[]} */
let timers = []
let busy = false
let done = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-capsule-collapse]')
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
  if (!root) return
  root.setAttribute('data-phase', phase)
  root.dataset.state = phase === 'stored' ? 'stored' : 'running'
}

function setMessage(text) {
  const el = document.querySelector('[data-ccp-message]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ccp-status]')
  if (el) el.textContent = text
}

function setButtons({ pack, reset }) {
  const packBtn = document.querySelector('[data-ccp-pack]')
  const resetBtn = document.querySelector('[data-ccp-reset]')
  if (packBtn) packBtn.disabled = !pack
  if (resetBtn) resetBtn.disabled = !reset
}

function applyStored(announce) {
  const root = rootEl()
  if (!root) return
  PHASES.forEach((p) => root.classList.add(`ccp--${p}`))
  setPhase('stored')
  setMessage('Service API-07 stored.')
  setButtons({ pack: false, reset: true })
  if (announce) {
    setStatus('Service API-07 stored in bay 03.')
  }
  busy = false
  done = true
}

function clearVisuals() {
  const root = rootEl()
  if (!root) return
  PHASES.forEach((p) => root.classList.remove(`ccp--${p}`))
  setPhase('idle')
  root.dataset.state = 'idle'
  setMessage('Service API-07 ready to pack.')
  setButtons({ pack: true, reset: false })
  setStatus('Service API-07 ready to pack.')
}

/**
 * Run one pack sequence.
 * @returns {Promise<void>}
 */
export function runCapsuleCollapse() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  clearVisuals()
  setButtons({ pack: false, reset: false })

  if (prefersReducedMotion()) {
    applyStored(true)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let elapsed = 0
    PHASES.slice(0, -1).forEach((phase, i) => {
      later(elapsed, () => {
        setPhase(phase)
        root.classList.add(`ccp--${phase}`)
        if (phase === 'prepare') {
          setStatus('Packing service API-07.')
        }
      })
      elapsed += PHASE_MS[i]
    })

    later(TOTAL_MS, () => {
      applyStored(true)
      resolve()
    })
  })
}

/**
 * Restore idle panel.
 * @returns {Promise<void>}
 */
export function resetCapsuleCollapse() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  clearVisuals()
  return Promise.resolve()
}

/** @returns {Promise<void>} */
export async function replayCapsuleCollapse() {
  if (busy) return
  await resetCapsuleCollapse()
  void rootEl()?.offsetWidth
  await runCapsuleCollapse()
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-ccp-pack]')?.addEventListener('click', () => {
    void runCapsuleCollapse()
  })
  root.querySelector('[data-ccp-reset]')?.addEventListener('click', () => {
    void resetCapsuleCollapse()
  })

  window.addEventListener('message', (event) => {
    if (event.data?.type === 'restart') {
      void replayCapsuleCollapse()
    }
  })
}

bindUi()
resetCapsuleCollapse()
