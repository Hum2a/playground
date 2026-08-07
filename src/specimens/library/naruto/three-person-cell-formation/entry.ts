import type { Specimen } from '../../../types'

export const threePersonCellFormation: Specimen = {
  id: 'three-person-cell-formation',
  ref: 'SPX-2591',
  title: 'Three-Person Cell Formation',
  blurb:
    'Lead/Scout/Support snap to a frozen triangle (260ms) then draw links (180ms) into FORMED.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the cell appears already formed and linked.',
  },
    acceptance: [
    'Three nodes snap to frozen formed positions (lead 14%/50%, scout 78%/24%, support 78%/76%) over snapMs 260',
    'Links draw via stroke-dashoffset over linkMs 180 after snap',
    'Resolved latches FORMED',
    'Replay restores scattered positions before rerunning',
    'Reduced motion shows formed+linked immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Three-Person Cell Formation',
  },
}
