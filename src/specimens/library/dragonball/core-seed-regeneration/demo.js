/**
 * Core Seed Regeneration — tiny canonical core → verified → skeleton →
 * six regions → metadata → STATE RESTORED.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Frozen phase timings from REBUILD (ms):
 *   verify 0–140 · skeleton 140–360 · regions 360+45n · fields after shell ·
 *   complete brackets out → STATE RESTORED
 */

const VERIFY_MS = 140
const SKELETON_MS = 220
const REGION_STAGGER_MS = 45
const REGION_EXPAND_MS = 160
const FIELD_MS = 110
const COMPLETE_MS = 140

/** Frozen reconstruction order — do not reorder. */
const REGIONS = [
  'central',
  'top',
  'left',
  'right',
  'bottom-left',
  'bottom-right',
]

const FIELDS = ['role', 'queue', 'region', 'status']

const SKELETON_START = VERIFY_MS
const REGIONS_START = SKELETON_START + SKELETON_MS
const FIELDS_START =
  REGIONS_START + (REGIONS.length - 1) * REGION_STAGGER_MS + REGION_EXPAND_MS
const COMPLETE_START = FIELDS_START + FIELDS.length * FIELD_MS
const DONE_AT = COMPLETE_START + COMPLETE_MS

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
  return document.querySelector('[data-csr]')
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

function setPhase(phase) {
  const root = rootEl()
  if (root) root.setAttribute('data-phase', phase)
}

function setLive(text) {
  const el = document.querySelector('[data-csr-live]')
  if (el) el.textContent = text
}

function setBanner(text) {
  const el = document.querySelector('[data-csr-banner]')
  if (el) el.textContent = text
}

function setControls(done) {
  const btn = document.querySelector('[data-csr-rebuild]')
  if (btn) btn.disabled = busy || done
}

function setWorkerVisible(on) {
  const w = document.querySelector('[data-csr-worker]')
  if (w) w.setAttribute('aria-hidden', on ? 'false' : 'true')
}

function clearRegionAttrs() {
  for (const id of REGIONS) {
    document
      .querySelector(`[data-csr-region="${id}"]`)
      ?.removeAttribute('data-built')
  }
}

function clearFieldAttrs() {
  for (const id of FIELDS) {
    document
      .querySelector(`[data-csr-field="${id}"]`)
      ?.removeAttribute('data-shown')
  }
}

function showRestoredImmediate() {
  setPhase('done')
  setWorkerVisible(true)
  for (const id of REGIONS) {
    document
      .querySelector(`[data-csr-region="${id}"]`)
      ?.setAttribute('data-built', 'true')
  }
  for (const id of FIELDS) {
    document
      .querySelector(`[data-csr-field="${id}"]`)
      ?.setAttribute('data-shown', 'true')
  }
  setBanner('STATE RESTORED')
  setLive('Worker 09 restored — STATUS HEALTHY, STATE RESTORED')
  busy = false
  setControls(true)
}

/**
 * Run core verification → skeleton → regions → metadata → restored.
 * @returns {Promise<void>}
 */
export function runCoreSeedRegeneration() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  setControls(false)
  clearTimers()
  clearRegionAttrs()
  clearFieldAttrs()
  setWorkerVisible(false)
  setLive('Rebuilding Worker 09 from core')
  setBanner('CORE SURVIVED')

  if (prefersReducedMotion()) {
    showRestoredImmediate()
    return Promise.resolve()
  }

  setPhase('idle')
  void root.offsetWidth
  setPhase('verify')
  setBanner('CORE VALID')
  setLive('Core verified — ID 09 checksum valid')

  return new Promise((resolve) => {
    later(SKELETON_START, () => {
      setPhase('skeleton')
      setLive('Establishing Worker 09 skeleton')
    })

    later(REGIONS_START, () => {
      setPhase('regions')
      setWorkerVisible(true)
      setLive('Reconstructing Worker 09 body regions')
    })

    REGIONS.forEach((id, i) => {
      later(REGIONS_START + i * REGION_STAGGER_MS, () => {
        document
          .querySelector(`[data-csr-region="${id}"]`)
          ?.setAttribute('data-built', 'true')
      })
    })

    later(FIELDS_START, () => {
      setPhase('fields')
      setLive('Restoring Worker 09 metadata')
    })

    FIELDS.forEach((id, i) => {
      later(FIELDS_START + i * FIELD_MS, () => {
        document
          .querySelector(`[data-csr-field="${id}"]`)
          ?.setAttribute('data-shown', 'true')
        if (id === 'status') {
          setLive('Worker 09 STATUS HEALTHY')
        }
      })
    })

    later(COMPLETE_START, () => {
      setPhase('complete')
      setBanner('STATE RESTORED')
      setLive('Worker 09 restored — STATUS HEALTHY, STATE RESTORED')
    })

    later(DONE_AT, () => {
      setPhase('done')
      busy = false
      setControls(true)
      resolve()
    })
  })
}

export function resetCoreSeedRegeneration() {
  clearTimers()
  busy = false
  clearRegionAttrs()
  clearFieldAttrs()
  setWorkerVisible(false)
  setPhase('idle')
  setBanner('CORE SURVIVED')
  setLive('Worker 09 core survived — ready to rebuild')
  setControls(false)
  const root = rootEl()
  if (root) void root.offsetWidth
}

function bindUi() {
  document.querySelector('[data-csr-rebuild]')?.addEventListener('click', () => {
    void runCoreSeedRegeneration()
  })
  document.querySelector('[data-csr-reset]')?.addEventListener('click', () => {
    resetCoreSeedRegeneration()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') resetCoreSeedRegeneration()
  })
}

bindUi()
resetCoreSeedRegeneration()

export const CORE_SEED_REGENERATION_CONTRACT = {
  REGIONS,
  FIELDS,
  VERIFY_MS,
  SKELETON_MS,
  REGION_STAGGER_MS,
  REGION_EXPAND_MS,
  FIELD_MS,
  COMPLETE_MS,
  DONE_AT,
  reconstructionOrderFrozen: true,
}
