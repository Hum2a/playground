import type { Specimen } from '../../../types'

export const summoningSealMaterialise: Specimen = {
  id: 'summoning-seal-materialise',
  ref: 'SPX-2516',
  title: 'Summoning Seal Materialise',
  blurb:
    'A radial seal draw-strokes itself, then a tool panel expands from the seal centre via clip and scale — not a fade.',
  origin: {
    project: 'Original',
    surface: 'Naruto / summoning-interfaces — ritual construction overlays',
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
  tags: ['summon', 'draw-stroke', 'expand'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the seal appears fully drawn and the panel is already materialised.',
  },
  acceptance: [
    'Outer then inner ring draw-stroke before panel expands',
    'Panel expands from seal centre via clip/scale (not fade)',
    'Reduced motion shows materialised panel immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#140c0c;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Summoning seal materialise',
  },
}
