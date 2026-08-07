import type { Specimen } from '../../../types'

export const healingProgressField: Specimen = {
  id: 'healing-progress-field',
  ref: 'SPX-2527',
  title: 'Healing Progress Field',
  blurb:
    'A 5×5 damaged field restores ring-by-ring (centre→outer) on 220ms steps until RESTORED.',
  origin: {
    project: 'Original',
    surface: 'Naruto / medical ninja — healing field',
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
  tags: ["recovery","tiles","field"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Healing Progress Field state appears immediately.',
  },
  acceptance: [
    'Tiles heal by ring 0→1→2 (centre-out) at stepMs 220 — not random fade',
    'All 25 tiles data-healed=true before status RESTORED + settleMs 100',
    'Replay marks every tile damaged before rerunning',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070B0E;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Healing Progress Field',
  },
}
