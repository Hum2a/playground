import type { Specimen } from '../../../types'

export const objectiveChainAdvance: Specimen = {
  id: 'objective-chain-advance',
  ref: 'SPX-2536',
  title: 'Objective Chain Advance',
  blurb:
    'Four objective checkpoints latch in sequence (200ms complete + 220ms pulse) until MISSION CLEAR.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Objective Chain Advance state appears immediately.',
  },
  acceptance: [
    'Exactly 4 checkpoints latch with completeMs 200 between nodes',
    'Inter-node pulse runs pulseMs 220 before next checkpoint activates',
    'Status becomes MISSION CLEAR only after last checkpoint + settleMs 100',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Objective Chain Advance',
  },
}
