import type { Specimen } from '../../../types'

export const techniqueMasteryTree: Specimen = {
  id: 'technique-mastery-tree',
  ref: 'SPX-2767',
  title: 'Technique Mastery Tree',
  blurb:
    'A sealed technique scroll unlocks ROOT→FORM→FLOW→PEAK with edge-draw cascade (140ms / 160ms) into MASTERED.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, all four named nodes and edges appear MASTERED immediately.',
  },
    acceptance: [
    'Nodes unlock in frozen order ROOT→FORM→FLOW→PEAK (data-id)',
    'Each unlock snaps with nodeMs 140; edges draw with edgeMs 160 via scaleX',
    'Resolved shows MASTERED with all edges filled',
    'Keys 1–4 unlock only in order; replay clears before rerun',
    'Reduced motion shows MASTERED immediately with no snap/draw',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Technique Mastery Tree',
  },
}
