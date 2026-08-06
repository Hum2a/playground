import type { Specimen } from '../../../types'
export const evolutionComplete: Specimen = {
  id: 'evolution-complete',
  ref: 'SPX-726',
  title: 'Evolution Complete',
  blurb:
    'Form 02 is already present but unregistered — it settles, a ring contracts with four cardinal locks, then a hard sweep makes the identity CANONICAL while PREVIOUS // FORM 01 archives.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired evolution completion / registration language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['completion', 'transformation', 'identity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, CANONICAL Form 02 with archived previous marker appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 380,
    background: 'dark',

    label: 'Evolution complete',
  },

}
