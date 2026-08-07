import type { Specimen } from '../../../types'

export const multiKeySeal: Specimen = {
  id: 'multi-key-seal',
  ref: 'SPX-2378',
  title: 'Multi-Key Seal',
  blurb:
    'Three prerequisite keys snap-arm in order, then triangular petals open to frozen offsets and the seal reads OPEN.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction fūinjutsu study — multi-key seal',
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
  tags: ['seal', 'prerequisite', 'petals', 'keys'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all three keys appear armed and petals already open.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 340,
    background: 'dark',
    label: 'Multi-key seal',
  },
}
