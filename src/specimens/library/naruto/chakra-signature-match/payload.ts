import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount with preview.scaffold overlay host.',
    'Import demo.css verbatim; freeze alignThreshold 0.92 / samplePoints from contract.json.',
    'Wire runChakraSignatureMatch / reset / replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Five waveform sample points must reach align threshold 0.92 to MATCH',
    'Bands acquire in frozen order with step timing from contract',
    'Resolved shows MATCH with aligned signature',
    'Replay misaligns samples before rerunning',
    'Reduced motion shows MATCH immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#070b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
