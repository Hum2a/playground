import type { Specimen } from '../../../types'

export const dayChangeCard: Specimen = {
  id: 'day-change-card',
  ref: 'SPX-3018',
  title: 'Day Change Card',
  blurb:
    'The current date card peels and slides away while the next day locks into place beneath.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ["calendar","day-change","slide","temporal"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Date swaps instantly under reduced motion; static calendar card remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',
    label: 'Day change',
  },
}
