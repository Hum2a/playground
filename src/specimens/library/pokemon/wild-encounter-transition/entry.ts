import type { Specimen } from '../../../types'
export const wildEncounterTransition: Specimen = {
  id: 'wild-encounter-transition',
  ref: 'SPX-700',
  title: 'Wild Encounter Transition',
  blurb:
    'Abrupt encounter interruption: a single jolt, seven opposing horizontal bands, a growing central plate with an abstract CSS entity, then full destination takeover — no crossfade.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired wild encounter interruption language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['interruption', 'arrival', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Disturbance and travelling bands are skipped under prefers-reduced-motion or data-force-reduced-motion; the destination encounter state appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Wild encounter transition',
  },

}
