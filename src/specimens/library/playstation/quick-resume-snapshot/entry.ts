import type { Specimen } from '../../../types'

export const quickResumeSnapshot: Specimen = {
  id: 'quick-resume-snapshot',
  ref: 'SPX-3336',
  title: 'Quick Resume Snapshot',
  blurb:
    'Frozen PAUSED still expands into a LIVE play surface with pulsing playhead — snapshot ≠ live.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion (abstract)',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['resume', 'snapshot', 'launch'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, expand/fade and pulse animations are removed; frozen/live end states remain.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 300,
    background: 'dark',
    label: 'Quick Resume Snapshot demo',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  },
}
