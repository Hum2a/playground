import type { Specimen } from '../../../types'

export const parallelWorkerClones: Specimen = {
  id: 'parallel-worker-clones',
  ref: 'SPX-2394',
  title: 'Parallel Worker Clones',
  blurb:
    'A job puffs out three marked clones (peak / ring / bars) with bars at 300/240/360ms, then reabsorbs them — the job inherits all three identity marks.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the completed job appears immediately with all three inherited marks.',
  },
  acceptance: [
    'Workers spawn via scale/translate with marks peak/ring/bars — not opacity fade',
    'Bars fill 300/240/360ms then recombine; job inherits three trait marks',
    'Reduced motion shows RECOMBINED job with traits immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 360,
    background: 'dark',
    label: 'Parallel worker clones',
  },
}
