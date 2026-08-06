import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim()

export const deadlinePanic: Specimen = {
  id: 'deadline-panic',
  ref: 'SPX-TODO',
  title: 'Deadline Panic',
  blurb:
    'A 10-second countdown that stays compositionally calm until the final beats, then fractures digit-by-digit into TIME UP — urgency through disorder, not flashing.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['countdown', 'urgency', 'timer'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Digits update without positional disorder under prefers-reduced-motion or data-force-reduced-motion; at zero, TIME UP appears immediately with no collapse/attack choreography.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Deadline countdown',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame (~360×320+).',
    'Import demo.css verbatim; keep frozen shatter/scatter transforms — no Math.random.',
    'Drive time with performance.now + rAF; do not chain setTimeouts for the tick.',
    'Wire startDeadlinePanic / resetDeadlinePanic; announce Time expired. once at the end only.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with spatially static digits.',
  ],
  acceptance: [
    'Timer runs accurately from 00:10 to 00:00',
    'Early countdown is visually stable; disorder increases at deterministic thresholds',
    'No runtime randomness and no flashing backgrounds',
    '1-second state is visibly fragmented with frozen transforms',
    'Zero resolves into TIME UP impact',
    'Reduced motion keeps the timer spatially static',
    'Exact transforms and timing documented in the recreation contract',
  ],
}
