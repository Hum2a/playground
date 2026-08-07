import type { Specimen } from '../../../types'

export const healingProgressField: Specimen = {
  id: 'healing-progress-field',
  ref: 'SPX-2527',
  title: 'Healing Progress Field',
  blurb:
    'A damaged tile grid reconstructs ring-by-ring from the centre outward until the whole field reads stable and restored.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, every tile appears healed immediately as RESTORED.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Healing progress field',
  },
}
