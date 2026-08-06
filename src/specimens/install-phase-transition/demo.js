/**
 * Install Phase Transition — PlayStation-inspired motion specimen.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-ipt]')
}

let busy = false
/** @type {number[]} */
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
  const el = document.querySelector('[data-ipt-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ipt-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-ipt-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ipt-run], [data-ipt-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

const CIRC = 251.33
const STEP_MS = 40

function setProgress(pct, phase) {
  const root = rootEl()
  if (root) {
    root.setAttribute('data-progress', String(pct))
    if (phase) root.setAttribute('data-phase', phase)
  }
  const fill = document.querySelector('[data-ipt-fill]')
  const pctEl = document.querySelector('[data-ipt-pct]')
  const phaseEl = document.querySelector('[data-ipt-phase]')
  if (fill) fill.style.strokeDashoffset = String(CIRC * (1 - pct / 100))
  if (pctEl) pctEl.textContent = `${pct}%`
  if (phaseEl && phase) phaseEl.textContent = phase === 'download' ? 'DOWNLOAD' : 'INSTALL'
}

function resetVisual() {
  setProgress(0, 'download')
  setStatus('DOWNLOADING')
  setHint('Press Run for phase transition.')
  setLive('Download phase idle.')
}

function showDone() {
  setProgress(100, 'done')
  document.querySelector('[data-ipt-phase]').textContent = 'READY'
  setStatus('INSTALLED')
  setHint('Install complete on same card.')
  setLive('Install complete. Same card context preserved.')
}

export function runInstallPhaseTransition() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return Promise.resolve()
  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showDone()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let step = 0
    const dlSteps = 12
    const tickDl = () => {
      if (step > dlSteps) {
        root.setAttribute('data-phase', 'install')
        setStatus('INSTALLING')
        setLive('Phase transition to install.')
        setProgress(0, 'install')
        let inst = 0
        const instSteps = 12
        const tickInst = () => {
          if (inst > instSteps) {
            showDone()
            busy = false
            setButtons(true)
            resolve()
            return
          }
          setProgress(Math.round((inst / instSteps) * 100), 'install')
          inst += 1
          later(STEP_MS, tickInst)
        }
        tickInst()
        return
      }
      setProgress(Math.round((step / dlSteps) * 100), 'download')
      step += 1
      later(STEP_MS, tickDl)
    }
    tickDl()
  })
}

export function resetInstallPhaseTransition() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

export async function replayInstallPhaseTransition() {
  if (busy) return
  resetInstallPhaseTransition()
  void rootEl()?.offsetWidth
  await runInstallPhaseTransition()
}

function bindUi() {
  document.querySelector('[data-ipt-run]')?.addEventListener('click', () => {
    void runInstallPhaseTransition()
  })
  document.querySelector('[data-ipt-replay]')?.addEventListener('click', () => {
    void replayInstallPhaseTransition()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayInstallPhaseTransition()
  })
}

bindUi()
resetInstallPhaseTransition()
