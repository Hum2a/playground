import type { Specimen } from '../../../types'

export const parallelWorkerClones: Specimen = {
  id: 'parallel-worker-clones',
  ref: 'SPX-2394',
  title: 'Parallel Worker Clones',
  blurb:
    'A job splits into three identity-marked workers (◆▲■) that fill in parallel, then recombine — the job inherits every mark.',
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
  tags: ['clone', 'parallelism', 'progress'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all three worker bars fill and recombine with inherited marks immediately.',
  },
  acceptance: [
    'Workers ◆▲■ fill over frozen 300/240/360ms then recombine',
    'Job inherits all three identity marks on RECOMBINED',
    'Reduced motion shows completed merge with marks immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 340,
    background: 'dark',
    label: 'Parallel worker clones',
  },
}
