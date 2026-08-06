import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim()

export const tornEdgeDrawer: Specimen = {
  id: 'torn-edge-drawer',
  ref: 'SPX-017',
  title: 'Torn Edge Drawer',
  blurb:
    'Irregular torn-paper side drawer that drags a printed panel in from the right with an offset black backing silhouette.',
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
  tags: ['disclosure', 'drawer', 'clip-path', 'paper'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Drawer switches instantly between closed and open under prefers-reduced-motion or data-force-reduced-motion; no content stagger; static torn edge remains.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'card',
    scaffold,
    label: 'Project archive',
  },
  integration: [
    'Mount inside a container with position: relative and overflow: hidden so the drawer clips to the host.',
    'Import demo.css verbatim; keep the frozen clip-path polygons, colours, and timings.',
    'Wire OPEN INFO / CLOSE (or openTornDrawer / closeTornDrawer) with aria-expanded and aria-controls.',
    'Do not resize host layout — overlay the drawer; optional -6px host shift is decorative only.',
    'Keep backing/edge aria-hidden; panel hidden when closed; Escape may close without a focus trap.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an instant open/closed snap.',
  ],
  acceptance: [
    'Drawer enters from the right',
    'Leading edge is visibly irregular/torn via frozen clip-path',
    'Black backing is offset ~8px from paper with slightly separated timing',
    'Drawer overshoots once on opening (translateX -2%)',
    'Internal content enters after drawer movement begins',
    'Close (~360ms) is faster than open (~520ms) and not a mirrored reverse',
    'No rounded rectangle treatment',
    'Reduced motion is instantaneous',
    'Works inside iframe with no dependencies, assets, or network',
  ],
}
