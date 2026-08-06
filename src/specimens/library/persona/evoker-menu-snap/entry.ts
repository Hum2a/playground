import type { Specimen } from '../../../types'
export const evokerMenuSnap: Specimen = {
  id: 'evoker-menu-snap',
  ref: 'SPX-636',
  title: 'Evoker Menu Snap',
  blurb:
    'Decisive menu commit in ~210ms: previous backing releases, a bright execution line attacks across the new row, angular plates snap, and a left marker locks authority — no weapon imagery.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload–inspired Evoker selection timing',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3-reload'],
  },
  tags: ['selection', 'navigation', 'snap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, selection applies immediately with settled navy/edge/marker styling; no execution line or neighbour nudge.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 300,
    background: 'dark',

    label: 'Evoker menu selection',
  },

}
