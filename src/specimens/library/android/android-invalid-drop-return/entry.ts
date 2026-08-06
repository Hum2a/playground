import type { Specimen } from '../types'
export const androidInvalidDropReturn: Specimen = {
  id: 'android-invalid-drop-return',
  ref: 'SPX-1900',
  title: 'Invalid Drop Return',
  blurb:
    '220×70 task card rejected over LOCKED — 90ms boundary flash, 260ms overshoot return capped at 6px; INBOX absorbs without return animation.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired invalid drag-drop return physics',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['drag-drop', 'error', 'return'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, invalid cue then instant proxy restore.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 300,
    background: 'dark',

    label: 'Invalid drop return',
  },

}
