/**
 * Collective CI Deployment — tiny portable aggregation API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 *
 * Deterministic job completion (ms from RUN):
 *   LINT 420 · UNIT 680 · BUILD 920 · E2E 1240 · SECURITY 1510 · PACKAGE 1780
 * Each PASSED job emits one diamond token (240ms travel). Artifact grows only
 * on token arrival: 34 → 42 → 50 → 58 → 66 → 74 → 86. DEPLOY enables at 6/6.
 */

const TRAVEL_MS = 240
const ARTIFACT_SIZES = [34, 42, 50, 58, 66, 74, 86]

/** @type {{ id: string, label: string, completeAt: number, path: string }[]} */
const JOBS = [
  {
    id: 'lint',
    label: 'LINT',
    completeAt: 420,
    path: 'M 60 58 C 110 90, 160 140, 200 160',
  },
  {
    id: 'unit',
    label: 'UNIT',
    completeAt: 680,
    path: 'M 60 160 C 110 160, 150 160, 200 160',
  },
  {
    id: 'build',
    label: 'BUILD',
    completeAt: 920,
    path: 'M 60 262 C 110 230, 160 180, 200 160',
  },
  {
    id: 'e2e',
    label: 'E2E',
    completeAt: 1240,
    path: 'M 340 58 C 290 90, 240 140, 200 160',
  },
  {
    id: 'security',
    label: 'SECURITY',
    completeAt: 1510,
    path: 'M 340 160 C 290 160, 250 160, 200 160',
  },
  {
    id: 'package',
    label: 'PACKAGE',
    completeAt: 1780,
    path: 'M 340 262 C 290 230, 240 180, 200 160',
  },
]

const TOTAL_MS = JOBS[JOBS.length - 1].completeAt + TRAVEL_MS + 40

/** @type {number[]} */
let timers = []
let busy = false
let readyCount = 0
/** @type {'idle' | 'running' | 'ready'} */
let phase = 'idle'

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') ===
    'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-collective-ci]')
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

function setStatus(text) {
  const el = document.querySelector('[data-cci-status]')
  if (el) el.textContent = text
}

function setButtons({ run, deploy, replay }) {
  const runBtn = document.querySelector('[data-cci-run]')
  const deployBtn = document.querySelector('[data-cci-deploy]')
  const replayBtn = document.querySelector('[data-cci-replay]')
  if (runBtn && typeof run === 'boolean') runBtn.disabled = !run
  if (deployBtn && typeof deploy === 'boolean') deployBtn.disabled = !deploy
  if (replayBtn && typeof replay === 'boolean') replayBtn.disabled = !replay
}

function setArtifactSize(px) {
  const root = rootEl()
  root?.style.setProperty('--cci-artifact', `${px}px`)
}

function setReadyCount(n) {
  readyCount = n
  const root = rootEl()
  root?.setAttribute('data-ready', String(n))
  const el = document.querySelector('[data-cci-count]')
  if (el) el.textContent = `${n} / 6`
}

function setDeployState(text) {
  const el = document.querySelector('[data-cci-deploy-state]')
  if (el) el.textContent = text
}

function setJobStatus(id, status) {
  const job = document.querySelector(`[data-cci-job="${id}"]`)
  if (!job) return
  job.setAttribute('data-status', status)
  const label = job.querySelector('[data-cci-job-status]')
  if (label) label.textContent = status.toUpperCase()
}

function clearTokens() {
  const host = document.querySelector('[data-cci-tokens]')
  if (host) host.replaceChildren()
}

function clearLinks() {
  const root = rootEl()
  root?.querySelectorAll('[data-cci-link]').forEach((link) => {
    link.classList.remove('is-connected')
  })
}

function connectLink(id) {
  const link = document.querySelector(`[data-cci-link="${id}"]`)
  link?.classList.add('is-connected')
}

function onTokenArrive(jobId) {
  if (phase === 'idle') return
  const next = readyCount + 1
  const size = ARTIFACT_SIZES[Math.min(next, ARTIFACT_SIZES.length - 1)]
  setArtifactSize(size)
  setReadyCount(next)
  connectLink(jobId)

  if (next >= 6) {
    phase = 'ready'
    const root = rootEl()
    root?.setAttribute('data-phase', 'ready')
    setDeployState('READY')
    setButtons({ run: false, deploy: true, replay: true })
    setStatus('Release 2.4.0 ready. All six jobs passed. Deploy available.')
    busy = false
  }
}

function spawnToken(jobId, pathD) {
  const host = document.querySelector('[data-cci-tokens]')
  if (!host) return

  const token = document.createElement('span')
  token.className = `cci__token cci__token--${jobId}`
  token.style.setProperty('--cci-path', `path('${pathD}')`)
  host.appendChild(token)
  void token.offsetWidth
  token.classList.add('is-travelling')

  later(TRAVEL_MS, () => {
    token.remove()
    onTokenArrive(jobId)
  })
}

function completeJob(job) {
  setJobStatus(job.id, 'passed')
  spawnToken(job.id, job.path)
}

function applyFinalImmediate() {
  clearTimers()
  clearTokens()
  const root = rootEl()
  root?.setAttribute('data-phase', 'ready')
  phase = 'ready'
  JOBS.forEach((job) => {
    setJobStatus(job.id, 'passed')
    connectLink(job.id)
  })
  setReadyCount(6)
  setArtifactSize(ARTIFACT_SIZES[6])
  setDeployState('READY')
  setButtons({ run: false, deploy: true, replay: true })
  setStatus('Release 2.4.0 ready. All six jobs passed. Deploy available.')
  busy = false
}

/**
 * Run the pipeline: jobs complete on frozen schedule, then tokens aggregate.
 * @returns {Promise<void>}
 */
export function runCollectiveCi() {
  const root = rootEl()
  if (!root || busy || phase === 'ready') return Promise.resolve()

  busy = true
  phase = 'running'
  readyCount = 0
  clearTimers()
  clearTokens()
  clearLinks()
  root.setAttribute('data-phase', 'running')
  setReadyCount(0)
  setArtifactSize(ARTIFACT_SIZES[0])
  setDeployState('LOCKED')
  setButtons({ run: false, deploy: false, replay: false })
  JOBS.forEach((job) => setJobStatus(job.id, 'running'))
  setStatus('Release 2.4.0 pipeline running. Deployment locked.')
  void root.offsetWidth

  if (prefersReducedMotion()) {
    applyFinalImmediate()
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    for (const job of JOBS) {
      later(job.completeAt, () => {
        if (phase !== 'running') return
        completeJob(job)
      })
    }

    later(TOTAL_MS, () => {
      resolve()
    })
  })
}

export function resetCollectiveCi() {
  clearTimers()
  clearTokens()
  clearLinks()
  busy = false
  phase = 'idle'
  readyCount = 0
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  setReadyCount(0)
  setArtifactSize(ARTIFACT_SIZES[0])
  setDeployState('LOCKED')
  JOBS.forEach((job) => setJobStatus(job.id, 'idle'))
  setButtons({ run: true, deploy: false, replay: true })
  setStatus('Release 2.4.0 idle. Deployment locked.')
}

/** @returns {Promise<void>} */
export async function replayCollectiveCi() {
  if (busy) return
  resetCollectiveCi()
  void rootEl()?.offsetWidth
  await runCollectiveCi()
}

function bindUi() {
  document.querySelectorAll('[data-cci-run]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void runCollectiveCi()
    })
  })

  document.querySelectorAll('[data-cci-deploy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (phase !== 'ready') return
      setStatus('Release 2.4.0 ready. Deploy is available but not executed.')
    })
  })

  document.querySelectorAll('[data-cci-replay]').forEach((btn) => {
    btn.addEventListener('click', () => {
      void replayCollectiveCi()
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') {
      void replayCollectiveCi()
    }
  })
}

bindUi()
resetCollectiveCi()

export const COLLECTIVE_CI_TIMING = {
  TRAVEL_MS,
  ARTIFACT_SIZES,
  JOBS: JOBS.map(({ id, completeAt }) => ({ id, completeAt })),
  TOTAL_MS,
}
