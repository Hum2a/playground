import type { Specimen } from '../../../types'
export const activeBottomNavPillTransfer: Specimen = {
  id: 'active-bottom-nav-pill-transfer',
  ref: 'SPX-1691',
  title: 'Active Bottom-Nav Pill Transfer',
  blurb:
    'One 64×32px pill moves between four nav items over 280ms; active icon shifts 2px up; content fade-through 240ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired bottom navigation indicator',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['bottom-nav', 'indicator', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Indicator jumps directly and content swaps instantly under both reduced-motion triggers.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 420,
    background: 'dark',

    label: 'Active bottom-nav pill transfer',
  },

}
