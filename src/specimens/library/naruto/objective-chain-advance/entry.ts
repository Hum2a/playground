import type { Specimen } from '../../../types'

export const objectiveChainAdvance: Specimen = {
  id: 'objective-chain-advance',
  ref: 'SPX-2536',
  title: 'Objective Chain Advance',
  blurb:
    'Four mission checkpoints latch complete (200ms) with a 220ms pulse into the next, ending CLEAR.',
  origin: {
    project: 'Original',
    surface: 'Naruto / mission system — objective checkpoint overlays',
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
  tags: ['workflow'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four checkpoints appear complete as CLEAR immediately.',
  },
    acceptance: [
    'Exactly 4 checkpoints; idle starts with OBJ 1 current',
    'Each checkpoint latches complete over 200ms then pulse advances 220ms',
    'Final state CLEAR with all four nodes complete',
    'Replay resets to OBJ 1 current before rerunning',
    'Reduced motion shows CLEAR immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Objective chain advance',
  },
}
