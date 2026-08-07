/**
 * Chakra Charge Field — hold-to-charge with commit-on-release.
 * iframe-safe; no storage / parent / network.
 */

const CHARGE_MS = 620
const COMMIT_MS = 150
const DIAMETERS_PX = [72, 96, 118, 140]
const STEP_THRESHOLDS = [0.25, 0.5, 0.75, 1]

/** @type {'idle'|'charging'|'done'} */
let phase = 'idle'
/** @type {'manual'|'auto'} */
let mode = 'manual'
let busy = false
let rafId = 0
let chargeStart = 0
let currentP = 0
let keyActive = false
let activePointerId = null
/** @type {((value?: void) => void) | null} */
let runResolve = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-ccf]')
}

/** @type {number[]} */
let timers = []

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
  const el = document.querySelector('[data-ccf-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ccf-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-ccf-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ccf-run], [data-ccf-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setP(p) {
  currentP = Math.max(0, Math.min(1, p))
  const root = rootEl()
  root?.style.setProperty('--p', String(currentP))
  let step = 0
  for (let i = 0; i < STEP_THRESHOLDS.length; i++) {
    if (currentP >= STEP_THRESHOLDS[i]) step = i + 1
  }
  if (step === 0) root?.removeAttribute('data-step')
  else root?.setAttribute('data-step', String(Math.min(step, 3)))
  const pctEl = document.querySelector('[data-ccf-pct]')
  if (pctEl) pctEl.textContent = `${Math.round(currentP * 100)}%`
}

function finishCommitSettle() {
  rootEl()?.removeAttribute('data-pulse')
  busy = false
  setButtons(true)
  const resolve = runResolve
  runResolve = null
  resolve?.()
}

function commitCharge() {
  const root = rootEl()
  if (!root) return
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  phase = 'done'
  busy = true
  root.setAttribute('data-phase', 'done')
  root.setAttribute('data-pulse', 'true')
  const pct = Math.round(currentP * 100)
  setStatus('COMMITTED')
  setHint(`Committed at ${pct}%.`)
  setLive(`Chakra field committed at ${pct} percent.`)
  later(COMMIT_MS, finishCommitSettle)
}

function tick() {
  const root = rootEl()
  if (!root || phase !== 'charging') return
  const elapsed = performance.now() - chargeStart
  const p = elapsed / CHARGE_MS
  setP(p)
  if (p >= 1) {
    if (mode === 'auto') commitCharge()
    return
  }
  rafId = requestAnimationFrame(tick)
}

function beginCharge(auto) {
  const root = rootEl()
  if (!root || busy || phase !== 'idle') return
  busy = true
  phase = 'charging'
  mode = auto ? 'auto' : 'manual'
  chargeStart = performance.now()
  setButtons(false)
  root.setAttribute('data-phase', 'active')
  setP(0)
  setStatus('CHARGING')
  setHint('Release to commit.')
  setLive('Charging chakra field.')

  if (prefersReducedMotion()) {
    setP(1)
    commitCharge()
    return
  }

  rafId = requestAnimationFrame(tick)
}

function resetVisual() {
  phase = 'idle'
  mode = 'manual'
  currentP = 0
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  root?.removeAttribute('data-pulse')
  setP(0)
  setStatus('IDLE')
  setHint('Hold the core to charge. Release commits the current level.')
  setLive('Charge field idle. No chakra committed.')
}

/**
 * Auto-run a full charge to 100% then commit (demo Run).
 * @returns {Promise<void>}
 */
export function runChakraChargeField() {
  const root = rootEl()
  if (!root || busy || phase !== 'idle') return Promise.resolve()
  return new Promise((resolve) => {
    runResolve = resolve
    beginCharge(true)
  })
}

export function resetChakraChargeField() {
  clearTimers()
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  busy = false
  runResolve = null
  activePointerId = null
  keyActive = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayChakraChargeField() {
  if (busy) return
  resetChakraChargeField()
  void rootEl()?.offsetWidth
  await runChakraChargeField()
}

function bindUi() {
  const core = document.querySelector('[data-ccf-core]')

  core?.addEventListener('pointerdown', (e) => {
    if (e.button != null && e.button !== 0) return
    if (busy || phase !== 'idle') return
    activePointerId = e.pointerId
    try {
      core.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    e.preventDefault()
    beginCharge(false)
  })

  const release = (e) => {
    if (activePointerId != null && e.pointerId !== activePointerId) return
    activePointerId = null
    if (phase === 'charging') commitCharge()
  }

  core?.addEventListener('pointerup', release)
  core?.addEventListener('pointercancel', release)
  core?.addEventListener('lostpointercapture', () => {
    activePointerId = null
    if (phase === 'charging') commitCharge()
  })

  core?.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' && e.key !== ' ') return
    if (e.repeat) {
      e.preventDefault()
      return
    }
    if (busy || phase !== 'idle') return
    e.preventDefault()
    keyActive = true
    beginCharge(false)
  })

  core?.addEventListener('keyup', (e) => {
    if (e.code !== 'Space' && e.key !== ' ') return
    if (!keyActive) return
    e.preventDefault()
    keyActive = false
    if (phase === 'charging') commitCharge()
  })

  document.querySelector('[data-ccf-run]')?.addEventListener('click', () => {
    void runChakraChargeField()
  })
  document.querySelector('[data-ccf-replay]')?.addEventListener('click', () => {
    void replayChakraChargeField()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayChakraChargeField()
  })
}

bindUi()
resetChakraChargeField()

void DIAMETERS_PX
void STEP_THRESHOLDS
