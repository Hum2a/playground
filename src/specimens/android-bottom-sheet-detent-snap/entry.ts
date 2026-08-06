import type { Specimen } from '../types'
export const androidBottomSheetDetentSnap: Specimen = {
  id: 'android-bottom-sheet-detent-snap',
  ref: 'SPX-1675',
  title: 'Bottom Sheet Detent Snap',
  blurb:
    'Draggable sheet with detents at 96, 360, and 640px; velocity bias >0.55 px/ms; scrim 0→0.34; scroll only when expanded.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired standard bottom sheet',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['bottom-sheet', 'gesture', 'detents'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, direct drag remains; release snaps instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 760,
    background: 'dark',

    label: 'Bottom sheet detent snap',
  },

}
