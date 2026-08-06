import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020b16;">
  {{specimen}}
</div>
`.trim()

export const surfaceBreakReveal: Specimen = {
  id: 'surface-break-reveal',
  ref: 'SPX-408',
  title: 'Surface Break Reveal',
  blurb:
    'A submerged unknown record rises through a graphic waterline — distorted below, sharp above — then a restrained surface reaction and exit leave RECORD // 045 / RECOVERED clear.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 water / depth reveal language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['reveal', 'water', 'threshold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the recovered clear state appears immediately with no ascent or water travel.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Surface break reveal',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~240px content height).',
    'Import demo.css verbatim; keep waterline at 38%, 70px rise, five segments, three ripples.',
    'Call surfaceBreakReveal() from SURFACE; resetSurfaceBreak() or harness restart restores idle.',
    'Keep the stage aria-hidden; announce via the polite status region.',
    'Honour both reduced-motion triggers with the immediate recovered path.',
  ],
  acceptance: [
    'Content begins ~70px below final position under the waterline',
    'Submerged portions show ±3px clipped distortion; clear portions do not',
    'Distortion boundary tracks the waterline (including the 8px react bump)',
    'Crossing triggers one restrained surface reaction and exactly three ripples',
    'Water exits downward over ~220ms; final state is static and clear',
    'No heavy blur filters; reduced motion shows recovered state immediately',
    'No external assets; sandbox="allow-scripts" safe',
  ],
}
