/**
 * Mission Board Dispatch — a job card travels from the unassigned column into a team lane.
 * iframe-safe; no storage / parent / network.
 */

const TRAVEL_MS = 260
const SETTLE_MS = 200
const TOTAL_MS = TRAVEL_MS + SETTLE_MS // ~460ms principal sequence

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-mbd]')
}

function cardEl() {
  return document.querySelector('[data-mbd-card]')
}

function targetEl() {
  return document.querySelector('[data-mbd-target]')
}

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
  const el = document.querySelector('[data-mbd-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-mbd-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-mbd-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-mbd-run], [data-mbd-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function measureOffset() {
  const card = cardEl()
  const target = targetEl()
  if (!card || !target) return { dx: 0, dy: 0 }
  const cardRect = card.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const dx =
    targetRect.left + targetRect.width / 2 - (cardRect.left + cardRect.width / 2)
  const dy =
    targetRect.top + targetRect.height / 2 - (cardRect.top + cardRect.height / 2)
  return { dx, dy }
}

function applyOffset() {
  const card = cardEl()
  const { dx, dy } = measureOffset()
  card?.style.setProperty('--mbd-dx', `${dx}px`)
  card?.style.setProperty('--mbd-dy', `${dy}px`)
}

function showResolved() {
  const card = cardEl()
  rootEl()?.setAttribute('data-phase', 'done')
  card?.setAttribute('data-settle', 'true')
  setStatus('ASSIGNED')
  setHint('Job dispatched.')
  setLive('Job card dispatched to the team lane.')
}

function resetVisual() {
  const card = cardEl()
  card?.removeAttribute('data-settle')
  card?.style.setProperty('--mbd-dx', '0px')
  card?.style.setProperty('--mbd-dy', '0px')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('UNASSIGNED')
  setHint('Press Run to dispatch the job.')
  setLive('Job card unassigned on the board.')
}

/**
 * Auto-run the full dispatch sequence.
 * @returns {Promise<void>}
 */
export function runMissionBoardDispatch() {
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
    applyOffset()
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  applyOffset()
  root.setAttribute('data-phase', 'active')
  setStatus('DISPATCHING')
  setLive('Job card dispatching to the team lane.')

  return new Promise((resolve) => {
    later(TRAVEL_MS, () => {
      later(SETTLE_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetMissionBoardDispatch() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMissionBoardDispatch() {
  if (busy) return
  resetMissionBoardDispatch()
  void rootEl()?.offsetWidth
  await runMissionBoardDispatch()
}

function bindUi() {
  document.querySelector('[data-mbd-run]')?.addEventListener('click', () => {
    void runMissionBoardDispatch()
  })
  document.querySelector('[data-mbd-replay]')?.addEventListener('click', () => {
    void replayMissionBoardDispatch()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMissionBoardDispatch()
  })
}

void TOTAL_MS
bindUi()
resetMissionBoardDispatch()
