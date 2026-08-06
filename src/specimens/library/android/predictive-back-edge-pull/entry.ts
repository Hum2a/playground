import type { Specimen } from '../../../types'
export const predictiveBackEdgePull: Specimen = {
  id: 'predictive-back-edge-pull',
  ref: 'SPX-1601',
  title: 'Predictive Back Edge Pull',
  blurb:
    'Left-edge back gesture: current surface translates, scales, and rounds while the destination reveals underneath; commit at 112px or >0.55 px/ms velocity.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired predictive back navigation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['gesture', 'navigation', 'predictive-back'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Gesture thresholds preserved; scale interpolation removed; immediate snap after release.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 720,
    background: 'dark',

    label: 'Predictive back edge pull',
  },

}
