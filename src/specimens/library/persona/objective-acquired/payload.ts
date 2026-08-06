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
    'Mount inside a relative overflow-hidden frame.',
    'Import demo.css verbatim; keep frozen hex colours and 850ms piece windows.',
    'Call acquireObjective for first show; use clearObjective / replayObjective for deterministic replay without DOM accumulation.',
    'Announce once via the polite status node; keep visual typography aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate final card.',
  ],
  acceptance: [
    'Objective begins absent; at least five pieces assemble from multiple directions',
    'Main objective text is dominant with ~5px overshoot; progress attaches late',
    'Two pin impacts finish assembly with ~2px card shifts',
    'Card remains permanently afterward; nothing loops',
    'Reduced motion shows the final card immediately',
    'Exact assembly timing documented; no external dependencies/assets',
    'One polite announcement: New objective: Build the Archive. Create 50 portable specimens.',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#161616;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
