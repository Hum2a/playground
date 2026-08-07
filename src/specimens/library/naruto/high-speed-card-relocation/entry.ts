import type { Specimen } from '../../../types'

export const highSpeedCardRelocation: Specimen = {
  id: 'high-speed-card-relocation',
  ref: 'SPX-2410',
  title: 'High-Speed Card Relocation',
  blurb:
    'A card leaves exactly two afterimages at 0% and 25% along a 200ms path, absent mid-travel, then docks in slot B.',
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
    '2 afterimages at 0%/25% during 200ms travel',
    'Card absent mid-travel; docks in slot B after 40ms settle',
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
