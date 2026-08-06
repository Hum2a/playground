import type { Specimen } from '../types'
export const predictiveBackAppShrink: Specimen = {
  id: 'predictive-back-app-shrink',
  ref: 'SPX-1602',
  title: 'Predictive Back App Shrink',
  blurb:
    'Back gesture shrinks the active surface into a floating card with progressive inset, radius, and scale while revealing the destination on all four edges.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired predictive back app shrink',
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
  tags: ['gesture', 'navigation', 'transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Gesture preview preserved; scale animation after release removed; immediate snap.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 720,
    background: 'dark',

    label: 'Predictive back app shrink',
  },

}
