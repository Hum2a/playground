import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0c1014;">
  {{specimen}}
</div>
`.trim()

export const badgeEarned: Specimen = {
  id: 'badge-earned',
  ref: 'SPX-843',
  title: 'Badge Earned',
  blurb:
    'A ghosted VECTOR TRIAL outline assembles from six deterministic polygons into a permanent achievement; status flips to EARNED only after lock.',
  origin: {
    project: 'Original',
    surface: 'Pokémon gym-badge–inspired achievement assembly (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['achievement', 'completion', 'assembly'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the completed badge and EARNED status appear immediately with no piece travel, lock, or rays.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 320,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Badge earned',
  },
  integration: [
    'Mount inside a relative host (~320×340+).',
    'Import demo.css verbatim; keep the six-piece offsets, stagger, and lock timings frozen.',
    'Call badgeEarned.complete() / .reset() or use COMPLETE TRIAL / RESET.',
    'Do not update INCOMPLETE → EARNED until assembly lock completes.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate earned path.',
  ],
  acceptance: [
    'Initial state is a thin ghost outline with LOCKED / INCOMPLETE',
    'Final badge uses exactly six primary polygons (~100×100)',
    'Pieces arrive from fixed offsets (30–75px) with stagger 0/35/70/105/140/175ms × ~220ms',
    'After last piece: lock −3deg→2deg→0 over ~140ms with one seam flash',
    'Exactly eight radial lines appear in pairs then vanish (~160ms); no glow loop',
    'Status INCOMPLETE→EARNED only after assembly; final badge remains static',
    'Reduced motion immediate; text announces VECTOR TRIAL and earned state',
  ],
}
