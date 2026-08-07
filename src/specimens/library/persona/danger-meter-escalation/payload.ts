import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount danger meter; wire runDangerMeter / resetDangerMeter.',
    'Levels CLEAR→CAUTION→WARNING→CRITICAL at 500ms steps.',
  ],
  acceptance: [
    'Escalate advances through four discrete levels once (not infinite loop)',
    'Bars fill per level; hazard stripe only at CRITICAL',
    'Reset and harness restart return to CLEAR',
    'Reduced motion jumps to CRITICAL',
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
