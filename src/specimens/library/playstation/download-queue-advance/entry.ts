import type { Specimen } from '../../../types'

export const downloadQueueAdvance: Specimen = {
  id: 'download-queue-advance',
  ref: 'SPX-3356',
  title: 'Download Queue Advance',
  blurb:
    'Ranked three-slot download stack: NOW completes, hands off to NEXT, queue panel stays mounted.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion study (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['download', 'queue'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Under reduced motion all three slots resolve to DONE immediately when Run is pressed.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 400,
    background: 'dark',
    label: 'Download Queue Advance demo',
  },
}
