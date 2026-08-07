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
const PHASE_MS = 320
const DL_STEPS = 14
const INST_STEPS = 14

function setRing(pct) {
  const fill = document.querySelector('[data-ipt-fill]')
  if (fill) fill.style.strokeDashoffset = String(CIRC * (1 - pct / 100))
}

function setBars(pct) {
  const heights = [0.55, 0.75, 1, 0.65]
  ;[0, 1, 2, 3].forEach((i) => {
    const bar = document.querySelector(`[data-ipt-bar="${i}"]`)
    if (!bar) return
    const h = Math.min(100, Math.round(pct * heights[i]))
    bar.style.height = `${h}%`
  })
}

function setPctLabel(pct) {
  const pctEl = document.querySelector('[data-ipt-pct]')
  if (pctEl) pctEl.textContent = `${pct}%`
}

function setPhaseLabel(phase) {
  const phaseEl = document.querySelector('[data-ipt-phase]')
  if (!phaseEl) return
  if (phase === 'download') phaseEl.textContent = 'DOWNLOAD'
  else if (phase === 'install') phaseEl.textContent = 'INSTALL'
  else phaseEl.textContent = 'READY'
}

function setProgress(pct, phase) {
  const root = rootEl()
  if (root) {
    root.setAttribute('data-progress', String(pct))
    if (phase) root.setAttribute('data-phase', phase)
  }
  if (phase) setPhaseLabel(phase)
  setPctLabel(pct)
  if (phase === 'download') {
    setRing(pct)
    setBars(0)
  } else if (phase === 'install') {
    setRing(100)
    setBars(pct)
  } else if (phase === 'done') {
    setRing(100)
    setBars(100)
  }
}

function resetVisual() {
  setProgress(0, 'download')
  setRing(0)
  setBars(0)
  setStatus('DOWNLOADING')
  setHint('Run morphs download ring → install bars.')
  setLive('Download phase idle.')
}

function showDone() {
  setProgress(100, 'done')
  setStatus('INSTALLED')
  setHint('Install complete — same card context.')
  setLive('Install complete. Geometry morph finished.')
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
    const tickDl = () => {
      if (step > DL_STEPS) {
        setProgress(100, 'download')
        setStatus('MORPHING')
        setLive('Morphing download ring into install bars.')
        root.setAttribute('data-phase', 'install')
        setPhaseLabel('install')
        setPctLabel(0)
        setBars(0)
        later(PHASE_MS, () => {
          setStatus('INSTALLING')
          setLive('Install phase on segmented bars.')
          let inst = 0
          const tickInst = () => {
            if (inst > INST_STEPS) {
              showDone()
              busy = false
              setButtons(true)
              resolve()
              return
            }
            setProgress(Math.round((inst / INST_STEPS) * 100), 'install')
            inst += 1
            later(STEP_MS, tickInst)
          }
          tickInst()
        })
        return
      }
      setProgress(Math.round((step / DL_STEPS) * 100), 'download')
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
