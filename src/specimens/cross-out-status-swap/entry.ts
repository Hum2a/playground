import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim()

export const crossOutStatusSwap: Specimen = {
  id: 'cross-out-status-swap',
  ref: 'SPX-279',
  title: 'Cross-Out Status Swap',
  blurb:
    'PENDING is struck obsolete by opposing red/black slashes, exits the region, and APPROVED attacks in as the authoritative status — with a CURRENT marker, no traffic-light green.',
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
  tags: ['status', 'value-change', 'strike'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'PENDING swaps immediately to APPROVED under prefers-reduced-motion or data-force-reduced-motion; no strikes, travel, or overshoot. Final geometry remains.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Export request status',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame so the rejected PENDING clip-exit stays contained.',
    'Import demo.css verbatim; keep frozen slash geometry (118% / −7deg / +4deg) and APPROVED backing offset 7px 6px.',
    'Wire advanceCrossOutStatus / resetCrossOutStatus; do not treat this as arbitrary value replacement (see cross-out-replacement).',
    'Announce once via the polite live region after settle; keep crossed-out duplicates aria-hidden.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate APPROVED state.',
  ],
  acceptance: [
    'PENDING initially appears clearly on an irregular paper strip',
    'Red slash invalidates it before replacement arrives',
    'Second opposing black strike reinforces invalidation',
    'Old status physically leaves (not opacity-only)',
    'APPROVED enters from a different direction with one overshoot',
    'CURRENT marker appears last',
    'Nothing loops; no green required for APPROVED',
    'Reduced motion changes immediately; one semantic status exposed',
    'No external dependencies',
  ],
}
