/**
 * Critical Threshold Warning — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Critical UI state is driven by logical value (> 90), never by animation end alone.
 */

const STEP_A_MS = 300 // 82 → 88
const APPROACH_MS = 480 // 88 → 90 (slows)
const REACT_AT_MS = 360 // ~89.5% into approach window from step-a end
const CROSS_MS = 180 // clamps + first post-threshold tick
const FILL_MS = 200 // → 94
const WARN_MS = 240
const DETAIL_LAG_MS = 70

const THRESHOLD = 90
const INITIAL = 82
const FINAL = 94
const ANNOUNCE = 'System load critical at 94 percent.'

const PHASES = [
  'ctw--step-a',
  'ctw--approach',
  'ctw--react',
  'ctw--clamp',
  'ctw--impact',
  'ctw--cross',
  'ctw--critical',
  'ctw--warn',
  'ctw--settled',
  'ctw--busy',
  'ctw--rm',
]

let busy = false
let settled = false
let announcedCritical = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-critical-threshold]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

/**
 * Semantic load value. Critical chrome only when value > THRESHOLD.
 * @param {Element} root
 * @param {number} pct
 */
function setLogical(root, pct) {
  root.setAttribute('data-value', String(pct))
  const meter = root.querySelector('[data-ctw-meter]')
  if (meter) {
    meter.setAttribute('aria-valuenow', String(pct))
    meter.setAttribute('aria-valuetext', `${pct} percent`)
  }

  const critical = pct > THRESHOLD
  root.classList.toggle('ctw--critical', critical)
  // Announce once at the documented destination (94%), not on the first >90 tick.
  if (pct >= FINAL && !announcedCritical) {
    announcedCritical = true
    setLive(root, ANNOUNCE)
  }
}

function setVisual(root, pct) {
  const fill = root.querySelector('[data-ctw-fill]')
  if (fill) fill.style.width = `${pct}%`
}

function setLive(root, text) {
  const live = root.querySelector('[data-ctw-live]')
  if (!live) return
  live.textContent = ''
  void live.offsetWidth
  live.textContent = text
}

function setButtons(root, { go, reset }) {
  const g = root.querySelector('[data-ctw-go]')
  const r = root.querySelector('[data-ctw-reset]')
  if (g) g.disabled = !go
  if (r) r.disabled = !reset
}

function finishSettled(root, { reduced } = { reduced: false }) {
  clearPhases(root)
  root.classList.add('ctw--settled', 'ctw--critical', 'ctw--warn')
  if (reduced) root.classList.add('ctw--rm')
  else root.classList.remove('ctw--rm')
  root.setAttribute('data-state', 'settled')
  setLogical(root, FINAL)
  setVisual(root, FINAL)
  settled = true
  busy = false
  setButtons(root, { go: false, reset: true })
  if (!announcedCritical) {
    announcedCritical = true
    setLive(root, ANNOUNCE)
  }
}

/**
 * Run 82 → 88 → approach 90 → react → cross clamps → 94 critical.
 * @returns {Promise<void>}
 */
export function increaseCriticalThreshold() {
  const root = rootEl()
  if (!root || busy || settled) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  announcedCritical = false
  root.classList.remove('ctw--rm')
  root.classList.add('ctw--busy')
  root.setAttribute('data-state', 'running')
  setLive(root, '')
  setButtons(root, { go: false, reset: false })
  void root.offsetWidth

  if (prefersReducedMotion()) {
    finishSettled(root, { reduced: true })
    return Promise.resolve()
  }

  // Step A: 82 → 88 (still safe)
  setLogical(root, 88)
  root.classList.add('ctw--step-a')
  setVisual(root, 88)

  return new Promise((resolve) => {
    later(STEP_A_MS, () => {
      root.classList.remove('ctw--step-a')
      root.classList.add('ctw--approach')
      // Approach slows into the limit — still ≤ 90, not critical yet
      setLogical(root, 90)
      setVisual(root, 90)
    })

    later(STEP_A_MS + REACT_AT_MS, () => {
      // ~89.5% of the approach: marker reacts before crossing
      root.classList.add('ctw--react')
    })

    later(STEP_A_MS + APPROACH_MS, () => {
      root.classList.remove('ctw--approach')
      root.classList.add('ctw--clamp', 'ctw--impact', 'ctw--cross')
      // Logical value exceeds threshold — this alone unlocks critical chrome
      setLogical(root, 91)
      setVisual(root, 91)
    })

    later(STEP_A_MS + APPROACH_MS + CROSS_MS, () => {
      root.classList.remove('ctw--impact')
      root.classList.add('ctw--critical')
      setLogical(root, FINAL)
      setVisual(root, FINAL)
      root.classList.add('ctw--warn')
    })

    later(
      STEP_A_MS + APPROACH_MS + CROSS_MS + FILL_MS + DETAIL_LAG_MS + WARN_MS,
      () => {
        finishSettled(root, { reduced: false })
        resolve()
      },
    )
  })
}

/** Restore 82% idle (restrained — no equal spectacle). */
export function resetCriticalThreshold() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  settled = false
  busy = false
  announcedCritical = false
  root.classList.remove('ctw--rm')
  root.setAttribute('data-state', 'idle')
  setLogical(root, INITIAL)
  setVisual(root, INITIAL)
  setLive(root, '')
  setButtons(root, { go: true, reset: true })
  void root.offsetWidth
  return Promise.resolve()
}

/** @returns {Promise<void>} */
export async function replayCriticalThreshold() {
  if (busy) return
  await resetCriticalThreshold()
  await increaseCriticalThreshold()
}

function bindUi() {
  const root = rootEl()
  root?.querySelector('[data-ctw-go]')?.addEventListener('click', () => {
    void increaseCriticalThreshold()
  })
  root?.querySelector('[data-ctw-reset]')?.addEventListener('click', () => {
    void resetCriticalThreshold()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayCriticalThreshold()
  })
}

bindUi()
{
  const root = rootEl()
  if (root) setButtons(root, { go: true, reset: true })
}
