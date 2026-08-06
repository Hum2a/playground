import type { Specimen } from '../../../types'

export const downloadQueueAdvance: Specimen = {
  id: 'download-queue-advance',
  ref: 'SPX-3356',
  title: 'Download Queue Advance',
  blurb: 'When the active queue item completes, its status hands off to the next waiting item without resetting the queue panel.',
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
  },
  tags: ["download","queue"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Under reduced motion all three items resolve to complete immediately when Run is pressed.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 360,
    background: 'dark',
    label: 'Download Queue Advance demo',
  },
}
