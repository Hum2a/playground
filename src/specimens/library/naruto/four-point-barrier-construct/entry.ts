import type { Specimen } from '../../../types'

export const fourPointBarrierConstruct: Specimen = {
  id: 'four-point-barrier-construct',
  ref: 'SPX-2522',
  title: 'Four-Point Barrier Construct',
  blurb:
    'Four corners light, edges draw (220ms each), then the field fills (260ms) into a SECURE barrier.',
  origin: {
    project: 'Original',
    surface: 'Naruto / barrier-interfaces — protective ward construction overlays',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['barrier'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the barrier appears SECURE with corners, edges, and fill immediately.',
  },
    acceptance: [
    'Corners activate at (30,30)(170,30)(170,170)(30,170) before edges draw',
    'Four edges draw at 220ms each, then fill 260ms into SECURE',
    'Replay clears corners/edges/fill before reconstructing',
    'Reduced motion shows SECURE barrier immediately',
    'preview.scaffold hosts the overlay',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#070b0e;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Four-point barrier construct',
  },
}
