import type { Specimen } from '../../../types'
export const crossOutStatusSwap: Specimen = {
  id: 'cross-out-status-swap',
  ref: 'SPX-279',
  title: 'Cross-Out Status Swap',
  blurb:
    'PENDING is struck obsolete by opposing red/black slashes, exits the region, and APPROVED attacks in as the authoritative status — with a CURRENT marker, no traffic-light green.',
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
  tags: ['status', 'value-change', 'strike'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'PENDING swaps immediately to APPROVED under prefers-reduced-motion or data-force-reduced-motion; no strikes, travel, or overshoot. Final geometry remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Export request status',
  },

}
