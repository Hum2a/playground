/**
 * Card Break Summon (SPX-495) — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timing (ms):
 *   Shake / wind-up     0–180
 *   Cracks + blue leak  ~120–300
 *   Piece separation      300
 *   Entity settle       300–720
 *   Pieces exit host    ~300–780
 *   Total                 ~820
 */

const SHAKE_MS = 180
const SEPARATE_MS = 300
const TOTAL_MS = 820

let busy = false
let summoned = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
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

function rootEl() {
  return document.querySelector('[data-card-break]')
}

function setLive(text) {
  const live = rootEl()?.querySelector('[data-card-break-live]')
  if (live) live.textContent = text
}

function clearPhases(root) {
  root.classList.remove(
    'card-break--shake',
    'card-break--crack',
    'card-break--separate',
    'card-break--done',
    'card-break--rm',
  )
}

function showSealed(root) {
  const entity = root.querySelector('[data-card-break-entity]')
  const btn = root.querySelector('[data-card-break-summon]')
  entity?.setAttribute('aria-hidden', 'true')
  if (btn) {
    btn.textContent = 'SUMMON'
    btn.disabled = false
  }
  setLive('')
  summoned = false
}

function showEntity(root, announce) {
  const entity = root.querySelector('[data-card-break-entity]')
  const btn = root.querySelector('[data-card-break-summon]')
  entity?.removeAttribute('aria-hidden')
  if (btn) {
    btn.textContent = 'RESET'
    btn.disabled = false
  }
  if (announce) setLive('Entity 08 available.')
  summoned = true
}

/**
 * Fracture the sealed card and reveal the entity beneath.
 * @returns {Promise<void>}
 */
export function runCardBreakSummon() {
  if (busy) return Promise.resolve()
  const root = rootEl()
  if (!root) return Promise.resolve()

  if (summoned) {
    return runCardBreakReset()
  }

  busy = true
  clearTimers()
  clearPhases(root)
  void root.offsetWidth

  const btn = root.querySelector('[data-card-break-summon]')
  if (btn) btn.disabled = true

  if (prefersReducedMotion()) {
    root.classList.add('card-break--rm', 'card-break--done')
    showEntity(root, true)
    busy = false
    return Promise.resolve()
  }

  root.classList.add('card-break--shake')

  return new Promise((resolve) => {
    later(SHAKE_MS * 0.55, () => {
      root.classList.add('card-break--crack')
    })

    later(SEPARATE_MS, () => {
      root.classList.remove('card-break--shake')
      root.classList.add('card-break--separate')
    })

    later(TOTAL_MS, () => {
      root.classList.remove('card-break--crack', 'card-break--separate')
      root.classList.add('card-break--done')
      showEntity(root, true)
      busy = false
      resolve()
    })
  })
}

/**
 * Restore the sealed card.
 * @returns {Promise<void>}
 */
export function runCardBreakReset() {
  clearTimers()
  busy = false
  const root = rootEl()
  if (!root) return Promise.resolve()
  clearPhases(root)
  showSealed(root)
  void root.offsetWidth
  return Promise.resolve()
}

function bindUi() {
  document.querySelector('[data-card-break-summon]')?.addEventListener('click', () => {
    void runCardBreakSummon()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void runCardBreakReset().then(() => runCardBreakSummon())
    }
  })
}

bindUi()
