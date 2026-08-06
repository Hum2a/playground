import type { Specimen } from '../../../types'
export const handoffContinuation: Specimen = {
  id: 'handoff-continuation',
  ref: 'SPX-1493',
  title: 'Handoff Continuation',
  blurb:
    'EDIT // REPORT at 68% handoffs from DESKTOP to TABLET across six bridge segments; ownership flips at midpoint; TABLET continues to 74%.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired cross-device handoff',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['handoff', 'cross-device', 'continuity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediately move task ownership to TABLET at 68%, then show 74%.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 280,
    background: 'dark',

    label: 'Handoff continuation',
  },

}
