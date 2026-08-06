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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze ripple 420ms, opacity 0.18→0.',
    'Wire resetBoundedTouchRipple / replayBoundedTouchRipple.',
    'Each control uses shared ripple primitive via data-btr-target.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Pointer-origin visibly changes when clicking different target areas',
    'Ripple reaches every corner without escaping the control',
    'Rapid repeated presses do not leave orphaned nodes',
    'Keyboard activation receives equivalent feedback',
    'Each control can use the primitive without bespoke JS',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#14161c;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
