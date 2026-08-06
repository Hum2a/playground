import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#12141a;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const decisionShowdown: Specimen = {
  id: 'decision-showdown',
  ref: 'SPX-196',
  title: 'Decision Showdown',
  blurb:
    'Confrontational YES/NO confirmation where opposing graphic panels expand and retreat — selection moves both sides, with distinct DELETED vs CANCELLED demo outcomes.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 confrontational confirmation language',
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
  tags: ['confirmation', 'selection', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Selection snaps between final YES/NO compositions and confirmation jumps to DELETED/CANCELLED under prefers-reduced-motion or data-force-reduced-motion.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Destructive confirmation (demo)',
  },
  integration: [
    'Mount in a relative overflow-hidden host (~420×260+).',
    'Import demo.css verbatim; keep distinct YES/NO polygons, widths, and timing.',
    'Wire selectDecision / confirmDecision; click inactive to select, active again or Enter/Space to confirm.',
    'Expose selection via aria-checked + status text — not size alone.',
    'Demo only: never perform real deletes or persistence.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with instant compositions.',
  ],
  acceptance: [
    'Default selection is NO; both choices always identifiable',
    'Active choice occupies ~58–68% width; inactive retreats (~20–25%) with scale ~0.82',
    'YES and NO use different polygon silhouettes (not mirrored)',
    'Switching selection moves both sides within ~340ms',
    'Keyboard: arrows select, Enter/Space confirm, Escape → NO',
    'YES confirm → cover then DELETED; NO confirm → sweep then CANCELLED (demo only)',
    'Reduced motion switches compositions immediately',
    'No external assets/fonts/libraries; works ~320–768px without horizontal overflow',
  ],
}
