import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze extend/lock timings from contract.json.',
    'Wire runShadowBindSelection / resetShadowBindSelection / replayShadowBindSelection.',
    'Listen for a postMessage `{ type: "restart" }` to replay; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle shows source and target apart and unbound, status FREE',
    'Active phase extends a shadow tendril from source to target',
    'Resolved phase locks both cards with a shared bound outline, status BOUND',
    'Replay releases the bind before rerunning',
    'Reduced motion shows the bound state immediately',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
