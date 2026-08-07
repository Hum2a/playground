import type { Specimen } from '../../../types'

export const barrierBreachAlert: Specimen = {
  id: 'barrier-breach-alert',
  ref: 'SPX-2525',
  title: 'Barrier Breach Alert',
  blurb:
    'A sealed perimeter takes one fracture at -18°, one alarm pulse, then latches BREACH DETECTED.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, BREACH DETECTED appears immediately with no alarm pulse.',
  },
    acceptance: [
    'Single fracture at frozen angle -18° (fractureCount 1)',
    'One alarm pulse 280ms then BREACH DETECTED latches (no loop flash)',
    'Seal lacquer palette',
    'Replay restores SECURE before rerunning',
    'Reduced motion shows BREACH DETECTED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0c0806;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,260px);min-height:180px;border:1px solid #5a5048;background:#140e0c;padding:1rem;color:#f4f1e8;font:600 12px ui-sans-serif,system-ui,sans-serif;">Secured zone{{specimen}}</div></div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Barrier Breach Alert',
  },
}
