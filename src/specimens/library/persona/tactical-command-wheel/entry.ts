import type { Specimen } from '../types'
export const tacticalCommandWheel: Specimen = {
  id: 'tactical-command-wheel',
  ref: 'SPX-486',
  title: 'Tactical Command Wheel',
  blurb:
    'Radial command selector: VIEW / EDIT / COPY / DELETE rotate in 90° steps to an east snap point, labels stay upright, and the hub updates only after the final snap.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload–inspired tactical UI language',
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
  tags: ['navigation', 'selection', 'menu'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the wheel jumps to the selected command with no travel/snap; hub and radios update together.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 340,
    background: 'dark',

    label: 'Tactical command wheel',
  },

}
