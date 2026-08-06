import type { Specimen } from '../../../types'
export const failureShatter: Specimen = {
  id: 'failure-shatter',
  ref: 'SPX-318',
  title: 'Failure Shatter',
  blurb:
    'Export appears to succeed, then a red strike fractures the SUCCESS panel into four pieces before FAILED and ERROR // 042 take over.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['error', 'failure', 'impact'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Processing, false SUCCESS, strike, and fracture are skipped under prefers-reduced-motion or data-force-reduced-motion; the specimen jumps straight to FAILED + ERROR // 042 + TRY AGAIN.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Failure shatter export',
  },

}
