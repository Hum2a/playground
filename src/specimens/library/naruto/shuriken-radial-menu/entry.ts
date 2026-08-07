import type { Specimen } from '../../../types'

export const shurikenRadialMenu: Specimen = {
  id: 'shuriken-radial-menu',
  ref: 'SPX-2415',
  title: 'Shuriken Radial Menu',
  blurb:
    'An abstract four-point shuriken glyph rotates open into four radial action sectors, then folds back closed.',
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
  tags: ['menu', 'radial', 'rotation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four sectors appear open immediately with no rotation.',
  },
  acceptance: [
    'Sectors open to frozen angles and radii',
    'No continuous rotation under reduced motion',
    'Selection commits one sector',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 380,
    background: 'dark',
    label: 'Shuriken radial menu',
  },
}
