import type { Specimen } from '../types'

export const teleportCardTransfer: Specimen = {
  id: 'teleport-card-transfer',
  ref: 'SPX-2677',
  title: 'Teleport Card Transfer',
  blurb:
    'A card compresses into a circular aperture at its source slot and reconstructs out of a matching aperture at the destination.',
  origin: {
    project: 'Original',
    surface: 'Naruto / space-time-teleportation-interfaces — card transfer',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['transfer', 'teleport', 'aperture'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the card appears already reconstructed at the destination.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Teleport card transfer',
  },
}
