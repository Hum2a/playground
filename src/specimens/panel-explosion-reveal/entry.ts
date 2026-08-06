import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#090909;">
  {{specimen}}
</div>
`.trim()

export const panelExplosionReveal: Specimen = {
  id: 'panel-explosion-reveal',
  ref: 'SPX-105',
  title: 'Panel explosion reveal',
  blurb:
    'A solid irregular black seal cracks into seven comic panels that accelerate away from an off-centre impact, exposing content already underneath.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired comic-panel fracture reveal',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['reveal', 'impact', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Cover is removed immediately; host content appears at full scale with no crack, flight, or scale animation.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Panel explosion reveal',
  },
  integration: [
    'Mount host content and the .panel-burst cover inside a relative overflow-hidden frame.',
    'Import demo.css verbatim; keep frozen clip-paths, impact point (54%/47%), exit vectors, and delays.',
    'Call runPanelExplosion() from BREAK SEAL (or equivalent); use resetPanelExplosion() before replay.',
    'Keep the cover aria-hidden; leave host copy and CTA semantic.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with the instant-reveal path.',
  ],
  acceptance: [
    'Initial cover fully obscures the host and reads as one composition built from ~7 panels',
    'Impact origin is visibly off-centre (~54%/47%) with a brief mark and radial strokes',
    'Crack gaps reveal actual underlying content before panels fly',
    'Panels separate in multiple deterministic radial directions with staggered delays',
    'At least three panels show red backings that lag the foreground pieces',
    'Host scales in (no opacity fade); final content is stable with no looping debris',
    'Reduced motion reveals instantly; works 320–768; sandbox-safe with no network/assets',
  ],
}
