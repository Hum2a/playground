import type { Specimen } from '../types'
export const moveLearned: Specimen = {
  id: 'move-learned',
  ref: 'SPX-815',
  title: 'Move Learned',
  blurb:
    'PROCESS // 04 learns SYNC: the token travels into the empty capability slot, the incomplete outline closes, a lock sweep settles it, and the slot matches SCAN / FILTER / EXPORT.',
  origin: {
    project: 'Original',
    surface: 'Pokemon-inspired move learn / capability unlock',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['capability', 'unlock', 'slot'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four capabilities including SYNC appear immediately — no travel or lock sweep.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'card',

    label: 'Capability slot install (demo)',
  },


}
