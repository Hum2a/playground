import type { Specimen } from '../../../types'
export const bottomSheetDetentSnap: Specimen = {
  id: 'bottom-sheet-detent-snap',
  ref: 'SPX-1314',
  title: 'Bottom Sheet Detent Snap',
  blurb:
    'ROUTE DETAILS sheet snaps between collapsed 112px, medium 318px, and expanded 520px visible heights with velocity override and ≤8px spring overshoot.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired bottom sheet detents',
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
  tags: ['sheet', 'drag', 'spring'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Direct drag preserved; release snaps 160ms without overshoot; forced RM immediate.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 600,
    background: 'dark',

    label: 'Bottom sheet detent snap',
  },

}
