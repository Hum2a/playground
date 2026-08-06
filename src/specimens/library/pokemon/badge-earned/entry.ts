import type { Specimen } from '../types'
export const badgeEarned: Specimen = {
  id: 'badge-earned',
  ref: 'SPX-843',
  title: 'Badge Earned',
  blurb:
    'A ghosted VECTOR TRIAL outline assembles from six deterministic polygons into a permanent achievement; status flips to EARNED only after lock.',
  origin: {
    project: 'Original',
    surface: 'Pokémon gym-badge–inspired achievement assembly (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['achievement', 'completion', 'assembly'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the completed badge and EARNED status appear immediately with no piece travel, lock, or rays.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 360,
    background: 'dark',

    label: 'Badge earned',
  },


}
