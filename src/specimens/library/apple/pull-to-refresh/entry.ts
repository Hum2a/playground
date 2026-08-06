import type { Specimen } from '../types'
export const pullToRefresh: Specimen = {
  id: 'pull-to-refresh',
  ref: 'SPX-1518',
  title: 'Pull To Refresh',
  blurb:
    'Eight-row feed with resisted pull to 72px threshold, two RELEASE ticks, 620ms refresh with one arc rotation, timestamp 12:42:18→12:43:02.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired pull-to-refresh threshold',
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
  tags: ['scroll', 'threshold', 'refresh'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, keep threshold interaction with static working indicator and direct completion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 480,
    background: 'dark',

    label: 'Pull to refresh',
  },

}
