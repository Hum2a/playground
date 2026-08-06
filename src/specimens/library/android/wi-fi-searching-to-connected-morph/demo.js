/**
 * Wi-Fi Searching-to-Connected Morph — finite acquisition sequence.
 */

const ARC_INTERVAL_MS = 180
const ACQUISITION_MS = 900
const TOTAL_SEARCH_MS = 900

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-wi-fi-searching-to-connected-morph]')
}

function setPhase(phase) {
  root()?.setAttribute('data-phase', phase)
}

function setLabel(text) {
  const el = document.querySelector('[data-wscm-label]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-wscm-status]')
  if (el) el.textContent = text
}

function clearArcs() {
  document.querySelectorAll('[data-wscm-arc]').forEach((a) => a.classList.remove('is-lit'))
}

function runSearch(onEnd) {
  setPhase('searching')
  setLabel('Searching…')
  setStatus('Scanning for network.')
  clearArcs()

  const arcs = [1, 2, 3]
  let i = 0

  const lightNext = () => {
    if (i < arcs.length) {
      document.querySelector(`[data-wscm-arc="${arcs[i]}"]`)?.classList.add('is-lit')
      i += 1
      if (i < arcs.length) {
        window.setTimeout(lightNext, prefersReducedMotion() ? 0 : ARC_INTERVAL_MS)
      }
    }
  }

  lightNext()
  window.setTimeout(onEnd, prefersReducedMotion() ? 80 : TOTAL_SEARCH_MS)
}

function showConnected() {
  setPhase('connected')
  document.querySelectorAll('[data-wscm-arc]').forEach((a) => a.classList.add('is-lit'))
  setLabel('Connected')
  setStatus('Network connected — stable geometry.')
  document.querySelector('[data-wscm-connect]')?.setAttribute('hidden', '')
  document.querySelector('[data-wscm-fail]')?.setAttribute('hidden', '')
  busy = false
}

function showFailed() {
  setPhase('failed')
  clearArcs()
  setLabel('Failed')
  setStatus('Connection failed — try again.')
  document.querySelector('[data-wscm-connect]')?.setAttribute('hidden', '')
  document.querySelector('[data-wscm-fail]')?.setAttribute('hidden', '')
  document.querySelector('[data-wscm-retry]')?.removeAttribute('hidden')
  busy = false
}

function bindUi() {
  document.querySelector('[data-wscm-connect]')?.addEventListener('click', () => {
    if (busy) return
    busy = true
    document.querySelector('[data-wscm-fail]')?.removeAttribute('hidden')
    runSearch(showConnected)
  })

  document.querySelector('[data-wscm-fail]')?.addEventListener('click', () => {
    if (busy) return
    busy = true
    runSearch(showFailed)
  })

  document.querySelector('[data-wscm-retry]')?.addEventListener('click', () => {
    document.querySelector('[data-wscm-retry]')?.setAttribute('hidden', '')
    document.querySelector('[data-wscm-connect]')?.removeAttribute('hidden')
    setPhase('disconnected')
    clearArcs()
    setLabel('Disconnected')
    setStatus('Tap Connect to search for network.')
    busy = false
  })
}

bindUi()

export function resetWiFiSearchingToConnectedMorph() {
  busy = false
  clearArcs()
  setPhase('disconnected')
  setLabel('Disconnected')
  setStatus('Tap Connect to search for network.')
  document.querySelector('[data-wscm-connect]')?.removeAttribute('hidden')
  document.querySelector('[data-wscm-fail]')?.setAttribute('hidden', '')
  document.querySelector('[data-wscm-retry]')?.setAttribute('hidden', '')
}

export const WI_FI_SEARCHING_TO_CONNECTED_MORPH_CONTRACT = {
  ARC_INTERVAL_MS,
  ACQUISITION_MS,
  TOTAL_SEARCH_MS,
}
