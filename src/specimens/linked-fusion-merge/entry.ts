import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0c1016;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const linkedFusionMerge: Specimen = {
  id: 'linked-fusion-merge',
  ref: 'SPX-1022',
  title: 'Linked Fusion Merge',
  blurb:
    'Profiles A and B start unlinked; LINK fills dual nodes, joins a central diamond, tensions, then forces a convergence into Profile C with A+B provenance — driven by an external relationship, not self-synchronisation.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired Potara / linked-merge (abstract)',
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
  tags: ['merge', 'link', 'relationship', 'consolidation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, Profile C with A+B provenance appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 440,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Linked fusion merge',
  },
  integration: [
    'Mount inside a relative host (~440×360+).',
    'Import demo.css verbatim; keep 220px gap, 100×120 entities, link timings, and C at 126×138.',
    'Wire LINK via runLinkedFusion; RESET / harness restart via resetLinkedFusion.',
    'Keep the stage aria-hidden; announce merge via the polite status region.',
    'This is relationship-driven merge — do not restyle it into mirrored sync choreography.',
  ],
  acceptance: [
    'A and B begin unlinked with one dormant 10×10 node each',
    'Lines meet at centre; diamond forms before tension/convergence',
    'Short tension (±4px then 2px out); relationship stays attached while converging',
    'Final C inherits horizontal (A) and diagonal (B) structure with A+B provenance',
    'Static final LINKED MERGE; reduced motion shows C immediately',
    'No characters, earrings, or franchise symbols',
  ],
}
