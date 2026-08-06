import type { Specimen } from '../types'
export const postBurstRecovery: Specimen = {
  id: 'post-burst-recovery',
  ref: 'SPX-1212',
  title: 'Post-Burst Recovery',
  blurb:
    'After a successful boost, a compressed worker recovers capacity along a frozen ladder while TASK COMPLETE stays visible — READY only when recovery hits 100%.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired post-burst / Kaioken-style cooldown recovery (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['cooldown', 'recovery', 'resource'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Recovery ladder is skipped; READY baseline with load 42% and capacity 100% appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 440,
    background: 'dark',

    label: 'Post-burst recovery demo',
  },

}
