/**
 * Black Impact Frame — finite single-trigger emphasis.
 * Never loops. Ignores re-entry while the sequence is active.
 * iframe-safe; no storage / parent / network.
 */

const ANTICIPATE_MS = 60
const IMPACT_MS = 72
const INVERSE_MS = 44
const RECOVER_MS = 120
const TOTAL_MS = ANTICIPATE_MS + IMPACT_MS + INVERSE_MS + RECOVER_MS

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-mbif]')
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
  const el = document.querySelector('[data-mbif-live]')
  if (el) el.textContent = text
}

function setPhase(phase) {
  rootEl()?.setAttribute('data-phase', phase)
}

function setButtons({ confirmOn, resetOn }) {
  const confirm = document.querySelector('[data-mbif-confirm]')
  const reset = document.querySelector('[data-mbif-reset]')
  if (confirm) confirm.disabled = !confirmOn
  if (reset) reset.disabled = !resetOn
}

function showBadge(on) {
  const badge = document.querySelector('[data-mbif-badge]')
  if (!badge) return
  if (on) badge.removeAttribute('hidden')
  else badge.setAttribute('hidden', '')
}

function finishDone(reduced) {
  const root = rootEl()
  setPhase('done')
  if (root) root.setAttribute('data-rm', reduced ? 'true' : 'false')
  showBadge(true)
  setLive(
    reduced
      ? 'Confirmed with static border emphasis. No surface flash.'
      : 'Confirmed. Impact sequence complete.',
  )
  busy = false
  setButtons({ confirmOn: false, resetOn: true })
}

/** @returns {Promise<void>} */
export function runMangaBlackImpactFrame() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  setButtons({ confirmOn: false, resetOn: false })
  root.setAttribute('data-rm', 'false')
  showBadge(false)

  if (prefersReducedMotion()) {
    // No full-surface inversion/flash — static 6px border on completed state.
    setPhase('done')
    finishDone(true)
    return Promise.resolve()
  }

  setPhase('anticipate')
  setLive('Anticipation hold.')

  return new Promise((resolve) => {
    later(ANTICIPATE_MS, () => {
      setPhase('impact')
      setLive('Black impact frame.')

      later(IMPACT_MS, () => {
        setPhase('inverse')
        setLive('Inverse white beat.')

        later(INVERSE_MS, () => {
          setPhase('recover')
          setLive('Recovering to completed UI.')
          showBadge(true)

          later(RECOVER_MS, () => {
            finishDone(false)
            resolve()
          })
        })
      })
    })
  })
}

export function resetMangaBlackImpactFrame() {
  clearTimers()
  busy = false
  const root = rootEl()
  setPhase('idle')
  root?.setAttribute('data-rm', 'false')
  showBadge(false)
  setLive('Action card ready. Confirm triggers one impact frame.')
  setButtons({ confirmOn: true, resetOn: true })
  void root?.offsetWidth
}

/** @returns {Promise<void>} */
export async function replayMangaBlackImpactFrame() {
  if (busy) return
  resetMangaBlackImpactFrame()
  void rootEl()?.offsetWidth
  await runMangaBlackImpactFrame()
}

function bindUi() {
  document.querySelector('[data-mbif-confirm]')?.addEventListener('click', () => {
    void runMangaBlackImpactFrame()
  })
  document.querySelector('[data-mbif-reset]')?.addEventListener('click', () => {
    if (busy) return
    resetMangaBlackImpactFrame()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayMangaBlackImpactFrame()
  })
}

void TOTAL_MS
bindUi()
resetMangaBlackImpactFrame()
