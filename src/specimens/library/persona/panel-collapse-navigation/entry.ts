import type { Specimen } from '../types'
export const panelCollapseNavigation: Specimen = {
  id: 'panel-collapse-navigation',
  ref: 'SPX-021',
  title: 'Panel Collapse Navigation',
  blurb:
    'Opposing irregular comic panels crush the current content into a vertical slit, cover for a swap, then tear apart diagonally.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired comic-panel crush transition',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['comic', 'wipe', 'crush'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Crushing panel travel is skipped under prefers-reduced-motion or data-force-reduced-motion; a static full-coverage frame still hides the content change before reveal.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Page transition demo',
  },

}
