import type { Specimen } from '../../../types'

export const threePersonCellFormation: Specimen = {
  id: 'three-person-cell-formation',
  ref: 'SPX-2591',
  title: 'Three-Person Cell Formation',
  blurb:
    'Three scattered profile nodes snap into a triangular cell formation around a shared mission point, then link.',
  origin: {
    project: 'Original',
    surface: 'Naruto / team-formation — squad assembly',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['team', 'formation', 'squad'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all three nodes appear already formed and linked.',
  },
  acceptance: [
    'Three nodes assemble at frozen positions with link draw',
    'Formation locks when all links complete',
    'Reduced motion shows formed cell immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Three-person cell formation',
  },
}
