import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0a1016;">
  {{specimen}}
</div>
`.trim()

export const darkHourConversionLoader: Specimen = {
  id: 'dark-hour-conversion-loader',
  ref: 'SPX-583',
  title: 'Dark Hour Conversion Loader',
  blurb:
    'A determinate loader where progress is the share of the interface converted by a travelling Dark Hour boundary, resolving to INDEX COMPLETE at 100%.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired Dark Hour conversion-as-progress language',
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
  tags: ['loading', 'progress', 'transformation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'No travelling boundary under prefers-reduced-motion or data-force-reduced-motion; the demo jumps to the completed INDEX COMPLETE state after a short hold.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Dark Hour conversion loader',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Drive --dhcl-p from the same progress value shown in the numeric readout.',
    'Call startDarkHourConversionLoad / resetDarkHourConversionLoad; use setDarkHourConversionProgress for inspection.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Progress directly controls the conversion boundary (1:1 with --dhcl-p)',
    'Converted visual percentage matches numeric percentage',
    'Converted layer has structural diffs (v-rule, angled chips/rows, glyph)',
    'Exactly two anomaly streaks travel with the 2px boundary',
    '100% is fully converted; after ~180ms a pale line resolves to INDEX COMPLETE',
    'No spinner; demo finishes (no indefinite loop)',
    'role=progressbar exposes exact value; completion announces once',
    'Reduced motion skips travelling boundary',
    'Works at 320px; no external assets/libraries/network',
  ],
}
