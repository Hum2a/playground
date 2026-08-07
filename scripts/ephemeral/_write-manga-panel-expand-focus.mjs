import { mkdirSync, writeFileSync, copyFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const dir = join(
  process.cwd(),
  'src/specimens/library/manga/manga-panel-expand-focus',
)
mkdirSync(dir, { recursive: true })

const html = `<div
  class="mpe"
  data-manga-panel-expand-focus
  data-layout="equal"
  data-active="0"
>
  <div class="mpe__stage" role="group" aria-label="Manga panel composition">
    <button
      type="button"
      class="mpe__panel is-active"
      data-panel="0"
      aria-pressed="true"
    >
      <span class="mpe__kicker">Panel 01</span>
      <span class="mpe__heading">INK</span>
      <span class="mpe__body">Primary beat holds the page weight while neighbours wait in equal frames.</span>
    </button>
    <button
      type="button"
      class="mpe__panel"
      data-panel="1"
      aria-pressed="false"
    >
      <span class="mpe__kicker">Panel 02</span>
      <span class="mpe__heading">GUTTER</span>
      <span class="mpe__body">Counter beat rides the opposite corner until hierarchy is redrawn.</span>
    </button>
    <button
      type="button"
      class="mpe__panel"
      data-panel="2"
      aria-pressed="false"
    >
      <span class="mpe__kicker">Panel 03</span>
      <span class="mpe__heading">BLEED</span>
      <span class="mpe__body">Quiet panel keeps negative space ready for a subordinate stack.</span>
    </button>
    <button
      type="button"
      class="mpe__panel"
      data-panel="3"
      aria-pressed="false"
    >
      <span class="mpe__kicker">Panel 04</span>
      <span class="mpe__heading">TOME</span>
      <span class="mpe__body">Closing beat compresses last when another frame claims dominance.</span>
    </button>
  </div>
  <p class="mpe__status" role="status" aria-live="polite" data-mpe-status>
    Equal page. Panel 01 selected.
  </p>
</div>
`

const css = `/* manga-panel-expand-focus — portable specimen styles. Do not restyle to host tokens. */

.mpe {
  --mpe-paper: #f4f1e8;
  --mpe-ink: #111111;
  --mpe-gutter: 8px;
  --mpe-half-gutter: 4px;
  --mpe-border: 4px;
  --mpe-ms: 520ms;
  --mpe-ease: cubic-bezier(0.22, 0.8, 0.2, 1);
  --mpe-dominant: 68%;
  --mpe-secondary: 32%;
  --mpe-heading-scale: 1.45;
  --mpe-secondary-opacity: 0.42;
  --mpe-sec-h: calc((100% - 16px) / 3);
  box-sizing: border-box;
  position: relative;
  width: 620px;
  height: 400px;
  max-width: 100%;
  margin: 0 auto;
  padding: 10px 10px 36px;
  overflow: hidden;
  background: var(--mpe-paper);
  color: var(--mpe-ink);
  font-family: 'Iowan Old Style', 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif;
}

.mpe *,
.mpe *::before,
.mpe *::after {
  box-sizing: border-box;
}

.mpe__stage {
  position: relative;
  width: 100%;
  height: 100%;
}

.mpe__panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  margin: 0;
  padding: 0.7rem 0.75rem;
  border: var(--mpe-border) solid var(--mpe-ink);
  border-radius: 0;
  background: var(--mpe-paper);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transition:
    top var(--mpe-ms) var(--mpe-ease),
    left var(--mpe-ms) var(--mpe-ease),
    width var(--mpe-ms) var(--mpe-ease),
    height var(--mpe-ms) var(--mpe-ease);
}

.mpe__panel:focus-visible {
  outline: 2px solid var(--mpe-ink);
  outline-offset: 2px;
  z-index: 2;
}

.mpe__kicker {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.72;
}

.mpe__heading {
  display: inline-block;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.1;
  transform-origin: top left;
  transition:
    transform var(--mpe-ms) var(--mpe-ease),
    opacity var(--mpe-ms) var(--mpe-ease);
}

.mpe__body {
  max-width: 28ch;
  font-size: 0.78rem;
  line-height: 1.35;
  transition: opacity var(--mpe-ms) var(--mpe-ease);
}

.mpe__panel.is-active .mpe__heading {
  transform: scale(var(--mpe-heading-scale));
}

.mpe[data-layout='focus'] .mpe__panel:not(.is-active) .mpe__body,
.mpe[data-layout='focus'] .mpe__panel:not(.is-active) .mpe__kicker {
  opacity: var(--mpe-secondary-opacity);
}

.mpe[data-layout='focus'] .mpe__panel:not(.is-active) .mpe__heading {
  opacity: var(--mpe-secondary-opacity);
  transform: none;
}

.mpe__status {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 8px;
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mpe[data-layout='equal'] .mpe__panel[data-panel='0'] {
  top: 0;
  left: 0;
  width: calc(50% - var(--mpe-half-gutter));
  height: calc(50% - var(--mpe-half-gutter));
}

.mpe[data-layout='equal'] .mpe__panel[data-panel='1'] {
  top: 0;
  left: calc(50% + var(--mpe-half-gutter));
  width: calc(50% - var(--mpe-half-gutter));
  height: calc(50% - var(--mpe-half-gutter));
}

.mpe[data-layout='equal'] .mpe__panel[data-panel='2'] {
  top: calc(50% + var(--mpe-half-gutter));
  left: 0;
  width: calc(50% - var(--mpe-half-gutter));
  height: calc(50% - var(--mpe-half-gutter));
}

.mpe[data-layout='equal'] .mpe__panel[data-panel='3'] {
  top: calc(50% + var(--mpe-half-gutter));
  left: calc(50% + var(--mpe-half-gutter));
  width: calc(50% - var(--mpe-half-gutter));
  height: calc(50% - var(--mpe-half-gutter));
}

.mpe[data-layout='focus'][data-active='0'] .mpe__panel[data-panel='0'],
.mpe[data-layout='focus'][data-active='2'] .mpe__panel[data-panel='2'] {
  top: 0;
  left: 0;
  width: calc(var(--mpe-dominant) - var(--mpe-half-gutter));
  height: 100%;
  z-index: 1;
}

.mpe[data-layout='focus'][data-active='1'] .mpe__panel[data-panel='1'],
.mpe[data-layout='focus'][data-active='3'] .mpe__panel[data-panel='3'] {
  top: 0;
  left: calc(var(--mpe-secondary) + var(--mpe-half-gutter));
  width: calc(var(--mpe-dominant) - var(--mpe-half-gutter));
  height: 100%;
  z-index: 1;
}

.mpe[data-layout='focus'][data-active='0'] .mpe__panel[data-panel='1'],
.mpe[data-layout='focus'][data-active='2'] .mpe__panel[data-panel='0'] {
  top: 0;
  left: calc(var(--mpe-dominant) + var(--mpe-half-gutter));
  width: calc(var(--mpe-secondary) - var(--mpe-half-gutter));
  height: var(--mpe-sec-h);
}

.mpe[data-layout='focus'][data-active='0'] .mpe__panel[data-panel='2'],
.mpe[data-layout='focus'][data-active='2'] .mpe__panel[data-panel='1'] {
  top: calc(var(--mpe-sec-h) + var(--mpe-gutter));
  left: calc(var(--mpe-dominant) + var(--mpe-half-gutter));
  width: calc(var(--mpe-secondary) - var(--mpe-half-gutter));
  height: var(--mpe-sec-h);
}

.mpe[data-layout='focus'][data-active='0'] .mpe__panel[data-panel='3'],
.mpe[data-layout='focus'][data-active='2'] .mpe__panel[data-panel='3'] {
  top: calc((var(--mpe-sec-h) + var(--mpe-gutter)) * 2);
  left: calc(var(--mpe-dominant) + var(--mpe-half-gutter));
  width: calc(var(--mpe-secondary) - var(--mpe-half-gutter));
  height: var(--mpe-sec-h);
}

.mpe[data-layout='focus'][data-active='1'] .mpe__panel[data-panel='0'],
.mpe[data-layout='focus'][data-active='3'] .mpe__panel[data-panel='0'] {
  top: 0;
  left: 0;
  width: calc(var(--mpe-secondary) - var(--mpe-half-gutter));
  height: var(--mpe-sec-h);
}

.mpe[data-layout='focus'][data-active='1'] .mpe__panel[data-panel='2'],
.mpe[data-layout='focus'][data-active='3'] .mpe__panel[data-panel='1'] {
  top: calc(var(--mpe-sec-h) + var(--mpe-gutter));
  left: 0;
  width: calc(var(--mpe-secondary) - var(--mpe-half-gutter));
  height: var(--mpe-sec-h);
}

.mpe[data-layout='focus'][data-active='1'] .mpe__panel[data-panel='3'],
.mpe[data-layout='focus'][data-active='3'] .mpe__panel[data-panel='2'] {
  top: calc((var(--mpe-sec-h) + var(--mpe-gutter)) * 2);
  left: 0;
  width: calc(var(--mpe-secondary) - var(--mpe-half-gutter));
  height: var(--mpe-sec-h);
}

@media (prefers-reduced-motion: reduce) {
  .mpe__panel,
  .mpe__heading,
  .mpe__body,
  .mpe__kicker {
    transition: none !important;
  }
}

html[data-force-reduced-motion='true'] .mpe__panel,
html[data-force-reduced-motion='true'] .mpe__heading,
html[data-force-reduced-motion='true'] .mpe__body,
html[data-force-reduced-motion='true'] .mpe__kicker {
  transition: none !important;
}
`

const js = `/**
 * Manga Panel Expand Focus — interactive panel hierarchy replate.
 * Sandbox-safe (no parent / storage / network).
 */

const LABELS = ['01 · INK', '02 · GUTTER', '03 · BLEED', '04 · TOME']

function rootEl() {
  return document.querySelector('[data-manga-panel-expand-focus]')
}

function statusEl() {
  return document.querySelector('[data-mpe-status]')
}

/**
 * @param {string} index
 */
function promote(index) {
  const root = rootEl()
  if (!root) return

  root.dataset.active = index
  root.dataset.layout = 'focus'

  root.querySelectorAll('.mpe__panel').forEach((panel) => {
    const on = panel.getAttribute('data-panel') === index
    panel.classList.toggle('is-active', on)
    panel.setAttribute('aria-pressed', on ? 'true' : 'false')
  })

  const status = statusEl()
  if (status) {
    status.textContent = \`Dominant frame: Panel \${LABELS[Number(index)]}.\`
  }
}

function bindUi() {
  const root = rootEl()
  if (!root) return

  root.querySelectorAll('.mpe__panel').forEach((panel) => {
    panel.addEventListener('click', () => {
      const index = panel.getAttribute('data-panel')
      if (index != null) promote(index)
    })
  })

  window.addEventListener('message', (event) => {
    const data = event.data
    if (data && typeof data === 'object' && data.type === 'restart') {
      resetMangaPanelExpandFocus()
    }
  })
}

export function resetMangaPanelExpandFocus() {
  const root = rootEl()
  if (!root) return

  root.dataset.layout = 'equal'
  root.dataset.active = '0'

  root.querySelectorAll('.mpe__panel').forEach((panel) => {
    const on = panel.getAttribute('data-panel') === '0'
    panel.classList.toggle('is-active', on)
    panel.setAttribute('aria-pressed', on ? 'true' : 'false')
  })

  const status = statusEl()
  if (status) {
    status.textContent = 'Equal page. Panel 01 selected.'
  }
}

export function promoteMangaPanelExpandFocus(index) {
  promote(String(index))
}

bindUi()
`

const entry = `import type { Specimen } from '../../../types'

export const mangaPanelExpandFocus: Specimen = {
  id: 'manga-panel-expand-focus',
  ref: 'SPX-4071',
  title: 'Panel Expand Focus',
  blurb:
    'Four equal manga panels replate so the selected frame grows to ~68% while the other three compress into a visible 32% stack.',
  origin: {
    project: 'Original',
    surface: 'Manga panel hierarchy as interactive drill-down',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: { franchise: 'manga' },
  tags: ['panels', 'hierarchy', 'replate', 'focus'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, panel geometry snaps with no animated transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 400,
    background: 'page',
    scaffold:
      '<div style="width:620px;height:400px;overflow:hidden;margin:0 auto">{{specimen}}</div>',
    label: 'Manga panel expand focus',
  },
  integration: [
    'Copy the wrapper, four panel buttons, CSS, and tiny selection script.',
    'Replace placeholder copy while retaining four panel containers and data-panel indices.',
    'Preserve is-active / aria-pressed / data-active / data-layout semantics.',
    'Preserve click and native Enter/Space keyboard activation on the panels.',
    'Preserve both reduced-motion overrides (media query and data-force-reduced-motion).',
  ],
  acceptance: [
    'One and only one panel is active at a time.',
    'Selecting each panel causes that exact panel to dominate (~68%).',
    'Secondary panels remain visible in the ~32% region.',
    'Keyboard activation (Enter/Space) promotes the focused panel.',
    'Content never leaves the 620×400 overflow:hidden preview boundary.',
    'Reduced motion performs an immediate layout state change.',
  ],
}
`

const payload = `import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for \`*.css?raw\`; keep demo.css as the portable
// artifact and import the twin \`.txt\` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  files: { html, css, js },
  spec,
  contract,
}

export default payload
`

const spec = `# Panel Expand Focus (portable recreation spec)

Four black-bordered manga panels begin with roughly equal importance on warm
paper. Promoting one panel replates the composition so that frame dominates
(~68%) while the remaining three compress into a visible subordinate stack
(~32%). Feels like changing panel hierarchy, not a modal or accordion.

## Visual intent

Original abstract page composition. Ink borders, no radius, warm off-white
paper. Selected heading scales up; secondary panel copy is suppressed.

## DOM structure

\`\`\`html
<div class="mpe" data-manga-panel-expand-focus data-layout="equal" data-active="0">
  <div class="mpe__stage" role="group" aria-label="Manga panel composition">
    <button type="button" class="mpe__panel is-active" data-panel="0" aria-pressed="true">…</button>
    <button type="button" class="mpe__panel" data-panel="1" aria-pressed="false">…</button>
    <button type="button" class="mpe__panel" data-panel="2" aria-pressed="false">…</button>
    <button type="button" class="mpe__panel" data-panel="3" aria-pressed="false">…</button>
  </div>
  <p class="mpe__status" role="status" aria-live="polite" data-mpe-status></p>
</div>
\`\`\`

## Copy

| Panel | Heading | Role |
| ----- | ------- | ---- |
| 01 | INK | Primary beat |
| 02 | GUTTER | Counter beat |
| 03 | BLEED | Quiet panel |
| 04 | TOME | Closing beat |

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | \`620 × 400px\`, \`overflow: hidden\` |
| Paper | \`#F4F1E8\` |
| Ink | \`#111111\` |
| Panels | \`4\` |
| Border | \`4px\` solid ink, no radius |
| Gutter | \`8px\` |
| Dominant region | \`~68%\` |
| Secondary region | \`~32%\` |
| Transition | \`520ms\` |
| Easing | \`cubic-bezier(0.22, 0.8, 0.2, 1)\` |
| Selected heading scale | \`1.45\` |
| Secondary content opacity | \`0.42\` |

## Interaction

- All panels are focusable buttons.
- Click or Enter/Space promotes the panel (\`data-layout="focus"\`, \`data-active\`, \`is-active\`).
- Exactly one panel is \`aria-pressed="true"\` at a time.

## Reduced motion

Honour both \`prefers-reduced-motion: reduce\` and
\`html[data-force-reduced-motion="true"]\` by disabling geometry/opacity
transitions so layout swaps immediately.

## API

- \`promoteMangaPanelExpandFocus(index)\`
- \`resetMangaPanelExpandFocus()\` — returns to equal 2×2 with panel 01 selected
`

const contract = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://playground.humza-butt.space/contracts/manga-panel-expand-focus.schema.json',
  title: 'MangaPanelExpandFocus',
  description:
    'Portable contract for manga panel hierarchy drill-down: one of four panels expands to ~68% while the others compress into a visible ~32% stack.',
  type: 'object',
  additionalProperties: false,
  required: [
    'name',
    'intent',
    'copy',
    'preview',
    'layout',
    'motion',
    'interaction',
    'reducedMotion',
    'a11y',
    'classNames',
  ],
  properties: {
    name: { type: 'string', const: 'manga-panel-expand-focus' },
    intent: {
      type: 'string',
      const: 'Demonstrate manga panel hierarchy as an interactive drill-down: selecting a panel replates the page so that frame dominates while neighbours compress but remain visible.',
    },
    copy: {
      type: 'object',
      additionalProperties: false,
      required: ['headings'],
      properties: {
        headings: {
          type: 'array',
          const: ['INK', 'GUTTER', 'BLEED', 'TOME'],
        },
      },
    },
    preview: {
      type: 'object',
      additionalProperties: false,
      required: ['widthPx', 'heightPx', 'overflow', 'paper', 'ink'],
      properties: {
        widthPx: { type: 'number', const: 620 },
        heightPx: { type: 'number', const: 400 },
        overflow: { type: 'string', const: 'hidden' },
        paper: { type: 'string', const: '#F4F1E8' },
        ink: { type: 'string', const: '#111111' },
      },
    },
    layout: {
      type: 'object',
      additionalProperties: false,
      required: [
        'panelCount',
        'borderPx',
        'gutterPx',
        'borderRadiusPx',
        'dominantPercent',
        'secondaryPercent',
        'selectedHeadingScale',
        'secondaryOpacity',
      ],
      properties: {
        panelCount: { type: 'number', const: 4 },
        borderPx: { type: 'number', const: 4 },
        gutterPx: { type: 'number', const: 8 },
        borderRadiusPx: { type: 'number', const: 0 },
        dominantPercent: { type: 'number', const: 68 },
        secondaryPercent: { type: 'number', const: 32 },
        selectedHeadingScale: { type: 'number', const: 1.45 },
        secondaryOpacity: { type: 'number', const: 0.42 },
      },
    },
    motion: {
      type: 'object',
      additionalProperties: false,
      required: ['durationMs', 'easing'],
      properties: {
        durationMs: { type: 'number', const: 520 },
        easing: {
          type: 'string',
          const: 'cubic-bezier(0.22, 0.8, 0.2, 1)',
        },
      },
    },
    interaction: {
      type: 'object',
      additionalProperties: false,
      required: ['activateOnClick', 'activateOnEnterSpace', 'oneActiveOnly'],
      properties: {
        activateOnClick: { type: 'boolean', const: true },
        activateOnEnterSpace: { type: 'boolean', const: true },
        oneActiveOnly: { type: 'boolean', const: true },
      },
    },
    reducedMotion: {
      type: 'object',
      additionalProperties: false,
      required: ['triggers', 'behavior'],
      properties: {
        triggers: {
          type: 'array',
          const: ['prefers-reduced-motion', 'data-force-reduced-motion'],
        },
        behavior: {
          type: 'string',
          const: 'Disable geometry transitions; switch layouts immediately.',
        },
      },
    },
    a11y: {
      type: 'object',
      additionalProperties: false,
      required: ['panelsFocusable', 'ariaPressed', 'liveStatus'],
      properties: {
        panelsFocusable: { type: 'boolean', const: true },
        ariaPressed: { type: 'boolean', const: true },
        liveStatus: { type: 'boolean', const: true },
      },
    },
    classNames: {
      type: 'object',
      additionalProperties: false,
      required: ['root', 'stage', 'panel', 'active', 'heading', 'body', 'status'],
      properties: {
        root: { type: 'string', const: 'mpe' },
        stage: { type: 'string', const: 'mpe__stage' },
        panel: { type: 'string', const: 'mpe__panel' },
        active: { type: 'string', const: 'is-active' },
        heading: { type: 'string', const: 'mpe__heading' },
        body: { type: 'string', const: 'mpe__body' },
        status: { type: 'string', const: 'mpe__status' },
      },
    },
  },
}

writeFileSync(join(dir, 'demo.html'), html)
writeFileSync(join(dir, 'demo.css'), css)
writeFileSync(join(dir, 'demo.style.txt'), css)
writeFileSync(join(dir, 'demo.js'), js)
writeFileSync(join(dir, 'entry.ts'), entry)
writeFileSync(join(dir, 'payload.ts'), payload)
writeFileSync(join(dir, 'spec.md'), spec)
writeFileSync(join(dir, 'contract.json'), JSON.stringify(contract, null, 2) + '\n')

try {
  const { unlinkSync } = await import('node:fs')
  unlinkSync(join(dir, 'probe.txt'))
} catch {
  /* ignore */
}

console.log('wrote', readdirSync(dir).sort().join(', '))
