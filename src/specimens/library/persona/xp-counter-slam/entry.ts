import type { Specimen } from '../../../types'
export const xpCounterSlam: Specimen = {
  id: 'xp-counter-slam',
  ref: 'SPX-157',
  title: 'XP counter slam',
  blurb:
    'A "+240" delta chip flies in on a dipped arc and slams into the total, punching the old value out and the new one in.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['counter', 'value-change', 'slam', 'progression'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The delta travel and old/new punch swap are skipped under prefers-reduced-motion or data-force-reduced-motion; the new total appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 180,
    background: 'card',
    label: 'Experience total',
  },
}
