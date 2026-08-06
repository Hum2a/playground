import type { Specimen } from '../../../types'

export const contractConfirmation: Specimen = {
  id: 'contract-confirmation',
  ref: 'SPX-3068',
  title: 'Contract Confirmation',
  blurb:
    'A formal agreement panel assembles piece by piece and receives a final yellow seal stamp.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ["contract","seal","velvet-room","confirmation"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Panel and seal appear immediately under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Contract',
  },
}
