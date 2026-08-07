import type { Specimen } from '../../../types'

export const resumeActivityHandoff: Specimen = {
  id: 'resume-activity-handoff',
  ref: 'SPX-3333',
  title: 'Resume Activity Handoff',
  blurb:
    'Activity card expands spatially (580ms) into a full RESUMED task surface — not a scale bump.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'transition', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['resume', 'activity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, card and task-layer transitions are removed; RESUMED appears instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Resume activity handoff',
  },
}
