/**
 * Target Dossier Reveal — three redaction bands lift, then seal snaps away.
 * iframe-safe; no storage / parent / network.
 */

const BAND_COUNT = 3
const BAND_STAGGER_MS = [0, 90, 180]
const BAND_MS = 200
const SEAL_MS = 160
const TOTAL_MS = BAND_STAGGER_MS[2] + BAND_MS + SEAL_MS

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
  return Array.from(document.querySelectorAll('[data-tdr-band]')).sort(
    (a, b) => Number(a.getAttribute('data-index')) - Number(b.getAttribute('data-index')),
  )
}

function sealEl() {
  return document.querySelector('[data-tdr-seal]')
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
  sealEl()?.setAttribute('data-broken', 'true')
  rootEl()?.setAttribute('data-phase', 'done')
  document.querySelector('[data-tdr-intel]')?.setAttribute('data-reveal', 'true')
  setStatus('REVEALED')
  setHint('Intel declassified.')
  setLive('All three redaction bands lifted. Seal broken. Intel revealed.')
}

function resetVisual() {
  bands().forEach((b) => b.removeAttribute('data-lifted'))
  sealEl()?.removeAttribute('data-broken')
  document.querySelector('[data-tdr-intel]')?.removeAttribute('data-reveal')
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
  setLive('Lifting redaction bands top-to-bottom.')

  return new Promise((resolve) => {
    bands().forEach((band, i) => {
      later(BAND_STAGGER_MS[i] ?? i * 90, () => {
        band.setAttribute('data-lifted', 'true')
        setLive(`Band ${i + 1} of ${BAND_COUNT} lifted (stagger ${BAND_STAGGER_MS[i]}ms).`)
      })
    })

    const lastBandEnd = (BAND_STAGGER_MS[BAND_COUNT - 1] ?? 180) + BAND_MS
    later(lastBandEnd, () => {
      sealEl()?.setAttribute('data-broken', 'true')
      setLive('Seal snapped away.')
      later(SEAL_MS, () => {
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
