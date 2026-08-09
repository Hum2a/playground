import type { Specimen } from '../../../types'

export const submitBlackout: Specimen = {
  id: 'submit-blackout',
  ref: 'SPX-152',
  title: 'Submit Blackout',
  blurb:
    'Submit compresses, a #09111D overlay expands from the button centre, and the form becomes geometric silhouettes under PROCESSING.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired editorial submit blackout',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['loading', 'confirmation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Processing state appears instantly and restores after the same 900ms hold under prefers-reduced-motion or data-force-reduced-motion; overlay does not expand.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 420,
    background: 'dark',
    label: 'Submit blackout form',
  },
}
