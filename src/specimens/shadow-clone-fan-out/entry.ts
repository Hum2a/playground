import type { Specimen } from '../types'

export const shadowCloneFanOut: Specimen = {
  id: 'shadow-clone-fan-out',
  ref: 'SPX-2393',
  title: 'Shadow Clone Fan-Out',
  blurb:
    'One source task card fans three temporary proxy clones out into parallel worker slots, then dims into an origin marker.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — clone & duplication systems',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['clone', 'fan-out', 'parallelism'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all three worker slots fill immediately with no clone travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 360,
    background: 'dark',
    label: 'Shadow clone fan-out',
  },
}
