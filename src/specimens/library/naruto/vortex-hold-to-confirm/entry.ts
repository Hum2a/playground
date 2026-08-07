import type { Specimen } from '../../../types'

export const vortexHoldToConfirm: Specimen = {
  id: 'vortex-hold-to-confirm',
  ref: 'SPX-2482',
  title: 'Vortex Hold-to-Confirm',
  blurb:
    'Early release before 900ms cancels; a full hold builds three rotating rings then CONFIRMED — CSS hold vars exposed.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — spinning-core hold interaction',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['hold', 'confirmation', 'progress', 'cancel'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Manual pointer/keyboard holds still require the full 900ms but skip the rotating ring animation under prefers-reduced-motion or data-force-reduced-motion; Run/Replay resolve directly to CONFIRMED.',
  },
  acceptance: [
    'Early release before 900ms never confirms (CANCELLED)',
    'Full 900ms hold builds 3 rings then CONFIRMED',
    'CSS exposes --vhc-hold-ms / --vhc-cancel-ms / --vhc-confirm-pulse-ms',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Vortex hold-to-confirm',
  },
}
