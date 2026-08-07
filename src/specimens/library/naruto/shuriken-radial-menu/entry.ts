import type { Specimen } from '../../../types'

export const shurikenRadialMenu: Specimen = {
  id: 'shuriken-radial-menu',
  ref: 'SPX-2415',
  title: 'Shuriken Radial Menu',
  blurb:
    'A four-point hub opens into CUT/BIND/SEAL/TRACK tool sectors at 0/90/180/270° on a 3.6rem radius in 280ms — tool palette, not a spinning fan HUD.',
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
  tags: ['menu', 'radial', 'tools'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four tool sectors appear open immediately with no rotation.',
  },
  acceptance: [
    '4 tools at 0/90/180/270° open to 3.6rem radius in 280ms',
    'Selecting a sector commits that tool label',
    'Reduced motion shows open sectors immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 380,
    background: 'dark',
    label: 'Shuriken radial menu',
  },
}
