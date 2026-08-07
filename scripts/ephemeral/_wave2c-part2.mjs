/**
 * WAVE 2c part 2 — remaining mission + sensory specimens (full writes).
 * Run: node scripts/ephemeral/_wave2c-part2.mjs [id...]
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
}
const SENSOR = {
  ink: '#070B0E',
  parchment: '#C8E8DC',
  chakra: '#3DCEA8',
  olive: '#1A6B58',
  off: '#D7F5EC',
  danger: '#D94A38',
}

function w(id, file, body) {
  fs.writeFileSync(path.join(ROOT, id, file), body.endsWith('\n') ? body : body + '\n')
}
function r(id, file) {
  return fs.readFileSync(path.join(ROOT, id, file), 'utf8')
}
function sync(id) {
  w(id, 'demo.style.txt', r(id, 'demo.css'))
}

function writeMeta(id, {
  title,
  blurb,
  intensity,
  kind,
  reducedMotionNote,
  acceptance,
  integration,
  contract,
  spec,
  scaffold,
  previewScaffold,
  width = 420,
  height = 340,
  tags,
}) {
  const exportName = id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  const camel = exportName.charAt(0).toLowerCase() + exportName.slice(1)
  // Keep existing export name from entry
  let entry = r(id, 'entry.ts')
  const exportMatch = entry.match(/export const (\w+)/)
  const exp = exportMatch ? exportMatch[1] : camel
  const refMatch = entry.match(/ref: '(SPX-\d+)'/)
  const ref = refMatch[1]
  const tagsLine = tags
    ? `tags: [${tags.map((t) => `'${t}'`).join(', ')}],`
    : entry.match(/tags: \[[^\]]*\]/)?.[0] || `tags: [],`

  const previewBlock = previewScaffold
    ? `  preview: {
    scaffold: \`${previewScaffold}\`,
    width: ${width},
    height: ${height},
    background: 'dark',
    label: '${title}',
  },`
    : `  preview: {
    width: ${width},
    height: ${height},
    background: 'dark',
    label: '${title}',
  },`

  w(
    id,
    'entry.ts',
    `import type { Specimen } from '../../../types'

export const ${exp}: Specimen = {
  id: '${id}',
  ref: '${ref}',
  title: '${title}',
  blurb:
    '${blurb}',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction motion UI language',
  },
  facets: {
    kind: '${kind}',
    tech: 'tiny-js',
    scope: 'card',
    intensity: '${intensity}',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  ${tagsLine}
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      '${reducedMotionNote}',
  },
  acceptance: [
${acceptance.map((a) => `    '${a}',`).join('\n')}
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
${previewBlock}
}
`,
  )

  const bg =
    contract.properties?.colours?.properties?.ink?.const ||
    contract.colours?.ink ||
    '#1a1612'
  w(
    id,
    'payload.ts',
    `import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
${integration.map((a) => `    '${a}',`).join('\n')}
  ],
  acceptance: [
${acceptance.map((a) => `    '${a}',`).join('\n')}
  ],
  scaffold: \`
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:${bg};">
  {{specimen}}
</div>
\`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
`,
  )

  w(id, 'contract.json', JSON.stringify(contract, null, 2) + '\n')
  w(id, 'spec.md', spec)
}

/** @type {Record<string, () => void>} */
const IMPROVERS = {
  'target-dossier-reveal'() {
    const id = 'target-dossier-reveal'
    w(
      id,
      'demo.html',
      `<div class="tdr" data-tdr data-phase="idle">
  <p class="tdr__live" data-tdr-live aria-live="polite">
    Dossier classified. Three redaction bands sealed.
  </p>

  <p class="tdr__system">INTEL // DOSSIER</p>

  <div class="tdr__stage" data-tdr-stage>
    <div class="tdr__folder">
      <p class="tdr__label">Target 0311</p>
      <p class="tdr__intel" data-tdr-intel>Rank: S · Last seen: Border checkpoint · Threat: high</p>
      <div class="tdr__bands" aria-hidden="true">
        <span class="tdr__band" data-tdr-band data-index="0"></span>
        <span class="tdr__band" data-tdr-band data-index="1"></span>
        <span class="tdr__band" data-tdr-band data-index="2"></span>
      </div>
      <span class="tdr__seal" data-tdr-seal aria-hidden="true">SEALED</span>
    </div>
    <p class="tdr__status" data-tdr-status>CLASSIFIED</p>
    <p class="tdr__hint" data-tdr-hint>Press Run to declassify the dossier.</p>
  </div>

  <div class="tdr__controls">
    <button type="button" class="tdr__btn tdr__btn--primary" data-tdr-run>Run</button>
    <button type="button" class="tdr__btn" data-tdr-replay>Replay</button>
  </div>
</div>
`,
    )

    // Keep palette shell; rewrite redaction section of CSS by full write from existing with bands
    let css = r(id, 'demo.css').replace(/\r\n/g, '\n')
    css = css.replace(
      /\.tdr__redaction \{[\s\S]*?\}\n\n\.tdr\[data-phase='active'\] \.tdr__redaction,\n\.tdr\[data-phase='done'\] \.tdr__redaction \{[\s\S]*?\}\n\n/,
      `.tdr__bands {
  position: absolute;
  inset: 2.1rem 0.75rem 0.75rem;
  display: grid;
  gap: 0.35rem;
  pointer-events: none;
}

.tdr__band {
  display: block;
  height: 100%;
  background: repeating-linear-gradient(
    135deg,
    var(--ink) 0 8px,
    #05070a 8px 16px
  );
  transform: translateX(0);
  opacity: 1;
  transition:
    transform 160ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 120ms ease-out;
}

.tdr__band[data-lifted='true'] {
  transform: translateX(108%);
  opacity: 0;
}

`,
    )
    css = css.replace(
      /@media \(prefers-reduced-motion: reduce\) \{\n  \.tdr__redaction,/g,
      `@media (prefers-reduced-motion: reduce) {\n  .tdr__band,`,
    )
    css = css.replace(
      /html\[data-force-reduced-motion='true'\] \.tdr__redaction,/g,
      `html[data-force-reduced-motion='true'] .tdr__band,`,
    )
    w(id, 'demo.css', css)

    w(
      id,
      'demo.js',
      `/**
 * Target Dossier Reveal — three redaction bands lift in order, then intel reveals.
 * iframe-safe; no storage / parent / network.
 */

const BAND_COUNT = 3
const BAND_STAGGER_MS = 110
const BAND_LIFT_MS = 160
const REVEAL_MS = 180
const BAND_ORDER = [0, 1, 2]

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
  return document.querySelector('[data-tdr]')
}

function bands() {
  return Array.from(document.querySelectorAll('[data-tdr-band]'))
}

function intelEl() {
  return document.querySelector('[data-tdr-intel]')
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
  const el = document.querySelector('[data-tdr-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-tdr-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-tdr-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-tdr-run], [data-tdr-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  bands().forEach((b) => b.setAttribute('data-lifted', 'true'))
  const intel = intelEl()
  rootEl()?.setAttribute('data-phase', 'done')
  intel?.setAttribute('data-reveal', 'true')
  document.querySelector('[data-tdr-seal]')?.style.setProperty('opacity', '0')
  setStatus('REVEALED')
  setHint('Intel declassified.')
  setLive('Dossier declassified. Three bands lifted. Intel revealed.')
}

function resetVisual() {
  bands().forEach((b) => b.removeAttribute('data-lifted'))
  intelEl()?.removeAttribute('data-reveal')
  const seal = document.querySelector('[data-tdr-seal]')
  if (seal) seal.style.opacity = ''
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('CLASSIFIED')
  setHint('Press Run to declassify the dossier.')
  setLive('Dossier classified. Three redaction bands sealed.')
}

export function runTargetDossierReveal() {
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
  setStatus('DECLASSIFYING')
  setLive('Lifting redaction bands in order.')
  const seal = document.querySelector('[data-tdr-seal]')
  if (seal) seal.style.opacity = '0'

  return new Promise((resolve) => {
    const list = bands()
    BAND_ORDER.forEach((idx, i) => {
      later(i * BAND_STAGGER_MS, () => {
        list[idx]?.setAttribute('data-lifted', 'true')
      })
    })
    const total = (BAND_COUNT - 1) * BAND_STAGGER_MS + BAND_LIFT_MS + REVEAL_MS
    later(total, () => {
      showResolved()
      busy = false
      setButtons(true)
      resolve()
    })
  })
}

export function resetTargetDossierReveal() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

export async function replayTargetDossierReveal() {
  if (busy) return
  resetTargetDossierReveal()
  void rootEl()?.offsetWidth
  await runTargetDossierReveal()
}

function bindUi() {
  document.querySelector('[data-tdr-run]')?.addEventListener('click', () => {
    void runTargetDossierReveal()
  })
  document.querySelector('[data-tdr-replay]')?.addEventListener('click', () => {
    void replayTargetDossierReveal()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayTargetDossierReveal()
  })
}

bindUi()
resetTargetDossierReveal()
`,
    )

    const acceptance = [
      'Idle shows three redaction bands covering intel with SEALED mark',
      'Bands lift in order 0→1→2 with 110ms stagger (160ms lift each)',
      'Resolved shows REVEALED intel with bands gone',
      'Replay restores all three bands before rerunning',
      'Reduced motion shows all bands lifted / REVEALED immediately',
    ]
    writeMeta(id, {
      title: 'Target Dossier Reveal',
      blurb:
        'Three redaction bands lift in order (0→1→2, 110ms stagger) to declassify a sealed target dossier.',
      intensity: 'graphic',
      kind: 'overlay',
      tags: ['dossier', 'redaction', 'reveal'],
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, all three bands are already lifted and REVEALED shows immediately.',
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+) with preview.scaffold dossier host.',
        'Import demo.css verbatim; freeze bandCount 3 / stagger 110ms / lift 160ms from contract.json.',
        'Wire runTargetDossierReveal / resetTargetDossierReveal / replayTargetDossierReveal.',
        'Honour both reduced-motion triggers.',
      ],
      previewScaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#1a1612;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:180px;border:1px solid #3a3228;background:#ebe2d0;padding:1.25rem;color:#1a1612;font:700 13px ui-serif,Georgia,serif;">Classified file{{specimen}}</div></div>`,
      contract: {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: 'https://playground.humza-butt.space/contracts/target-dossier-reveal.schema.json',
        title: 'TargetDossierReveal',
        description: 'Three redaction bands lift in frozen order to reveal dossier intel.',
        type: 'object',
        additionalProperties: false,
        required: [
          'name',
          'bandCount',
          'bandOrder',
          'bandStaggerMs',
          'bandLiftMs',
          'revealMs',
          'colours',
          'reducedMotion',
        ],
        properties: {
          name: { type: 'string', const: 'target-dossier-reveal' },
          bandCount: { type: 'number', const: 3 },
          bandOrder: { type: 'array', const: [0, 1, 2] },
          bandStaggerMs: { type: 'number', const: 110 },
          bandLiftMs: { type: 'number', const: 160 },
          revealMs: { type: 'number', const: 180 },
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
            required: ['immediateRevealed'],
            properties: { immediateRevealed: { type: 'boolean', const: true } },
          },
        },
      },
      spec: `# Target Dossier Reveal

Three redaction bands lift in order **0 → 1 → 2** (110ms stagger, 160ms lift).

## Freeze

- Bands: 3 · order: [0,1,2] · stagger: 110ms · lift: 160ms · reveal: 180ms
- Palette: mission paper
`,
    })
    sync(id)
  },

  'versus-clash-card'() {
    const id = 'versus-clash-card'
    let css = r(id, 'demo.css').replace(/\r\n/g, '\n')
    css = css.replace(
      `.vcc__card--left {
  transform: translateX(-1.4rem);
}

.vcc__card--right {
  transform: translateX(1.4rem);
}

.vcc[data-phase='active'] .vcc__card--left,
.vcc[data-phase='done'] .vcc__card--left {
  transform: translateX(0.15rem);
}

.vcc[data-phase='active'] .vcc__card--right,
.vcc[data-phase='done'] .vcc__card--right {
  transform: translateX(-0.15rem);
}`,
      `.vcc__card--left {
  transform: translateX(-28px);
}

.vcc__card--right {
  transform: translateX(28px);
}

.vcc[data-phase='active'] .vcc__card--left,
.vcc[data-phase='clash'] .vcc__card--left,
.vcc[data-phase='done'] .vcc__card--left {
  transform: translateX(4px);
}

.vcc[data-phase='active'] .vcc__card--right,
.vcc[data-phase='clash'] .vcc__card--right,
.vcc[data-phase='done'] .vcc__card--right {
  transform: translateX(-4px);
}

.vcc[data-phase='clash'] .vcc__card--left,
.vcc[data-phase='clash'] .vcc__card--right {
  border-color: var(--alarm);
}`,
    )
    css = css.replace(
      'transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1);',
      'transition: transform 240ms cubic-bezier(0.2, 0.8, 0.25, 1);',
    )
    css = css.replaceAll('rgb(217 74 56', 'rgb(184 50 40')
    w(id, 'demo.css', css)

    w(
      id,
      'demo.js',
      `/**
 * Versus Clash Card — opposing cards slam 28px inward, hold clash, then lock.
 * iframe-safe; no storage / parent / network.
 */

const CLOSE_MS = 240
const CLASH_HOLD_MS = 180
const FLASH_MS = 200
const TRAVEL_PX = 28
const CLASH_GAP_PX = 4

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
  return document.querySelector('[data-vcc]')
}

function vsEl() {
  return document.querySelector('[data-vcc-vs]')
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
  const el = document.querySelector('[data-vcc-live]')
  if (el) el.textContent = text
}

function setStatus(text) {
  const el = document.querySelector('[data-vcc-status]')
  if (el) el.textContent = text
}

function setHint(text) {
  const el = document.querySelector('[data-vcc-hint]')
  if (el) el.textContent = text
}

function setButtons(on) {
  document.querySelectorAll('[data-vcc-run], [data-vcc-replay]').forEach((btn) => {
    btn.disabled = !on
  })
}

function showResolved() {
  const vs = vsEl()
  rootEl()?.setAttribute('data-phase', 'done')
  vs?.setAttribute('data-flash', 'true')
  setStatus('CLASH')
  setHint('Match locked in.')
  setLive('Profile A and Profile B have clashed.')
}

function resetVisual() {
  const vs = vsEl()
  vs?.removeAttribute('data-flash')
  rootEl()?.setAttribute('data-phase', 'idle')
  setStatus('STANDBY')
  setHint('Press Run to start the clash.')
  setLive('Match standby. Competitors apart.')
}

export function runVersusClashCard() {
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
  setStatus('CLOSING')
  setLive('Competitors closing in.')

  return new Promise((resolve) => {
    later(CLOSE_MS, () => {
      root.setAttribute('data-phase', 'clash')
      setStatus('IMPACT')
      setLive('Clash hold.')
      later(CLASH_HOLD_MS, () => {
        later(FLASH_MS, () => {
          showResolved()
          busy = false
          setButtons(true)
          resolve()
        })
      })
    })
  })
}

export function resetVersusClashCard() {
  clearTimers()
  busy = false
  resetVisual()
  setButtons(true)
  void rootEl()?.offsetWidth
}

export async function replayVersusClashCard() {
  if (busy) return
  resetVersusClashCard()
  void rootEl()?.offsetWidth
  await runVersusClashCard()
}

function bindUi() {
  document.querySelector('[data-vcc-run]')?.addEventListener('click', () => {
    void runVersusClashCard()
  })
  document.querySelector('[data-vcc-replay]')?.addEventListener('click', () => {
    void replayVersusClashCard()
  })
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
    if (data.type === 'restart') void replayVersusClashCard()
  })
}

void TRAVEL_PX
void CLASH_GAP_PX
bindUi()
resetVersusClashCard()
`,
    )

    const acceptance = [
      'Idle cards sit 28px apart from centre (STANDBY)',
      'Cards slam inward over 240ms then hold clash 180ms',
      'VS flash 200ms then CLASH locks with alarm borders',
      'Replay returns cards to 28px apart before rerunning',
      'Reduced motion shows CLASH locked immediately',
    ]
    writeMeta(id, {
      title: 'Versus Clash Card',
      blurb:
        'Two profile cards slam 28px inward, hold clash for 180ms, then lock CLASH with a VS flash.',
      intensity: 'graphic',
      kind: 'transition',
      tags: ['versus', 'clash', 'match'],
      reducedMotionNote:
        'Under prefers-reduced-motion or data-force-reduced-motion, both cards appear already locked in CLASH with no slam.',
      acceptance,
      integration: [
        'Mount inside a relative host (~420×300+).',
        'Import demo.css verbatim; freeze travel 28px / close 240ms / clash hold 180ms from contract.json.',
        'Wire runVersusClashCard / resetVersusClashCard / replayVersusClashCard.',
        'Honour both reduced-motion triggers.',
      ],
      contract: {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: 'https://playground.humza-butt.space/contracts/versus-clash-card.schema.json',
        title: 'VersusClashCard',
        description: 'Opposing cards slam 28px inward, hold clash, then lock.',
        type: 'object',
        additionalProperties: false,
        required: [
          'name',
          'travelPx',
          'closeMs',
          'clashHoldMs',
          'flashMs',
          'colours',
          'reducedMotion',
        ],
        properties: {
          name: { type: 'string', const: 'versus-clash-card' },
          travelPx: { type: 'number', const: 28 },
          closeMs: { type: 'number', const: 240 },
          clashHoldMs: { type: 'number', const: 180 },
          flashMs: { type: 'number', const: 200 },
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
            required: ['immediateClash'],
            properties: { immediateClash: { type: 'boolean', const: true } },
          },
        },
      },
      spec: `# Versus Clash Card

Cards travel **28px** inward over **240ms**, hold clash **180ms**, VS flash **200ms**.

## Freeze

- travelPx: 28 · closeMs: 240 · clashHoldMs: 180 · flashMs: 200
`,
    })
    sync(id)
  },
}

const args = process.argv.slice(2)
const ids = args.length ? args : Object.keys(IMPROVERS)
for (const id of ids) {
  if (!IMPROVERS[id]) {
    console.error('missing', id)
    process.exitCode = 1
    continue
  }
  IMPROVERS[id]()
  console.log('ok', id)
}
