import type { Specimen } from '../types'
export const dayChangeTear: Specimen = {
  id: 'day-change-tear',
  ref: 'SPX-304',
  title: 'Day Change Tear',
  blurb:
    'Calendar sheet tears from the upper centre into two irregular halves that pull away, revealing the next date that was already underneath.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['value-change', 'temporal', 'paper', 'tear', 'calendar'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Date swaps immediately under prefers-reduced-motion or data-force-reduced-motion; no tear, fragments, or insertion motion. Static paper calendar remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 420,
    background: 'dark',

    label: 'Calendar day',
  },

}
