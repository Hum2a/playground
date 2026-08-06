/**
 * Decision Showdown — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Visual specimen only — no destructive / persistent side effects.
 */

const CONTRACT_MS = 90
/** Selection transition ≈ 340ms */
const SWITCH_TOTAL_MS = 340

const YES_COVER_MS = 260
const NO_SWEEP_MS = 220

const PHASES = [
  'dsd--switching',
  'dsd--contract',
  'dsd--attack',
  'dsd--settle',
  'dsd--confirm-yes',
  'dsd--confirm-no',
  'dsd--outcome-deleted',
  'dsd--outcome-cancelled',
  'dsd--busy',
]

let busy = false
let decided = false
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-decision-showdown]')
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearPhases(root) {
  root.classList.remove(...PHASES)
}

function choiceButtons(root) {
  return {
    yes: root.querySelector('[data-dsd-choice="yes"]'),
    no: root.querySelector('[data-dsd-choice="no"]'),
  }
}

function setStatus(root, text) {
  const status = root.querySelector('[data-dsd-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function syncRadios(root, choice) {
  const { yes, no } = choiceButtons(root)
  const onYes = choice === 'yes'

  if (yes) {
    yes.classList.toggle('dsd__choice--active', onYes)
    yes.setAttribute('aria-checked', onYes ? 'true' : 'false')
    yes.tabIndex = onYes ? 0 : -1
  }
  if (no) {
    no.classList.toggle('dsd__choice--active', !onYes)
    no.setAttribute('aria-checked', onYes ? 'false' : 'true')
    no.tabIndex = onYes ? -1 : 0
  }

  root.setAttribute('data-choice', choice)
}

function focusActive(root) {
  const choice = root.getAttribute('data-choice') === 'yes' ? 'yes' : 'no'
  const btn = choiceButtons(root)[choice]
  btn?.focus()
}

/**
 * Select YES or NO. Moves both sides.
 * @param {'yes' | 'no'} choice
 * @returns {Promise<void>}
 */
export function selectDecision(choice) {
  const root = rootEl()
  if (!root || busy || decided) return Promise.resolve()
  if (choice !== 'yes' && choice !== 'no') return Promise.resolve()

  const prev = root.getAttribute('data-choice') === 'yes' ? 'yes' : 'no'
  if (choice === prev) return Promise.resolve()

  if (prefersReducedMotion()) {
    syncRadios(root, choice)
    setStatus(
      root,
      choice === 'yes'
        ? 'YES selected. Confirm to delete draft (demo only).'
        : 'NO selected. Draft kept.',
    )
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  clearPhases(root)
  root.classList.add('dsd--busy', 'dsd--switching', 'dsd--contract')

  const outgoing = choiceButtons(root)[prev]
  if (outgoing) outgoing.classList.remove('dsd__choice--active')

  return new Promise((resolve) => {
    later(CONTRACT_MS * 0.75, () => {
      root.classList.add('dsd--attack')
      syncRadios(root, choice)
    })

    later(180, () => {
      /* slash animation keyed off dsd--switching */
    })

    later(SWITCH_TOTAL_MS - 40, () => {
      root.classList.add('dsd--settle')
    })

    later(SWITCH_TOTAL_MS, () => {
      root.classList.remove(
        'dsd--switching',
        'dsd--contract',
        'dsd--attack',
        'dsd--settle',
        'dsd--busy',
      )
      busy = false
      setStatus(
        root,
        choice === 'yes'
          ? 'YES selected. Confirm to delete draft (demo only).'
          : 'NO selected. Draft kept.',
      )
      resolve()
    })
  })
}

/**
 * Confirm the current selection (demo only).
 * @returns {Promise<void>}
 */
export function confirmDecision() {
  const root = rootEl()
  if (!root || busy || decided) return Promise.resolve()

  const choice = root.getAttribute('data-choice') === 'yes' ? 'yes' : 'no'
  const outcome = root.querySelector('[data-dsd-outcome]')
  const outcomeText = root.querySelector('[data-dsd-outcome-text]')

  busy = true
  decided = true
  clearTimers()
  root.classList.add('dsd--busy')

  if (prefersReducedMotion()) {
    if (choice === 'yes') {
      root.classList.add('dsd--outcome-deleted')
      if (outcomeText) outcomeText.textContent = 'DELETED'
      if (outcome) outcome.setAttribute('aria-hidden', 'false')
      setStatus(root, 'Deleted. Demo only — nothing was permanently removed.')
    } else {
      root.classList.add('dsd--outcome-cancelled')
      if (outcomeText) outcomeText.textContent = 'CANCELLED'
      if (outcome) outcome.setAttribute('aria-hidden', 'false')
      setStatus(root, 'Cancelled. Draft kept.')
    }
    busy = false
    return Promise.resolve()
  }

  if (choice === 'yes') {
    root.classList.add('dsd--confirm-yes')
    return new Promise((resolve) => {
      later(YES_COVER_MS, () => {
        root.classList.add('dsd--outcome-deleted')
        if (outcomeText) outcomeText.textContent = 'DELETED'
        if (outcome) outcome.setAttribute('aria-hidden', 'false')
        setStatus(root, 'Deleted. Demo only — nothing was permanently removed.')
        busy = false
        resolve()
      })
    })
  }

  root.classList.add('dsd--confirm-no')
  return new Promise((resolve) => {
    later(NO_SWEEP_MS, () => {
      root.classList.add('dsd--outcome-cancelled')
      if (outcomeText) outcomeText.textContent = 'CANCELLED'
      if (outcome) outcome.setAttribute('aria-hidden', 'false')
      setStatus(root, 'Cancelled. Draft kept.')
      busy = false
      resolve()
    })
  })
}

/**
 * Restore default NO selection and clear demo outcomes.
 * @returns {Promise<void>}
 */
export function resetDecisionShowdown() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  clearPhases(root)
  busy = false
  decided = false

  const outcome = root.querySelector('[data-dsd-outcome]')
  const outcomeText = root.querySelector('[data-dsd-outcome-text]')
  if (outcomeText) outcomeText.textContent = ''
  if (outcome) outcome.setAttribute('aria-hidden', 'true')

  syncRadios(root, 'no')
  setStatus(root, 'NO selected. Draft kept.')
  void root.offsetWidth
  return Promise.resolve()
}

/**
 * Reset then idle — harness restart.
 * @returns {Promise<void>}
 */
export async function replayDecisionShowdown() {
  await resetDecisionShowdown()
}

function onKeyDown(event) {
  const root = rootEl()
  if (!root || decided) {
    if (event.key === 'Escape' && decided) {
      void replayDecisionShowdown()
    }
    return
  }

  const key = event.key
  const current = root.getAttribute('data-choice') === 'yes' ? 'yes' : 'no'

  if (key === 'ArrowLeft') {
    event.preventDefault()
    void selectDecision('yes').then(() => focusActive(root))
    return
  }
  if (key === 'ArrowRight') {
    event.preventDefault()
    void selectDecision('no').then(() => focusActive(root))
    return
  }
  if (key === 'Escape') {
    event.preventDefault()
    void selectDecision('no').then(() => focusActive(root))
    return
  }
  if (key === 'Enter' || key === ' ') {
    const target = event.target
    if (
      target instanceof HTMLElement &&
      target.matches('[data-dsd-choice]')
    ) {
      event.preventDefault()
      const value = target.getAttribute('data-dsd-choice')
      if (value === current) {
        void confirmDecision()
      } else if (value === 'yes' || value === 'no') {
        void selectDecision(value).then(() => focusActive(root))
      }
    }
  }
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  const { yes, no } = choiceButtons(root)

  yes?.addEventListener('click', () => {
    if (decided || busy) return
    const current = root.getAttribute('data-choice')
    if (current === 'yes') void confirmDecision()
    else void selectDecision('yes')
  })

  no?.addEventListener('click', () => {
    if (decided || busy) return
    const current = root.getAttribute('data-choice')
    if (current === 'no') void confirmDecision()
    else void selectDecision('no')
  })

  root.addEventListener('keydown', onKeyDown)

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayDecisionShowdown()
  })
}

bindUi()
