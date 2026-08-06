import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze travel/dock timings from contract.json.',
    'Wire runMissionBoardDispatch / resetMissionBoardDispatch / replayMissionBoardDispatch.',
    'Listen for a postMessage `{ type: "restart" }` to replay; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle card sits in the unassigned column, status UNASSIGNED',
    'Active phase moves the card across the board into the team lane',
    'Resolved phase shows the card docked beside its assignee, status ASSIGNED',
    'Replay resets the card to the unassigned column before rerunning',
    'Reduced motion shows the docked state immediately',
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
