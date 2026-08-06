import type { Specimen } from '../types'
export const winnerBannerBreakthrough: Specimen = {
  id: 'winner-banner-breakthrough',
  ref: 'SPX-2041',
  title: 'Winner Banner Breakthrough',
  blurb:
    'After final scores settle, a WINNER banner slams through the scoreboard panel on declaration.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired tournament result reveal',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['tournament', 'banner', 'reveal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Banner appears immediately without slide breakthrough.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Winner banner breakthrough',
  },
  integration: [
    'DECLARE WINNER triggers runWinnerBannerBreakthrough; clip to board overflow.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Banner breaks through scoreboard to WINNER — TEAM A',
    'RESET hides banner and restores idle',
    'Reduced motion shows banner immediately',
  ],
}
