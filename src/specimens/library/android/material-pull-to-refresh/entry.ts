import type { Specimen } from '../../../types'
export const materialPullToRefresh: Specimen = {
  id: 'material-pull-to-refresh',
  ref: 'SPX-1750',
  title: 'Material Pull-to-Refresh',
  blurb:
    'Resisted pull at scrollTop 0 with 270° arc to 120°; threshold 72px; 900ms load prepends one deterministic row.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired pull-to-refresh gesture',
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
  tags: ['pull-to-refresh', 'gesture', 'scroll'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Threshold and static arc preserved; no spinning under both reduced-motion triggers.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 540,
    background: 'dark',

    label: 'Material pull-to-refresh',
  },

}
