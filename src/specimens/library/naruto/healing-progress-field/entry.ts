import type { Specimen } from '../../../types'

export const healingProgressField: Specimen = {
  id: 'healing-progress-field',
  ref: 'SPX-2527',
  title: 'Healing Progress Field',
  blurb:
    'A 5×5 damage field restores centre-out through rings 0→1→2 with 160ms steps into RESTORED.',
  origin: {
    project: 'Original',
    surface: 'Naruto / medical-ninja recovery UI — field restoration overlays',
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
  tags: ['recovery'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all tiles appear RESTORED immediately.',
  },
    acceptance: [
    '25 tiles heal by ring order 0→1→2 (centre outward) with 160ms steps',
    'Idle shows DAMAGED; done shows RESTORED with all tiles healed',
    'Replay returns all tiles damaged before rerunning',
    'Reduced motion shows RESTORED immediately',
    'Effect stays inside clipped stage / scaffold host',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Healing progress field',
  },
}
