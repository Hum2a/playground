import type { Specimen } from '../../../types'

export const missionBoardDispatch: Specimen = {
  id: 'mission-board-dispatch',
  ref: 'SPX-2569',
  title: 'Mission Board Dispatch',
  blurb:
    'A job card leaves the unassigned board column and travels into a team lane, docking beside its assignee.',
  origin: {
    project: 'Original',
    surface: 'Naruto / village-administration — dispatch board',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['dispatch', 'board', 'roster'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the card appears already docked in the assigned lane.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Mission board dispatch',
  },
}
