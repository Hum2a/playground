import type { Specimen } from '../types'
export const darkHourConversion: Specimen = {
  id: 'dark-hour-conversion',
  ref: 'SPX-444',
  title: 'Dark Hour conversion',
  blurb:
    'A travelling conversion boundary progressively reveals a Dark Hour nocturnal interface — structural alternate state, not a colour-theme fade.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired Dark Hour temporal conversion',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['state-change', 'transformation', 'temporal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'After the clock becomes 00:00, the Dark Hour state appears immediately with no travelling boundary.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Temporal conversion',
  },

}
