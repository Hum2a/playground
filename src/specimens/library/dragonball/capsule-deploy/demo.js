/**
 * Capsule Deploy — tiny portable instantiation API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timeline (frozen, mirror of collapse):
 *   0–120ms    extract — capsule lifts 60px from dock
 *   120–240ms  unseal — lid opens; capsule nudge
 *   240–390ms  decode — four lines expand (150ms)
 *   390–530ms  expand1 — 100×74px panel; stamp hidden
 *   530–670ms  expand2 — 280×180px full panel
 *   670–805ms  rows reveal STATUS/REGION/LATENCY/WORKERS @ 45ms
 *   805–925ms  healthy lock pulse; rail VACANT
 */

const EXTRACT_MS = 120
const UNSEAL_MS = 120
const DECODE_MS = 150
const EXPAND1_MS = 140
const EXPAND2_MS = 140
const STAGGER_MS = 45
const LOCK_MS = 120

const PHASES = [
  'extract',
  'unseal',
  'decode',
  'expand1',
  'expand2',
  'row1',
  'row2',
  'row3',
  'row4',
  'healthy',
]

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
  return document.querySelector('[data-capsule-deploy]')
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
  root.dataset.state = phase === 'healthy' ? 'deployed' : 'running'
}

function setMessage(text) {
  const el = document.querySelector('[data-cdp-text]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-cdp-status]')
  if (el) el.textContent = text
}

function setRailStatus(text) {
  const el = document.querySelector('[data-cdp-rail-status]')
  if (el) el.textContent = text
}

function setButtons({ deploy, reset }) {
  const deployBtn = document.querySelector('[data-cdp-deploy]')
  const resetBtn = document.querySelector('[data-cdp-reset]')
  if (deployBtn) deployBtn.disabled = !deploy
  if (resetBtn) resetBtn.disabled = !reset
}

function applyHealthy(announce) {
  const root = rootEl()
  if (!root) return
  PHASES.forEach((p) => root.classList.add(`cdp--${p}`))
  setPhase('healthy')
  setRailStatus('VACANT')
  const msg =
    'Service API-07. Status: healthy. Region London. Latency 24ms. Workers 8.'
  setMessage(msg)
  setButtons({ deploy: false, reset: true })
  if (announce) {
    setStatus('Service API-07 deployed and healthy.')
  }
  busy = false
  done = true
}

function clearVisuals() {
  const root = rootEl()
  if (!root) return
  PHASES.forEach((p) => root.classList.remove(`cdp--${p}`))
  setPhase('idle')
  root.dataset.state = 'idle'
  setRailStatus('STORED')
  setMessage('Stored API-07. Status: stored.')
  setButtons({ deploy: true, reset: false })
  setStatus('Stored API-07. Status: stored.')
}

/**
 * Run one deploy sequence.
 * @returns {Promise<void>}
 */
export function runCapsuleDeploy() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  clearVisuals()
  setButtons({ deploy: false, reset: false })

  if (prefersReducedMotion()) {
    applyHealthy(true)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let t = 0

    later(t, () => {
      setPhase('extract')
      root.classList.add('cdp--extract')
      setStatus('Extracting API-07 from bay 03.')
    })
    t += EXTRACT_MS

    later(t, () => {
      setPhase('unseal')
      root.classList.add('cdp--unseal')
    })
    t += UNSEAL_MS

    later(t, () => {
      setPhase('decode')
      root.classList.add('cdp--decode')
    })
    t += DECODE_MS

    later(t, () => {
      setPhase('expand1')
      root.classList.add('cdp--expand1')
    })
    t += EXPAND1_MS

    later(t, () => {
      setPhase('expand2')
      root.classList.add('cdp--expand2')
    })
    t += EXPAND2_MS

    const rows = ['row1', 'row2', 'row3', 'row4']
    rows.forEach((row) => {
      later(t, () => {
        setPhase(row)
        root.classList.add(`cdp--${row}`)
      })
      t += STAGGER_MS
    })

    later(t, () => {
      setPhase('healthy')
      root.classList.add('cdp--healthy')
      setRailStatus('VACANT')
      const msg =
        'Service API-07. Status: healthy. Region London. Latency 24ms. Workers 8.'
      setMessage(msg)
      setStatus('Service API-07 deployed and healthy.')
      setButtons({ deploy: false, reset: true })
    })

    later(t + LOCK_MS, () => {
      busy = false
      done = true
      resolve()
    })
  })
}

/**
 * Restore idle docked capsule.
 * @returns {Promise<void>}
 */
export function resetCapsuleDeploy() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  clearVisuals()
  return Promise.resolve()
}

/** @returns {Promise<void>} */
export async function replayCapsuleDeploy() {
  if (busy) return
  await resetCapsuleDeploy()
  void rootEl()?.offsetWidth
  await runCapsuleDeploy()
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-cdp-deploy]')?.addEventListener('click', () => {
    void runCapsuleDeploy()
  })
  root.querySelector('[data-cdp-reset]')?.addEventListener('click', () => {
    void resetCapsuleDeploy()
  })

  window.addEventListener('message', (event) => {
    if (event.data?.type === 'restart') {
      void replayCapsuleDeploy()
    }
  })
}

bindUi()
resetCapsuleDeploy()
