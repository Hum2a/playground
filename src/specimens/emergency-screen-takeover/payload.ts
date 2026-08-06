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
    'Mount inside relative overflow-hidden host.',
    'Import demo.css verbatim; freeze 420ms plane sweep.',
    'Call runEmergencyTakeover() from ALERT.',
    'Use reset/replay for harness restart.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Calm monitor visible before trigger',
    'Diagonal planes sweep across viewport',
    'EMERGENCY takeover copy readable at settle',
    'Replay restores calm monitor',
    'Reduced motion shows final alert immediately',
    'Sandbox-safe with no external resources',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:280px;border:2px solid #101820;background:#F4F7FA;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
