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
    'Import demo.css verbatim; freeze card 300×520 and 380ms transition.',
    'Wire resetAppToRecentsShrink on replay.',
    'OVERVIEW button and bottom swipe both enter overview.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Active application becomes centre task card',
    'Adjacent tasks appear as overview establishes',
    'No screenshot image required',
    'Active task remains visually dominant',
    'Restore reverses cleanly to full-screen',
    'Reduced motion: direct geometry switch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:760px;background:#0a0e16;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
