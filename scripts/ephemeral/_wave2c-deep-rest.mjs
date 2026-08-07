/**
 * WAVE 2c deep metaphor harden for remaining marked specimens.
 * Run: node scripts/ephemeral/_wave2c-deep-rest.mjs [id...]
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
  ember: '#E07030',
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
  const out = body.endsWith('\n') ? body : body + '\n'
  fs.writeFileSync(rp(id, file), out)
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

/** @type {Record<string, () => void>} */
const IMPROVERS = {
  'target-dossier-reveal'() {
    const id = 'target-dossier-reveal'
    let css = stripWave(r(id, 'demo.css'))
    if (!css.includes('--tdr-band-stagger-ms')) {
      css = css.replace(
        '  --off: #f7f2e8;',
        `  --off: #f7f2e8;
  --tdr-band-stagger-ms: 110ms;
  --tdr-band-lift-ms: 160ms;
  --tdr-reveal-ms: 180ms;
  --tdr-band-count: 3;`,
      )
    }
    css = css.replace(
      /transition:\s*\n\s*transform 160ms[^;]+;\s*\n\s*opacity 120ms ease-out;/,
      `transition:
    transform var(--tdr-band-lift-ms) cubic-bezier(0.4, 0, 0.2, 1);`,
    )
    // Prefer slide over opacity as primary language
    css = css.replace(
      `.tdr__band[data-lifted='true'] {
  transform: translateX(108%);
  opacity: 0;
}`,
      `.tdr__band[data-lifted='true'] {
  transform: translateX(108%);
}`,
    )
    w(id, 'demo.css', rgbMix(css, PAPER.rgb))
    sync(id)
  },

  'versus-clash-card'() {
    const id = 'versus-clash-card'
    let css = stripWave(r(id, 'demo.css'))
    if (!css.includes('--vcc-travel-px')) {
      css = css.replace(
        '  --off: #f7f2e8;',
        `  --off: #f7f2e8;
  --vcc-travel-px: 28px;
  --vcc-close-ms: 240ms;
  --vcc-clash-hold-ms: 180ms;
  --vcc-flash-ms: 200ms;`,
      )
    }
    css = css.replace(
      /transition: transform 240ms cubic-bezier\([^)]+\);/,
      'transition: transform var(--vcc-close-ms) cubic-bezier(0.2, 0.8, 0.25, 1);',
    )
    css = css.replace('translateX(-28px)', 'translateX(calc(var(--vcc-travel-px) * -1))')
    css = css.replace('translateX(28px)', 'translateX(var(--vcc-travel-px))')
    w(id, 'demo.css', rgbMix(css, PAPER.rgb))
    sync(id)
  },

  'objective-chain-advance'() {
    const id = 'objective-chain-advance'
    let css = stripWave(r(id, 'demo.css'))
    css = css.replace(
      '  --off: #f7f2e8;',
      `  --off: #f7f2e8;
  --oca-complete-ms: 200ms;
  --oca-pulse-ms: 220ms;
  --oca-settle-ms: 100ms;
  --oca-node-count: 4;`,
    )
    css = css.replace(
      /animation: oca-pulse 200ms ease-out;/,
      'animation: oca-pulse var(--oca-complete-ms) ease-out;',
    )
    css = css.replace(
      /left 220ms linear,\s*\n\s*opacity 120ms ease-out;/,
      'left var(--oca-pulse-ms) linear;',
    )
    // Primary pulse language: position, not opacity alone
    css = css.replace(
      `.oca__pulse {
  position: absolute;
  top: 50%;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--chakra);
  box-shadow: 0 0 6px 1px color-mix(in srgb, var(--chakra) 45%, transparent);
  opacity: 0;
  transform: translate(-50%, -50%);
  transition:
    left var(--oca-pulse-ms) linear;
}`,
      `.oca__pulse {
  position: absolute;
  top: 50%;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--chakra);
  box-shadow: 0 0 6px 1px rgb(184 50 40 / 0.45);
  transform: translate(-50%, -50%) scale(0);
  transition:
    left var(--oca-pulse-ms) linear,
    transform 80ms ease-out;
}`,
    )
    css = css.replace(
      `.oca__pulse[data-active='true'] {
  opacity: 1;
}`,
      `.oca__pulse[data-active='true'] {
  transform: translate(-50%, -50%) scale(1);
}`,
    )
    w(id, 'demo.css', rgbMix(css, PAPER.rgb))

    let js = r(id, 'demo.js')
    js = js.replace("setStatus('MISSION CLEAR')", "setStatus('CLEAR')")
    js = js.replace(
      "setLive('Objective chain complete. Mission clear.')",
      "setLive('Objective chain complete. CLEAR.')",
    )
    js = js.replace(
      "setHint('All objectives complete.')",
      "setHint('All checkpoints latched. CLEAR.')",
    )
    w(id, 'demo.js', js)

    const acceptance = [
      'Four checkpoints latch in order with completeMs 200 then pulseMs 220 to the next',
      'Final latch settles to CLEAR after settleMs 100',
      'Pulse travels along the link by left position (not opacity-only)',
      'Replay restores pending chain before rerunning',
      'Reduced motion shows CLEAR with all checkpoints complete immediately',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/objective-chain-advance.schema.json',
      title: 'ObjectiveChainAdvance',
      description: 'Checkpoint latch sequence with frozen step timings ending in CLEAR.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'nodeCount',
        'completeMs',
        'pulseMs',
        'settleMs',
        'finalStatus',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'objective-chain-advance' },
        nodeCount: { type: 'number', const: 4 },
        completeMs: { type: 'number', const: 200 },
        pulseMs: { type: 'number', const: 220 },
        settleMs: { type: 'number', const: 100 },
        finalStatus: { type: 'string', const: 'CLEAR' },
        colours: {
          type: 'object',
          additionalProperties: false,
          required: ['ink', 'parchment', 'chakra', 'alert', 'olive', 'off'],
          properties: {
            ink: { type: 'string', const: PAPER.ink },
            parchment: { type: 'string', const: PAPER.parchment },
            chakra: { type: 'string', const: PAPER.chakra },
            alert: { type: 'string', const: PAPER.chakra },
            olive: { type: 'string', const: PAPER.olive },
            off: { type: 'string', const: PAPER.off },
          },
        },
        reducedMotion: {
          type: 'object',
          additionalProperties: false,
          required: ['immediateClear'],
          properties: { immediateClear: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb:
        'Four mission checkpoints latch in order (200ms each) with a 220ms pulse to the next, then settle on CLEAR.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all checkpoints appear latched as CLEAR immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        'Import demo.css verbatim; freeze completeMs 200 / pulseMs 220 / settleMs 100 / CLEAR from contract.json.',
        'Wire runObjectiveChainAdvance / resetObjectiveChainAdvance / replayObjectiveChainAdvance.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Objective Chain Advance

Four checkpoints latch (200ms) with a 220ms pulse between, then **CLEAR**.

## Freeze

- Nodes: 4 · complete: 200ms · pulse: 220ms · settle: 100ms · final: CLEAR
- Palette: mission paper
`,
    )
    sync(id)
  },

  'technique-mastery-tree'() {
    const id = 'technique-mastery-tree'
    const nodes = ['ROOT', 'FORM', 'FLOW', 'PEAK']
    const order = [0, 1, 2, 3]
    w(
      id,
      'demo.html',
      `<div class="tmt" data-tmt data-phase="idle">
  <p class="tmt__live" data-tmt-live aria-live="polite">
    Scroll sealed. Four technique nodes pending.
  </p>

  <p class="tmt__system">SCROLL // TECHNIQUE</p>

  <div class="tmt__stage" data-tmt-stage>
    <ol class="tmt__tree" data-tmt-row aria-label="Technique mastery cascade">
      <li class="tmt__node" data-tmt-node data-id="ROOT" data-index="0" aria-label="ROOT locked">ROOT</li>
      <li class="tmt__edge" data-tmt-path data-index="0" aria-hidden="true"></li>
      <li class="tmt__node" data-tmt-node data-id="FORM" data-index="1" aria-label="FORM locked">FORM</li>
      <li class="tmt__edge" data-tmt-path data-index="1" aria-hidden="true"></li>
      <li class="tmt__node" data-tmt-node data-id="FLOW" data-index="2" aria-label="FLOW locked">FLOW</li>
      <li class="tmt__edge" data-tmt-path data-index="2" aria-hidden="true"></li>
      <li class="tmt__node" data-tmt-node data-id="PEAK" data-index="3" aria-label="PEAK locked">PEAK</li>
    </ol>
    <p class="tmt__status" data-tmt-status>LOCKED</p>
    <p class="tmt__hint" data-tmt-hint>Press Run or keys 1–4 in order.</p>
  </div>

  <div class="tmt__controls">
    <button type="button" class="tmt__btn tmt__btn--primary" data-tmt-run>Run</button>
    <button type="button" class="tmt__btn" data-tmt-replay>Replay</button>
  </div>
</div>
`,
    )

    w(
      id,
      'demo.css',
      `/* SPX-2767 Technique Mastery Tree — portable contract. */

.tmt {
  --ink: #1a1612;
  --parchment: #ebe2d0;
  --chakra: #b83228;
  --alarm: #b83228;
  --olive: #6a5e4e;
  --off: #f7f2e8;
  --tmt-node-ms: 140ms;
  --tmt-edge-ms: 160ms;
  --tmt-settle-ms: 100ms;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  min-height: 300px;
  padding: 0.85rem 0.7rem;
  background: var(--ink);
  color: var(--off);
  font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.tmt *,
.tmt *::before,
.tmt *::after {
  box-sizing: border-box;
}

.tmt__live {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.tmt__system {
  margin: 0;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--chakra);
}

.tmt__stage {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 0.65rem;
  justify-items: center;
  width: 100%;
  padding: 1.2rem 0.75rem;
  border: 1px solid rgb(184 50 40 / 0.45);
  background:
    linear-gradient(180deg, rgb(247 242 232 / 0.05), transparent 40%),
    rgb(26 22 18 / 0.9);
}

.tmt__tree {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 22rem;
}

.tmt__node {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  min-width: 3.1rem;
  height: 2rem;
  padding: 0 0.35rem;
  border: 1.5px solid var(--olive);
  background: rgb(26 22 18 / 0.95);
  color: var(--olive);
  font-size: 0.58rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  transform: translateY(6px) scale(0.92);
  transition:
    color var(--tmt-node-ms) ease-out,
    border-color var(--tmt-node-ms) ease-out,
    transform var(--tmt-node-ms) cubic-bezier(0.2, 0.9, 0.25, 1.15),
    box-shadow var(--tmt-node-ms) ease-out;
}

.tmt__node[data-unlocked='true'] {
  color: var(--parchment);
  border-color: var(--chakra);
  transform: translateY(0) scale(1);
  box-shadow: inset 0 0 0 1px rgb(184 50 40 / 0.35);
}

.tmt__node[data-pulse='true'] {
  animation: tmt-snap var(--tmt-node-ms) cubic-bezier(0.15, 0.95, 0.25, 1.15);
}

@keyframes tmt-snap {
  0% {
    transform: translateY(6px) scale(0.92);
  }
  55% {
    transform: translateY(-2px) scale(1.08);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

.tmt__edge {
  flex: 1 1 auto;
  height: 2px;
  margin: 0 0.15rem;
  background: var(--olive);
  transform-origin: left center;
  transform: scaleX(0);
  transition: transform var(--tmt-edge-ms) cubic-bezier(0.4, 0, 0.2, 1);
}

.tmt__edge[data-filled='true'] {
  background: var(--chakra);
  transform: scaleX(1);
}

.tmt__status {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  color: var(--parchment);
}

.tmt[data-phase='done'] .tmt__status {
  color: var(--chakra);
}

.tmt__hint {
  margin: 0;
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  color: var(--olive);
  text-align: center;
}

.tmt__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tmt__btn {
  appearance: none;
  margin: 0;
  padding: 0.45rem 0.85rem;
  border: 1px solid var(--olive);
  background: transparent;
  color: var(--off);
  font: inherit;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
}

.tmt__btn--primary {
  border-color: var(--chakra);
  background: rgb(184 50 40 / 0.14);
}

.tmt__btn:hover:not(:disabled) {
  border-color: var(--parchment);
}

.tmt__btn:focus-visible {
  outline: 2px solid var(--chakra);
  outline-offset: 2px;
}

.tmt__btn:disabled {
  opacity: 0.45;
  cursor: default;
}

@media (prefers-reduced-motion: reduce) {
  .tmt__node,
  .tmt__node[data-pulse='true'],
  .tmt__edge {
    transition: none !important;
    animation: none !important;
  }

  .tmt__node {
    transform: translateY(0) scale(1);
  }

  .tmt__node:not([data-unlocked='true']) {
    transform: translateY(0) scale(0.94);
  }
}

html[data-force-reduced-motion='true'] .tmt__node,
html[data-force-reduced-motion='true'] .tmt__node[data-pulse='true'],
html[data-force-reduced-motion='true'] .tmt__edge {
  transition: none !important;
  animation: none !important;
}

html[data-force-reduced-motion='true'] .tmt__node {
  transform: translateY(0) scale(1);
}

html[data-force-reduced-motion='true'] .tmt__node:not([data-unlocked='true']) {
  transform: translateY(0) scale(0.94);
}
`,
    )

    w(
      id,
      'demo.js',
      `/**
 * Technique Mastery Tree — named scroll nodes unlock with edge draw cascade.
 * iframe-safe; no storage / parent / network.
 */

const NODE_IDS = ${JSON.stringify(nodes)}
const NODE_ORDER = ${JSON.stringify(order)}
const NODE_COUNT = NODE_IDS.length
const NODE_MS = 140
const EDGE_MS = 160
const SETTLE_MS = 100
const TOTAL_MS = NODE_COUNT * NODE_MS + (NODE_COUNT - 1) * EDGE_MS + SETTLE_MS

let busy = false
let unlocked = 0
/** @type {number[]} */
let timers = []

function prefersReducedMotion() {
  const forced =
    document.documentElement.getAttribute('data-force-reduced-motion') === 'true'
  const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return forced || media
}

function rootEl() {
  return document.querySelector('[data-tmt]')
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
  const el = document.querySelector('[data-tmt-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tmt-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-tmt-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tmt-run], [data-tmt-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function nodeEls() {
  return Array.from(document.querySelectorAll('[data-tmt-node]'))
}

function edgeEls() {
  return Array.from(document.querySelectorAll('[data-tmt-path]'))
}

function paint(count, pulseIndex) {
  nodeEls().forEach((node, i) => {
    const id = NODE_IDS[i]
    const on = i < count
    node.setAttribute('data-unlocked', on ? 'true' : 'false')
    node.setAttribute('aria-label', on ? \`\${id} unlocked\` : \`\${id} locked\`)
    if (pulseIndex === i) {
      node.setAttribute('data-pulse', 'true')
      later(NODE_MS, () => node.removeAttribute('data-pulse'))
    } else {
      node.removeAttribute('data-pulse')
    }
  })
  edgeEls().forEach((edge, i) => {
    edge.setAttribute('data-filled', i < count - 1 ? 'true' : 'false')
  })
}

function showResolved() {
  unlocked = NODE_COUNT
  paint(NODE_COUNT, -1)
  rootEl()?.setAttribute('data-phase', 'done')
  setStatus('MASTERED')
  setHint('Technique scroll mastered.')
  setLive('Technique mastery complete. ROOT→FORM→FLOW→PEAK unlocked.')
}

function resetVisual() {
  unlocked = 0
  paint(0, -1)
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('LOCKED')
  setHint('Press Run or keys 1–4 in order.')
  setLive('Scroll sealed. Four technique nodes pending.')
}

export function runTechniqueMasteryTree() {
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
  setStatus('UNLOCKING')
  setLive('Drawing technique cascade.')

  return new Promise((resolve) => {
    let step = 0
    const tick = () => {
      if (step >= NODE_COUNT) {
        later(SETTLE_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
        return
      }
      const idx = NODE_ORDER[step]
      unlocked = step + 1
      paint(unlocked, idx)
      setLive(\`\${NODE_IDS[idx]} unlocked (\${unlocked}/\${NODE_COUNT}).\`)
      step += 1
      later(NODE_MS + (step < NODE_COUNT ? EDGE_MS : 0), tick)
    }
    tick()
  })
}

export function resetTechniqueMasteryTree() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

export async function replayTechniqueMasteryTree() {
  if (busy) return
  resetTechniqueMasteryTree()
  void rootEl()?.offsetWidth
  await runTechniqueMasteryTree()
}

function unlockOne(index) {
  const root = rootEl()
  if (!root || busy || root.getAttribute('data-phase') === 'done') return
  if (index !== unlocked) return
  if (prefersReducedMotion()) {
    showResolved()
    return
  }
  root.setAttribute('data-phase', 'active')
  setStatus('UNLOCKING')
  unlocked = index + 1
  paint(unlocked, index)
  setLive(\`\${NODE_IDS[index]} unlocked (\${unlocked}/\${NODE_COUNT}).\`)
  if (unlocked >= NODE_COUNT) later(SETTLE_MS, () => showResolved())
}

function bindUi() {
  document.querySelector('[data-tmt-run]')?.addEventListener('click', () => {
    void runTechniqueMasteryTree()
  })
  document.querySelector('[data-tmt-replay]')?.addEventListener('click', () => {
    void replayTechniqueMasteryTree()
  })
  window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return
    const n = Number(event.key)
    if (n >= 1 && n <= NODE_COUNT) {
      event.preventDefault()
      unlockOne(n - 1)
    }
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTechniqueMasteryTree()
  })
}

void TOTAL_MS
bindUi()
resetTechniqueMasteryTree()
`,
    )

    const acceptance = [
      'Nodes unlock in frozen order ROOT→FORM→FLOW→PEAK (data-id)',
      'Each unlock snaps with nodeMs 140; edges draw with edgeMs 160 via scaleX',
      'Resolved shows MASTERED with all edges filled',
      'Keys 1–4 unlock only in order; replay clears before rerun',
      'Reduced motion shows MASTERED immediately with no snap/draw',
    ]
    writeContract(id, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'https://playground.humza-butt.space/contracts/technique-mastery-tree.schema.json',
      title: 'TechniqueMasteryTree',
      description: 'Named scroll nodes unlock with edge-draw cascade — not generic skill-tree chrome.',
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'nodeIds',
        'nodeOrder',
        'nodeMs',
        'edgeMs',
        'settleMs',
        'colours',
        'reducedMotion',
      ],
      properties: {
        name: { type: 'string', const: 'technique-mastery-tree' },
        nodeIds: { type: 'array', const: nodes },
        nodeOrder: { type: 'array', const: order },
        nodeMs: { type: 'number', const: 140 },
        edgeMs: { type: 'number', const: 160 },
        settleMs: { type: 'number', const: 100 },
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
          required: ['immediateMastered'],
          properties: { immediateMastered: { type: 'boolean', const: true } },
        },
      },
    })
    patchEntry(id, {
      blurb:
        'A sealed technique scroll unlocks ROOT→FORM→FLOW→PEAK with edge-draw cascade (140ms / 160ms) into MASTERED.',
      intensity: 'graphic',
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all four named nodes and edges appear MASTERED immediately.',
      acceptance,
    })
    patchPayload(id, {
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        'Import demo.css verbatim; freeze nodeIds ROOT/FORM/FLOW/PEAK and nodeMs 140 / edgeMs 160 from contract.json.',
        'Wire runTechniqueMasteryTree / resetTechniqueMasteryTree / replayTechniqueMasteryTree.',
        'Honour both reduced-motion triggers.',
      ],
    })
    w(
      id,
      'spec.md',
      `# Technique Mastery Tree

Named scroll nodes **ROOT → FORM → FLOW → PEAK** unlock with edge draw.

## Freeze

- nodeIds: ROOT, FORM, FLOW, PEAK · order: [0,1,2,3]
- nodeMs: 140 · edgeMs: 160 · settleMs: 100
- Palette: mission paper (scroll, not generic RPG skill tree)
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
