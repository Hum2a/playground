import type { Specimen } from '../../../types'

export const cloneMergeResult: Specimen = {
  id: 'clone-merge-result',
  ref: 'SPX-2396',
  title: 'Clone Merge Result',
  blurb:
    'Three clone results reabsorb inward by frozen travel px (72/48, −72/48, 0/−28) into one merged output of 20.',
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
  tags: ['merge', 'reabsorption', 'clone', 'travel'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the three clone results are already merged into output 20.',
  },
  acceptance: [
    'Clones travel inward by frozen px then scale to 0 at merge',
    'Output expands to mergedValue 20',
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
