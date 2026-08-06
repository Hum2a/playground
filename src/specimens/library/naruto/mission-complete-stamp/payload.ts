import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze stamp timings from contract.json.',
    'Wire runMissionCompleteStamp / resetMissionCompleteStamp / replayMissionCompleteStamp.',
    'Listen for a postMessage `{ type: "restart" }` to replay; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle briefing shows PENDING with no stamp mark',
    'Active phase drops the stamp with a slam + ring settle',
    'Resolved phase shows COMPLETE stamp locked in place',
    'Replay resets the stamp off-card before rerunning',
    'Reduced motion shows COMPLETE immediately',
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
