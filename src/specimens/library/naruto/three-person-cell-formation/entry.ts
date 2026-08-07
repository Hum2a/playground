import type { Specimen } from '../../../types'

export const threePersonCellFormation: Specimen = {
  id: 'three-person-cell-formation',
  ref: 'SPX-2591',
  title: 'Three-Person Cell Formation',
  blurb:
    'LEAD, SCOUT, and SUPPORT snap into triangle slots (260ms) then three links draw (200ms) into FORMED.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the three-person cell appears already FORMED with links drawn.',
  },
    acceptance: [
    'Exactly 3 nodes (LEAD/SCOUT/SUPPORT) snap from scattered positions',
    'Snap completes in 260ms then 3 links draw over 200ms',
    'Resolved shows FORMED with links fully drawn',
    'Replay returns nodes to scattered before rerunning',
    'Reduced motion shows FORMED with links drawn immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Three-person cell formation',
  },
}
