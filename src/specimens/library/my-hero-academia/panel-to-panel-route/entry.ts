import type { Specimen } from '../../../types'
export const panelToPanelRoute: Specimen = {
  id: 'panel-to-panel-route',
  ref: 'SPX-2211',
  title: 'Panel-to-Panel Route',
  blurb:
    'A selected comic panel scales to fill the stage and resolves into the next routed content state.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired comic/anime action language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['comic', 'panel', 'route', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, the route view appears immediately without panel expansion choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Panel-to-panel route',
  },

}
