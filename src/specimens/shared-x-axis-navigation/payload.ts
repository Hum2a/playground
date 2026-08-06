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
    'Mount inside a relative overflow-hidden host (~360×480 viewport + chrome).',
    'Import demo.css verbatim; freeze offset 30px, scale 0.92, duration 300ms.',
    'Wire resetSharedXAxisNavigation / replaySharedXAxisNavigation.',
    'Progress label stays outside animated plane.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Forward and back directions are visually opposite',
    'Incoming and outgoing panels overlap only during the transition',
    'Persistent chrome never moves',
    'Navigation buttons lock during the 300ms transition',
    'Returning to Overview restores the exact original state',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:700px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
