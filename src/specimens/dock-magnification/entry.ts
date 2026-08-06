import type { Specimen } from '../types'
export const dockMagnification: Specimen = {
  id: 'dock-magnification',
  ref: 'SPX-1338',
  title: 'Dock Magnification',
  blurb:
    'Nine abstract dock tiles magnify under pointer proximity via a Gaussian curve (max 1.65); neighbours redistribute horizontally and settle to baseline over 240ms when the pointer leaves.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired dock proximity magnification',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['dock', 'magnification', 'pointer'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, proximity scaling is disabled; hover/focus outline remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 500,
    height: 140,
    background: 'dark',

    label: 'Dock magnification',
  },

}
