import type { Specimen } from '../../../types'

export const objectiveChainAdvance: Specimen = {
  id: 'objective-chain-advance',
  ref: 'SPX-2536',
  title: 'Objective Chain Advance',
  blurb:
    'Four mission checkpoints latch in order (200ms each) with a 220ms pulse to the next, then settle on CLEAR.',
  origin: {
    project: 'Original',
    surface: 'Naruto / mission system — objective chain',
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
  tags: ["workflow","checkpoint","chain"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all checkpoints appear latched as CLEAR immediately.',
  },
    acceptance: [
    'Four checkpoints latch in order with completeMs 200 then pulseMs 220 to the next',
    'Final latch settles to CLEAR after settleMs 100',
    'Pulse travels along the link by left position (not opacity-only)',
    'Replay restores pending chain before rerunning',
    'Reduced motion shows CLEAR with all checkpoints complete immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Objective Chain Advance',
  },
}
