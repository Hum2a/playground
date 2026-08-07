import type { Specimen } from '../../../types'

export const activityProgressFill: Specimen = {
  id: 'activity-progress-fill',
  ref: 'SPX-3339',
  title: 'Activity Progress Fill',
  blurb:
    'A compact activity card fills determinate progress in discrete steps toward a fixed completion boundary.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['progress', 'activity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, fill snaps to 100% with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 280,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Activity progress fill',
  },
  acceptance: [
    'Progress fills in discrete steps 0 → 28 → 55 → 82 → 100 over 480ms each.',
    'A visible completion-boundary tick marks the 100% track end.',
    'At 100%, the percent chip and card read as completed.',
    'Reduced motion jumps to 100% with no fill transition.',
  ],
}
