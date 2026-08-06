import type { Specimen } from '../../../types'
export const authenticationSuccessMorph: Specimen = {
  id: 'authentication-success-morph',
  ref: 'SPX-1427',
  title: 'Authentication Success Morph',
  blurb:
    'Eight-node scan field with four brackets morphs to verified strokes; brackets move 6px inward 100ms; nodes converge 180ms; CONTINUE unlocks after settle.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired authentication completion morph',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['authentication', 'morph', 'completion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate verified geometry.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 280,
    height: 300,
    background: 'dark',

    label: 'Authentication success morph',
  },

}
