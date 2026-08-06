import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; rank card slams in, then the stamp impacts on top, timings from contract.json.',
    'Wire runMissionRankReveal / resetMissionRankReveal / replayMissionRankReveal.',
    'Honour both reduced-motion triggers; listen for `{ type: "restart" }` postMessage.',
  ],
  acceptance: [
    'Rank card slams into the briefing panel before the stamp appears',
    'Stamp only impacts after the rank card has fully settled',
    'Idle, revealing, and resolved states are visually distinct',
    'Replay resets card and stamp before rerunning',
    'Reduced motion shows the settled card and stamp immediately',
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
