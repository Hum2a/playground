import type { Specimen } from '../types'
export const printRegistrationHover: Specimen = {
  id: 'print-registration-hover',
  ref: 'SPX-045',
  title: 'Print Registration Hover',
  blurb:
    'Registered nav labels whose red and cyan print plates temporarily misalign on hover/focus, then snap back into registration — not a glitch loop.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['hover', 'print', 'misprint'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Layer travel is skipped under prefers-reduced-motion or data-force-reduced-motion; hover/focus shows the final misregistered offsets immediately and restores registration instantly on exit.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Print registration nav',
  },

}
