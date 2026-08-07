import type { Specimen } from '../../../types'

export const summoningSealMaterialise: Specimen = {
  id: 'summoning-seal-materialise',
  ref: 'SPX-2516',
  title: 'Summoning Seal Materialise',
  blurb:
    'Outer ring draws in 300ms, inner in 260ms with 8 ticks; then a tool panel expands from the seal centre via clip-path + scale 0.2→1 — never a fade.',
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
  tags: ['summon', 'seal', 'clip'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the seal appears fully drawn and the panel is already materialised.',
  },
  acceptance: [
    'Outer ring stroke 300ms then inner 260ms with 8 ticks before panel expands',
    'Panel expands clip-path circle + scale 0.2→1 from seal centre — not opacity fade',
    'Reduced motion shows MATERIALISED panel immediately',
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
