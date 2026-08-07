import type { Specimen } from '../../../types'

export const healingProgressField: Specimen = {
  id: 'healing-progress-field',
  ref: 'SPX-2527',
  title: 'Healing Progress Field',
  blurb:
    'A 25-tile damaged field restores ring-by-ring with 220ms stagger into RESTORED.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, all tiles appear RESTORED immediately.',
  },
    acceptance: [
    '25-tile field restores ring-by-ring (tileCount 25)',
    'Ring stagger 220ms; centre→outer order',
    'Tiles restore via scale/saturation, not opacity-only fade',
    'Replay damages all tiles before rerunning',
    'Reduced motion shows RESTORED immediately',
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
