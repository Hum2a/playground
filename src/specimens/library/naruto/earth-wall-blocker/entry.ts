import type { Specimen } from '../../../types'

export const earthWallBlocker: Specimen = {
  id: 'earth-wall-blocker',
  ref: 'SPX-2470',
  title: 'Earth Wall Blocker',
  blurb:
    'Five segmented slabs rise staggered from below to form a protective wall, flipping a zone from EXPOSED to PROTECTED — abstract graphic slabs, no copyrighted iconography.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — earth-style barrier raising',
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
  tags: ['blocker', 'barrier', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the wall resolves directly to raised/PROTECTED with no staggered rise choreography.',
  },
  acceptance: [
    'Faceted slabs rise with frozen count and rise px',
    'Final PROTECTED after last slab settles',
    'Reduced motion shows raised wall immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Earth wall blocker',
  },
}
