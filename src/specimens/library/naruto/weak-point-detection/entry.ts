import type { Specimen } from '../../../types'

export const weakPointDetection: Specimen = {
  id: 'weak-point-detection',
  ref: 'SPX-2490',
  title: 'Weak-Point Detection',
  blurb:
    'Four bracket markers lock onto weak points on a host silhouette in order 0→3.',
  origin: {
    project: 'Original',
    surface: 'Naruto / dojutsu-inspired focus-vision language — analysis overlays',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['detection'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four brackets appear DETECTED immediately.',
  },
    acceptance: [
    'Exactly 4 bracket markers appear in order on the host silhouette',
    'Markers acquire with frozen step timing; final state DETECTED',
    'Replay clears all markers before rerunning',
    'Reduced motion shows all 4 brackets DETECTED immediately',
    'preview.scaffold hosts the overlay',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#1a1e24;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,280px);height:180px;border:1px solid #2c313c;background:#12141a;padding:1rem;color:#e6e8ec;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;">Host card<br/>target surface{{specimen}}</div></div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Weak-point detection scan',
  },
}
