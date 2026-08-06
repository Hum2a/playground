import type { Specimen } from '../types'
export const overuseWarning: Specimen = {
  id: 'overuse-warning',
  ref: 'SPX-2004',
  title: 'Overuse Warning',
  blurb:
    'Each ACTIVATE pushes OUTPUT STRAIN higher through WARNING hatching until EXHAUSTED at 100%.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired overuse / exhaustion feedback',
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
  tags: ['warning', 'meter', 'exhaustion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Strain level jumps immediately without fill transition under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Overuse warning',
  },

}
