import type { Specimen } from '../types'
export const navigationDrawerEdgePull: Specimen = {
  id: 'navigation-drawer-edge-pull',
  ref: 'SPX-1683',
  title: 'Navigation Drawer Edge Pull',
  blurb:
    '304px left drawer acquired from 24px edge zone; app shifts 24px, scrim 0.32; opens at 46% progress or >0.5 px/ms velocity.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired navigation drawer gesture',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['drawer', 'gesture', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Direct drag preserved; release snaps instantly under both reduced-motion triggers.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 700,
    background: 'dark',

    label: 'Navigation drawer edge pull',
  },

}
