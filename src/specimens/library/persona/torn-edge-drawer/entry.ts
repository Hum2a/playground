import type { Specimen } from '../../../types'
export const tornEdgeDrawer: Specimen = {
  id: 'torn-edge-drawer',
  ref: 'SPX-017',
  title: 'Torn Edge Drawer',
  blurb:
    'Irregular torn-paper side drawer that drags a printed panel in from the right with an offset black backing silhouette.',
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
  tags: ['disclosure', 'drawer', 'clip-path', 'paper'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Drawer switches instantly between closed and open under prefers-reduced-motion or data-force-reduced-motion; no content stagger; static torn edge remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Project archive',
  },

}
