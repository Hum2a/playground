/**
 * Level-Up Burst — frozen roll-up cadence + staggered stat reorder.
 * iframe-safe; no storage / parent / network.
 */

const FROM = { lv: 12, hp: 320, sp: 180, str: 14 }
const TO = { lv: 13, hp: 348, sp: 195, str: 16 }
const ROLL_MS = 120
const STAT_STAGGER_MS = 120
const STAT_MS = 280
const BURST_MS = 700

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  return forced || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-lub]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setLive(text) {
  const el = document.querySelector('[data-lub-live]')
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setButtons(on) {
  document.querySelectorAll('[data-lub-run], [data-lub-reset]').forEach((btn) => {
    btn.disabled = !on
  })
}

function applyBase() {
  const lv = document.querySelector('[data-lub-lv]')
  const hp = document.querySelector('[data-lub-hp]')
  const sp = document.querySelector('[data-lub-sp]')
  const str = document.querySelector('[data-lub-str]')
  if (lv) lv.textContent = String(FROM.lv)
  if (hp) hp.textContent = String(FROM.hp)
  if (sp) sp.textContent = String(FROM.sp)
  if (str) str.textContent = String(FROM.str)
  document.querySelectorAll('.lub__stats li').forEach((li) => li.classList.remove('is-up'))
}

function applyFinal() {
  const lv = document.querySelector('[data-lub-lv]')
  const hp = document.querySelector('[data-lub-hp]')
  const sp = document.querySelector('[data-lub-sp]')
  const str = document.querySelector('[data-lub-str]')
  if (lv) lv.textContent = String(TO.lv)
  if (hp) hp.textContent = String(TO.hp)
  if (sp) sp.textContent = String(TO.sp)
  if (str) str.textContent = String(TO.str)
  document.querySelectorAll('.lub__stats li').forEach((li) => li.classList.add('is-up'))
  setPhase('done')
  setLive('Level 13. Stats increased.')
  busy = false
  setButtons(true)
  const run = document.querySelector('[data-lub-run]')
  if (run) run.disabled = true
}

export function runLevelUpBurst() {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (root.getAttribute('data-phase') === 'done') return Promise.resolve()

  busy = true
  clearTimers()
  setButtons(false)
  applyBase()
  setLive('Leveling up.')

  if (prefersReducedMotion()) {
    applyFinal()
    return Promise.resolve()
  }

  setPhase('roll')

  return new Promise((resolve) => {
    later(ROLL_MS, () => {
      const lv = document.querySelector('[data-lub-lv]')
      if (lv) lv.textContent = String(TO.lv)
      setPhase('stats')
      setLive('Stats reordering.')

      const order = [
        ['hp', TO.hp],
        ['sp', TO.sp],
        ['str', TO.str],
      ]

      order.forEach(([key, value], i) => {
        later(i * STAT_STAGGER_MS, () => {
          const el = document.querySelector(`[data-lub-${key}]`)
          if (el) el.textContent = String(value)
          document.querySelector(`[data-lub-stat="${key}"]`)?.classList.add('is-up')
        })
      })

      later(STAT_STAGGER_MS * 2 + STAT_MS, () => {
        applyFinal()
        resolve()
      })
    })
  })
}

export function resetLevelUpBurst() {
  clearTimers()
  busy = false
  setPhase('idle')
  applyBase()
  setLive('Level 12.')
  setButtons(true)
  void BURST_MS
}

function bindUi() {
  document.querySelector('[data-lub-run]')?.addEventListener('click', () => {
    void runLevelUpBurst()
  })
  document.querySelector('[data-lub-reset]')?.addEventListener('click', resetLevelUpBurst)
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetLevelUpBurst()
  })
}

bindUi()
resetLevelUpBurst()
