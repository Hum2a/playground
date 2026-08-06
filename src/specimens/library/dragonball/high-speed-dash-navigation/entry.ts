import type { Specimen } from '../types'
export const highSpeedDashNavigation: Specimen = {
  id: 'high-speed-dash-navigation',
  ref: 'SPX-1099',
  title: 'High-Speed Dash Navigation',
  blurb:
    'Selection dashes OVERVIEW → LOGS across 320px with opposite anticipation, five fixed speed traces, a METRICS pass bump, brake stretch, and four lock ticks.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired high-speed dash navigation (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['navigation', 'movement', 'velocity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, GO TO LOGS immediately selects LOGS.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 300,
    background: 'dark',

    label: 'High-speed dash demo',
  },

}
