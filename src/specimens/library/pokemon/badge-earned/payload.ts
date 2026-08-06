import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~320×340+).',
    'Import demo.css verbatim; keep the six-piece offsets, stagger, and lock timings frozen.',
    'Call badgeEarned.complete() / .reset() or use COMPLETE TRIAL / RESET.',
    'Do not update INCOMPLETE → EARNED until assembly lock completes.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate earned path.',
  ],
  acceptance: [
    'Initial state is a thin ghost outline with LOCKED / INCOMPLETE',
    'Final badge uses exactly six primary polygons (~100×100)',
    'Pieces arrive from fixed offsets (30–75px) with stagger 0/35/70/105/140/175ms × ~220ms',
    'After last piece: lock −3deg→2deg→0 over ~140ms with one seam flash',
    'Exactly eight radial lines appear in pairs then vanish (~160ms); no glow loop',
    'Status INCOMPLETE→EARNED only after assembly; final badge remains static',
    'Reduced motion immediate; text announces VECTOR TRIAL and earned state',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0c1014;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
