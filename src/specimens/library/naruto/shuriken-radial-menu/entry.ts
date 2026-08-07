import type { Specimen } from '../../../types'

export const shurikenRadialMenu: Specimen = {
  id: 'shuriken-radial-menu',
  ref: 'SPX-2415',
  title: 'Shuriken Radial Menu',
  blurb:
    'Four sectors open to 0°/90°/180°/270° at 3.6rem radius (40ms stagger) from a rotating hub — graphic tool palette.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — shuriken & projectile motion',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['menu', 'radial', 'rotation', 'sectors'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four sectors appear open immediately with no rotation.',
  },
  acceptance: [
    'Sectors at 0/90/180/270° and radius 3.6rem',
    '40ms stagger open within 280ms',
    'Reduced motion shows sectors open immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 380,
    background: 'dark',
    label: 'Shuriken radial menu',
  },
}
