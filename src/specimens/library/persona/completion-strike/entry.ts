import type { Specimen } from '../../../types'
export const completionStrike: Specimen = {
  id: 'completion-strike',
  ref: 'SPX-330',
  title: 'Completion strike',
  blurb:
    'Marking a task complete fires a decisive graphic strike, then the row recomposes into a compact COMPLETE state without deleting the item.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired task-completion graphic language',
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
  tags: ['completion', 'task'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Strikes and mark construction are skipped; the compact completed row appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 280,
    background: 'dark',

    label: 'Task completion',
  },

}
