/**
 * Scanner Search (SPX-604) — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Timing (ms):
 *   Scanline travel   650
 *   Hold after scan    80
 *   Non-match collapse 180
 *   Rows classify when the scanline reaches each row centre
 */

const SCAN_MS = 650
const HOLD_MS = 80
const COLLAPSE_MS = 180

let busy = false
let lockedQuery = ''
let timers = []
let rafId = 0

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
  if (rafId) {
    window.cancelAnimationFrame(rafId)
    rafId = 0
  }
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
  return id
}

function rootEl() {
  return document.querySelector('[data-scanner-search]')
}

function rows() {
  return Array.from(document.querySelectorAll('[data-scanner-list] .scanner-search__row'))
}

function matchesQuery(label, query) {
  const q = String(query).trim().toLowerCase()
  if (!q) return false
  return label.toLowerCase().includes(q)
}

function setControlsLocked(locked) {
  const root = rootEl()
  if (!root) return
  const input = root.querySelector('[data-scanner-input]')
  const searchBtn = root.querySelector('[data-scanner-search-btn]')
  const clearBtn = root.querySelector('[data-scanner-clear]')
  if (input) input.disabled = locked
  if (searchBtn) searchBtn.disabled = locked
  if (clearBtn) clearBtn.disabled = locked
  root.classList.toggle('scanner-search--locked', locked)
}

function setSummary(visual, spoken) {
  const root = rootEl()
  if (!root) return
  const summary = root.querySelector('[data-scanner-summary]')
  const live = root.querySelector('[data-scanner-live]')
  if (summary) {
    summary.textContent = visual
    summary.hidden = !visual
  }
  if (live) live.textContent = spoken || ''
}

function resetVisualState() {
  const root = rootEl()
  if (!root) return
  root.classList.remove(
    'scanner-search--scanning',
    'scanner-search--collapsing',
    'scanner-search--done',
    'scanner-search--empty',
    'scanner-search--rm',
  )

  setSummary('', '')

  const empty = root.querySelector('[data-scanner-empty]')
  if (empty) empty.hidden = true

  const line = root.querySelector('[data-scanner-line]')
  if (line) {
    line.style.removeProperty('--scan-y')
    line.classList.remove('scanner-search__scanline--on')
  }

  for (const row of rows()) {
    delete row.dataset.classified
    row.classList.remove(
      'scanner-search__row--match',
      'scanner-search__row--miss',
      'scanner-search__row--collapsed',
      'scanner-search__row--kept',
    )
    row.hidden = false
  }
}

function finish(query, matchCount) {
  const root = rootEl()
  if (!root) return

  root.classList.add('scanner-search--done')
  root.classList.remove('scanner-search--scanning', 'scanner-search--collapsing')

  const empty = root.querySelector('[data-scanner-empty]')
  const qLabel = query.trim() || '(empty)'

  if (matchCount === 0) {
    root.classList.add('scanner-search--empty')
    if (empty) empty.hidden = false
    setSummary('', `0 results for ${qLabel}.`)
  } else {
    if (empty) empty.hidden = true
    const visual = `${matchCount} MATCH${matchCount === 1 ? '' : 'ES'}`
    setSummary(visual, `${matchCount} result${matchCount === 1 ? '' : 's'} for ${qLabel}.`)
  }
}

/**
 * Run a scan over the static dataset for `query`.
 * @param {string} [query]
 * @returns {Promise<void>}
 */
export function runScannerSearch(query) {
  if (busy) return Promise.resolve()

  const root = rootEl()
  const input = root?.querySelector('[data-scanner-input]')
  if (!root || !input) return Promise.resolve()

  const q = typeof query === 'string' ? query : input.value
  lockedQuery = q
  input.value = q

  busy = true
  clearTimers()
  resetVisualState()
  setControlsLocked(true)

  const list = rows()
  const matchFlags = list.map((row) =>
    matchesQuery(row.getAttribute('data-label') || '', lockedQuery),
  )
  const matchCount = matchFlags.filter(Boolean).length

  if (prefersReducedMotion()) {
    root.classList.add('scanner-search--rm')
    for (let i = 0; i < list.length; i++) {
      const row = list[i]
      if (matchFlags[i]) {
        row.classList.add('scanner-search__row--match', 'scanner-search__row--kept')
      } else {
        row.classList.add('scanner-search__row--miss', 'scanner-search__row--collapsed')
        row.hidden = true
      }
    }
    finish(lockedQuery, matchCount)
    setControlsLocked(false)
    busy = false
    return Promise.resolve()
  }

  root.classList.add('scanner-search--scanning')
  const line = root.querySelector('[data-scanner-line]')
  const results = root.querySelector('[data-scanner-results]')
  if (line) line.classList.add('scanner-search__scanline--on')

  const rowCount = list.length
  const classifyAt = list.map((_, i) => ((i + 0.5) / rowCount) * SCAN_MS)

  return new Promise((resolve) => {
    const start = performance.now()

    function tick(now) {
      const elapsed = now - start
      const t = Math.min(1, elapsed / SCAN_MS)
      if (line && results) {
        line.style.setProperty('--scan-y', `${t * results.clientHeight}px`)
      }

      for (let i = 0; i < rowCount; i++) {
        const row = list[i]
        if (row.dataset.classified === '1') continue
        if (elapsed >= classifyAt[i]) {
          row.dataset.classified = '1'
          row.classList.add(
            matchFlags[i] ? 'scanner-search__row--match' : 'scanner-search__row--miss',
          )
        }
      }

      if (elapsed < SCAN_MS) {
        rafId = window.requestAnimationFrame(tick)
        return
      }

      rafId = 0
      for (let i = 0; i < rowCount; i++) {
        const row = list[i]
        row.dataset.classified = '1'
        row.classList.add(
          matchFlags[i] ? 'scanner-search__row--match' : 'scanner-search__row--miss',
        )
      }

      if (line) line.classList.remove('scanner-search__scanline--on')

      later(HOLD_MS, () => {
        root.classList.remove('scanner-search--scanning')
        root.classList.add('scanner-search--collapsing')

        for (let i = 0; i < rowCount; i++) {
          if (matchFlags[i]) list[i].classList.add('scanner-search__row--kept')
          else list[i].classList.add('scanner-search__row--collapsed')
        }

        later(COLLAPSE_MS, () => {
          for (let i = 0; i < rowCount; i++) {
            if (!matchFlags[i]) list[i].hidden = true
          }
          finish(lockedQuery, matchCount)
          setControlsLocked(false)
          busy = false
          resolve()
        })
      })
    }

    rafId = window.requestAnimationFrame(tick)
  })
}

/**
 * Restore the full dataset and clear scan state.
 * @returns {Promise<void>}
 */
export function runScannerClear() {
  clearTimers()
  busy = false
  lockedQuery = ''
  resetVisualState()
  setControlsLocked(false)

  const input = rootEl()?.querySelector('[data-scanner-input]')
  if (input) {
    input.value = 'glass'
    input.focus({ preventScroll: true })
  }
  return Promise.resolve()
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelector('[data-scanner-form]')?.addEventListener('submit', (event) => {
    event.preventDefault()
    void runScannerSearch()
  })

  root.querySelector('[data-scanner-clear]')?.addEventListener('click', () => {
    void runScannerClear()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void runScannerClear().then(() => runScannerSearch('glass'))
    }
  })
}

bindUi()

export const DATASET = [
  'Waterline Transition',
  'Glass Fracture',
  'Moon Phase Progress',
  'Glass Shard Transition',
  'Butterfly Entry',
  'Tactical Target Lock',
]

export { matchesQuery }
