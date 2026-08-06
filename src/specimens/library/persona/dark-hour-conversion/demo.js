/**
 * Dark Hour Conversion — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

const CLOCK_MS = 160
const HOLD_MS = 80
const CONVERT_MS = 720
const CONVERT_START = CLOCK_MS + HOLD_MS // 240
const CONVERT_END = CONVERT_START + CONVERT_MS // 960
const REFRACT_AT = CONVERT_START + Math.round(CONVERT_MS * 0.5) // ~50%
const REFRACT_MS = 90
const RESTORE_MS = 520

const PHASES = [
  'is-clock-swap',
  'is-midnight',
  'is-converting',
  'is-refract',
  'is-dark',
  'is-settled',
  'is-restoring',
]

let busy = false
let dark = false
/** @type {number[]} */
let timers = []
/** @type {number | null} */
let raf = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-dark-hour]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
  if (raf != null) {
    cancelAnimationFrame(raf)
    raf = null
  }
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(text) {
  const el = document.querySelector('[data-dhc-status]')
  if (!el) return
  el.textContent = ''
  void el.offsetWidth
  el.textContent = text
}

function setWipe(root, pct) {
  root.style.setProperty('--dhc-wipe', `${pct}%`)
}

function setTriggers({ advance, restore }) {
  const root = rootEl()
  if (!root) return
  const adv = root.querySelector('[data-dhc-advance]')
  const rst = root.querySelector('[data-dhc-restore]')
  if (adv) {
    adv.disabled = !advance
    adv.hidden = !advance
  }
  if (rst) {
    rst.disabled = !restore
    rst.hidden = !restore
  }
}

function setLayerSemantics(isDark) {
  const root = rootEl()
  if (!root) return
  const normal = root.querySelector('[data-dhc-normal]')
  const darkLayer = root.querySelector('[data-dhc-dark]')
  if (normal) normal.setAttribute('aria-hidden', isDark ? 'true' : 'false')
  if (darkLayer) darkLayer.setAttribute('aria-hidden', isDark ? 'false' : 'true')
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function animateWipe(root, from, to, duration, onDone) {
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = t * (2 - t)
    const pct = from + (to - from) * eased
    setWipe(root, pct)
    if (t < 1) {
      raf = requestAnimationFrame(tick)
    } else {
      raf = null
      onDone?.()
    }
  }
  raf = requestAnimationFrame(tick)
}

function settleDark(root) {
  clearPhases(root)
  root.classList.add('is-midnight', 'is-dark', 'is-settled')
  root.setAttribute('data-state', 'dark-hour')
  setWipe(root, 110)
  dark = true
  busy = false
  setLayerSemantics(true)
  setTriggers({ advance: false, restore: true })
  setStatus('Dark Hour')
}

function settleNormal(root) {
  clearPhases(root)
  root.setAttribute('data-state', 'normal')
  setWipe(root, 0)
  dark = false
  busy = false
  setLayerSemantics(false)
  setTriggers({ advance: true, restore: false })
  setStatus('Normal hours')
  // Reset clock faces for next run
  const out = root.querySelector('[data-dhc-clock-out]')
  const inn = root.querySelector('[data-dhc-clock-in]')
  if (out) {
    out.style.cssText = ''
    out.textContent = '23:59'
  }
  if (inn) {
    inn.style.cssText = ''
    inn.setAttribute('aria-hidden', 'true')
  }
}

/**
 * Advance ordinary interface into Dark Hour via travelling conversion boundary.
 * @returns {Promise<void>}
 */
export function runDarkHourConversion() {
  const root = rootEl()
  if (!root || busy || dark) return Promise.resolve()

  busy = true
  clearTimers()
  clearPhases(root)
  root.setAttribute('data-state', 'running')
  setTriggers({ advance: false, restore: false })
  setWipe(root, -5)
  void root.offsetWidth

  return new Promise((resolve) => {
    root.classList.add('is-clock-swap')

    later(CLOCK_MS, () => {
      root.classList.add('is-midnight')
    })

    if (prefersReducedMotion()) {
      later(CLOCK_MS + HOLD_MS, () => {
        settleDark(root)
        resolve()
      })
      return
    }

    later(CONVERT_START, () => {
      root.classList.add('is-converting')
      animateWipe(root, -5, 105, CONVERT_MS, () => {
        settleDark(root)
        resolve()
      })
    })

    later(REFRACT_AT, () => {
      root.classList.add('is-refract')
      later(REFRACT_MS, () => root.classList.remove('is-refract'))
    })
  })
}

/**
 * Faster upward retreat to normal hours (~520ms).
 * @returns {Promise<void>}
 */
export function restoreDarkHour() {
  const root = rootEl()
  if (!root || busy || !dark) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('is-settled', 'is-dark')
  root.classList.add('is-midnight', 'is-restoring')
  root.setAttribute('data-state', 'restoring')
  setTriggers({ advance: false, restore: false })
  setLayerSemantics(false)
  setStatus('Normal hours')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    settleNormal(root)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    animateWipe(root, 105, -5, RESTORE_MS, () => {
      settleNormal(root)
      resolve()
    })
  })
}

function bind() {
  const root = rootEl()
  if (!root) return
  root.querySelector('[data-dhc-advance]')?.addEventListener('click', () => {
    void runDarkHourConversion()
  })
  root.querySelector('[data-dhc-restore]')?.addEventListener('click', () => {
    void restoreDarkHour()
  })
  setWipe(root, 0)
  setTriggers({ advance: true, restore: false })
  setLayerSemantics(false)
  setStatus('Normal hours')
}

bind()
