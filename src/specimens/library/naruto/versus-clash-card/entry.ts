import type { Specimen } from '../../../types'

export const versusClashCard: Specimen = {
  id: 'versus-clash-card',
  ref: 'SPX-2560',
  title: 'Versus Clash Card',
  blurb:
    'Two competitor cards close in from either side and clash into a locked versus state with an impact flash.',
  origin: {
    project: 'Original',
    surface: 'Naruto / tournament-arena — match announcement',
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
  tags: ['versus', 'clash', 'tournament'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, both cards appear already clashed in place.',
  },
  acceptance: [
    'Cards travel frozen px then clash-hold',
    'Impact settles both cards in clash pose',
    'Reduced motion shows already clashed',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Versus clash card',
  },
}
