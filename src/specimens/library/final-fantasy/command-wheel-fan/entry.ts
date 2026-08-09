import type { Specimen } from '../../../types'

export const commandWheelFan: Specimen = {
  id: 'command-wheel-fan',
  ref: 'SPX-4340',
  title: 'Command Wheel Fan',
  blurb:
    'Five original battle commands snap outward from a dominant central cursor into a fixed, keyboard-navigable fan.',
  origin: {
    project: 'Original',
    surface: 'Classic JRPG-style battle command interaction',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: { franchise: 'final-fantasy' },
  tags: ['battle-menu', 'fan', 'selection', 'snap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'All five commands render immediately at their fixed fan positions under prefers-reduced-motion or data-force-reduced-motion; focus and activation still work.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    label: 'JRPG command wheel fan',
  },
}
