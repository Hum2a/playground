import type { Specimen } from '../../../types'
export const snackbarRise: Specimen = {
  id: 'snackbar-rise',
  ref: 'SPX-1666',
  title: 'Snackbar Rise',
  blurb:
    '344×52px snackbar rises 20px above bottom after row delete; UNDO restores row; dwell 4500ms; one surface reused.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired snackbar feedback',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['snackbar', 'feedback', 'temporary'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, snackbar appears in place with opacity only.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 500,
    background: 'dark',

    label: 'Snackbar rise',
  },

}
