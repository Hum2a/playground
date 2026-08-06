import type { Specimen } from '../types'

export const resumeActivityHandoff: Specimen = {
  id: 'resume-activity-handoff',
  ref: 'SPX-3333',
  title: 'Resume Activity Handoff',
  blurb: 'An activity card becomes the active full-size game/task state.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'transition', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["resume","activity"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Active state shown immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Resume activity handoff',
  },
}
