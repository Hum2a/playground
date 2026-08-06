import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze crack/unlock timings from contract.json.',
    'Wire runExamStartSeal / resetExamStartSeal / replayExamStartSeal.',
    'Listen for a postMessage `{ type: "restart" }` to replay; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle panel is locked behind an intact seal, status LOCKED',
    'Active phase cracks the seal open and dims it',
    'Resolved phase shows the panel active with the timer state running, status ACTIVE',
    'Replay resets the seal to locked before rerunning',
    'Reduced motion shows the active state immediately',
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
