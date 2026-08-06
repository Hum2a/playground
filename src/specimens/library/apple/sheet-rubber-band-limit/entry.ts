import type { Specimen } from '../types'
export const sheetRubberBandLimit: Specimen = {
  id: 'sheet-rubber-band-limit',
  ref: 'SPX-1315',
  title: 'Sheet Rubber-Band Limit',
  blurb:
    'TASK DETAILS sheet at 520px expanded detent resists upward overshoot with exponential formula, two limit ticks at 32px, and 360ms settle.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired sheet overscroll resistance',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['sheet', 'rubber-band', 'overscroll'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, upward overshoot capped at 8px with immediate snap back.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 600,
    background: 'dark',

    label: 'Sheet rubber-band limit',
  },

}
