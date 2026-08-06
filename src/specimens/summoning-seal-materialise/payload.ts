import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; seal draws in two ring stages before the panel rises, timings from contract.json.',
    'Wire runSummoningSealMaterialise / resetSummoningSealMaterialise / replaySummoningSealMaterialise.',
    'Honour both reduced-motion triggers; listen for `{ type: "restart" }` postMessage.',
  ],
  acceptance: [
    'Seal draws (outer ring, inner ring, radial ticks) before the panel appears',
    'Panel rises out of the seal centre only after the seal is fully drawn',
    'Idle, drawing, and resolved states are visually distinct',
    'Replay resets seal and panel before rerunning',
    'Reduced motion shows the fully drawn seal and materialised panel immediately',
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
