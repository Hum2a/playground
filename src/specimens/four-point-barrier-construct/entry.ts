import type { Specimen } from '../types'

export const fourPointBarrierConstruct: Specimen = {
  id: 'four-point-barrier-construct',
  ref: 'SPX-2522',
  title: 'Four-Point Barrier Construct',
  blurb: 'Four corner nodes connect into a protected region.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved state appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Four-Point Barrier Construct',
  },
}
