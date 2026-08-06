import type { Specimen } from '../types'
export const criticalCapture: Specimen = {
  id: 'critical-capture',
  ref: 'SPX-711',
  title: 'Critical Capture',
  blurb:
    'A capture begins like any other — then one unusually sharp lock and four critical rays compress the uncertainty into an immediate VERIFIED.',
  origin: {
    project: 'Original',
    surface: 'Pokémon critical-capture / exceptional confidence language (generic capsule)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['confirmation', 'fast-path', 'exceptional', 'capture'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Enter, lock, rays, and confirm ring are skipped under prefers-reduced-motion or data-force-reduced-motion; VERIFIED with a locked container appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 340,
    background: 'dark',

    label: 'Critical capture demo',
  },

}
