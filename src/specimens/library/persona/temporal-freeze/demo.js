/**
 * Temporal Freeze — travelling freeze boundary with per-system stop/resume.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

/** Subsystem centre positions as fraction of stage width (L→R). */
const SYSTEMS = [
  { id: 'ticker', x: 0.18 },
  { id: 'dial', x: 0.5 },
  { id: 'pulse', x: 0.82 },
]

const FREEZE_MS = 700
const RESUME_MS = 500

let busy = false
/** @type {'flowing' | 'frozen'} */
let mode = 'flowing'
/** @type {Set<string>} */
let frozenIds = new Set()
/** @type {number | null} */
let raf = null

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-temporal-freeze]')
}

function stageEl() {
  return document.querySelector('[data-temporal-stage]')
}

function setLive(text) {
  const el = document.querySelector('[data-temporal-live]')
  if (el) el.textContent = text
}

function setControls() {
  const freezeBtn = document.querySelector('[data-temporal-freeze-btn]')
  const resumeBtn = document.querySelector('[data-temporal-resume-btn]')
  if (freezeBtn) freezeBtn.disabled = busy || mode === 'frozen'
  if (resumeBtn) resumeBtn.disabled = busy || mode === 'flowing'
}

function setFreezeX(p) {
  const root = rootEl()
  if (!root) return
  const clamped = Math.max(0, Math.min(1, p))
  root.style.setProperty('--freeze-x', `${(clamped * 100).toFixed(3)}%`)
}

function systemEl(id) {
  return document.querySelector(`[data-temporal-system="${id}"]`)
}

function pauseSubtree(system) {
  if (!system) return
  for (const el of system.querySelectorAll('[data-temporal-motion]')) {
    for (const anim of el.getAnimations()) anim.pause()
  }
}

function playSubtree(system) {
  if (!system) return
  for (const el of system.querySelectorAll('[data-temporal-motion]')) {
    for (const anim of el.getAnimations()) anim.play()
  }
}

function markFrozen(id, on) {
  const el = systemEl(id)
  if (!el) return
  el.classList.toggle('temporal-freeze__system--frozen', on)
  if (on) {
    pauseSubtree(el)
    frozenIds.add(id)
  } else {
    playSubtree(el)
    frozenIds.delete(id)
  }
}

function cancelRaf() {
  if (raf != null) {
    window.cancelAnimationFrame(raf)
    raf = null
  }
}

/**
 * Sweep freeze boundary L→R. Each system freezes when the line crosses its --sys-x.
 * @returns {Promise<void>}
 */
export function freezeTemporal() {
  const root = rootEl()
  if (!root || busy || mode === 'frozen') return Promise.resolve()

  busy = true
  setControls()
  cancelRaf()

  if (prefersReducedMotion()) {
    setFreezeX(1)
    for (const sys of SYSTEMS) markFrozen(sys.id, true)
    root.classList.remove('temporal-freeze--sweeping', 'temporal-freeze--thawing')
    root.setAttribute('data-mode', 'frozen')
    mode = 'frozen'
    setLive('Time frozen')
    busy = false
    setControls()
    return Promise.resolve()
  }

  root.classList.add('temporal-freeze--sweeping')
  root.classList.remove('temporal-freeze--thawing')
  root.setAttribute('data-mode', 'flowing')
  setLive('Freezing time')
  setFreezeX(0)
  frozenIds = new Set()
  for (const sys of SYSTEMS) {
    const el = systemEl(sys.id)
    el?.classList.remove('temporal-freeze__system--frozen')
  }

  const start = performance.now()

  return new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / FREEZE_MS)
      setFreezeX(t)

      for (const sys of SYSTEMS) {
        if (!frozenIds.has(sys.id) && t >= sys.x) {
          markFrozen(sys.id, true)
        }
      }

      if (t < 1) {
        raf = window.requestAnimationFrame(tick)
        return
      }

      raf = null
      // Ensure all frozen
      for (const sys of SYSTEMS) markFrozen(sys.id, true)
      root.classList.remove('temporal-freeze--sweeping')
      root.setAttribute('data-mode', 'frozen')
      mode = 'frozen'
      setLive('Time frozen')
      busy = false
      setControls()
      resolve()
    }

    raf = window.requestAnimationFrame(tick)
  })
}

/**
 * Sweep thaw boundary R→L. Systems resume when the line crosses back over them.
 * @returns {Promise<void>}
 */
export function resumeTemporal() {
  const root = rootEl()
  if (!root || busy || mode === 'flowing') return Promise.resolve()

  busy = true
  setControls()
  cancelRaf()

  if (prefersReducedMotion()) {
    setFreezeX(0)
    for (const sys of SYSTEMS) markFrozen(sys.id, false)
    root.classList.remove('temporal-freeze--sweeping', 'temporal-freeze--thawing')
    root.setAttribute('data-mode', 'flowing')
    mode = 'flowing'
    setLive('Time flowing')
    busy = false
    setControls()
    return Promise.resolve()
  }

  root.classList.add('temporal-freeze--thawing')
  root.classList.remove('temporal-freeze--sweeping')
  root.setAttribute('data-mode', 'flowing')
  setLive('Resuming time')
  setFreezeX(1)

  // Start fully frozen
  for (const sys of SYSTEMS) markFrozen(sys.id, true)

  const start = performance.now()

  return new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / RESUME_MS)
      // Boundary travels right → left: x = 1 → 0
      const x = 1 - t
      setFreezeX(x)

      for (const sys of SYSTEMS) {
        // Resume once the thawing edge has moved left of the system
        if (frozenIds.has(sys.id) && x <= sys.x) {
          markFrozen(sys.id, false)
        }
      }

      if (t < 1) {
        raf = window.requestAnimationFrame(tick)
        return
      }

      raf = null
      for (const sys of SYSTEMS) markFrozen(sys.id, false)
      setFreezeX(0)
      root.classList.remove('temporal-freeze--thawing')
      root.setAttribute('data-mode', 'flowing')
      mode = 'flowing'
      setLive('Time flowing')
      busy = false
      setControls()
      resolve()
    }

    raf = window.requestAnimationFrame(tick)
  })
}

export function resetTemporal() {
  cancelRaf()
  busy = false
  mode = 'flowing'
  frozenIds = new Set()
  const root = rootEl()
  if (root) {
    root.classList.remove('temporal-freeze--sweeping', 'temporal-freeze--thawing')
    root.setAttribute('data-mode', 'flowing')
  }
  setFreezeX(0)
  for (const sys of SYSTEMS) markFrozen(sys.id, false)
  setLive('Time flowing')
  setControls()
}

function bindUi() {
  document.querySelector('[data-temporal-freeze-btn]')?.addEventListener('click', () => {
    void freezeTemporal()
  })
  document.querySelector('[data-temporal-resume-btn]')?.addEventListener('click', () => {
    void resumeTemporal()
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetTemporal()
  })
}

bindUi()
resetTemporal()

if (prefersReducedMotion()) {
  // Static poses already via CSS; keep flowing palette until FREEZE.
  setLive('Time flowing (static)')
}
