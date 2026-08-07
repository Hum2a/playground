/**
 * Teleport Card Transfer — aperture compress → empty hold → reconstruct.
 * iframe-safe; no storage / parent / network.
 */

const COMPRESS_MS = 200
const EMPTY_HOLD_MS = 120
const RECONSTRUCT_MS = 220
const APERTURE_FROM_PX = 8
const APERTURE_TO_PX = 72

let busy = false
/** @type {number[]} */
let timers = []

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
    void card.offsetWidth
    card.removeAttribute('data-instant')
  }
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('SOURCE')
  setHint('Press Run to teleport the card.')
  setLive('Card at source slot. Destination empty.')
}

/**
 * Compress → empty mid hold → reconstruct at destination.
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

  const card = cardEl()
  root.setAttribute('data-phase', 'compress')
  sourceApertureEl()?.setAttribute('data-open', 'true')
  setStatus('COMPRESS')
  setLive('Card compressing into source aperture.')
  setHint(`Aperture ${APERTURE_FROM_PX}→${APERTURE_TO_PX}px.`)

  return new Promise((resolve) => {
    later(COMPRESS_MS, () => {
      root.setAttribute('data-phase', 'empty')
      sourceApertureEl()?.removeAttribute('data-open')
      setStatus('EMPTY')
      setLive('Mid-transfer empty hold.')
      setHint(`Empty hold ${EMPTY_HOLD_MS}ms.`)

      later(EMPTY_HOLD_MS, () => {
        const { dx, dy } = measureOffset()
        if (card) {
          card.setAttribute('data-instant', 'true')
          card.style.setProperty('--tct-dx', `${dx}px`)
          card.style.setProperty('--tct-dy', `${dy}px`)
          void card.offsetWidth
          card.removeAttribute('data-instant')
        }
        destApertureEl()?.setAttribute('data-open', 'true')
        root.setAttribute('data-phase', 'reconstruct')
        setStatus('RECONSTRUCT')
        setLive('Card reconstructing at destination aperture.')

        later(RECONSTRUCT_MS, () => {
          destApertureEl()?.removeAttribute('data-open')
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
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

bindUi()
resetTeleportCardTransfer()
requestAnimationFrame(() => {
  void runTeleportCardTransfer()
})
