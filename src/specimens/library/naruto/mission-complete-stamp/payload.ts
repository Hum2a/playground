import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
    integration: [
    'Mount inside a relative host (~420×320+) with preview.scaffold host card.',
    'Import demo.css verbatim; freeze slam 220ms / settle −18°→−14° / ring 260ms from contract.json.',
    'Wire runMissionCompleteStamp / resetMissionCompleteStamp / replayMissionCompleteStamp.',
    'Honour both reduced-motion triggers.',
  ],
    acceptance: [
    'Idle briefing shows PENDING with stamp off-card',
    'Slam lands at −18° overshoot over 220ms then settles to −14°',
    'Exactly one ring pulse (260ms) then COMPLETE latches',
    'Replay clears stamp off-card before rerunning',
    'Reduced motion shows −14° COMPLETE immediately with no slam',
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
