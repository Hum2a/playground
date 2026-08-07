import type { Specimen } from '../../../types'

export const cloneMergeResult: Specimen = {
  id: 'clone-merge-result',
  ref: 'SPX-2396',
  title: 'Clone Merge Result',
  blurb:
    'Three clone results travel inward by frozen px offsets and reabsorb into one summed output card.',
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
  acceptance: [
    'Clones travel [[72,48],[-72,48],[0,-36]] px inward over 240ms then reabsorb',
    'Motion is translate+scale reabsorption — not opacity fade; output becomes 20',
    'Reduced motion shows merged result immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 360,
    background: 'dark',
    label: 'Clone merge result',
  },
}
