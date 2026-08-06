import type { Specimen } from '../../../types'

export const cloneFailurePop: Specimen = {
  id: 'clone-failure-pop',
  ref: 'SPX-2397',
  title: 'Clone Failure Pop',
  blurb:
    'One of three parallel worker clones pops and collapses mid-run while the remaining clones continue to completion.',
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
  tags: ['failure', 'clone', 'resilience'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the failed worker and the two completed workers appear in their final states immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 340,
    background: 'dark',
    label: 'Clone failure pop',
  },
}
