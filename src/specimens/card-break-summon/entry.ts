import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#020b15;">
  {{specimen}}
</div>
`.trim()

export const cardBreakSummon: Specimen = {
  id: 'card-break-summon',
  ref: 'SPX-TODO',
  title: 'Card Break Summon',
  blurb:
    'A sealed archive token shivers, cracks along four break lines, and splits into five shards that fly outward — revealing ENTITY // 08 that was already waiting underneath.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 summoning / card-break language (generic geometry)',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['reveal', 'summon', 'clip-path', 'fracture'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Shake, cracks, piece travel, and entity scale are skipped under prefers-reduced-motion or data-force-reduced-motion; ENTITY // 08 AVAILABLE appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Card break summon demo',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame.',
    'Keep the entity layer under the card from the start; do not late-swap or fade it in.',
    'Import demo.css verbatim; preserve 170×230 card, four crack lines, five clip regions, and ~820ms timing.',
    'Call runCardBreakSummon / runCardBreakReset; busy-guard re-entrancy.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate result state.',
  ],
  acceptance: [
    'Generic sealed card (no tarot artwork); exactly five major pieces from four break lines',
    'Shake then cracks with blue leak; cracks precede separation at ~300ms',
    'Entity exists underneath and scales .9→1.04→1 without fade',
    'Pieces leave the host; no particle explosion; final state static',
    'Reduced motion shows the result immediately',
  ],
}
