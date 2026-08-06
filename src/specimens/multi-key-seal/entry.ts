import type { Specimen } from '../types'

export const multiKeySeal: Specimen = {
  id: 'multi-key-seal',
  ref: 'SPX-2378',
  title: 'Multi-Key Seal',
  blurb:
    'Three prerequisite key nodes arm one by one; only once all three are lit do the seal petals open outward.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction fūinjutsu study — multi-key seal opening',
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
  tags: ['seal', 'prerequisite', 'unlock'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all three key nodes appear armed and the seal petals appear already open.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',
    label: 'Multi-key seal',
  },
}
