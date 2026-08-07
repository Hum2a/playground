import type { Specimen } from '../../../types'

export const techniqueMasteryTree: Specimen = {
  id: 'technique-mastery-tree',
  ref: 'SPX-2767',
  title: 'Technique Mastery Tree',
  blurb:
    'Four technique nodes unlock in order (n1→n4) while edges draw between them into MASTERED.',
  origin: {
    project: 'Original',
    surface: 'Naruto / mentor-training-progression — skill tree',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['mastery', 'skill-tree', 'progression'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four nodes and edges appear mastered immediately.',
  },
    acceptance: [
    'Exactly 4 nodes unlock in order n1→n4 with 150ms steps',
    'Each unlock draws the preceding edge (scaleX 0→1) before the next node',
    'Resolved shows MASTERED with all nodes and edges filled',
    'Replay locks all nodes/edges before rerunning',
    'Reduced motion shows MASTERED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Technique mastery tree',
  },
}
