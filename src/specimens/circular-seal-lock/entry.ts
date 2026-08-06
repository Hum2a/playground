import type { Specimen } from '../types'

export const circularSealLock: Specimen = {
  id: 'circular-seal-lock',
  ref: 'SPX-2375',
  title: 'Circular Seal Lock',
  blurb:
    'A ring of radial marks rotates into alignment with fixed index marks, locking a circular seal with a settling pulse.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction fūinjutsu study — radial seal lock',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['seal', 'lock', 'rotate'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the ring appears already aligned and locked with no rotation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 320,
    background: 'dark',
    label: 'Circular seal lock',
  },
}
