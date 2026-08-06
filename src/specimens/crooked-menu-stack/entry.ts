import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim()

export const crookedMenuStack: Specimen = {
  id: 'crooked-menu-stack',
  ref: 'SPX-056',
  title: 'Crooked Menu Stack',
  blurb:
    'Unstable overlapping menu where selection expands the active item and physically recomposes neighbouring items around it.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['selection', 'navigation', 'menu', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Selection states switch immediately under prefers-reduced-motion or data-force-reduced-motion; final irregular layout and active geometry remain with no translation/scale choreography.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Site menu',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame (~360×380+).',
    'Import demo.css verbatim; keep frozen idle rotations, active clip-path, and neighbour push table.',
    'Wire selectCrookedMenu(index) or click/keyboard on the radiogroup; do not reorder DOM nodes for visual layout.',
    'Ensure changing selection moves multiple items — not only the active face colour.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an instant state snap.',
  ],
  acceptance: [
    'Five menu options with intentionally irregular idle layout',
    'Active item dramatically differs in size and geometry (black face + red backing)',
    'Selecting another option moves neighbouring items away',
    'Red and black active layers have separated timing (~30ms)',
    'Keyboard navigation works with visible focus',
    'DOM order remains PROFILE→CONTACT',
    'Reduced motion switches immediately',
    'No external assets/fonts/libraries; works at 320px without horizontal scroll',
  ],
}
