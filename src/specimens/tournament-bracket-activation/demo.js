/**
 * Tournament Bracket Activation — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Dormant 8-seed bracket → paired activation → 8 segments → 4 QF junctions → READY.
 */

const PAIR_STAGGER_MS = 70
const PATH_MS = 140
const JUNC_MS = 180
const GUIDE_MS = 160
const LABEL_MS = 200
const PAIR_COUNT = 4

const LAST_PAIR_AT = (PAIR_COUNT - 1) * PAIR_STAGGER_MS
const ALL_QF_AT = LAST_PAIR_AT + PATH_MS + JUNC_MS
const GUIDES_AT = ALL_QF_AT
const READY_AT = GUIDES_AT + GUIDE_MS + 40

let busy = false
let done = false
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
  return document.querySelector('[data-tba]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function setStatus(root, text) {
  const status = root.querySelector('[data-tba-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setRound(root, text) {
  const el = root.querySelector('[data-tba-round]')
  if (el) el.textContent = text
}

function setBusyUi(root, isBusy) {
  const btn = root.querySelector('[data-tba-open]')
  if (btn) btn.disabled = isBusy || done
}

function setMatchupCopy(root, active) {
  const items = root.querySelectorAll('[data-tba-matchups] li')
  const labels = [
    'Quarter-final 1: A // ATLAS versus B // NOVA',
    'Quarter-final 2: C // KITE versus D // ECHO',
    'Quarter-final 3: E // VELA versus F // ORBIT',
    'Quarter-final 4: G // FLINT versus H // PULSE',
  ]
  items.forEach((li, i) => {
    li.textContent = active
      ? `${labels[i]} — active`
      : `${labels[i]} — inactive`
  })
}

function applyReady(root, { reduced = false } = {}) {
  clearTimers()
  busy = false
  done = true
  root.classList.toggle('tba--reduced', reduced)
  root.setAttribute('data-state', 'ready')
  root.setAttribute('data-pairs', '4')
  setRound(root, 'ROUND // QF')
  setMatchupCopy(root, true)
  setStatus(
    root,
    'BRACKET READY. Quarter-finals active for eight participants. No winner selected.',
  )
  setBusyUi(root, false)
}

/**
 * Activate dormant bracket through paired QF construction.
 * @returns {Promise<void>}
 */
export function openTournamentBracket() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('tba--reduced')
  setBusyUi(root, true)
  setStatus(root, 'Opening bracket. Activating participant pairs.')

  if (prefersReducedMotion()) {
    applyReady(root, { reduced: true })
    return Promise.resolve()
  }

  root.setAttribute('data-state', 'activating')
  root.setAttribute('data-pairs', '0')
  void root.offsetWidth

  return new Promise((resolve) => {
    for (let pair = 0; pair < PAIR_COUNT; pair += 1) {
      const at = pair * PAIR_STAGGER_MS
      later(at, () => {
        root.setAttribute('data-pairs', String(pair + 1))
        root.setAttribute('data-pair-active', String(pair))
        setStatus(
          root,
          `Activating pair ${pair + 1} of 4. Constructing quarter-final paths.`,
        )
      })
    }

    later(GUIDES_AT, () => {
      root.setAttribute('data-state', 'guides')
      setStatus(root, 'Quarter-final junctions set. Strengthening future guides.')
    })

    later(READY_AT, () => {
      applyReady(root)
      resolve()
    })
  })
}

/**
 * Reset bracket to dormant structure.
 * @returns {Promise<void>}
 */
export function resetTournamentBracket() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  root.classList.remove('tba--reduced')
  root.setAttribute('data-state', 'idle')
  root.removeAttribute('data-pairs')
  root.removeAttribute('data-pair-active')
  setRound(root, 'ROUND // —')
  setMatchupCopy(root, false)
  void root.offsetWidth
  setStatus(
    root,
    'Bracket dormant. Eight participants seeded. No matchups active.',
  )
  setBusyUi(root, false)
  return Promise.resolve()
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-tba-open]')?.addEventListener('click', () => {
    void openTournamentBracket()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void resetTournamentBracket()
    }
  })
}

bind()
resetTournamentBracket()
