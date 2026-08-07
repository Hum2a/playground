import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
    integration: [
    'Mount inside a relative host (~420×300+).',
    'Import demo.css verbatim; freeze travel 280ms / settle 160ms / fallback +148px from contract.json.',
    'Wire runMissionBoardDispatch / resetMissionBoardDispatch / replayMissionBoardDispatch.',
    'Honour both reduced-motion triggers.',
  ],
    acceptance: [
    'Idle card sits in Unassigned; lane slot is empty dashed',
    'Card travels into Team Lane over 280ms (fallback path +148px, 0px)',
    'Dock settle pulse 160ms then ASSIGNED latches with solid lane border',
    'Replay returns card to Unassigned before rerunning',
    'Reduced motion docks card in lane immediately',
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
