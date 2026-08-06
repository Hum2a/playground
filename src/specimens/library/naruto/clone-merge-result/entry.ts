import type { Specimen } from '../../../types'

export const cloneMergeResult: Specimen = {
  id: 'clone-merge-result',
  ref: 'SPX-2396',
  title: 'Clone Merge Result',
  blurb:
    'Three parallel clone result cards converge toward the centre and combine into a single output card.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the three clone results are already merged into the output card.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 360,
    background: 'dark',
    label: 'Clone merge result',
  },
}
