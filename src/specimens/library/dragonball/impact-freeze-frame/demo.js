/**
 * Impact Freeze Frame — approach → contact → exact 80ms hit-stop → consequence.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Documented: --impact-freeze: 80ms
 */

const TRAVEL_MS = 150
const FLASH_MS = 50
/** Exact freeze hold — must match --impact-freeze and contract. */
const FREEZE_MS = 80
const WEDGE_MS = 110
const SETTLE_MS = 130
const APPLY_MS = 40

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-iff]')
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
  if (root) root.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-iff-live]')
  if (el) el.textContent = text
}

function setControls(done) {
  const btn = document.querySelector('[data-iff-execute]')
  if (btn) btn.disabled = busy || done
}

function setApplied(on) {
  const pending = document.querySelector('[data-iff-pending]')
  const applied = document.querySelector('[data-iff-applied]')
  if (pending) pending.setAttribute('aria-hidden', on ? 'true' : 'false')
  if (applied) applied.setAttribute('aria-hidden', on ? 'false' : 'true')
}

/** Hard-pause every running animation — do not fake with slowdown. */
function hardFreezeAnimations() {
  const root = rootEl()
  if (!root) return
  for (const el of root.querySelectorAll('*')) {
    for (const anim of el.getAnimations()) {
      anim.pause()
      // Snap to end of travel if still mid-flight
      if (anim.playState === 'paused' && anim.effect) {
        try {
          const timing = anim.effect.getComputedTiming?.()
          if (timing && timing.progress != null && timing.progress < 1) {
            anim.currentTime = anim.effect.getTiming().duration || TRAVEL_MS
          }
        } catch {
          /* ignore */
        }
      }
    }
  }
}

function finishApplied() {
  setPhase('applied')
  setApplied(true)
  setLive('Change applied')
  busy = false
  setControls(true)
}

/**
 * Run impact sequence with exact 80ms freeze at contact.
 * @returns {Promise<void>}
 */
export function runImpactFreeze() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'applied') {
    return Promise.resolve()
  }

  busy = true
  setControls(false)
  clearTimers()
  setApplied(false)
  setLive('Executing commit')

  if (prefersReducedMotion()) {
    finishApplied()
    return Promise.resolve()
  }

  // Restart travel cleanly
  setPhase('idle')
  void root.offsetWidth
  setPhase('travel')

  return new Promise((resolve) => {
    later(TRAVEL_MS, () => {
      hardFreezeAnimations()
      setPhase('flash')
      setLive('Impact')

      later(FLASH_MS, () => {
        setPhase('freeze')

        later(FREEZE_MS, () => {
          setPhase('release')
          setLive('Settling')

          later(Math.max(WEDGE_MS, SETTLE_MS), () => {
            later(APPLY_MS, () => {
              finishApplied()
              resolve()
            })
          })
        })
      })
    })
  })
}

export function resetImpactFreeze() {
  clearTimers()
  busy = false
  setPhase('idle')
  setApplied(false)
  setLive('Change pending')
  setControls(false)
  const root = rootEl()
  if (root) void root.offsetWidth
}

function bindUi() {
  document.querySelector('[data-iff-execute]')?.addEventListener('click', () => {
    void runImpactFreeze()
  })
  document.querySelector('[data-iff-reset]')?.addEventListener('click', () => {
    resetImpactFreeze()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetImpactFreeze()
  })
}

bindUi()
resetImpactFreeze()
