import type { Specimen } from '../types'

export const holdToMaximumButton: Specimen = {
  id: 'hold-to-maximum-button',
  ref: 'SPX-2267',
  title: 'Hold-to-Maximum Button',
  blurb:
    'Hold OUTPUT to fill a boundary ring; reaching 100% commits maximum output.',
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
  integration: [
    'Pointer hold on OUTPUT fills ring; release before 100% cancels.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Hold fills ring to 100% then commits',
    'Early release stops charge below 100%',
    'Reduced motion commits immediately on press',
  ],
}
