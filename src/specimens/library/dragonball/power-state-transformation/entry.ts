import type { Specimen } from '../../../types'
export const powerStateTransformation: Specimen = {
  id: 'power-state-transformation',
  ref: 'SPX-981',
  title: 'Power State Transformation',
  blurb:
    'Abstract engine upgrade: pressure marks, compression, structural Base→Ascended geometry swap with eight burst rays, then clipped STATE / THROUGHPUT / CHANNELS metrics — no character imagery.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired power-state escalation language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['transformation', 'state-change', 'burst'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Pressure, compression, rays, and field motion are skipped under prefers-reduced-motion or data-force-reduced-motion; Ascended geometry and final metrics appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Power state transformation',
  },

}
