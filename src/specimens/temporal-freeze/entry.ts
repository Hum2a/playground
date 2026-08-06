import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim()

export const temporalFreeze: Specimen = {
  id: 'temporal-freeze',
  ref: 'SPX-451',
  title: 'Temporal Freeze',
  blurb:
    'A travelling freeze boundary stops looping UI systems one by one as it crosses them, locking the interface into a motionless frozen palette.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired Dark Hour temporal-state language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['state', 'freeze', 'temporal'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Looping ticker/dial/pulse are static under prefers-reduced-motion or data-force-reduced-motion; FREEZE/RESUME swap palette immediately with no boundary travel.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Temporal freeze stage',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; keep subsystem x-fractions and 700ms/500ms timings.',
    'Call freezeTemporal / resumeTemporal; do not globally pause animations on click.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'At least three independently looping systems (ticker, dial, pulse)',
    'Freeze boundary travels left→right (~700ms, 2px)',
    'Systems stop at different times matching their x positions',
    'Frozen palette veil follows the boundary',
    'Angular freeze bracket appears per system on freeze',
    'Final state has zero looping motion; line exits',
    'Resume travels right→left (~500ms) and restores motion progressively',
    'Reduced motion: no loops; FREEZE snaps frozen palette',
    'Works at 320px; no external assets/libraries/network',
  ],
}
