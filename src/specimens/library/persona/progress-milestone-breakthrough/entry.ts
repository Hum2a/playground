import type { Specimen } from '../../../types'
export const progressMilestoneBreakthrough: Specimen = {
  id: 'progress-milestone-breakthrough',
  ref: 'SPX-167',
  title: 'Progress Milestone Breakthrough',
  blurb:
    'Progress fill advances quietly, then collides with a 60% barrier, resists, and breaks through — with a decorative overshoot that never changes the logical value.',
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
  tags: ['progress', 'milestone', 'threshold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediately shows 60% with static MILESTONE — 60% COMPLETE under prefers-reduced-motion or data-force-reduced-motion; no collision or breakthrough choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 340,
    background: 'dark',

    label: 'Sync progress',
  },

}
