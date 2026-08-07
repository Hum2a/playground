import type { Specimen } from '../../../types'

export const cloneFailurePop: Specimen = {
  id: 'clone-failure-pop',
  ref: 'SPX-2397',
  title: 'Clone Failure Pop',
  blurb:
    'One of three workers pops mid-run, leaves five residue fragments that clear, while the survivors finish.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the failed worker is already cleared and the two completed workers appear immediately.',
  },
  acceptance: [
    'Worker 2 fails at 150ms with a 140ms pop; 5 residue fragments hold 200ms then clear in 180ms',
    'Survivors remain DONE; residue is scale fragments — not opacity fade as primary',
    'Reduced motion shows final cleared/complete states',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 340,
    background: 'dark',
    label: 'Clone failure pop',
  },
}
