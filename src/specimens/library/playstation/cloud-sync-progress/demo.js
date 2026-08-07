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

function setBalance(localPct, cloudPct) {
  const lf = document.querySelector('[data-csp-local-fill]')
  const cf = document.querySelector('[data-csp-cloud-fill]')
  const lp = document.querySelector('[data-csp-local-pct]')
  const cp = document.querySelector('[data-csp-cloud-pct]')
  if (lf) lf.style.height = `${localPct}%`
  if (cf) cf.style.height = `${cloudPct}%`
  if (lp) lp.textContent = `${localPct}%`
  if (cp) cp.textContent = `${cloudPct}%`
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  setBalance(18, 42)
  const hub = document.querySelector('[data-csp-hub-label]')
  if (hub) hub.textContent = 'SYNC'
  setStatus('OUT OF SYNC')
  setHint('Run balances local ↔ cloud meters.')
  setLive('Cloud sync idle. Local and cloud unbalanced.')
}

function showSynced() {
  rootEl()?.setAttribute('data-phase', 'synced')
  setBalance(100, 100)
  const hub = document.querySelector('[data-csp-hub-label]')
  if (hub) hub.textContent = 'OK'
  setStatus('SYNCED')
  setHint('Local and cloud balanced at 100%.')
  setLive('Cloud sync complete. Local and cloud balanced.')
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
  setLive('Balancing local and cloud sync meters.')
  const hub = document.querySelector('[data-csp-hub-label]')
  if (hub) hub.textContent = '…'

  if (prefersReducedMotion()) {
    showSynced()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  const startLocal = 18
  const startCloud = 42
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
      const t = step / steps
      const local = Math.round(startLocal + (100 - startLocal) * t)
      const cloud = Math.round(startCloud + (100 - startCloud) * t)
      setBalance(local, cloud)
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
