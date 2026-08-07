import type { Specimen } from '../../../types'

export const techniqueMasteryTree: Specimen = {
  id: 'technique-mastery-tree',
  ref: 'SPX-2767',
  title: 'Technique Mastery Tree',
  blurb:
    'Four technique nodes unlock in order (150ms steps) with connecting path draw until MASTERED.',
  origin: {
    project: 'Original',
    surface: 'Naruto / mentor training — technique mastery path',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ["mastery","progression","tree"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Technique Mastery Tree state appears immediately.',
  },
  acceptance: [
    'Nodes unlock in order [0,1,2,3] at stepMs 150 with edge/path fill between',
    'Status becomes MASTERED only after node 4 + settleMs 100',
    'Replay locks all nodes and clears paths before rerunning',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Technique Mastery Tree',
  },
}
