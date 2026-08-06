import type { Specimen } from '../types'
export const teamFormationSnap: Specimen = {
  id: 'team-formation-snap',
  ref: 'SPX-2200',
  title: 'Team Formation Snap',
  blurb:
    'Three scattered profile cards snap into a bottom-row formation with UNIT READY confirmation.',
  origin: {
    project: 'Original',
    surface: 'anime/comic action language study',
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
  tags: ['team', 'formation', 'snap', 'cards'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, cards appear in formation immediately with UNIT READY.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Team formation',
  },

}
