/**
 * Diagnostic Boot Sequence — tiny portable API.
 * Works inside sandbox="allow-scripts" (no parent / storage / network).
 */

export const DIAG_LINES = [
  'INITIALIZING INTERFACE...',
  'CHECKING DISPLAY MODULE... OK',
  'CHECKING INPUT MODULE... OK',
  'LOADING LOCAL DATA... OK',
  'VERIFYING COMPONENTS... OK',
  'SYSTEM READY',
]

const LINE_MS = 180
const FLASH_MS = 80
const POST_READY_MS = 220
const TOTAL_LINE_SLOTS = DIAG_LINES.length

let busy = false

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function setStatus(text) {
  const el = document.querySelector('[data-diag-boot-status]')
  if (el) el.textContent = text
}

function setProgress(stepIndex) {
  const fill = document.querySelector('[data-diag-boot-progress-fill]')
  const root = document.querySelector('[data-diag-boot]')
  if (root) root.setAttribute('data-step', String(stepIndex))
  if (!fill) return
  const pct = Math.round((stepIndex / TOTAL_LINE_SLOTS) * 100)
  fill.style.width = `${pct}%`
}

function ensureLogItems(log) {
  if (log.children.length === DIAG_LINES.length) return
  log.replaceChildren()
  for (const text of DIAG_LINES) {
    const li = document.createElement('li')
    li.textContent = text
    log.appendChild(li)
  }
}

function showLine(log, index) {
  const li = log.children[index]
  if (li) li.classList.add('is-visible')
  setProgress(index + 1)
}

function revealHost(root) {
  root.hidden = true
  root.classList.remove('diag-boot--invert', 'diag-boot--holding', 'diag-boot--done')
  const host = document.querySelector('[data-diag-boot-host]')
  if (host) host.hidden = false
  setStatus('System ready')
}

/**
 * Run the diagnostic boot sequence.
 *
 * @param {{ waitUntil?: () => Promise<void> }} [options]
 *   After the final loading line (`VERIFYING COMPONENTS... OK`), awaits
 *   `waitUntil()` if provided — host readiness only (no network in specimen).
 *   Demo omits `waitUntil` so the sequence always finishes (~1500ms).
 * @returns {Promise<void>}
 */
export function runDiagnosticBoot(options = {}) {
  if (busy) return Promise.resolve()
  const root = document.querySelector('[data-diag-boot]')
  const log = document.querySelector('[data-diag-boot-log]')
  if (!root || !log) return Promise.resolve()

  busy = true
  const waitUntil = options.waitUntil

  if (prefersReducedMotion()) {
    return runReduced(root, log)
  }

  return runNormal(root, log, waitUntil)
}

async function runReduced(root, log) {
  ensureLogItems(log)
  root.hidden = false
  root.classList.remove('diag-boot--invert')
  const host = document.querySelector('[data-diag-boot-host]')
  if (host) host.hidden = true
  setStatus('Loading')
  for (let i = 0; i < DIAG_LINES.length; i += 1) showLine(log, i)
  setProgress(TOTAL_LINE_SLOTS)
  revealHost(root)
  busy = false
}

async function runNormal(root, log, waitUntil) {
  ensureLogItems(log)
  for (const li of log.children) li.classList.remove('is-visible')
  root.hidden = false
  root.classList.remove('diag-boot--invert', 'diag-boot--done')
  const host = document.querySelector('[data-diag-boot-host]')
  if (host) host.hidden = true
  setStatus('Loading')
  setProgress(0)

  // Lines 0..4 are loading steps; line 5 is SYSTEM READY
  const loadingCount = DIAG_LINES.length - 1

  for (let i = 0; i < loadingCount; i += 1) {
    showLine(log, i)
    await sleep(LINE_MS)
  }

  // Hold on final loading step (VERIFYING... OK) until host is ready
  root.classList.add('diag-boot--holding')
  if (typeof waitUntil === 'function') {
    try {
      await waitUntil()
    } catch {
      /* keep boot resilient */
    }
  } else {
    // Deterministic demo: short settle so total ≈ 1500ms
    // 5 * 180 = 900; + settle 300 + ready pause 220 + flash 80 ≈ 1500
    await sleep(300)
  }
  root.classList.remove('diag-boot--holding')

  showLine(log, loadingCount)
  await sleep(POST_READY_MS)

  root.classList.add('diag-boot--invert')
  await sleep(FLASH_MS)
  root.classList.remove('diag-boot--invert')
  root.classList.add('diag-boot--done')
  revealHost(root)
  busy = false
}

function bootDemo() {
  void runDiagnosticBoot()
}

bootDemo()
