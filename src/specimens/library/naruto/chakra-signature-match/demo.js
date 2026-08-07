/**
 * Chakra Signature Match — five signal bars rise to meet a reference profile.
 * iframe-safe; no storage / parent / network.
 */

const BAR_COUNT = 5
const STEP_MS = 170
const SETTLE_MS = 100
const ALIGN_THRESHOLD = 0.92
const SAMPLE_POINTS = [0.12, 0.28, 0.5, 0.72, 0.88]
const TOTAL_MS = BAR_COUNT * STEP_MS + SETTLE_MS

let busy = false
let matched = 0
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-csm]')
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
  const el = document.querySelector('[data-csm-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-csm-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-csm-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-csm-run], [data-csm-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function bars() {
  return Array.from(document.querySelectorAll('[data-csm-bar]'))
}

function fills() {
  return Array.from(document.querySelectorAll('[data-csm-fill]'))
}

function paint(count, pulseIndex) {
  const barList = bars()
  fills().forEach((fill, i) => {
    const on = i < count
    const target = fill.dataset.target || '0'
    fill.style.height = on ? `${target}%` : '0%'
    fill.setAttribute('data-active', on ? 'true' : 'false')
    const bar = barList[i]
    bar?.setAttribute(
      'aria-label',
      on ? `Band ${i + 1} matched` : `Band ${i + 1} unmatched`,
    )
    if (pulseIndex === i && bar) {
      bar.setAttribute('data-pulse', 'true')
      later(STEP_MS, () => bar.removeAttribute('data-pulse'))
    } else if (bar) {
      bar.removeAttribute('data-pulse')
    }
  })
}

function showResolved() {
  matched = BAR_COUNT
  paint(BAR_COUNT, -1)
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('MATCH')
  setHint('Signature confirmed.')
  setLive('Signature match confirmed. All bands aligned.')
}

function resetVisual() {
  matched = 0
  paint(0, -1)
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('IDLE')
  setHint('Press Run to compare signatures.')
  setLive('Comparison idle. Signature unmatched.')
}

/**
 * Auto-run the full comparison (Run / replay).
 * @returns {Promise<void>}
 */
export function runChakraSignatureMatch() {
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
  setStatus('COMPARING')
  setLive('Comparing incoming signature.')

  return new Promise((resolve) => {
    let step = 0
    const tick = () => {
      if (step >= BAR_COUNT) {
        later(SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
        return
      }
      matched = step + 1
      paint(matched, step)
      setLive(`Band ${matched} of ${BAR_COUNT} aligned.`)
      step += 1
      later(STEP_MS, tick)
    }
    tick()
  })
}

export function resetChakraSignatureMatch() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayChakraSignatureMatch() {
  if (busy) return
  resetChakraSignatureMatch()
  void rootEl()?.offsetWidth
  await runChakraSignatureMatch()
}

function bindUi() {
  document.querySelector('[data-csm-run]')?.addEventListener('click', () => {
    void runChakraSignatureMatch()
  })
  document.querySelector('[data-csm-replay]')?.addEventListener('click', () => {
    void replayChakraSignatureMatch()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayChakraSignatureMatch()
  })
}

void TOTAL_MS
bindUi()
resetChakraSignatureMatch()

void ALIGN_THRESHOLD
void SAMPLE_POINTS
