/**
 * Rank Promotion Card — a profile card flips from its current rank to the next.
 * iframe-safe; no storage / parent / network.
 */

const FOLD_MS = 260
const GLOW_MS = 320
const TOTAL_MS = FOLD_MS + GLOW_MS // ~580ms principal sequence

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-rpc]')
}

function nextBadgeEl() {
  return document.querySelector('[data-rpc-badge-next]')
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
  const el = document.querySelector('[data-rpc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-rpc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-rpc-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-rpc-run], [data-rpc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  const next = nextBadgeEl()
  rootEl()?.setAttribute('data-phase', 'done')
  next?.setAttribute('data-glow', 'true')
  setStatus('PROMOTED')
  setHint('Rank promoted.')
  setLive('Profile promoted to Chunin.')
}

function resetVisual() {
  const next = nextBadgeEl()
  next?.removeAttribute('data-glow')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('CURRENT')
  setHint('Press Run to promote this profile.')
  setLive('Profile shows current rank Genin.')
}

/**
 * Auto-run the full promotion sequence.
 * @returns {Promise<void>}
 */
export function runRankPromotionCard() {
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
  setStatus('PROMOTING')
  setLive('Rank promotion in progress.')

  return new Promise((resolve) => {
    later(FOLD_MS, () => {
      later(GLOW_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetRankPromotionCard() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayRankPromotionCard() {
  if (busy) return
  resetRankPromotionCard()
  void rootEl()?.offsetWidth
  await runRankPromotionCard()
}

function bindUi() {
  document.querySelector('[data-rpc-run]')?.addEventListener('click', () => {
    void runRankPromotionCard()
  })
  document.querySelector('[data-rpc-replay]')?.addEventListener('click', () => {
    void replayRankPromotionCard()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayRankPromotionCard()
  })
}

void TOTAL_MS
bindUi()
resetRankPromotionCard()
