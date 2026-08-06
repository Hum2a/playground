/**
 * Cloud Sync Progress — PlayStation-inspired motion specimen.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-csp]')
}

let busy = false
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
  const el = document.querySelector('[data-csp-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-csp-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-csp-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-csp-run], [data-csp-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

const SYNC_MS = 1200
const STEP_MS = 40

function setBeam(pct) {
  const beam = document.querySelector('[data-csp-beam]')
  if (beam) beam.style.left = `${pct}%`
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setBeam(0)
  setStatus('OUT OF SYNC')
  setHint('Press Run to sync.')
  setLive('Cloud sync idle at local.')
}

function showSynced() {
  rootEl()?.setAttribute('data-phase', 'synced')
  setBeam(100)
  setStatus('SYNCED')
  setHint('Local and cloud balanced.')
  setLive('Cloud sync complete. Balanced.')
}

export function runCloudSyncProgress() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'synced') return Promise.resolve()
  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  root.setAttribute('data-phase', 'syncing')
  setStatus('SYNCING')
  setLive('Syncing to cloud.')

  if (prefersReducedMotion()) {
    showSynced()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let step = 0
    const steps = SYNC_MS / STEP_MS
    const tick = () => {
      if (step > steps) {
        showSynced()
        busy = false
        setButtons(true)
        resolve()
        return
      }
      setBeam(Math.round((step / steps) * 100))
      step += 1
      later(STEP_MS, tick)
    }
    tick()
  })
}

export function resetCloudSyncProgress() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
}

export async function replayCloudSyncProgress() {
  if (busy) return
  resetCloudSyncProgress()
  await runCloudSyncProgress()
}

function bindUi() {
  document.querySelector('[data-csp-run]')?.addEventListener('click', () => {
    void runCloudSyncProgress()
  })
  document.querySelector('[data-csp-replay]')?.addEventListener('click', () => {
    void replayCloudSyncProgress()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCloudSyncProgress()
  })
}

bindUi()
resetCloudSyncProgress()
