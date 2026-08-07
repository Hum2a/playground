import type { Specimen } from '../../../types'

export const shurikenRadialMenu: Specimen = {
  id: 'shuriken-radial-menu',
  ref: 'SPX-2415',
  title: 'Shuriken Radial Menu',
  blurb:
    'A four-point hub opens into N/E/S/W sectors at 3.6rem radius in 260ms — tool palette radial, not a spinning fan HUD.',
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
    '4 sectors at 0/90/180/270° open to 3.6rem radius in 260ms',
    'Selecting a sector commits that label',
    'Reduced motion shows open sectors immediately (no spin)',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 380,
    background: 'dark',
    label: 'Shuriken radial menu',
  },
}
