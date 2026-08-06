import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020b16;">
  {{specimen}}
</div>
`.trim()

export const maxRankCompletion: Specimen = {
  id: 'max-rank-completion',
  ref: 'SPX-550',
  title: 'Max Rank Completion',
  blurb:
    'Terminal Social Link state: energy converges from YOU and ALLY, 09 rolls to 10, a luminous diamond circuit closes, and MAX locks the completed bond — static, no aura.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Social Link max-rank completion language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['relationship', 'rank-up', 'completion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, Rank 10 with the completed circuit, outline, and MAX appear immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Max rank social link completion',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~320×240 stage).',
    'Import demo.css verbatim; keep double-bond, 09→10 reel, and four diamond path timings.',
    'Call completeMaxRank() from MAX LINK; resetMaxRank() or harness restart restores rank 09.',
    'Keep the stage aria-hidden; announce via the polite status region.',
    'Honour both reduced-motion triggers with the immediate completed path.',
  ],
  acceptance: [
    'Starts at rank 09 with a strong double-line bond between YOU and ALLY',
    'Energy travels inward from both entities before the rank reel moves',
    '09→10 vertical transition; four circuit paths construct afterward',
    'Circuit visibly reconnects both entity nodes; MAX appears last',
    'Pale outline expands ~6px then settles; final state is completely static',
    'No particles, confetti, or perpetual glow; reduced motion shows Rank 10 circuit immediately',
    'No external assets; sandbox="allow-scripts" safe',
  ],
}
