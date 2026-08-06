import type { Specimen } from '../../../types'
export const temporalUndo: Specimen = {
  id: 'temporal-undo',
  ref: 'SPX-1160',
  title: 'Temporal Undo',
  blurb:
    'UNDO rewinds a deleted RECORD // 028: timeline NOW→−3, the erasure boundary travels top-left→bottom-right, twelve fragments return, and the record locks ACTIVE.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired Whis rewind / temporal undo (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['undo', 'rewind', 'restoration'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, UNDO immediately restores Record 028 and shows STATE RESTORED.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 380,
    background: 'dark',

    label: 'Temporal undo demo',
  },

}
