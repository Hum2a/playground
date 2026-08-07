import type { Specimen } from '../../../types'

export const parallelWorkerClones: Specimen = {
  id: 'parallel-worker-clones',
  ref: 'SPX-2394',
  title: 'Parallel Worker Clones',
  blurb:
    'One job card visibly divides into three deterministic worker clones with independent progress, then recombines into a completed job.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, all three worker bars fill and recombine immediately.',
  },
  acceptance: [
    'Parallel bars fill then recombine inheriting worker marks',
    'Progress commits are discrete and frozen',
    'Reduced motion shows completed merge immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 340,
    background: 'dark',
    label: 'Parallel worker clones',
  },
}
