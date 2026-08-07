import type { Specimen } from '../../../types'

export const circularSealLock: Specimen = {
  id: 'circular-seal-lock',
  ref: 'SPX-2375',
  title: 'Circular Seal Lock',
  blurb:
    'Twelve radial ticks and a −42° mark ring rotate-to-align at 0° while an engage stroke fills the rim and the core locks.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction fūinjutsu study — radial seal lock',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['seal', 'lock', 'rotate', 'ticks'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the ring appears already aligned at 0° and locked with no rotation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 320,
    background: 'dark',
    label: 'Circular seal lock',
  },
}
