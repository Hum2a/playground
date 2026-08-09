import type { Specimen } from '../../../types'
export const confidantRankUp: Specimen = {
  id: 'confidant-rank-up',
  ref: 'SPX-156',
  title: 'Confidant rank up',
  blurb:
    'Bond card takes a flash hit, ring burst, and number swap while a RANK UP banner slams in then shrinks into a permanent corner tag.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['progression', 'rank-up', 'slam', 'milestone'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The flash, ring burst, number-swap, and banner slam are skipped under prefers-reduced-motion or data-force-reduced-motion; the new rank number and the corner-tag banner appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 320,
    background: 'card',
    label: 'Bond card',
  },
}
