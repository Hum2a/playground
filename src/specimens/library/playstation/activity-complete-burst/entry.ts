import type { Specimen } from '../../../types'

export const activityCompleteBurst: Specimen = {
  id: 'activity-complete-burst',
  ref: 'SPX-3340',
  title: 'Activity Complete Burst',
  blurb:
    'A completed activity fires a finite geometric shape burst, then settles with a DONE badge.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['burst', 'completion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, burst is skipped and the done state appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 300,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Activity complete burst',
  },
  acceptance: [
    'Complete fires exactly 8 finite particles (circle, cross, square, triangle ×2).',
    'Burst lasts 560ms then settles with a visible DONE badge.',
    'Particles do not loop after settling.',
    'Reduced motion skips the burst and shows the done state immediately.',
  ],
}
