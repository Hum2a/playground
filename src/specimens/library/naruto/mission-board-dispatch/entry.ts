import type { Specimen } from '../../../types'

export const missionBoardDispatch: Specimen = {
  id: 'mission-board-dispatch',
  ref: 'SPX-2569',
  title: 'Mission Board Dispatch',
  blurb:
    'C-Rank Escort travels a frozen 148px path from Unassigned into the team lane, then docks.',
  origin: {
    project: 'Original',
    surface: 'Naruto / mission board — dispatch assign',
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
  tags: ["dispatch","board","assign"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the job card appears already docked in the team lane as ASSIGNED.',
  },
  acceptance: [
    'Card travels frozen ~148×0px over travelMs 260',
    'ASSIGNED only after settleMs 200 dock pulse',
    'Reduced motion docks immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Mission board dispatch',
  },
}
