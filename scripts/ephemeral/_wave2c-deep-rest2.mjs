/**
 * WAVE 2c deep rest — sensory / barrier / cell leftovers.
 * Run: node scripts/ephemeral/_wave2c-deep-rest2.mjs [id...]
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('src/specimens/library/naruto')
const PAPER = {
  ink: '#1A1612',
  parchment: '#EBE2D0',
  chakra: '#B83228',
  olive: '#6A5E4E',
  off: '#F7F2E8',
  rgb: '184 50 40',
}
const SENSOR = {
  ink: '#070B0E',
  parchment: '#C8E8DC',
  chakra: '#3DCEA8',
  olive: '#1A6B58',
  off: '#D7F5EC',
  danger: '#D94A38',
  rgb: '61 206 168',
}
const SEAL = {
  ink: '#0C0806',
  parchment: '#C4B8A8',
  chakra: '#C43C2E',
  danger: '#D94A38',
  olive: '#5A5048',
  off: '#F4F1E8',
  rgb: '196 60 46',
}

function rp(id, file) {
  return path.join(ROOT, id, file)
}
function r(id, file) {
  return fs.readFileSync(rp(id, file), 'utf8').replace(/\r\n/g, '\n')
}
function w(id, file, body) {
  fs.writeFileSync(rp(id, file), body.endsWith('\n') ? body : body + '\n')
}
function sync(id) {
  w(id, 'demo.style.txt', r(id, 'demo.css'))
}
function stripWave(css) {
  return css
    .replace(/\n?\s*\/\* wave2 timing surface \*\//g, '')
    .replace(/\s*\/\* wave2-polish \*\//g, '')
}
function rgbMix(css, rgb) {
  return css
    .replace(/color-mix\(in srgb,\s*var\(--chakra\)\s+45%,\s*transparent\)/g, `rgb(${rgb} / 0.45)`)
    .replace(/color-mix\(in srgb,\s*var\(--chakra\)\s+14%,\s*transparent\)/g, `rgb(${rgb} / 0.14)`)
    .replace(/color-mix\(in srgb,\s*var\(--alert\)\s+45%,\s*transparent\)/g, `rgb(${rgb} / 0.45)`)
    .replace(/color-mix\(in srgb,\s*var\(--alarm\)\s+45%,\s*transparent\)/g, `rgb(${rgb} / 0.45)`)
    .replace(/color-mix\(in srgb,\s*var\(--danger\)\s+45%,\s*transparent\)/g, `rgb(${rgb} / 0.45)`)
}

function patchEntry(id, { blurb, intensity, reducedMotionNote, acceptance, scaffold }) {
  let src = r(id, 'entry.ts')
  if (blurb) {
    src = src.replace(/blurb:\s*\n\s*'[^']*',/, `blurb:\n    '${blurb}',`)
    src = src.replace(/blurb:\s*'[^']*',/, `blurb:\n    '${blurb}',`)
  }
  if (intensity) src = src.replace(/intensity:\s*'[^']*'/, `intensity: '${intensity}'`)
  if (reducedMotionNote) {
    src = src.replace(
      /reducedMotionNote:\s*\n\s*'[^']*',/,
      `reducedMotionNote:\n      '${reducedMotionNote}',`,
    )
  }
  if (acceptance) {
    const block = `  acceptance: [\n${acceptance.map((a) => `    '${a}',`).join('\n')}\n  ],`
    src = src.replace(/acceptance:\s*\[[^\]]*\],?/s, block)
  }
  if (scaffold && /scaffold:/.test(src)) {
    src = src.replace(/scaffold:\s*`[^`]*`/, `scaffold: \`${scaffold}\``)
  }
  w(id, 'entry.ts', src)
}

function patchPayload(id, { acceptance, integration }) {
  let src = r(id, 'payload.ts')
  if (acceptance) {
    const block = `  acceptance: [\n${acceptance.map((a) => `    '${a}',`).join('\n')}\n  ],`
    src = src.replace(/acceptance:\s*\[[^\]]*\],?/s, block)
  }
  if (integration) {
    const block = `  integration: [\n${integration.map((a) => `    '${a}',`).join('\n')}\n  ],`
    src = src.replace(/integration:\s*\[[^\]]*\],?/s, block)
  }
  w(id, 'payload.ts', src)
}

function writeContract(id, obj) {
  w(id, 'contract.json', JSON.stringify(obj, null, 2))
}

const IMPROVERS = {
  'three-person-cell-formation'() {
    const id = 'three-person-cell-formation'
    const positions = {
      idle: {
        lead: { top: '-6%', left: '10%' },
        scout: { top: '108%', left: '-6%' },
        support: { top: '108%', left: '106%' },
      },
      formed: {
        lead: { top: '14%', left: '50%' },
        scout: { top: '78%', left: '24%' },
        support: { top: '78%', left: '76%' },
      },
    }
    let css = stripWave(r(id, 'demo.css'))
    css = css.replace(
      '  --off: #f7f2e8;',
      `  --off: #f7f2e8;
  --tpcf-snap-ms: 260ms;
  --tpcf-link-ms: 180ms;
  --tpcf-lead-top: 14%;
  --tpcf-lead-left: 50%;
  --tpcf-scout-top: 78%;
  --tpcf-scout-left: 24%;
  --tpcf-support-top: 78%;
  --tpcf-support-left: 76%;`,
    )
    css = css.replace(
      /top 260ms cubic-bezier\([^)]+\),\s*\n\s*left 260ms cubic-bezier\([^)]+\),/,
      `top var(--tpcf-snap-ms) cubic-bezier(0.32, 0.1, 0.2, 1.2),
    left var(--tpcf-snap-ms) cubic-bezier(0.32, 0.1, 0.2, 1.2),`,
    )
    css = css.replace(
      `.tpcf__link {
  stroke: var(--chakra);
  stroke-width: 1.5;
  opacity: 0;
  transition: opacity 200ms ease-out;
}

.tpcf[data-phase='done'] .tpcf__link {
  opacity: 0.7;
}`,
      `.tpcf__link {
  stroke: var(--chakra);
  stroke-width: 1.5;
  stroke-dasharray: 120;
  stroke-dashoffset: 120;
  transition: stroke-dashoffset var(--tpcf-link-ms) cubic-bezier(0.4, 0, 0.2, 1);
}

.tpcf[data-phase='linking'] .tpcf__link,
.tpcf[data-phase='done'] .tpcf__link {
  stroke-dashoffset: 0;
}`,
    )
    css = css.replace(
      `.tpcf[data-phase='active'] .tpcf__node--lead,
.tpcf[data-phase='done'] .tpcf__node--lead {
  top: 14%;
  left: 50%;
}

.tpcf[data-phase='active'] .tpcf__node--scout,
.tpcf[data-phase='done'] .tpcf__node--scout {
  top: 78%;
  left: 24%;
}

.tpcf[data-phase='active'] .tpcf__node--support,
.tpcf[data-phase='done'] .tpcf__node--support {
  top: 78%;
  left: 76%;
}`,
      `.tpcf[data-phase='active'] .tpcf__node--lead,
.tpcf[data-phase='linking'] .tpcf__node--lead,
.tpcf[data-phase='done'] .tpcf__node--lead {
  top: var(--tpcf-lead-top);
  left: var(--tpcf-lead-left);
}

.tpcf[data-phase='active'] .tpcf__node--scout,
.tpcf[data-phase='linking'] .tpcf__node--scout,
.tpcf[data-phase='done'] .tpcf__node--scout {
  top: var(--tpcf-scout-top);
  left: var(--tpcf-scout-left);
}

.tpcf[data-phase='active'] .tpcf__node--support,
.tpcf[data-phase='linking'] .tpcf__node--support,
.tpcf[data-phase='done'] .tpcf__node--support {
  top: var(--tpcf-support-top);
  left: var(--tpcf-support-left);
}`,
    )
    w(id, 'demo.css', rgbMix(css, PAPER.rgb))

    w(
      id,
      'demo.js',
      `/**
 * Three-Person Cell Formation — freeze snap positions then draw links.
 * iframe-safe; no storage / parent / network.
 */

const SNAP_MS = 260
const LINK_MS = 180
const NODE_COUNT = 3
const FORMED = {
  lead: { top: '14%', left: '50%' },
  scout: { top: '78%', left: '24%' },
  support: { top: '78%', left: '76%' },
}
const TOTAL_MS = SNAP_MS + LINK_MS

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tpcf]')
}

function nodes() {
  return Array.from(document.querySelectorAll('[data-tpcf-node]'))
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

function setLive(text) {
  const el = document.querySelector('[data-tpcf-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tpcf-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-tpcf-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tpcf-run], [data-tpcf-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  rootEl()?.setAttribute('data-phase', 'done')
  nodes().forEach((node) => {
    node.setAttribute('data-pulse', 'true')
    later(LINK_MS, () => node.removeAttribute('data-pulse'))
  })
  setStatus('FORMED')
  setHint('Cell formed and linked.')
  setLive('Three-person cell formed at frozen triangle positions with links drawn.')
}

function resetVisual() {
  nodes().forEach((node) => node.removeAttribute('data-pulse'))
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('SCATTERED')
  setHint('Press Run to form the cell.')
  setLive('Cell scattered. Three profiles unformed.')
}

export function runThreePersonCellFormation() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved()
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('FORMING')
  setLive('Profiles snapping into frozen triangle positions.')

  return new Promise((resolve) => {
    later(SNAP_MS, () => {
      root.setAttribute('data-phase', 'linking')
      setStatus('LINKING')
      setLive('Drawing cell links.')
      later(LINK_MS, () => {
        showResolved()
        busy = false
        setButtons(true)
        resolve()
      })
    })
  })
}

export function resetThreePersonCellFormation() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

export async function replayThreePersonCellFormation() {
  if (busy) return
  resetThreePersonCellFormation()
  void rootEl()?.offsetWidth
  await runThreePersonCellFormation()
}

function bindUi() {
  document.querySelector('[data-tpcf-run]')?.addEventListener('click', () => {
    void runThreePersonCellFormation()
  })
  document.querySelector('[data-tpcf-replay]')?.addEventListener('click', () => {
    void replayThreePersonCellFormation()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayThreePersonCellFormation()
  })
}

void TOTAL_MS
void NODE_COUNT
void FORMED
bindUi()
resetThreePersonCellFormation()
`,
    )

    const acceptance = [
      'Three nodes snap to frozen formed positions (lead 14%/50%, scout 78%/24%, support 78%/76%) over snapMs 260',
      'Links draw via stroke-dashoffset over linkMs 180 after snap',
      'Resolved latches FORMED',
      'Replay restores scattered positions before rerunning',
      'Reduced motion shows formed+linked immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/three-person-cell-formation.schema.json',
      title: 'ThreePersonCellFormation',
      description: 'Three nodes snap to frozen triangle positions then draw links.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'nodeCount',
        'snapMs',
        'linkMs',
        'formedPositions',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'three-person-cell-formation' },
        nodeCount: { type: 'number', const: 3 },
        snapMs: { type: 'number', const: 260 },
        linkMs: { type: 'number', const: 180 },
        formedPositions: { type: 'object', const: positions.formed },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'chakra', 'alarm', 'olive', 'off'],
          properties: {
            ink: { type: 'string', const: PAPER.ink },
            parchment: { type: 'string', const: PAPER.parchment },
            chakra: { type: 'string', const: PAPER.chakra },
            alarm: { type: 'string', const: PAPER.chakra },
            olive: { type: 'string', const: PAPER.olive },
            off: { type: 'string', const: PAPER.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateFormed'],
          properties: { immediateFormed: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb:
        'Lead/Scout/Support snap to a frozen triangle (260ms) then draw links (180ms) into FORMED.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the cell appears already formed and linked.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        'Import demo.css verbatim; freeze formed positions and snapMs 260 / linkMs 180 from contract.json.',
        'Wire runThreePersonCellFormation / resetThreePersonCellFormation / replayThreePersonCellFormation.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Three-Person Cell Formation

LEAD / SCOUT / SUPPORT snap to frozen triangle, then links draw.

## Freeze

- snapMs: 260 · linkMs: 180
- formed: lead 14%/50%, scout 78%/24%, support 78%/76%
- Palette: mission paper
`,
    )
    sync(id)
  },

  'chakra-charge-field'() {
    const id = 'chakra-charge-field'
    const diameters = [72, 96, 118, 140]
    const stepMs = 140
    let css = stripWave(r(id, 'demo.css'))
    css = css.replace(
      '  --ccf-d3: 140px;',
      `  --ccf-d3: 140px;
  --ccf-step-ms: 140ms;
  --ccf-ready-hold-ms: 180ms;`,
    )
    css = css.replace(
      /transition: width 80ms linear, height 80ms linear, border-radius 80ms linear;/,
      'transition: width var(--ccf-step-ms) cubic-bezier(0.2, 0.85, 0.25, 1), height var(--ccf-step-ms) cubic-bezier(0.2, 0.85, 0.25, 1), border-radius var(--ccf-step-ms) ease-out;',
    )
    // Centering the growing boundary
    if (!css.includes('place-self: center') && css.includes('.ccf__boundary {')) {
      css = css.replace(
        `.ccf__boundary {
  position: absolute;
  inset: 0;
  overflow: hidden;`,
        `.ccf__boundary {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;`,
      )
    }
    w(id, 'demo.css', rgbMix(css, SENSOR.rgb))

    w(
      id,
      'demo.js',
      `/**
 * Chakra Charge Field — irregular boundary grows through frozen diameters to READY.
 * iframe-safe; no storage / parent / network.
 */

const DIAMETERS_PX = ${JSON.stringify(diameters)}
const STEP_MS = ${stepMs}
const READY_HOLD_MS = 180
const STEP_COUNT = DIAMETERS_PX.length - 1

let busy = false
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-ccf]')
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

function setLive(text) {
  const el = document.querySelector('[data-ccf-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-ccf-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-ccf-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-ccf-run], [data-ccf-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function setStep(step) {
  const root = rootEl()
  root?.setAttribute('data-step', String(step))
  const pctEl = document.querySelector('[data-ccf-pct]')
  if (pctEl) {
    const d = DIAMETERS_PX[step] ?? DIAMETERS_PX[DIAMETERS_PX.length - 1]
    pctEl.textContent = \`\${d}px\`
  }
}

function showResolved(withHold) {
  const root = rootEl()
  setStep(STEP_COUNT)
  root?.setAttribute('data-phase', 'done')
  setStatus('READY')
  setHint('Charge field ready.')
  setLive('Chakra field ready at 140px irregular boundary.')
  if (withHold && root && !prefersReducedMotion()) {
    root.setAttribute('data-pulse', 'true')
    later(READY_HOLD_MS, () => root.removeAttribute('data-pulse'))
  } else {
    root?.removeAttribute('data-pulse')
  }
}

function resetVisual() {
  const root = rootEl()
  root?.setAttribute('data-phase', 'idle')
  root?.removeAttribute('data-pulse')
  setStep(0)
  setStatus('IDLE')
  setHint('Press Run to grow the charge field.')
  setLive('Charge field idle. Boundary at 72px.')
}

export function runChakraChargeField() {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') {
    return Promise.resolve()
  }

  busy = true
  clearTimers()
  resetVisual()
  setButtons(false)
  void root.offsetWidth

  if (prefersReducedMotion()) {
    showResolved(false)
    busy = false
    setButtons(true)
    return Promise.resolve()
  }

  root.setAttribute('data-phase', 'active')
  setStatus('CHARGING')
  setLive('Growing irregular chakra boundary.')

  return new Promise((resolve) => {
    let step = 0
    const tick = () => {
      if (step >= STEP_COUNT) {
        later(READY_HOLD_MS, () => {
          showResolved(true)
          busy = false
          setButtons(true)
          resolve()
        })
        return
      }
      step += 1
      setStep(step)
      setLive(\`Boundary step \${step}: \${DIAMETERS_PX[step]}px.\`)
      later(STEP_MS, tick)
    }
    later(STEP_MS, tick)
  })
}

export function resetChakraChargeField() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

export async function replayChakraChargeField() {
  if (busy) return
  resetChakraChargeField()
  void rootEl()?.offsetWidth
  await runChakraChargeField()
}

function bindUi() {
  document.querySelector('[data-ccf-run]')?.addEventListener('click', () => {
    void runChakraChargeField()
  })
  document.querySelector('[data-ccf-replay]')?.addEventListener('click', () => {
    void replayChakraChargeField()
  })
  document.querySelector('[data-ccf-core]')?.addEventListener('click', () => {
    if (rootEl()?.getAttribute('data-phase') === 'idle') void runChakraChargeField()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayChakraChargeField()
  })
}

bindUi()
resetChakraChargeField()
`,
    )

    // Simplify HTML hint
    let html = r(id, 'demo.html')
    html = html.replace(
      'Hold the core to charge. Release commits the current level.',
      'Press Run to grow the charge field through frozen diameters.',
    )
    html = html.replace('aria-label="Hold to charge the chakra field"', 'aria-label="Chakra charge field"')
    html = html.replace('>0%</span>', '>72px</span>')
    w(id, 'demo.html', html)

    const acceptance = [
      'Boundary grows through frozen diameters 72→96→118→140px (data-step)',
      'Each step takes stepMs 140; final READY with readyHoldMs 180',
      'Motion language is width/height growth, not opacity fade',
      'Replay resets to 72px idle before rerunning',
      'Reduced motion shows READY at 140px immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/chakra-charge-field.schema.json',
      title: 'ChakraChargeField',
      description: 'Irregular chakra boundary grows through frozen diameters to READY.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'diametersPx',
        'stepMs',
        'readyHoldMs',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'chakra-charge-field' },
        diametersPx: { type: 'array', const: diameters },
        stepMs: { type: 'number', const: stepMs },
        readyHoldMs: { type: 'number', const: 180 },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'chakra', 'olive', 'off'],
          properties: {
            ink: { type: 'string', const: SENSOR.ink },
            parchment: { type: 'string', const: SENSOR.parchment },
            chakra: { type: 'string', const: SENSOR.chakra },
            olive: { type: 'string', const: SENSOR.olive },
            off: { type: 'string', const: SENSOR.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateReady'],
          properties: { immediateReady: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb:
        'An irregular chakra boundary grows through frozen diameters 72→96→118→140px into READY.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, the field appears READY at 140px immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×320+).',
        'Import demo.css verbatim; freeze diametersPx [72,96,118,140] and stepMs 140 from contract.json.',
        'Wire runChakraChargeField / resetChakraChargeField / replayChakraChargeField.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Chakra Charge Field

Irregular boundary grows **72 → 96 → 118 → 140px** to READY.

## Freeze

- diametersPx: [72, 96, 118, 140] · stepMs: 140 · readyHoldMs: 180
- Palette: sensor phosphor
`,
    )
    sync(id)
  },
}

const args = process.argv.slice(2)
const ids = args.length ? args : Object.keys(IMPROVERS)
for (const id of ids) {
  if (!IMPROVERS[id]) {
    console.error('no improver', id)
    process.exitCode = 1
    continue
  }
  IMPROVERS[id]()
  console.log('improved', id)
}
