import type { Specimen } from '../../../types'
export const isolatedTimeFreeze: Specimen = {
  id: 'isolated-time-freeze',
  ref: 'SPX-1158',
  title: 'Isolated Time Freeze',
  blurb:
    'FREEZE suspends A // INDEX, B // SYNC and D // CLEANUP in place while C // EXPORT alone advances 42%→100% inside a thin boundary field with an opening at C — then time resumes from the frozen offsets.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired time-freeze isolation language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['focus', 'pause', 'isolation', 'priority'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, C is COMPLETE and A/B/D are READY immediately with no looping indicators.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 380,
    background: 'dark',

    label: 'Isolated time freeze',
  },

}
