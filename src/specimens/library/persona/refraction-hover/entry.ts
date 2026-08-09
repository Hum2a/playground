import type { Specimen } from '../../../types'

export const refractionHover: Specimen = {
  id: 'refraction-hover',
  ref: 'SPX-432',
  title: 'Refraction Hover',
  blurb:
    'A compact glass dossier card that splits its light bands through pseudo-elements on hover or keyboard focus, then settles back into a single readable surface.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired dossier interaction',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['glass', 'refraction', 'hover'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Hover and focus retain the refracted final state but switch instantly under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 280,
    background: 'dark',
    label: 'Refraction hover card',
  },
}
