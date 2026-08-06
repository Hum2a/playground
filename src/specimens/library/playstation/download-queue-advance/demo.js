/**
 * Download Queue Advance — PlayStation-inspired motion specimen.
 * iframe-safe; no storage / parent / network.
 */

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-dqa]')
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
  const el = document.querySelector('[data-dqa-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-dqa-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-dqa-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-dqa-run], [data-dqa-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

const ITEMS = 3
const FILL_MS = 900
const HANDOFF_MS = 280
const STEP_MS = 40

function items() {
  return Array.from(document.querySelectorAll('[data-dqa-item]'))
}

function setItemState(idx, state) {
  const item = items()[idx]
  if (!item) return
  item.setAttribute('data-state', state)
  const stateEl = item.querySelector('.dqa__item-state')
  if (stateEl) {
    stateEl.textContent = state === 'done' ? 'DONE' : state === 'active' ? 'ACTIVE' : 'WAITING'
  }
}

function setFill(idx, pct) {
  const fill = items()[idx]?.querySelector('[data-fill]')
  if (fill) fill.style.width = `${pct}%`
}

function resetVisual() {
  rootEl()?.setAttribute('data-phase', 'idle')
  items().forEach((_, i) => {
    setItemState(i, i === 0 ? 'active' : 'waiting')
    setFill(i, 0)
  })
  setStatus('IN QUEUE')
  setHint('Press Run to advance queue.')
  setLive('Queue idle. Item one active.')
}

function showDone() {
  items().forEach((_, i) => {
    setItemState(i, 'done')
    setFill(i, 100)
  })
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('QUEUE CLEAR')
  setHint('All downloads complete.')
  setLive('Queue clear. All items done.')
}

export function runDownloadQueueAdvance() {
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

  root.setAttribute('data-phase', 'active')
  setStatus('ADVANCING')
  setLive('Advancing download queue.')

  return new Promise((resolve) => {
    let active = 0
    const fillItem = () => {
      let step = 0
      const steps = FILL_MS / STEP_MS
      const tick = () => {
        if (step > steps) {
          setItemState(active, 'done')
          setFill(active, 100)
          setLive(`Item ${active + 1} complete.`)
          later(HANDOFF_MS, () => {
            active += 1
            if (active >= ITEMS) {
              showDone()
              busy = false
              setButtons(true)
              resolve()
            } else {
              setItemState(active, 'active')
              setLive(`Handoff to item ${active + 1}.`)
              fillItem()
            }
          })
          return
        }
        setFill(active, Math.round((step / steps) * 100))
        step += 1
        later(STEP_MS, tick)
      }
      tick()
    }
    fillItem()
  })
}

export function resetDownloadQueueAdvance() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

export async function replayDownloadQueueAdvance() {
  if (busy) return
  resetDownloadQueueAdvance()
  void rootEl()?.offsetWidth
  await runDownloadQueueAdvance()
}

function bindUi() {
  document.querySelector('[data-dqa-run]')?.addEventListener('click', () => {
    void runDownloadQueueAdvance()
  })
  document.querySelector('[data-dqa-replay]')?.addEventListener('click', () => {
    void replayDownloadQueueAdvance()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayDownloadQueueAdvance()
  })
}

bindUi()
resetDownloadQueueAdvance()
