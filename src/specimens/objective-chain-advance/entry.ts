import type { Specimen } from '../types'

export const objectiveChainAdvance: Specimen = {
  id: 'objective-chain-advance',
  ref: 'SPX-2536',
  title: 'Objective Chain Advance',
  blurb:
    'Each completed objective in a four-step chain sends a pulse down the connecting line to activate the next checkpoint.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, all four checkpoints appear complete immediately as MISSION CLEAR.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Objective chain advance',
  },
}
