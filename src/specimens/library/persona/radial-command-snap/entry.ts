import type { Specimen } from '../../../types'
export const radialCommandSnap: Specimen = {
  id: 'radial-command-snap',
  ref: 'SPX-057',
  title: 'Radial command snap',
  blurb:
    'Five commands on a ring snap the whole arrangement so a selected option lands under a fixed pointer, every label staying upright.',
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
  tags: ['radial-menu', 'command', 'selection', 'snap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The orbit snap and hub punch are removed under prefers-reduced-motion or data-force-reduced-motion; selection still updates instantly with only a soft colour transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 300,
    background: 'card',
    label: 'Command wheel',
  },
}
