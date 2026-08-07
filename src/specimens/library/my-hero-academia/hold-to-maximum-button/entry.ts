import type { Specimen } from '../../../types'

export const holdToMaximumButton: Specimen = {
  id: 'hold-to-maximum-button',
  ref: 'SPX-2267',
  title: 'Hold-to-Maximum Button',
  blurb:
    'Hold OUTPUT to fill a notched charge ring; overload ticks commit maximum output at 100%.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired maximum output charge UI',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['hold', 'charge', 'maximum'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Pointer down immediately commits maximum output at 100%.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Hold-to-maximum button',
  },

}
