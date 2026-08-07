import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host with overflow: hidden.',
    'Wire runFusionPreview / resetFusionPreview.',
    'Select MODEL A + MODEL B, then Preview; beam 480ms then settle 420ms.',
  ],
  acceptance: [
    'Both inputs must be selected before Preview enables',
    'Beams fire once into a SIGMA ghost preview',
    'Reduced motion shows preview immediately on run',
    'Harness restart resets selection and preview',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101010;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
