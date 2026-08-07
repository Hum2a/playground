import type { Specimen } from '../../../types'

export const wireConnectionDraw: Specimen = {
  id: 'wire-connection-draw',
  ref: 'SPX-2427',
  title: 'Wire Connection Draw',
  blurb:
    'A thin wire rapidly draws between two nodes, then both endpoints pulse to confirm a linked connection.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — ninja wire & connection systems',
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
  tags: ['connection', 'wire', 'linking'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the wire appears fully drawn and LINKED immediately.',
  },
  acceptance: [
    'Wire draws via pathLength to LINKED then snaps',
    'Path and duration frozen in contract',
    'Reduced motion shows fully drawn LINKED',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',
    label: 'Wire connection draw',
  },
}
