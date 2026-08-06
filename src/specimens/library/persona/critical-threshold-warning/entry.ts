import type { Specimen } from '../types'
export const criticalThresholdWarning: Specimen = {
  id: 'critical-threshold-warning',
  ref: 'SPX-025',
  title: 'Critical Threshold Warning',
  blurb:
    'System load climbs past a 90% limit: the marker tenses, clamps trap the threshold, fill turns red, and CRITICAL locks in — restrictive, not celebratory.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['threshold', 'warning', 'metric'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediately shows 94% critical with static clamps and CRITICAL / 94% LOAD under prefers-reduced-motion or data-force-reduced-motion; no approach or clamp travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 340,
    background: 'dark',

    label: 'System load meter',
  },

}
