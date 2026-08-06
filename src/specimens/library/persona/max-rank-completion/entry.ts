import type { Specimen } from '../types'
export const maxRankCompletion: Specimen = {
  id: 'max-rank-completion',
  ref: 'SPX-550',
  title: 'Max Rank Completion',
  blurb:
    'Terminal Social Link state: energy converges from YOU and ALLY, 09 rolls to 10, a luminous diamond circuit closes, and MAX locks the completed bond — static, no aura.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Social Link max-rank completion language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['relationship', 'rank-up', 'completion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, Rank 10 with the completed circuit, outline, and MAX appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Max rank social link completion',
  },

}
