/**
 * Delayed Damage Bar — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timing (ms) from DAMAGE:
 *   0            numeric → 96 (immediate / ≤100ms); impact 100ms; primary drain 180ms
 *   180          primary at 48%; trail still 82%
 *   180+320=500  trail begins catch-up
 *   500+420=920  trail at 48%; sequence complete
 */

const MAX_HP = 200
const START_HP = 164
const END_HP = 96
const DAMAGE = START_HP - END_HP // 68
const START_PCT = (START_HP / MAX_HP) * 100 // 82
const END_PCT = (END_HP / MAX_HP) * 100 // 48
const LOW_THRESHOLD_PCT = 50

const PRIMARY_MS = 180
const TRAIL_HOLD_MS = 320
const TRAIL_DRAIN_MS = 420
const IMPACT_MS = 100
const DELTA_MS = 500
const NUMERIC_ROLL_MS = 80

const PHASES = [
  'ddb--impact',
  'ddb--primary',
  'ddb--trail-hold',
  'ddb--trail-drain',
  'ddb--delta',
  'ddb--busy',
  'ddb--done',
]

let busy = false
let damaged = false
let timers = []
let rafId = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-delayed-damage-bar]')
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
  const status = root.querySelector('[data-ddb-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setMeter(root, current, fillPct, trailPct) {
  const track = root.querySelector('[data-ddb-track]')
  const fill = root.querySelector('[data-ddb-fill]')
  const trail = root.querySelector('[data-ddb-trail]')
  const currentEl = root.querySelector('[data-ddb-current]')
  const hint = root.querySelector('[data-ddb-hint]')

  if (currentEl) currentEl.textContent = String(current)

  if (track) {
    track.setAttribute('aria-valuenow', String(current))
    track.setAttribute('aria-valuetext', `${current} of ${MAX_HP}`)
  }

  if (fill) {
    fill.style.width = `${fillPct}%`
    const low = fillPct < LOW_THRESHOLD_PCT
    fill.classList.toggle('ddb__fill--low', low)
  }

  if (trail) trail.style.width = `${trailPct}%`

  if (hint) {
    const low = fillPct < LOW_THRESHOLD_PCT
    hint.textContent = low ? 'Low resource' : 'Healthy'
    hint.classList.toggle('ddb__hint--low', low)
  }
}

function rollNumeric(root, from, to, ms) {
  return new Promise((resolve) => {
    if (ms <= 0 || prefersReducedMotion()) {
      setMeter(
        root,
        to,
        (to / MAX_HP) * 100,
        parseFloat(root.querySelector('[data-ddb-trail]')?.style.width || `${END_PCT}`),
      )
      resolve()
      return
    }

    const start = performance.now()
    function tick(now) {
      const t = Math.min(1, (now - start) / ms)
      const value = Math.round(from + (to - from) * t)
      const fill = root.querySelector('[data-ddb-fill]')
      const fillPct = fill ? parseFloat(fill.style.width) : (value / MAX_HP) * 100
      const trail = root.querySelector('[data-ddb-trail]')
      const trailPct = trail ? parseFloat(trail.style.width) : START_PCT
      setMeter(root, value, fillPct, trailPct)
      if (t < 1) {
        rafId = window.requestAnimationFrame(tick)
      } else {
        resolve()
      }
    }
    rafId = window.requestAnimationFrame(tick)
  })
}

/**
 * Apply delayed damage sequence.
 * @returns {Promise<void>}
 */
export function runDelayedDamage() {
  const root = rootEl()
  if (!root || busy || damaged) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.classList.add('ddb--busy')
  root.setAttribute('data-state', 'damaging')
  setStatus(root, '')
  const damageBtn = root.querySelector('[data-ddb-damage]')
  if (damageBtn) damageBtn.disabled = true
  void root.offsetWidth

  if (prefersReducedMotion()) {
    setMeter(root, END_HP, END_PCT, END_PCT)
    root.classList.add('ddb--done')
    root.setAttribute('data-state', 'done')
    damaged = true
    busy = false
    setStatus(root, `${END_HP} of ${MAX_HP}.`)
    return Promise.resolve()
  }

  root.classList.add('ddb--impact', 'ddb--delta', 'ddb--primary')

  // Current-value readout commits before the old-value trail moves; the trail is
  // intentionally the only layer allowed to preserve the pre-hit value.
  void rollNumeric(root, START_HP, END_HP, NUMERIC_ROLL_MS)

  // Drive primary width after enabling transition
  later(16, () => {
    const fill = root.querySelector('[data-ddb-fill]')
    if (fill) fill.style.width = `${END_PCT}%`
    // Colour flips when crossing 50% during primary motion
    later(PRIMARY_MS * 0.55, () => {
      fill?.classList.add('ddb__fill--low')
      const hint = root.querySelector('[data-ddb-hint]')
      if (hint) {
        hint.textContent = 'Low resource'
        hint.classList.add('ddb__hint--low')
      }
    })
  })

  return new Promise((resolve) => {
    later(IMPACT_MS, () => {
      root.classList.remove('ddb--impact')
    })

    later(PRIMARY_MS, () => {
      root.classList.remove('ddb--primary')
      root.classList.add('ddb--trail-hold')
      setMeter(root, END_HP, END_PCT, START_PCT)
    })

    later(PRIMARY_MS + TRAIL_HOLD_MS, () => {
      root.classList.remove('ddb--trail-hold')
      root.classList.add('ddb--trail-drain')
      const trail = root.querySelector('[data-ddb-trail]')
      void trail?.offsetWidth
      if (trail) trail.style.width = `${END_PCT}%`
    })

    later(PRIMARY_MS + TRAIL_HOLD_MS + TRAIL_DRAIN_MS, () => {
      clearPhases(root)
      root.classList.add('ddb--done')
      root.setAttribute('data-state', 'done')
      setMeter(root, END_HP, END_PCT, END_PCT)
      damaged = true
      busy = false
      setStatus(root, `${END_HP} of ${MAX_HP}.`)
      resolve()
    })
  })
}

/**
 * Restore full health — deterministic demo reset.
 * @returns {Promise<void>}
 */
export function resetDelayedDamage() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  damaged = false
  busy = false
  root.setAttribute('data-state', 'idle')
  setMeter(root, START_HP, START_PCT, START_PCT)
  setStatus(root, '')
  const damageBtn = root.querySelector('[data-ddb-damage]')
  if (damageBtn) {
    damageBtn.disabled = false
    damageBtn.focus({ preventScroll: true })
  }
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Harness restart.
 * @returns {Promise<void>}
 */
export async function replayDelayedDamage() {
  if (busy) return
  await resetDelayedDamage()
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-ddb-damage]')?.addEventListener('click', () => {
    void runDelayedDamage()
  })

  root.querySelector('[data-ddb-reset]')?.addEventListener('click', () => {
    void resetDelayedDamage()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayDelayedDamage()
  })
}

bindUi()
