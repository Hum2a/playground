import type { Specimen } from '../types'
export const menuBarActiveTransfer: Specimen = {
  id: 'menu-bar-active-transfer',
  ref: 'SPX-1470',
  title: 'Menu Bar Active Transfer',
  blurb:
    'FILE menu opens at 190px width; pointer transfer to EDIT/VIEW slides surface 120ms, adjusts height 100ms; FILE 5, EDIT 6, VIEW 4 rows; 220ms grace.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired menu ownership transfer',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['menu', 'hover-ownership', 'transfer'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, menu transfers instantly between anchors.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 280,
    background: 'dark',

    label: 'Menu bar active transfer',
  },

}
