import type { Specimen } from '../types'
export const stageManagerStackShift: Specimen = {
  id: 'stage-manager-stack-shift',
  ref: 'SPX-1353',
  title: 'Stage Manager Stack Shift',
  blurb:
    'BUILD foreground (two windows) swaps with staged RESEARCH (three mini silhouettes) over 480ms; scale 1↔0.72 with ±190px travel; z-order transfers at 52%.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired Stage Manager workspace swap',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['workspace', 'stage', 'depth'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, group layouts swap instantly without large travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 400,
    background: 'dark',

    label: 'Stage Manager stack shift',
  },

}
