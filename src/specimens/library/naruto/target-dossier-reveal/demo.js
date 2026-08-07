/**
 * Target Dossier Reveal — three redaction bands lift in order, then intel reveals.
 * iframe-safe; no storage / parent / network.
 */

const BAND_COUNT = 3
const BAND_STAGGER_MS = 110
const BAND_LIFT_MS = 160
const REVEAL_MS = 180
const BAND_ORDER = [0, 1, 2]

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
  return document.querySelector('[data-tdr]')
}

function bands() {
  return Array.from(document.querySelectorAll('[data-tdr-band]'))
}

function intelEl() {
  return document.querySelector('[data-tdr-intel]')
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
  bands().forEach((b) => b.setAttribute('data-lifted', 'true'))
  const intel = intelEl()
  rootEl()?.setAttribute('data-phase', 'done')
  intel?.setAttribute('data-reveal', 'true')
  document.querySelector('[data-tdr-seal]')?.style.setProperty('opacity', '0')
  setStatus('REVEALED')
  setHint('Intel declassified.')
  setLive('Dossier declassified. Three bands lifted. Intel revealed.')
}

function resetVisual() {
  bands().forEach((b) => b.removeAttribute('data-lifted'))
  intelEl()?.removeAttribute('data-reveal')
  const seal = document.querySelector('[data-tdr-seal]')
  if (seal) seal.style.opacity = ''
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('CLASSIFIED')
  setHint('Press Run to declassify the dossier.')
  setLive('Dossier classified. Three redaction bands sealed.')
}

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
  setLive('Lifting redaction bands in order.')
  const seal = document.querySelector('[data-tdr-seal]')
  if (seal) seal.style.opacity = '0'

  return new Promise((resolve) => {
    const list = bands()
    BAND_ORDER.forEach((idx, i) => {
      later(i * BAND_STAGGER_MS, () => {
        list[idx]?.setAttribute('data-lifted', 'true')
      })
    })
    const total = (BAND_COUNT - 1) * BAND_STAGGER_MS + BAND_LIFT_MS + REVEAL_MS
    later(total, () => {
      showResolved()
      busy = false
      setButtons(true)
      resolve()
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

bindUi()
resetTargetDossierReveal()
