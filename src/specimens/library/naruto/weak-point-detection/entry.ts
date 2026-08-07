import type { Specimen } from '../../../types'

export const weakPointDetection: Specimen = {
  id: 'weak-point-detection',
  ref: 'SPX-2490',
  title: 'Weak-Point Detection',
  blurb:
    'A scan sweep brackets four weak points in order on 160ms steps across the host diagram.',
  origin: {
    project: 'Original',
    surface: 'Naruto / analysis overlay — weak-point detection',
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
  tags: ["detection","brackets","scan"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Weak-Point Detection state appears immediately.',
  },
  acceptance: [
    'Exactly 4 markers bracket in order [0,1,2,3] at stepMs 160',
    'Host content remains visible under brackets throughout',
    'Status DETECTED only after marker 4 + settleMs 100',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070B0E;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,280px);height:180px;border:1px solid #1a6b58;background:#0a1210;padding:1rem;color:#d7f5ec;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;">Host card<br/>target surface{{specimen}}</div></div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Weak-Point Detection',
  },
}
