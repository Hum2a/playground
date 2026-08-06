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
    'Mount inside relative overflow-clipped host.',
    'Import demo.css verbatim; no browser permission APIs.',
    'Focus trapped while dialog open; Escape denies.',
    'Grant updates feature card to Enabled.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Never calls browser permission APIs',
    'All three choices produce deterministic states',
    'Focus trapped while open',
    'Escape behaves like denial',
    'Host feature visibly reflects result',
    'Reduced motion: immediate prompt',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
