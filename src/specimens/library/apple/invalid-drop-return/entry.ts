import type { Specimen } from '../../../types'
export const invalidDropReturn: Specimen = {
  id: 'invalid-drop-return',
  ref: 'SPX-1455',
  title: 'Invalid Drop Return',
  blurb:
    'CONFIG.JSON drag rejected over READ ONLY — 3px refusal, 70ms pause, 360ms quadratic return, merge 1.04→1, DROP REJECTED 700ms.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired drag rejection and restoration',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['drag', 'rejection', 'restoration'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, proxy immediately restores to source and shows rejection status.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 280,
    background: 'dark',

    label: 'Invalid drop return',
  },

}
