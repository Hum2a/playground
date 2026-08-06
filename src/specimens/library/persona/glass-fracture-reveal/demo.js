/**
 * Glass Fracture Reveal — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Content sits under the pane from t0; reveal only removes the glass.
 */

const PRESSURE_MS = 100
const FRACTURE_MS = 160 // majors draw ~80–240 from start → pressure then 160
const SECONDARY_LAG_MS = 80 // secondary around 180–300
const SEPARATE_AT = 300
const SEPARATE_MS = 320 // → ~620
const EDGE_AT = 620
const EDGE_MS = 180
const ANNOUNCE =
  'Record 042. Access granted. Recovered specimen metadata.'

/** @type {number[]} */
let timers = []
let busy = false
let revealed = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-glass-fracture]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setPhase(root, phase) {
  root.setAttribute('data-phase', phase)
}

function setLive(root, text) {
  const live = root.querySelector('[data-gfr-live]')
  if (!live) return
  live.textContent = ''
  void live.offsetWidth
  live.textContent = text
}

function setButtons(root, { reveal, reset }) {
  const g = root.querySelector('[data-gfr-reveal]')
  const r = root.querySelector('[data-gfr-reset]')
  if (g) g.disabled = !reveal
  if (r) r.disabled = !reset
}

function setRecordAccess(root, open) {
  const record = root.querySelector('[data-gfr-record]')
  if (!record) return
  if (open) {
    record.removeAttribute('aria-hidden')
    record.removeAttribute('inert')
  } else {
    record.setAttribute('aria-hidden', 'true')
    record.setAttribute('inert', '')
  }
}

function finishSettled(root, { reduced } = { reduced: false }) {
  clearTimers()
  setPhase(root, 'settled')
  if (reduced) root.classList.add('gfr--rm')
  else root.classList.remove('gfr--rm')
  setRecordAccess(root, true)
  setLive(root, ANNOUNCE)
  revealed = true
  busy = false
  setButtons(root, { reveal: false, reset: true })
}

/**
 * Pressure → fracture → separate → edge trace.
 * @returns {Promise<void>}
 */
export function revealGlassFracture() {
  const root = rootEl()
  if (!root || busy || revealed) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('gfr--rm')
  setButtons(root, { reveal: false, reset: false })
  setLive(root, '')
  setPhase(root, 'idle')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    finishSettled(root, { reduced: true })
    return Promise.resolve()
  }

  setPhase(root, 'pressure')

  return new Promise((resolve) => {
    later(PRESSURE_MS, () => {
      setPhase(root, 'fracture')
    })

    later(PRESSURE_MS + FRACTURE_MS + SECONDARY_LAG_MS, () => {
      // secondary branches already delayed in CSS; hold phase
    })

    later(SEPARATE_AT, () => {
      setPhase(root, 'separate')
      setRecordAccess(root, true)
      setLive(root, ANNOUNCE)
    })

    later(EDGE_AT, () => {
      setPhase(root, 'edge')
    })

    later(EDGE_AT + EDGE_MS, () => {
      finishSettled(root, { reduced: false })
      resolve()
    })
  })
}

/** Reconstruct the sealed pane exactly. */
export function resetGlassFracture() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()

  clearTimers()
  revealed = false
  busy = false
  root.classList.remove('gfr--rm')
  setPhase(root, 'idle')
  setRecordAccess(root, false)
  setLive(root, '')
  setButtons(root, { reveal: true, reset: true })
  void root.offsetWidth
  return Promise.resolve()
}

/** @returns {Promise<void>} */
export async function replayGlassFracture() {
  if (busy) return
  await resetGlassFracture()
  await revealGlassFracture()
}

function bindUi() {
  const root = rootEl()
  root?.querySelector('[data-gfr-reveal]')?.addEventListener('click', () => {
    void revealGlassFracture()
  })
  root?.querySelector('[data-gfr-reset]')?.addEventListener('click', () => {
    void resetGlassFracture()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayGlassFracture()
  })
}

bindUi()
{
  const root = rootEl()
  if (root) {
    setRecordAccess(root, false)
    setButtons(root, { reveal: true, reset: true })
  }
}
