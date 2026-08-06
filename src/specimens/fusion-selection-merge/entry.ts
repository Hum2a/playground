import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#020912;">
  {{specimen}}
</div>
`.trim()

export const fusionSelectionMerge: Specimen = {
  id: 'fusion-selection-merge',
  ref: 'SPX-509',
  title: 'Fusion Selection Merge',
  blurb:
    'Two selected source cards converge, compress across a blue seam, and dissolve under glass polygons into one result that inherits traits from both.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired fusion merge language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['merge', 'combine', 'transformation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, FUSE immediately replaces both sources with Result C and static FUSION COMPLETE.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Fusion selection merge',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~420×360+).',
    'Import demo.css verbatim; keep frozen travel (95px), seam width (2–5px), and phase timings.',
    'Call fuse/reset via window.fusionSelectionMerge or the FUSE / RESET controls.',
    'Guard re-entrancy with the busy flag so mid-merge clicks cannot stack.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate sources→result path.',
  ],
  acceptance: [
    'Two source cards visible initially, both bracket-selected',
    'Cards converge toward centre (~95px / −95px), scale to 0.9, rotate toward each other',
    'Cards overlap with horizontal content compression and a 2–5px blue seam before the result exists',
    'Three translucent blue polygons cover the state change; sources retract inward (no explosion)',
    'Result expands from a narrow vertical scaleX 0.15 and inherits A notch + B diagonal',
    'Final state is exactly one result + FUSION COMPLETE; RESET restores both sources',
    'Reduced motion is immediate; no external assets; works under sandbox="allow-scripts"',
  ],
}
