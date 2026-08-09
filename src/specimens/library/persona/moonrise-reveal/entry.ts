import type { Specimen } from '../../../types'

export const moonriseReveal: Specimen = {
  id: 'moonrise-reveal',
  ref: 'SPX-458',
  title: 'Moonrise Reveal',
  blurb:
    'A large geometric moon rises once from below a dark horizon, brightening its cyan rim as NIGHT PHASE settles underneath.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired cinematic moonrise reveal',
  },
  facets: {
    kind: 'transition',
    tech: 'css-only',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['lunar', 'reveal', 'horizon'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Final risen moon, horizon, stars, and NIGHT PHASE label appear immediately under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 400,
    background: 'dark',
    label: 'Moonrise reveal',
  },
}
