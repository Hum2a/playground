import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden frame (~420×280+).',
    'Import demo.css verbatim; keep frozen idle/selected transforms and neighbour push table.',
    'Wire selectComicCard(index) or click/keyboard on the radiogroup; do not reorder DOM nodes for visual layout.',
    'Ensure changing selection moves neighbours — not only the active card chrome.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an instant state snap.',
  ],
  acceptance: [
    'Three cards present (01 MOTION, 02 TYPE, 03 OVERLAYS) with exactly one selected',
    'Selected card escapes grid alignment (scale ~1.14, lift, overlap)',
    'Neighbours move directionally for each of the three selections',
    'Persistent selection differs clearly from hover preview (face translateY −2px only)',
    'Keyboard selection works with visible focus',
    'DOM order remains 01→02→03',
    'Reduced motion switches immediately',
    'No external assets/fonts/libraries; works at 320px with selected card inside clip bounds',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
