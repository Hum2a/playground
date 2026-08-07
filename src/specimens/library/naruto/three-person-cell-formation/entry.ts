import type { Specimen } from '../../../types'

export const threePersonCellFormation: Specimen = {
  id: 'three-person-cell-formation',
  ref: 'SPX-2591',
  title: 'Three-Person Cell Formation',
  blurb:
    'Three profile nodes snap to frozen triangle posts (260ms) then draw links (200ms) into a cell.',
  origin: {
    project: 'Original',
    surface: 'Naruto / team formation — three-person cell',
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
  tags: ["team","formation","squad"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Three-Person Cell Formation state appears immediately.',
  },
  acceptance: [
    'Three nodes travel from scatter posts to formed posts over snapMs 260',
    'Links draw only after snap, completing over linkMs 200',
    'Status becomes FORMED only when all links are active',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Three-Person Cell Formation',
  },
}
