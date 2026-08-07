import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×300+).',
    'Import demo.css verbatim; freeze travel 28px / close 240ms / clash hold 180ms from contract.json.',
    'Wire runVersusClashCard / resetVersusClashCard / replayVersusClashCard.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle cards sit 28px apart from centre (STANDBY)',
    'Cards slam inward over 240ms then hold clash 180ms',
    'VS flash 200ms then CLASH locks with alarm borders',
    'Replay returns cards to 28px apart before rerunning',
    'Reduced motion shows CLASH locked immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#1A1612;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
