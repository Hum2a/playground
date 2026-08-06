/**
 * Evoker Menu Snap — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 * Fast decisive selection: release → execution line → angular snap → authority.
 */

const TOTAL_MS = 210

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
  return document.querySelector('[data-evoker-menu]')
}

function items(root) {
  return Array.from(root.querySelectorAll('[data-ems-item]'))
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id)
  timers = []
}

function later(ms, fn) {
  const id = window.setTimeout(fn, ms)
  timers.push(id)
}

function clearItemPhases(btn) {
  btn.classList.remove(
    'ems__item--exit',
    'ems__item--line',
    'ems__item--snap',
    'ems__item--authority',
    'ems__item--active',
  )
}

function applyImmediate(root, list, index) {
  clearTimers()
  busy = false
  root.classList.remove('ems--busy')
  root.setAttribute('data-selected', String(index))
  list.forEach((btn, i) => {
    clearItemPhases(btn)
    const on = i === index
    btn.classList.toggle('ems__item--active', on)
    btn.setAttribute('aria-checked', on ? 'true' : 'false')
    btn.tabIndex = on ? 0 : -1
  })
}

/**
 * Select menu index 0–3 with snap choreography.
 * @param {number} index
 * @returns {Promise<void>}
 */
export function selectEvokerMenu(index) {
  const root = rootEl()
  if (!root) return Promise.resolve()

  const list = items(root)
  const next = Math.max(0, Math.min(list.length - 1, index | 0))
  const prev = Number(root.getAttribute('data-selected') ?? '0')

  if (next === prev && list[next]?.classList.contains('ems__item--active')) {
    return Promise.resolve()
  }

  if (prefersReducedMotion()) {
    applyImmediate(root, list, next)
    return Promise.resolve()
  }

  // Rapid re-selection: jump to new target without stacking mid-flight
  if (busy) {
    clearTimers()
    list.forEach((btn) => {
      btn.classList.remove(
        'ems__item--exit',
        'ems__item--line',
        'ems__item--snap',
        'ems__item--authority',
      )
    })
    busy = false
  }

  busy = true
  root.classList.add('ems--busy')

  const outgoing = list[prev]
  const incoming = list[next]

  root.setAttribute('data-selected', String(next))

  if (outgoing) {
    outgoing.classList.remove('ems__item--active', 'ems__item--authority')
    outgoing.classList.add('ems__item--exit')
    outgoing.setAttribute('aria-checked', 'false')
    outgoing.tabIndex = -1
  }

  // Semantic selection commits immediately; visual phases follow.
  if (incoming) {
    incoming.setAttribute('aria-checked', 'true')
    incoming.tabIndex = 0
  }

  return new Promise((resolve) => {
    // Phase 2: execution line (~35ms into release)
    later(35, () => {
      if (incoming) incoming.classList.add('ems__item--line')
    })

    // Phase 3: angular snap
    later(70, () => {
      if (outgoing) outgoing.classList.remove('ems__item--exit')
      if (incoming) {
        incoming.classList.remove('ems__item--line')
        incoming.classList.add('ems__item--snap')
      }
    })

    // Phase 4: authority
    later(120, () => {
      if (incoming) {
        incoming.classList.remove('ems__item--snap')
        incoming.classList.add('ems__item--authority')
      }
    })

    later(TOTAL_MS, () => {
      if (incoming) {
        incoming.classList.remove('ems__item--authority')
        incoming.classList.add('ems__item--active')
      }
      root.classList.remove('ems--busy')
      busy = false
      resolve()
    })
  })
}

function bind() {
  const root = rootEl()
  if (!root) return
  const rail = root.querySelector('[data-ems-rail]')
  const list = items(root)

  list.forEach((btn) => {
    btn.addEventListener('click', () => {
      void selectEvokerMenu(Number(btn.getAttribute('data-index') ?? '0'))
    })
  })

  rail?.addEventListener('keydown', (event) => {
    const current = Number(root.getAttribute('data-selected') ?? '0')
    let next = current
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      next = (current + 1) % list.length
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      next = (current - 1 + list.length) % list.length
    } else if (event.key === 'Home') {
      event.preventDefault()
      next = 0
    } else if (event.key === 'End') {
      event.preventDefault()
      next = list.length - 1
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      next = current
    } else {
      return
    }
    void selectEvokerMenu(next).then(() => {
      list[next]?.focus({ preventScroll: true })
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      applyImmediate(root, items(root), 0)
    }
  })
}

bind()
