/**
 * Enemy Scan Reveal — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Scanner travels left → right in SCAN_MS. Each field reveals when the beam
 * crosses its frozen x-threshold (fraction of card width).
 */

const SCAN_MS = 720
const COMPLETE_HOLD_MS = 40

/** @type {{ field: string, at: number }[]} */
const THRESHOLDS = [
  { field: 'type', at: 0.22 },
  { field: 'status', at: 0.4 },
  { field: 'risk', at: 0.58 },
  { field: 'signature', at: 0.76 },
]

const PHASES = ['esr--scanning', 'esr--done', 'esr--busy']

let busy = false
let done = false
let timers = []
let rafId = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-enemy-scan-reveal]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
  if (rafId) {
    window.cancelAnimationFrame(rafId)
    rafId = 0
  }
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-esr-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setScanX(root, pct) {
  root.style.setProperty('--esr-scan-x', `${pct}%`)
}

function revealField(root, field) {
  const row = root.querySelector(`[data-field="${field}"]`)
  row?.classList.add('esr__row--revealed')
}

function revealAll(root) {
  for (const t of THRESHOLDS) revealField(root, t.field)
}

function resetFields(root) {
  root.querySelectorAll('[data-field]').forEach((row) => {
    row.classList.remove('esr__row--revealed')
  })
  setScanX(root, 0)
  const complete = root.querySelector('[data-esr-complete]')
  if (complete) complete.hidden = true
}

function finish(root) {
  root.classList.remove('esr--scanning', 'esr--busy')
  root.classList.add('esr--done')
  root.setAttribute('data-state', 'done')
  setScanX(root, 100)
  revealAll(root)
  const complete = root.querySelector('[data-esr-complete]')
  if (complete) complete.hidden = false
  const btn = root.querySelector('[data-esr-analyse]')
  if (btn) btn.disabled = true
  done = true
  busy = false
  setStatus(root, 'Analysis complete. Entity 07 classified.')
}

/**
 * Run left→right scan analysis.
 * @returns {Promise<void>}
 */
export function runEnemyScan() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  resetFields(root)
  root.classList.add('esr--busy')
  root.setAttribute('data-state', 'scanning')
  setStatus(root, '')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    root.classList.add('esr--done')
    finish(root)
    return Promise.resolve()
  }

  root.classList.add('esr--scanning')
  const revealed = new Set()
  const start = performance.now()

  return new Promise((resolve) => {
    function tick(now) {
      const t = Math.min(1, (now - start) / SCAN_MS)
      const x = t * 100
      setScanX(root, x)

      for (const item of THRESHOLDS) {
        if (!revealed.has(item.field) && t >= item.at) {
          revealed.add(item.field)
          revealField(root, item.field)
        }
      }

      if (t < 1) {
        rafId = window.requestAnimationFrame(tick)
        return
      }

      later(COMPLETE_HOLD_MS, () => {
        finish(root)
        resolve()
      })
    }

    rafId = window.requestAnimationFrame(tick)
  })
}

/**
 * Restore unknown fields — deterministic demo reset.
 * @returns {Promise<void>}
 */
export function resetEnemyScan() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  resetFields(root)
  done = false
  busy = false
  root.setAttribute('data-state', 'idle')
  setStatus(root, '')
  const btn = root.querySelector('[data-esr-analyse]')
  if (btn) {
    btn.disabled = false
    btn.focus({ preventScroll: true })
  }
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Harness restart.
 * @returns {Promise<void>}
 */
export async function replayEnemyScan() {
  if (busy) return
  await resetEnemyScan()
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-esr-analyse]')?.addEventListener('click', () => {
    void runEnemyScan()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayEnemyScan()
  })
}

bindUi()
