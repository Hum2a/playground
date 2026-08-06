const PHOTO_MS = 320
const DATA_MS = 400
const SEAL_MS = 400
const TOTAL_MS = PHOTO_MS + DATA_MS + SEAL_MS

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function root() {
  return document.querySelector('[data-license-card]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  timers.push(window.setTimeout(fn, ms))
}

function setLive(text) {
  const el = document.querySelector('[data-lci-live]')
  if (el) el.textContent = text
}

function revealAll() {
  ;['photo', 'data', 'seal'].forEach((part) => {
    const el = document.querySelector(`[data-lci-${part}]`)
    if (el) el.setAttribute('aria-hidden', 'false')
  })
}

function applyDone() {
  const r = root()
  if (r) r.dataset.phase = 'done'
  revealAll()
  setLive('Provisional license issued.')
  const run = document.querySelector('[data-lci-run]')
  const reset = document.querySelector('[data-lci-reset]')
  if (run) run.disabled = true
  if (reset) reset.hidden = false
}

export function runLicenseCardIssue() {
  const r = root()
  if (!r || busy || r.dataset.phase === 'done') return Promise.resolve()

  busy = true
  clearTimers()
  setLive('Constructing credential…')
  void r.offsetWidth

  if (prefersReducedMotion()) {
    applyDone()
    busy = false
    return Promise.resolve()
  }

  r.dataset.phase = 'photo'

  return new Promise((resolve) => {
    later(PHOTO_MS, () => {
      r.dataset.phase = 'data'
      setLive('Printing data fields…')

      later(DATA_MS, () => {
        r.dataset.phase = 'seal'
        setLive('Applying seal…')

        later(SEAL_MS, () => {
          applyDone()
          busy = false
          resolve()
        })
      })
    })
  })
}

export function resetLicenseCardIssue() {
  clearTimers()
  busy = false
  const r = root()
  if (r) r.dataset.phase = 'idle'
  ;['photo', 'data', 'seal'].forEach((part) => {
    const el = document.querySelector(`[data-lci-${part}]`)
    if (el) el.setAttribute('aria-hidden', 'true')
  })
  setLive('Blank credential slot.')
  const run = document.querySelector('[data-lci-run]')
  const reset = document.querySelector('[data-lci-reset]')
  if (run) run.disabled = false
  if (reset) reset.hidden = true
  void r?.offsetWidth
}

export async function replayLicenseCardIssue() {
  if (busy) return
  resetLicenseCardIssue()
  void root()?.offsetWidth
  await runLicenseCardIssue()
}

function bind() {
  document.querySelector('[data-lci-run]')?.addEventListener('click', () => {
    void runLicenseCardIssue()
  })
  document.querySelector('[data-lci-reset]')?.addEventListener('click', () => {
    resetLicenseCardIssue()
  })
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'restart') resetLicenseCardIssue()
  })
}

bind()
