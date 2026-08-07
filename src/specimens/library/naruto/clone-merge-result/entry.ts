import type { Specimen } from '../../../types'

export const cloneMergeResult: Specimen = {
  id: 'clone-merge-result',
  ref: 'SPX-2396',
  title: 'Clone Merge Result',
  blurb:
    'Three clone results travel inward by frozen offsets (72/48, −72/48, 0/−52), scale-collapse into one output (20), and leave their identity marks behind.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — clone & duplication systems',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['merge', 'convergence', 'clone'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the merged output appears immediately with inherited marks.',
  },
  acceptance: [
    'Clones travel inward by frozen px then scale-collapse into one result',
    'Output shows 20 and inherits peak/ring/bars marks',
    'Reduced motion shows MERGED result immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 360,
    background: 'dark',
    label: 'Clone merge result',
  },
}
