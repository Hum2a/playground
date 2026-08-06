import type { Specimen } from '../types'
export const dualActivitySplit: Specimen = {
  id: 'dual-activity-split',
  ref: 'SPX-1328',
  title: 'Dual Activity Split',
  blurb:
    'A 196×40 upload capsule splits into 126+12+58 zones over 320ms when a timer task arrives; bridge connects for 90ms then separates.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired dual concurrent live-status split',
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
  tags: ['split', 'live-activity', 'concurrency'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediately switches between single and dual layouts; timer value stays static.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 280,
    height: 220,
    background: 'dark',

    label: 'Dual activity split',
  },

}
