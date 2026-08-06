import type { Specimen } from '../../../types'
export const deadlinePanic: Specimen = {
  id: 'deadline-panic',
  ref: 'SPX-305',
  title: 'Deadline Panic',
  blurb:
    'A 10-second countdown that stays compositionally calm until the final beats, then fractures digit-by-digit into TIME UP — urgency through disorder, not flashing.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['countdown', 'urgency', 'timer'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Digits update without positional disorder under prefers-reduced-motion or data-force-reduced-motion; at zero, TIME UP appears immediately with no collapse/attack choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Deadline countdown',
  },

}
