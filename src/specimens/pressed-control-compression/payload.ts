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
    'Import demo.css verbatim; freeze control 180×52 and press/release timings.',
    'Wire resetPressedControlCompression.',
    'Keyboard Space/Enter activation supported.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Press compresses once without loop',
    'Release inside activates READY → RUNNING',
    'Release/cancel outside does not activate',
    'Keyboard activation works',
    'Reduced motion: structural boundary only',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:200px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
