/**
 * Moon Phase Pagination — tiny portable page API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * No Date.now().
 */

const TWEEN_MS = 280

const PAGES = [
  { label: 'PHASE 01', phase: 'NEW' },
  { label: 'PHASE 02', phase: 'CRESCENT' },
  { label: 'PHASE 03', phase: 'QUARTER' },
  { label: 'PHASE 04', phase: 'GIBBOUS' },
  { label: 'PHASE 05', phase: 'FULL' },
  { label: 'PHASE 06', phase: 'WANING GIBBOUS' },
  { label: 'PHASE 07', phase: 'LAST QUARTER' },
  { label: 'PHASE 08', phase: 'WANING CRESCENT' },
]

let index = 0
let busy = false
/** @type {number | null} */
let timer = null

function prefersReducedMotion(root) {
  if (root?.closest?.('[data-force-reduced-motion="true"]')) return true
  if (document.documentElement.getAttribute('data-force-reduced-motion') === 'true') {
    return true
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rootEl() {
  return document.querySelector('[data-moon-phase-pagination]')
}

function markers() {
  return Array.from(document.querySelectorAll('[data-mpp-page]'))
}

function clearTimer() {
  if (timer !== null) {
    window.clearTimeout(timer)
    timer = null
  }
}

function clearTweenClasses() {
  markers().forEach((btn) => btn.classList.remove('mpp__marker--tween'))
}

/**
 * @param {number} next
 * @param {{ animate?: boolean, focus?: boolean }} [opts]
 */
function applyPage(next, opts = {}) {
  const root = rootEl()
  const btns = markers()
  const meta = PAGES[next]
  if (!root || !meta || next < 0 || next >= btns.length) return

  const prev = index
  const animate = opts.animate !== false && !prefersReducedMotion(root) && prev !== next

  clearTweenClasses()
  if (animate) {
    btns[prev]?.classList.add('mpp__marker--tween')
    btns[next]?.classList.add('mpp__marker--tween')
    void root.offsetWidth
  }

  index = next
  btns.forEach((btn, i) => {
    const current = i === next
    if (current) btn.setAttribute('aria-current', 'page')
    else btn.removeAttribute('aria-current')
    btn.tabIndex = current ? 0 : -1
  })

  const label = document.querySelector('[data-mpp-label]')
  const phase = document.querySelector('[data-mpp-phase]')
  if (label) label.textContent = meta.label
  if (phase) phase.textContent = meta.phase

  if (opts.focus) btns[next]?.focus()
}

/**
 * Select a phase page (0–7).
 * @param {number} next
 * @param {{ focus?: boolean }} [opts]
 * @returns {Promise<void>}
 */
export function goToMoonPhasePage(next, opts = {}) {
  const root = rootEl()
  if (!root || busy) return Promise.resolve()
  if (next < 0 || next >= PAGES.length || next === index) {
    if (opts.focus) markers()[index]?.focus()
    return Promise.resolve()
  }

  if (prefersReducedMotion(root)) {
    applyPage(next, { animate: false, focus: opts.focus })
    return Promise.resolve()
  }

  busy = true
  clearTimer()
  applyPage(next, { animate: true, focus: opts.focus })

  return new Promise((resolve) => {
    timer = window.setTimeout(() => {
      timer = null
      busy = false
      clearTweenClasses()
      resolve()
    }, TWEEN_MS)
  })
}

export function resetMoonPhasePagination() {
  clearTimer()
  busy = false
  applyPage(0, { animate: false })
}

function bindUi() {
  const btns = markers()

  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      void goToMoonPhasePage(i, { focus: true })
    })
    btn.addEventListener('keydown', (event) => {
      const key = /** @type {KeyboardEvent} */ (event).key
      let target = index
      if (key === 'ArrowRight') target = Math.min(index + 1, PAGES.length - 1)
      else if (key === 'ArrowLeft') target = Math.max(index - 1, 0)
      else if (key === 'Home') target = 0
      else if (key === 'End') target = PAGES.length - 1
      else return
      event.preventDefault()
      void goToMoonPhasePage(target, { focus: true })
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetMoonPhasePagination()
  })
}

bindUi()
resetMoonPhasePagination()
