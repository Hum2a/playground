import type { Specimen } from '../../../types'

export const allClearReset: Specimen = {
  id: 'all-clear-reset',
  ref: 'SPX-2073',
  title: 'All-Clear Reset',
  blurb:
    'ALL CLEAR retracts threat ALERT geometry and rebuilds the normal operations panel.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired all-clear / threat reset UI',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['alert', 'reset', 'all-clear'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Operations panel appears immediately without retract animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'All-clear reset',
  },

}
