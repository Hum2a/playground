import type { Specimen } from '../../../types'

export const moonPhasePagination: Specimen = {
  id: 'moon-phase-pagination',
  ref: 'SPX-463',
  title: 'Moon Phase Pagination',
  blurb:
    'Eight geometric moon markers paginate PHASE 01–08; the active moon grows a 2px orbit while the previous shrinks.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired lunar pagination',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['lunar', 'pagination', 'phase'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Active marker and PHASE label snap immediately under prefers-reduced-motion or data-force-reduced-motion; no scale or orbit animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 300,
    background: 'dark',
    label: 'Moon phase pagination',
  },
}
