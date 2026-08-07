import type { Specimen } from '../../../types'

export const fourPointBarrierConstruct: Specimen = {
  id: 'four-point-barrier-construct',
  ref: 'SPX-2522',
  title: 'Four-Point Barrier Construct',
  blurb:
    'Four corners connect edge-by-edge (220ms each) then the barrier field fills (260ms).',
  origin: {
    project: 'Original',
    surface: 'Naruto / barrier interfaces — four-point construct',
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
  tags: ["barrier","construct","ward"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Four-Point Barrier Construct state appears immediately.',
  },
  acceptance: [
    'Four edges draw in order over edgeMs 220 each before field fill begins',
    'Field fill runs fillMs 260 only after perimeter closes; SECURED after settleMs 90',
    'Replay clears edges + fill before rerunning',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#070B0E;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Four-Point Barrier Construct',
  },
}
