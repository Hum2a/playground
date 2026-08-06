import type { Specimen } from '../types'

export const focusHaloSettle: Specimen = {
  id: 'focus-halo-settle',
  ref: 'SPX-3373',
  title: 'Focus Halo Settle',
  blurb: 'A soft bright focus boundary catches up to the newly selected object and settles.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["focus","halo"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Halo appears directly on target with no overshoot.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 280,
    background: 'dark',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Focus halo settle',
  },
}
