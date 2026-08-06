import type { Specimen } from '../../../types'
export const tabIndicatorStretch: Specimen = {
  id: 'tab-indicator-stretch',
  ref: 'SPX-1704',
  title: 'Tab Indicator Stretch',
  blurb:
    'Single 34×3px indicator stretches toward next tab centre during first 45% of 300ms travel — width returns to 34px; keyboard arrows switch tabs.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired tab indicator stretch',
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
  tags: ['tabs', 'indicator', 'selection'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, indicator jumps to new centre at fixed 34px width.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 240,
    background: 'dark',

    label: 'Tab indicator stretch',
  },

}
