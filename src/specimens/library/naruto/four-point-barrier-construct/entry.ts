import type { Specimen } from '../types'

export const fourPointBarrierConstruct: Specimen = {
  id: 'four-point-barrier-construct',
  ref: 'SPX-2522',
  title: 'Four-Point Barrier Construct',
  blurb:
    'Four corner nodes activate in turn and connect edge-by-edge, sealing a protected region that fills in once the perimeter closes.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, all four corners connect and the field fills immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Four-point barrier construct',
  },
}
