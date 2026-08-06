import type { Specimen } from '../types'
export const evolutionSilhouetteTransformation: Specimen = {
  id: 'evolution-silhouette-transformation',
  ref: 'SPX-724',
  title: 'Evolution Silhouette Transformation',
  blurb:
    'An abstract Form A charges, then decisively alternates with a related Form B on a timing curve that hands the new identity progressively more time until Form B locks permanently — no crossfade.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired evolution identity transformation language',
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
  tags: ['transformation', 'evolution', 'identity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, Form B with FORM // 02 / ADVANCED appears immediately with no charge, alternation, rings, or mark rotation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 380,
    background: 'dark',

    label: 'Evolution silhouette transformation',
  },

}
