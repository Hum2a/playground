import type { Specimen } from '../../../types'

export const missionBoardDispatch: Specimen = {
  id: 'mission-board-dispatch',
  ref: 'SPX-2569',
  title: 'Mission Board Dispatch',
  blurb:
    'A C-Rank Escort job card travels from Unassigned into the Team Lane (+148px path) and docks ASSIGNED.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the card appears already docked in the Team Lane as ASSIGNED.',
  },
    acceptance: [
    'Idle card sits in Unassigned; lane slot is empty dashed',
    'Card travels into Team Lane over 280ms (fallback path +148px, 0px)',
    'Dock settle pulse 160ms then ASSIGNED latches with solid lane border',
    'Replay returns card to Unassigned before rerunning',
    'Reduced motion docks card in lane immediately',
  ],,
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Mission board dispatch',
  },
}
