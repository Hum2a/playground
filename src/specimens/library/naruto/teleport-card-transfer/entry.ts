import type { Specimen } from '../../../types'

export const teleportCardTransfer: Specimen = {
  id: 'teleport-card-transfer',
  ref: 'SPX-2677',
  title: 'Teleport Card Transfer',
  blurb:
    'A card compresses into an 8→72px phosphor aperture (200ms), holds empty 120ms, then reconstructs at the destination (220ms) — space-time transfer, not a fade slide.',
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
  acceptance: [
    'Aperture 8→72px compress 200ms; mid empty hold 120ms',
    'Destination reconstructs in 220ms after empty hold',
    'Reduced motion shows reconstructed destination',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Teleport card transfer',
  },
}
