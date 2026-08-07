/**
 * Quirk Cooldown Ring — ARMED 100% → COOLDOWN drain with ticking % → READY 0%.
 * Circumference 289.03 (r=46). Stroke 8. Drain 580ms. Ready flash 320ms.
 */

const DRAIN_MS = 580
const READY_MS = 320
const CIRC = 289.03
const TICK_MS = 40

let busy = false
/** @type {number[]} */
let timers = []
/** @type {number | null} */
let pctInterval = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-qcr]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
  if (pctInterval != null) {
    window.clearInterval(pctInterval)
    pctInterval = null
  }
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-qcr-live]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document
    .querySelectorAll('[data-qcr-run], [data-qcr-replay]')
    .forEach((btn) => {
      btn.disabled = !on
    })
}

function setRingOffset(offset) {
  const ring = document.querySelector('[data-qcr-ring]')
  if (ring) ring.style.strokeDashoffset = String(offset)
}

function setPct(text) {
  const el = document.querySelector('[data-qcr-pct]')
  if (el) el.textContent = text
}

function setLabel(text) {
  const el = document.querySelector('[data-qcr-label]')
  if (el) el.textContent = text
}

function showArmed() {
  setLabel('ARMED')
  setPct('100%')
  setRingOffset(0)
  setLive('Capability armed at full charge.')
}

function showCooldownStart() {
  setLabel('COOLDOWN')
  setPct('100%')
  setRingOffset(0)
  setLive('Cooldown draining.')
}

function showReady() {
  setLabel('READY')
  setPct('0%')
  setRingOffset(CIRC)
  setLive('Cooldown complete. Capability ready.')
}

function startPctTicker() {
  const started = performance.now()
  pctInterval = window.setInterval(() => {
    const t = Math.min(1, (performance.now() - started) / DRAIN_MS)
    const pct = Math.max(0, Math.round(100 * (1 - t)))
    setPct(`${pct}%`)
    if (t >= 1 && pctInterval != null) {
      window.clearInterval(pctInterval)
      pctInterval = null
    }
  }, TICK_MS)
}

/** @returns {Promise<void>} */
export function runQuirkCooldownRing() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  setButtons(false)
  setPhase('idle')
  showCooldownStart()
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setPhase('done')
    showReady()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  setPhase('drain')
  startPctTicker()

  return new Promise((resolve) => {
    later(DRAIN_MS, () => {
      if (pctInterval != null) {
        window.clearInterval(pctInterval)
        pctInterval = null
      }
      setPhase('ready-flash')
      showReady()

      later(READY_MS, () => {
        setPhase('done')
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetQuirkCooldownRing() {
  clearTimers()
  busy = false
  showArmed()
  setPhase('idle')
  setButtons(true)
  const root = rootEl()
  if (root) void root.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayQuirkCooldownRing() {
  if (busy) return
  resetQuirkCooldownRing()
  void rootEl()?.offsetWidth
  await runQuirkCooldownRing()
}

function bindUi() {
  document.querySelector('[data-qcr-run]')?.addEventListener('click', () => {
    void runQuirkCooldownRing()
  })
  document.querySelector('[data-qcr-replay]')?.addEventListener('click', () => {
    void replayQuirkCooldownRing()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayQuirkCooldownRing()
  })
}

bindUi()
resetQuirkCooldownRing()
