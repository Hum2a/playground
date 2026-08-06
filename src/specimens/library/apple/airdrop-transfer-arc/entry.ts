import type { Specimen } from '../types'
export const airdropTransferArc: Specimen = {
  id: 'airdrop-transfer-arc',
  ref: 'SPX-1487',
  title: 'AirDrop Transfer Arc',
  blurb:
    'REPORT.PDF sends to DEVICE // B after acceptance; four brackets, 520ms quadratic arc with progress 0–100, recipient expands 4px, final RECEIVED.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired nearby transfer arc',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['transfer', 'arc', 'nearby'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, show accepted then received without arc travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 240,
    background: 'dark',

    label: 'AirDrop transfer arc',
  },

}
