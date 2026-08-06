import type { Specimen } from '../../../types'
export const versusCardCollision: Specimen = {
  id: 'versus-card-collision',
  ref: 'SPX-2037',
  title: 'Versus Card Collision',
  blurb:
    'Two competitor cards rush from opposite edges, collide at centre with impact flash, and lock in a tilted VS matchup.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired tournament matchup UI (abstract)',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['versus', 'collision', 'tournament'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, cards appear in final clashed positions immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Versus card collision',
  },

}
