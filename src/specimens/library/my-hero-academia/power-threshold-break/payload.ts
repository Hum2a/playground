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
    'Start fill 92%; surge to 108% over 500ms.',
    'Threshold line shatter + three accent shards.',
    'Wire runPowerThresholdBreak / reset / replay.',
  ],
  acceptance: [
    'Run breaks 100% cap with visible threshold shatter',
    'Final BREAKTHROUGH state at 108% accent fill',
    'Replay resets to 92% CHARGING',
    'Reduced motion shows breakthrough immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101820;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
