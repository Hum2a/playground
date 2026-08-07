import type { Specimen } from '../../../types'

export const highSpeedCardRelocation: Specimen = {
  id: 'high-speed-card-relocation',
  ref: 'SPX-2410',
  title: 'High-Speed Card Relocation',
  blurb:
    'The card is absent mid-travel while two afterimages (220ms / 150ms) mark the path, then it docks in slot B.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — body flicker & high-speed navigation',
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
  tags: ['relocation', 'afterimage', 'handoff'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the card appears directly in slot B with no travel or afterimages.',
  },
  acceptance: [
    'Card absent mid-travel; only afterimages visible',
    'Two ghosts at 0%/25% then dock in slot B',
    'Reduced motion places card in slot B immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 300,
    background: 'dark',
    label: 'High-speed card relocation',
  },
}
