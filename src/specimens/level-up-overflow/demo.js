/**
 * Level Up Overflow — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Canonical: Level 12, 87/100, +38 XP → Level 13, 25/100
 *
 * Timing (ms) from ADD XP:
 *   0–180     token travels to bar
 *   180–440   fill 87% → 100% (260ms)
 *   440–540   threshold hold + ticks (100ms)
 *   540–720   level 12 → 13 (180ms)
 *   720–820   bar 100% → 0% (100ms)
 *   820–1120  fill 0% → 25% (300ms)
 */

const START_LEVEL = 12
const END_LEVEL = 13
const MAX_XP = 100
const START_XP = 87
const REWARD = 38
const OVERFLOW_XP = 25 // 87+38-100
const START_PCT = 87
const OVERFLOW_PCT = 25

const TOKEN_MS = 180
const FILL_TO_FULL_MS = 260
const THRESHOLD_HOLD_MS = 100
const LEVEL_SWAP_MS = 180
const RESET_MS = 100
const OVERFLOW_FILL_MS = 300

const PHASES = [
  'luo--token-in',
  'luo--token-gone',
  'luo--fill-phase1',
  'luo--threshold',
  'luo--level-swap',
  'luo--reset',
  'luo--overflow',
  'luo--busy',
  'luo--done',
]

let busy = false
let done = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-level-up-overflow]')
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

function setStatus(root, text) {
  const status = root.querySelector('[data-luo-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setProgress(root, level, xp, pct) {
  const cur = root.querySelector('[data-luo-cur]')
  const track = root.querySelector('[data-luo-track]')
  const fill = root.querySelector('[data-luo-fill]')
  const levelSr = root.querySelector('[data-luo-level-sr]')

  if (cur) cur.textContent = String(xp)
  if (fill) fill.style.width = `${pct}%`
  if (levelSr) levelSr.textContent = String(level)

  if (track) {
    track.setAttribute('aria-valuenow', String(xp))
    track.setAttribute(
      'aria-valuetext',
      `Level ${level}, ${xp} of ${MAX_XP} experience`,
    )
  }
}

function setFinal(root) {
  const out = root.querySelector('[data-luo-level-out]')
  const inn = root.querySelector('[data-luo-level-in]')
  if (out) out.textContent = String(START_LEVEL)
  if (inn) inn.textContent = String(END_LEVEL)
  setProgress(root, END_LEVEL, OVERFLOW_XP, OVERFLOW_PCT)
  root.classList.add('luo--done')
  root.setAttribute('data-state', 'done')
  const applied = root.querySelector('[data-luo-applied]')
  if (applied) applied.hidden = false
  const btn = root.querySelector('[data-luo-add]')
  if (btn) btn.disabled = true
  done = true
  busy = false
  setStatus(
    root,
    `Level ${END_LEVEL}. ${OVERFLOW_XP} of ${MAX_XP} experience.`,
  )
}

/**
 * Run +38 XP overflow sequence.
 * @returns {Promise<void>}
 */
export function runLevelUpOverflow() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.classList.add('luo--busy')
  root.setAttribute('data-state', 'running')
  setStatus(root, '')
  const applied = root.querySelector('[data-luo-applied]')
  if (applied) applied.hidden = true
  const btn = root.querySelector('[data-luo-add]')
  if (btn) btn.disabled = true
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setFinal(root)
    return Promise.resolve()
  }

  // Token arrives
  root.classList.add('luo--token-in')
  const t0 = 0
  const tFill = TOKEN_MS
  const tHold = tFill + FILL_TO_FULL_MS
  const tLevel = tHold + THRESHOLD_HOLD_MS
  const tReset = tLevel + LEVEL_SWAP_MS
  const tOverflow = tReset + RESET_MS
  const tDone = tOverflow + OVERFLOW_FILL_MS

  return new Promise((resolve) => {
    later(tFill, () => {
      root.classList.add('luo--fill-phase1')
      const fill = root.querySelector('[data-luo-fill]')
      void fill?.offsetWidth
      if (fill) fill.style.width = '100%'
      setProgress(root, START_LEVEL, MAX_XP, 100)
    })

    later(tHold, () => {
      root.classList.remove('luo--fill-phase1')
      root.classList.add('luo--threshold')
    })

    later(tLevel, () => {
      root.classList.add('luo--level-swap')
      const levelSr = root.querySelector('[data-luo-level-sr]')
      if (levelSr) levelSr.textContent = String(END_LEVEL)
    })

    later(tReset, () => {
      root.classList.remove('luo--threshold')
      root.classList.add('luo--reset')
      const fill = root.querySelector('[data-luo-fill]')
      void fill?.offsetWidth
      if (fill) fill.style.width = '0%'
      // Progress semantics reset for new level
      setProgress(root, END_LEVEL, 0, 0)
    })

    later(tOverflow, () => {
      root.classList.remove('luo--reset')
      root.classList.add('luo--overflow', 'luo--token-gone')
      const fill = root.querySelector('[data-luo-fill]')
      void fill?.offsetWidth
      if (fill) fill.style.width = `${OVERFLOW_PCT}%`
      setProgress(root, END_LEVEL, OVERFLOW_XP, OVERFLOW_PCT)
    })

    later(tDone, () => {
      clearPhases(root)
      root.classList.add('luo--done', 'luo--token-gone')
      root.setAttribute('data-state', 'done')
      setProgress(root, END_LEVEL, OVERFLOW_XP, OVERFLOW_PCT)
      done = true
      busy = false
      setStatus(
        root,
        `Level ${END_LEVEL}. ${OVERFLOW_XP} of ${MAX_XP} experience.`,
      )
      resolve()
    })
  })
}

/**
 * Restore Level 12 / 87 XP — deterministic demo reset.
 * @returns {Promise<void>}
 */
export function resetLevelUpOverflow() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  done = false
  busy = false
  root.setAttribute('data-state', 'idle')

  const out = root.querySelector('[data-luo-level-out]')
  const inn = root.querySelector('[data-luo-level-in]')
  if (out) {
    out.textContent = String(START_LEVEL)
    out.style.transform = ''
  }
  if (inn) {
    inn.textContent = String(END_LEVEL)
    inn.style.transform = ''
  }

  setProgress(root, START_LEVEL, START_XP, START_PCT)
  const applied = root.querySelector('[data-luo-applied]')
  if (applied) applied.hidden = true
  setStatus(root, '')

  const btn = root.querySelector('[data-luo-add]')
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
export async function replayLevelUpOverflow() {
  if (busy) return
  await resetLevelUpOverflow()
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-luo-add]')?.addEventListener('click', () => {
    void runLevelUpOverflow()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayLevelUpOverflow()
  })
}

bindUi()
