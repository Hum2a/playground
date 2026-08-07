import type { Specimen } from '../../../types'

export const cloneFailurePop: Specimen = {
  id: 'clone-failure-pop',
  ref: 'SPX-2397',
  title: 'Clone Failure Pop',
  blurb:
    'Worker 2 pops at 150ms (160ms burst), leaves 5 ash residue dots for 220ms, then clears — survivors finish at 320ms.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, final failed/complete states appear with residue already cleared.',
  },
  acceptance: [
    'Failed clone pops (160ms) leaving 5 residue dots, then clears (180ms)',
    'Survivors finish; pop/residue timings frozen in contract',
    'Reduced motion shows final failed/complete states',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 340,
    background: 'dark',
    label: 'Clone failure pop',
  },
}
