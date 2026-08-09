import type { Specimen } from '../../../types'
export const filterSlash: Specimen = {
  id: 'filter-slash',
  ref: 'SPX-244',
  title: 'Filter slash',
  blurb:
    'Activating a filter sweeps a diagonal blade across the list; non-matching rows are struck through and collapse in a staggered cascade.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
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
  tags: ['filter', 'list', 'strike-through', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The one-shot blade sweep and staggered strike-then-collapse are removed under prefers-reduced-motion or data-force-reduced-motion; rows still filter, just via a plain opacity change with no stagger.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'card',
    label: 'Task list',
  },
}
