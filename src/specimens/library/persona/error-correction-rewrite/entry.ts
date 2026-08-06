import type { Specimen } from '../../../types'
export const errorCorrectionRewrite: Specimen = {
  id: 'error-correction-rewrite',
  ref: 'SPX-313',
  title: 'Error Correction Rewrite',
  blurb:
    'Localised typo correction: only gmial is underlined, marked WRONG, struck, and replaced with gmail while humza@ and .com stay put — demo validation choreography.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 editorial / collage validation language',
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
  tags: ['clip-path', 'slam'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Underline, WRONG badge, strike, and travel are skipped under prefers-reduced-motion or data-force-reduced-motion; the corrected email and CORRECTED label appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 260,
    background: 'dark',

    label: 'Email field (demo)',
  },

}
