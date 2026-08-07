import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~360×320+).',
    'Import demo.css verbatim; freeze 16→190px height / 480ms unroll / 280ms line start / 70ms stagger from contract.json.',
    'Wire runMissionScrollUnroll / resetMissionScrollUnroll / replayMissionScrollUnroll.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle body height is 16px (rolled); done body height is 190px (open)',
    'Unroll expands height over 480ms; line unclip starts at 280ms',
    'Exactly four briefing lines unclip with 70ms stagger into BRIEFED',
    'Replay collapses to 16px then re-runs',
    'Reduced motion shows 190px open scroll with all lines immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#1a1612;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
