import type { Specimen } from '../../../types'

export const barrierBreachAlert: Specimen = {
  id: 'barrier-breach-alert',
  ref: 'SPX-2525',
  title: 'Barrier Breach Alert',
  blurb:
    'An intact perimeter fractures at one exact point, flashing the breach location red while the whole field pulses an alert.',
  origin: {
    project: 'Original',
    surface: 'Naruto / barrier-interfaces — perimeter failure overlays',
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
  tags: ['alert'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the fracture and alert state appear immediately without the pulse animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,280px);height:160px;border:1px solid #1a6b58;background:#0a1210;">{{specimen}}</div></div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Barrier breach alert',
  },
}
