import type { Specimen } from '../types'
export const quirkActivationBurst: Specimen = {
  id: 'quirk-activation-burst',
  ref: 'SPX-1997',
  title: 'Quirk Activation Burst',
  blurb:
    'Eight accent rays burst from center as a clipped core panel scales and swaps STANDBY to ACTIVE.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired ability activation burst language',
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
  tags: ['burst', 'activation', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, ACTIVE state shows immediately with no rays.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Quirk activation burst',
  },

}
