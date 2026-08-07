import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount forecast card in overflow-hidden host.',
    'Wire runFogForecast / resetFogForecast; stages WATCH→ADVISORY→ALERT at 700ms.',
  ],
  acceptance: [
    'Finite escalate run advances through three discrete stages',
    'Stage label updates WATCH → ADVISORY → ALERT',
    'Reset and harness restart return to idle',
    'Reduced motion jumps to ALERT',
    'Palette uses #F5C400 / #101010 / #F7F3E8 / #E8E8E8',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
