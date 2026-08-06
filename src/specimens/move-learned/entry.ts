import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#e2dfd7;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const moveLearned: Specimen = {
  id: 'move-learned',
  ref: 'SPX-815',
  title: 'Move Learned',
  blurb:
    'PROCESS // 04 learns SYNC: the token travels into the empty capability slot, the incomplete outline closes, a lock sweep settles it, and the slot matches SCAN / FILTER / EXPORT.',
  origin: {
    project: 'Original',
    surface: 'Pokemon-inspired move learn / capability unlock',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['capability', 'unlock', 'slot'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four capabilities including SYNC appear immediately — no travel or lock sweep.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 360,
    background: 'card',
    scaffold,
    label: 'Capability slot install (demo)',
  },
  integration: [
    'Mount inline; keep the 2×2 × 150×42px angular slots and 80×30px SYNC token as the portable contract.',
    'Call runMoveLearned from LEARN; complete the empty outline only after token arrival.',
    'Exactly four corner markers during approach; no permanent celebratory highlight after lock.',
    'Expose capabilities as list text; announce Sync learned once via the status region.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate final state.',
  ],
  acceptance: [
    'Exactly four capability slots; one begins visibly empty',
    'SYNC exists outside the grid, then physically enters the empty slot',
    'Empty outline completes only after arrival; four corner markers during installation',
    'Final SYNC slot matches existing capabilities; no permanent celebration',
    'Reduced motion immediately shows all four capabilities including SYNC',
  ],
}
