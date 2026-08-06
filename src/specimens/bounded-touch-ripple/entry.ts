import type { Specimen } from '../types'
export const boundedTouchRipple: Specimen = {
  id: 'bounded-touch-ripple',
  ref: 'SPX-1593',
  title: 'Bounded Touch Ripple',
  blurb:
    'Pointer-origin circular ripple clipped to each control border radius; keyboard Enter/Space uses centre; reduced motion uses 100ms flash.',
  origin: {
    project: 'Original',
    surface: 'Android Material touch feedback',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['ripple', 'touch-feedback', 'css-js'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Radial expansion replaced with 100ms whole-control background flash.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 280,
    background: 'dark',

    label: 'Bounded touch ripple',
  },

}
