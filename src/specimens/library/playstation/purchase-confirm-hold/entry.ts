import type { Specimen } from '../../../types'

export const purchaseConfirmHold: Specimen = {
  id: 'purchase-confirm-hold',
  ref: 'SPX-3389',
  title: 'Purchase Confirm Hold',
  blurb:
    'Store CTA card with price and legal copy — hold the buy bar 850ms to confirm; early release cancels.',
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
    works: ['ps5'],
  },
  tags: ['store', 'hold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: '850ms hold threshold preserved; CTA fill transition removed under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 380,
    background: 'dark',
    label: 'Purchase Confirm Hold demo',
  },
}
