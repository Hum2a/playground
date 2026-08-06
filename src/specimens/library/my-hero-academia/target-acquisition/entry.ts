import type { Specimen } from '../../../types'
export const targetAcquisition: Specimen = {
  id: 'target-acquisition',
  ref: 'SPX-2028',
  title: 'Target Acquisition',
  blurb:
    'Pick a training target; SCAN snaps brackets inward and fills a confidence meter to LOCKED.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired training target tracking UI',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['targeting', 'training', 'lock-on'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Brackets and confidence meter appear immediately at 92% under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Training target acquisition',
  },

}
