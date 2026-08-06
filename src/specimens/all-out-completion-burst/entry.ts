import type { Specimen } from '../types'

export const allOutCompletionBurst: Specimen = {
  id: 'all-out-completion-burst',
  ref: 'SPX-3001',
  title: 'All-Out Completion Burst',
  blurb:
    'Multiple active entities collapse into a single explosive yellow completion burst and result state.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ["all-out","battle","burst","completion"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Result state appears immediately under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 360,
    background: 'dark',
    label: 'All-out burst',
  },
}
