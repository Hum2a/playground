/**
 * Target Dossier Reveal — a restricted dossier peels its redaction layer and seal to reveal intel.
 * iframe-safe; no storage / parent / network.
 */

const PEEL_MS = 260
const REVEAL_MS = 220
const TOTAL_MS = PEEL_MS + REVEAL_MS // ~480ms principal sequence

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tdr]')
}

function intelEl() {
  return document.querySelector('[data-tdr-intel]')
}

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
  const el = document.querySelector('[data-tdr-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tdr-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-tdr-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tdr-run], [data-tdr-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  const intel = intelEl()
  rootEl()?.setAttribute('data-phase', 'done')
  intel?.setAttribute('data-reveal', 'true')
  setStatus('REVEALED')
  setHint('Intel declassified.')
  setLive('Dossier declassified. Intel revealed.')
}

function resetVisual() {
  const intel = intelEl()
  intel?.removeAttribute('data-reveal')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('CLASSIFIED')
  setHint('Press Run to declassify the dossier.')
  setLive('Dossier classified. Intel redacted.')
}

/**
 * Auto-run the full declassification sequence.
 * @returns {Promise<void>}
 */
export function runTargetDossierReveal() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('DECLASSIFYING')
  setLive('Seal broken. Redaction layer peeling.')

  return new Promise((resolve) => {
    later(PEEL_MS, () => {
      later(REVEAL_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetTargetDossierReveal() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayTargetDossierReveal() {
  if (busy) return
  resetTargetDossierReveal()
  void rootEl()?.offsetWidth
  await runTargetDossierReveal()
}

function bindUi() {
  document.querySelector('[data-tdr-run]')?.addEventListener('click', () => {
    void runTargetDossierReveal()
  })
  document.querySelector('[data-tdr-replay]')?.addEventListener('click', () => {
    void replayTargetDossierReveal()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTargetDossierReveal()
  })
}

void TOTAL_MS
bindUi()
resetTargetDossierReveal()
