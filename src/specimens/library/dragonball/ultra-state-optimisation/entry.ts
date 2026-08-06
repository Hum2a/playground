import type { Specimen } from '../../../types'
export const ultraStateOptimisation: Specimen = {
  id: 'ultra-state-optimisation',
  ref: 'SPX-992',
  title: 'Ultra State Optimisation',
  blurb:
    'A noisy runtime pauses, sheds wasted motion and overhead, and settles into a calmer high-performance ULTRA state — same useful work, less noise.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired calm high-performance optimisation language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['optimisation', 'transformation', 'performance'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Initial loops are suppressed under prefers-reduced-motion or data-force-reduced-motion; OPTIMISE immediately shows the final ULTRA state with no travel choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Runtime optimisation stage',
  },

}
