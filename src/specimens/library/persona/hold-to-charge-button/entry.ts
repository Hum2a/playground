import type { Specimen } from '../../../types'
export const holdToChargeButton: Specimen = {
  id: 'hold-to-charge-button',
  ref: 'SPX-024',
  title: 'Hold-to-Charge Button',
  blurb:
    'Press-and-hold confirmation where an irregular red graphic mass consumes the button over 1400ms — early release cancels.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired aggressive graphic charge language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['confirmation', 'hold', 'progress'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Continuous jagged sweep is replaced by stepped 0/25/50/75/100 fills and HOLDING N% labels under prefers-reduced-motion or data-force-reduced-motion; the 1400ms hold threshold remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 260,
    background: 'dark',

    label: 'Hold-to-charge confirmation',
  },

}
