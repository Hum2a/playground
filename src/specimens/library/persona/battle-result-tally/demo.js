/**
 * Battle Result Tally — keyframed row reveal + frozen tick rate.
 * iframe-safe; no storage / parent / network.
 */

const TARGETS = { exp: 420, score: 1250, total: 1670 }
const ROW_DELAY_MS = 180
const TICK_MS = 32
const COUNT_MS = { exp: 500, score: 600, total: 400 }

let busy = false
/** @type {number[]} */
let timers = []
/** @type {number[]} */
let rafs = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-brt]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
  for (const id of rafs) cancelAnimationFrame(id)
  rafs = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setLive(text) {
  const el = document.querySelector('[data-brt-live]')
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setButtons(on) {
  document.querySelectorAll('[data-brt-run], [data-brt-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setValues(values) {
  const exp = document.querySelector('[data-brt-exp]')
  const score = document.querySelector('[data-brt-score]')
  const total = document.querySelector('[data-brt-total]')
  if (exp) exp.textContent = String(values.exp)
  if (score) score.textContent = String(values.score)
  if (total) total.textContent = String(values.total)
}

function count(el, target, dur) {
  if (!el) return
  const start = performance.now()
  let last = 0

  function tick(now) {
    if (now - last < TICK_MS && now - start < dur) {
      rafs.push(requestAnimationFrame(tick))
      return
    }
    last = now
    const p = Math.min(1, (now - start) / dur)
    el.textContent = String(Math.round(target * p))
    if (p < 1) rafs.push(requestAnimationFrame(tick))
  }

  rafs.push(requestAnimationFrame(tick))
}

function finish() {
  setValues(TARGETS)
  setPhase('done')
  setLive('Tally complete.')
  busy = false
  setButtons(true)
  const run = document.querySelector('[data-brt-run]')
  if (run) run.disabled = true
}

export function runBattleResultTally() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (root.getAttribute('data-phase') === 'done') return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  setValues({ exp: 0, score: 0, total: 0 })
  setPhase('tally')
  setLive('Tallying results.')

  if (prefersReducedMotion()) {
    finish()
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    later(ROW_DELAY_MS * 0 + 40, () => {
      count(document.querySelector('[data-brt-exp]'), TARGETS.exp, COUNT_MS.exp)
    })
    later(ROW_DELAY_MS * 1 + 40, () => {
      count(document.querySelector('[data-brt-score]'), TARGETS.score, COUNT_MS.score)
    })
    later(ROW_DELAY_MS * 2 + 40, () => {
      count(document.querySelector('[data-brt-total]'), TARGETS.total, COUNT_MS.total)
    })
    later(ROW_DELAY_MS * 2 + COUNT_MS.total + 80, () => {
      finish()
      resolve()
    })
  })
}

export function resetBattleResultTally() {
  clearTimers()
  busy = false
  setPhase('idle')
  setValues({ exp: 0, score: 0, total: 0 })
  setLive('Results pending.')
  setButtons(true)
}

function bindUi() {
  document.querySelector('[data-brt-run]')?.addEventListener('click', () => {
    void runBattleResultTally()
  })
  document.querySelector('[data-brt-reset]')?.addEventListener('click', resetBattleResultTally)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetBattleResultTally()
  })
}

bindUi()
resetBattleResultTally()
