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
    'Import demo.css verbatim; freeze 180ms arc interval and 900ms search.',
    'Connected state has no looping animation.',
    'Fail path exposes Try again.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Searching always ends in success or failure',
    'Connected state has no looping animation',
    'Fail path exposes retry',
    'Original abstract signal geometry',
    'Reset returns to disconnected',
    'Reduced motion: discrete arc steps',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#12141a;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
