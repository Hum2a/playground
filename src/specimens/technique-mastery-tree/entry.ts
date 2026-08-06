import type { Specimen } from '../types'

export const techniqueMasteryTree: Specimen = {
  id: 'technique-mastery-tree',
  ref: 'SPX-2767',
  title: 'Technique Mastery Tree',
  blurb:
    'Four skill nodes unlock one-by-one along a branching path as a technique is mastered, filling the connecting path as it goes.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, all four nodes appear already unlocked as MASTERED.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Technique mastery tree',
  },
}
