import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020912;">
  {{specimen}}
</div>
`.trim()

export const tacticalCommandWheel: Specimen = {
  id: 'tactical-command-wheel',
  ref: 'SPX-486',
  title: 'Tactical Command Wheel',
  blurb:
    'Radial command selector: VIEW / EDIT / COPY / DELETE rotate in 90° steps to an east snap point, labels stay upright, and the hub updates only after the final snap.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload–inspired tactical UI language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3-reload'],
  },
  tags: ['navigation', 'selection', 'menu'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the wheel jumps to the selected command with no travel/snap; hub and radios update together.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 320,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Tactical command wheel',
  },
  integration: [
    'Mount inside a relative host (~320×320+).',
    'Import demo.css verbatim; keep 95px radius, 90° steps, 160ms travel + 60ms snap, and @property --tcw-rot.',
    'Use radiogroup semantics; call tacticalCommandWheel.select(index) / .next() / .prev() or rely on auto-bound controls.',
    'Hub label must update only after snap completes (reduced-motion path may update immediately).',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate reposition path.',
  ],
  acceptance: [
    'Four commands: VIEW, EDIT, COPY, DELETE',
    'Commands sit on an approximately 95px radius; selected command occupies east',
    'Labels remain upright via counter-rotation while the wheel relationship rotates',
    'Arrow keys / steppers rotate in discrete 90° increments (~220ms); no continuous spin',
    'Final ~30° of each step completes faster than the first ~60°',
    'Two small blue brackets frame the selected (east) command',
    'Centre value updates only after snap completes',
    'Radiogroup + live status convey selection without relying on spatial position alone',
    'Reduced motion immediate; no external assets; works under sandbox="allow-scripts"',
  ],
}
