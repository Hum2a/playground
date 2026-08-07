import type { Specimen } from '../../../types'

export const barrierBreachAlert: Specimen = {
  id: 'barrier-breach-alert',
  ref: 'SPX-2525',
  title: 'Barrier Breach Alert',
  blurb:
    'Perimeter fractures at a single -18° point; alert latches for 700ms with no loop flash.',
  origin: {
    project: 'Original',
    surface: 'Naruto / barrier interfaces — breach alert',
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
  tags: ["alert","breach","barrier"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Barrier Breach Alert state appears immediately.',
  },
  acceptance: [
    'Exactly one fracture appears at fractureDeg -18; no additional cracks',
    'Alert pulse runs once for alarmMs 700 then latches BREACHED (noLoopFlash)',
    'Replay clears fracture + alert before rerunning',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070B0E;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,280px);height:160px;border:1px solid #1a6b58;background:#0a1210;">{{specimen}}</div></div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Barrier Breach Alert',
  },
}
