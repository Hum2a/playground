/**
 * Processing Time Skip — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * REQUEST → CACHE HIT freeze → skip PARSE/SEARCH/ASSEMBLE → RESULT.
 * Stages 2–4 never become active; marker never travels between ends.
 */

const REQUEST_MS = 180
const FREEZE_MS = 60
const COMPRESS_MS = 70
const MARKER_GAP_MS = 45

const FREEZE_AT = REQUEST_MS
const SKIP_AT = FREEZE_AT + FREEZE_MS
const SKIPPED_AT = SKIP_AT + COMPRESS_MS
const MARKER_AT = SKIP_AT + MARKER_GAP_MS
const COMPLETE_AT = Math.max(SKIPPED_AT, MARKER_AT) + 40

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
  return document.querySelector('[data-pts]')
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
  const status = root.querySelector('[data-pts-status]')
  if (!status) return
  status.textContent = ''
  void status.offsetWidth
  status.textContent = text
}

function setMode(root, text) {
  const mode = root.querySelector('[data-pts-mode]')
  if (mode) mode.textContent = text
}

function setBusyUi(root, isBusy) {
  const btn = root.querySelector('[data-pts-execute]')
  if (btn) btn.disabled = isBusy || done
}

function stageEl(root, name) {
  return root.querySelector(`[data-pts-stage="${name}"]`)
}

function setStageStatus(root, name, status) {
  const el = stageEl(root, name)
  if (!el) return
  el.setAttribute('data-status', status)
}

function setLabel(root, name, text) {
  const el = stageEl(root, name)?.querySelector('[data-pts-label]')
  if (el) el.textContent = text
}

function setBadge(root, name, text) {
  const el = stageEl(root, name)?.querySelector('[data-pts-badge]')
  if (el) el.textContent = text
}

function applyFinal(root, { reduced = false } = {}) {
  clearTimers()
  busy = false
  done = true
  root.classList.toggle('pts--reduced', reduced)
  root.setAttribute('data-state', 'complete')
  setMode(root, 'MODE // TIME-SKIP')

  setStageStatus(root, 'request', 'done')
  setLabel(root, 'request', 'REQUEST')
  setBadge(root, 'request', '✓')

  for (const name of ['parse', 'search', 'assemble']) {
    setStageStatus(root, name, 'skipped')
    setLabel(root, name, 'SKIPPED')
    setBadge(root, name, '')
  }

  setStageStatus(root, 'result', 'done')
  setLabel(root, 'result', 'RESULT')
  setBadge(root, 'result', '✓')
  const timing = root.querySelector('[data-pts-timing]')
  if (timing) timing.textContent = '24ms'

  const cache = root.querySelector('[data-pts-cache]')
  if (cache) {
    cache.removeAttribute('hidden')
    cache.setAttribute('aria-hidden', 'false')
  }

  const compare = root.querySelector('[data-pts-compare]')
  if (compare) compare.hidden = false

  setStatus(
    root,
    'Query 07 complete in 24ms via TIME-SKIP. REQUEST and RESULT done. PARSE, SEARCH, and ASSEMBLE skipped.',
  )
  setBusyUi(root, false)
}

/**
 * Execute QUERY // 07 with intentional stage skip.
 * @returns {Promise<void>}
 */
export function executeProcessingTimeSkip() {
  const root = rootEl()
  if (!root || busy || done) return Promise.resolve()

  busy = true
  clearTimers()
  root.classList.remove('pts--reduced')
  setBusyUi(root, true)
  setMode(root, 'MODE // TIME-SKIP')
  setStatus(root, 'Query 07 running REQUEST.')

  if (prefersReducedMotion()) {
    applyFinal(root, { reduced: true })
    return Promise.resolve()
  }

  root.setAttribute('data-state', 'request')
  setStageStatus(root, 'request', 'active')
  void root.offsetWidth

  return new Promise((resolve) => {
    later(FREEZE_AT, () => {
      root.setAttribute('data-state', 'freeze')
      setStatus(root, 'CACHE HIT. Freezing pipeline before TIME-SKIP.')
    })

    later(SKIP_AT, () => {
      root.setAttribute('data-state', 'skip')
      setStatus(
        root,
        'TIME-SKIP: PARSE, SEARCH, and ASSEMBLE omitted. Marker leaving REQUEST.',
      )
    })

    later(MARKER_AT, () => {
      root.setAttribute('data-state', 'marker')
    })

    later(SKIPPED_AT, () => {
      for (const name of ['parse', 'search', 'assemble']) {
        setStageStatus(root, name, 'skipped')
        setLabel(root, name, 'SKIPPED')
      }
      setStageStatus(root, 'request', 'done')
      setBadge(root, 'request', '✓')
      setStageStatus(root, 'result', 'done')
      setBadge(root, 'result', '✓')
      const timing = root.querySelector('[data-pts-timing]')
      if (timing) timing.textContent = '24ms'
      root.setAttribute('data-state', 'result')
      setStatus(
        root,
        'RESULT active. PARSE, SEARCH, and ASSEMBLE skipped. Actual 24ms.',
      )
    })

    later(COMPLETE_AT, () => {
      const compare = root.querySelector('[data-pts-compare]')
      if (compare) compare.hidden = false
      applyFinal(root)
      resolve()
    })
  })
}

/**
 * Reset pipeline to REQUEST-active idle.
 * @returns {Promise<void>}
 */
export function resetProcessingTimeSkip() {
  const root = rootEl()
  if (!root) return Promise.resolve()

  clearTimers()
  busy = false
  done = false
  root.classList.remove('pts--reduced')
  root.setAttribute('data-state', 'idle')
  setMode(root, 'MODE // IDLE')

  setStageStatus(root, 'request', 'active')
  setLabel(root, 'request', 'REQUEST')
  setBadge(root, 'request', '')

  for (const name of ['parse', 'search', 'assemble']) {
    setStageStatus(root, name, 'pending')
    setLabel(root, name, name.toUpperCase())
    setBadge(root, name, '')
  }

  setStageStatus(root, 'result', 'pending')
  setLabel(root, 'result', 'RESULT')
  setBadge(root, 'result', '')
  const timing = root.querySelector('[data-pts-timing]')
  if (timing) timing.textContent = ''

  const cache = root.querySelector('[data-pts-cache]')
  if (cache) {
    cache.setAttribute('aria-hidden', 'true')
  }

  const compare = root.querySelector('[data-pts-compare]')
  if (compare) compare.hidden = true

  void root.offsetWidth
  setStatus(
    root,
    'Query 07 at REQUEST. Stages PARSE, SEARCH, and ASSEMBLE pending.',
  )
  setBusyUi(root, false)
  return Promise.resolve()
}

function bind() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-pts-execute]')?.addEventListener('click', () => {
    void executeProcessingTimeSkip()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void resetProcessingTimeSkip()
    }
  })
}

bind()
resetProcessingTimeSkip()
