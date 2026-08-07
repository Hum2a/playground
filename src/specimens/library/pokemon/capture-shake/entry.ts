import type { Specimen } from '../../../types'
export const captureShake: Specimen = {
  id: 'capture-shake',
  ref: 'SPX-710',
  title: 'Capture Shake',
  blurb:
    'An abstract entity drops into an original circular capture device; three discrete resolution shakes with pauses resolve to CAPTURED and three star polygons.',
  origin: {
    project: 'Original',
    surface: 'Pokémon capture–inspired uncertain confirmation (generic geometry)',
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
  tags: ['confirmation', 'uncertainty', 'capture'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Enter, shakes, and flash are skipped; closed device, three static stars, and CAPTURED appear immediately under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Capture shake demo',
  },

}
