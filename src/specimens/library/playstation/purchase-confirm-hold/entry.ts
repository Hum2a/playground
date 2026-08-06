import type { Specimen } from '../types'

export const purchaseConfirmHold: Specimen = {
  id: 'purchase-confirm-hold',
  ref: 'SPX-3389',
  title: 'Purchase Confirm Hold',
  blurb: 'A hold-to-confirm purchase control fills toward a threshold ring — release early cancels, full hold commits.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion study (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'playstation',
  },
  tags: ["store","hold"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Manual holds keep 850ms threshold; ring sweep animation static under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Purchase Confirm Hold demo',
  },
}
