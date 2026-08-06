import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0a0c10;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const stateFieldTransfer: Specimen = {
  id: 'state-field-transfer',
  ref: 'SPX-1115',
  title: 'State Field Transfer',
  blurb:
    'Node A collapses its three-contour boost into an 18px token, travels a seven-segment channel with a midpoint ownership handoff, then rebuilds the field on Node B — never ACTIVE on both at once.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired state/aura transfer (abstract)',
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
  tags: ['state-transfer', 'inheritance', 'handoff'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, ownership snaps to A NONE / B ACTIVE with no travelling token.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 480,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'State field transfer A→B',
  },
  integration: [
    'Mount inside a relative host (~480×340+).',
    'Import demo.css verbatim; keep 240px gap, 7 segments, 3 contours, and frozen timings.',
    'Wire TRANSFER BOOST via runStateFieldTransfer; RESET / harness restart via resetStateFieldTransfer.',
    'Never show BOOST // ACTIVE on A and B simultaneously.',
    'Announce “Boost transferred from Node A to Node B.”; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'A owns BOOST with exactly three contours; B starts with none',
    'Seven-segment channel; contours collapse outer→inner; one 18×18 transfer token',
    'Midpoint handoff: A NONE / B PENDING; never both ACTIVE',
    'B rebuilds inner→outer then ACTIVE; channel retracts; final static',
    'Reduced motion immediately shows final ownership',
  ],
}
