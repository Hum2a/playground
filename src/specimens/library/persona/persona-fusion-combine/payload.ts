import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount synthesis stage relative overflow-hidden (~380×320).',
    'Wire runPersonaFusionCombine / resetPersonaFusionCombine.',
    'SIGMA + DELTA → SYNTH; travel 520ms then merge 480ms.',
  ],
  acceptance: [
    'Input cards travel to center field',
    'Cards vanish; SYNTH result bursts at center',
    'Reduced motion shows result immediately',
    'Palette uses #F5C400 / #101010 / #F7F3E8 / #E8E8E8',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
