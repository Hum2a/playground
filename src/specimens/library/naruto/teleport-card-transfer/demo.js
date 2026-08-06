/**
 * Teleport Card Transfer — a card compresses at its source aperture and
 * reconstructs at the destination aperture.
 * iframe-safe; no storage / parent / network.
 */

const COMPRESS_MS = 200
const RECONSTRUCT_MS = 220
const TOTAL_MS = COMPRESS_MS + RECONSTRUCT_MS // ~420ms principal sequence

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tct]')
}

function cardEl() {
  return document.querySelector('[data-tct-card]')
}

function destEl() {
  return document.querySelector('[data-tct-dest]')
}

function sourceApertureEl() {
  return document.querySelector('[data-tct-aperture-source]')
}

function destApertureEl() {
  return document.querySelector('[data-tct-aperture-dest]')
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
  const el = document.querySelector('[data-tct-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tct-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-tct-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tct-run], [data-tct-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function measureOffset() {
  const card = cardEl()
  const dest = destEl()
  if (!card || !dest) return { dx: 0, dy: 0 }
  const cardRect = card.getBoundingClientRect()
  const destRect = dest.getBoundingClientRect()
  const dx =
    destRect.left + destRect.width / 2 - (cardRect.left + cardRect.width / 2)
  const dy =
    destRect.top + destRect.height / 2 - (cardRect.top + cardRect.height / 2)
  return { dx, dy }
}

function showResolved() {
  rootEl()?.setAttribute('data-phase', 'done')
  const dest = destApertureEl()
  dest?.setAttribute('data-open', 'true')
  later(RECONSTRUCT_MS, () => dest?.removeAttribute('data-open'))
  setStatus('ARRIVED')
  setHint('Card reconstructed at destination.')
  setLive('Card arrived at destination.')
}

function resetVisual() {
  const card = cardEl()
  sourceApertureEl()?.removeAttribute('data-open')
  destApertureEl()?.removeAttribute('data-open')
  if (card) {
    card.setAttribute('data-instant', 'true')
    card.style.setProperty('--tct-dx', '0px')
    card.style.setProperty('--tct-dy', '0px')
    card.style.setProperty('--tct-scale', '1')
    card.style.setProperty('--tct-opacity', '1')
    void card.offsetWidth
    card.removeAttribute('data-instant')
  }
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('SOURCE')
  setHint('Press Run to teleport the card.')
  setLive('Card at source slot. Destination empty.')
}

/**
 * Auto-run the full teleport sequence.
 * @returns {Promise<void>}
 */
export function runTeleportCardTransfer() {
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
    const card = cardEl()
    const { dx, dy } = measureOffset()
    if (card) {
      card.setAttribute('data-instant', 'true')
      card.style.setProperty('--tct-dx', `${dx}px`)
      card.style.setProperty('--tct-dy', `${dy}px`)
      void card.offsetWidth
      card.removeAttribute('data-instant')
    }
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('IN TRANSIT')
  setLive('Card compressing at source aperture.')

  const card = cardEl()
  sourceApertureEl()?.setAttribute('data-open', 'true')
  card?.style.setProperty('--tct-scale', '0')
  card?.style.setProperty('--tct-opacity', '0')

  return new Promise((resolve) => {
    later(COMPRESS_MS, () => {
      const { dx, dy } = measureOffset()
      if (card) {
        card.setAttribute('data-instant', 'true')
        card.style.setProperty('--tct-dx', `${dx}px`)
        card.style.setProperty('--tct-dy', `${dy}px`)
        void card.offsetWidth
        card.removeAttribute('data-instant')
        void card.offsetWidth
        card.style.setProperty('--tct-scale', '1')
        card.style.setProperty('--tct-opacity', '1')
      }
      later(RECONSTRUCT_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetTeleportCardTransfer() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayTeleportCardTransfer() {
  if (busy) return
  resetTeleportCardTransfer()
  void rootEl()?.offsetWidth
  await runTeleportCardTransfer()
}

function bindUi() {
  document.querySelector('[data-tct-run]')?.addEventListener('click', () => {
    void runTeleportCardTransfer()
  })
  document.querySelector('[data-tct-replay]')?.addEventListener('click', () => {
    void replayTeleportCardTransfer()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTeleportCardTransfer()
  })
}

void TOTAL_MS
bindUi()
resetTeleportCardTransfer()
