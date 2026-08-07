import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
    integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze card 280ms / stamp impact 180ms / settle −22°→−12° from contract.json.',
    'Wire runMissionRankReveal / resetMissionRankReveal / replayMissionRankReveal.',
    'Honour both reduced-motion triggers; listen for `{ type: "restart" }` postMessage.',
  ],
    acceptance: [
    'Rank B card lands over 280ms before the wax stamp appears',
    'Stamp impacts at −22° overshoot then settles to −12° over 120ms',
    'Resolved shows RANK CONFIRMED with settled stamp angle',
    'Replay clears card and stamp before rerunning',
    'Reduced motion shows settled card + −12° stamp immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#1a1612;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
