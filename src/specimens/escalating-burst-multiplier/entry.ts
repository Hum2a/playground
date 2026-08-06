import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0c0e12;">
  {{specimen}}
</div>
`.trim()

export const escalatingBurstMultiplier: Specimen = {
  id: 'escalating-burst-multiplier',
  ref: 'SPX-993',
  title: 'Escalating Burst Multiplier',
  blurb:
    'A temporary worker multiplier stacks 1×→20×: throughput climbs to 2,000/s while stability collapses to UNSTABLE and the intensity field fractures.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired temporary multiplier / risk capacity language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['multiplier', 'boost', 'risk', 'capacity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Slam, sector shift, and staged field growth are skipped under prefers-reduced-motion or data-force-reduced-motion; the final 20× UNSTABLE metrics appear immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Escalating temporary multiplier',
  },
  integration: [
    'Mount inside a relative host (~420×360+).',
    'Import demo.css verbatim; freeze stage metrics, contour/fragment counts, and 120ms slam from contract.json.',
    'Wire increaseBurstMultiplier / resetBurstMultiplier; stability must remain a structural rail, not colour-only.',
    'At 20× hold ~100ms then shift four sectors 3px once — no looping shake.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate final report.',
  ],
  acceptance: [
    'Exactly five states: 1×, 2×, 4×, 10×, 20×',
    'Output reaches 2,000/s; stability decreases every stage',
    'Field complexity grows (0→1→2→3 contours; 4 then 8 fragments; broken outer at 20×)',
    '10× status STRAINED; 20× status UNSTABLE',
    'Multiplier slam ~120ms; host scale 0.97→1.025→1',
    'Exactly four sectors shift 3px at final stage; no random jitter',
    'Reduced motion shows final metrics clearly; geometry frozen in contract.json',
  ],
}
