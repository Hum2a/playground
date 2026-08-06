import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~340×300+).',
    'Import demo.css verbatim; freeze the 220ms descent / 90ms impact / 200ms ink bloom from contract.json.',
    'Wire runSealStampConfirmation / resetSealStampConfirmation / replaySealStampConfirmation.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Pending and filed states are visually distinct',
    'Exactly one stamp strike; ink mark only appears after impact',
    'Replay resets the stamp and mark before rerunning',
    'Reduced motion shows the stamp already struck with the ink mark visible immediately',
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
