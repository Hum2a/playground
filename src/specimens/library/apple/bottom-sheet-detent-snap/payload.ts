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
    'Mount inside a relative overflow-hidden host (600px preview height).',
    'Import demo.css verbatim; freeze detents 112/318/520, handle 36×5, corners 18px.',
    'Wire resetBottomSheetDetentSnap.',
    'Progressive reveal for metrics and steps — no DOM swap.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Exactly three detents at 112 / 318 / 520px visible',
    'Sheet draggable in both directions via handle',
    'Release selects deterministic detent (nearest or velocity)',
    'Velocity can advance or retreat one detent',
    'Overshoot never exceeds 8px',
    'Expanded steps not visible in collapsed state',
    'Sheet always rests on exact detent after settle',
    'Reduced motion: 160ms snap or immediate under forced RM',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:600px;background:#10141c;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
