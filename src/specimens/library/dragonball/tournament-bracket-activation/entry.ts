import type { Specimen } from '../../../types'
export const tournamentBracketActivation: Specimen = {
  id: 'tournament-bracket-activation',
  ref: 'SPX-1141',
  title: 'Tournament Bracket Activation',
  blurb:
    'MODEL ARENA // 08 wakes from dormant structure: eight seeds activate in pairs, eight first-stage paths construct into four quarter-final junctions, and the bracket settles READY — activation only, no winners.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired tournament bracket activation language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['tournament', 'comparison', 'bracket', 'activation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the fully activated quarter-final bracket appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 520,
    height: 440,
    background: 'dark',

    label: 'Tournament bracket activation',
  },

}
