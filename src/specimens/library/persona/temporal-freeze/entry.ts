import type { Specimen } from '../../../types'
export const temporalFreeze: Specimen = {
  id: 'temporal-freeze',
  ref: 'SPX-451',
  title: 'Temporal Freeze',
  blurb:
    'A travelling freeze boundary stops looping UI systems one by one as it crosses them, locking the interface into a motionless frozen palette.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired Dark Hour temporal-state language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['state', 'freeze', 'temporal'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Looping ticker/dial/pulse are static under prefers-reduced-motion or data-force-reduced-motion; FREEZE/RESUME swap palette immediately with no boundary travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Temporal freeze stage',
  },

}
