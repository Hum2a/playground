import type { Specimen } from '../../../types'
export const capsuleCollapse: Specimen = {
  id: 'capsule-collapse',
  ref: 'SPX-1149',
  title: 'Capsule Collapse',
  blurb:
    'SERVICE // API-07 structurally folds through two compression stages, four encoding lines seal a hardware capsule shell, and the stamped pill docks into STORAGE // 03 — never a fade.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired hardware object storage compression',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['compression', 'storage', 'packing', 'capsule'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, PACK jumps to the docked stamped capsule with Service API-07 stored.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 400,
    background: 'card',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;padding:1rem;">{{specimen}}</div>',
    label: 'Hardware capsule storage compression',
  },
  integration: [
    'Keep two explicit structural compression stages (100×74 then 56×42) — not a single scale.',
    'Preserve hemispherical caps, centre seam, stamped API-07, and four encoding lines.',
    'Final silhouette must read as a docked hardware capsule, not a hidden panel.',
  ],
  acceptance: [
    'Full service card structurally folds before two compression stages with visible bracket prepare',
    'Metadata clears REGION → LATENCY → WORKERS while API-07 remains on stamp',
    'Exactly four encoding lines; hardware capsule docks into 54×34px bay; final status is STORED',
  ],
}
