import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; 5×5 tile grid heals ring-by-ring outward from the centre tile, timings from contract.json.',
    'Wire runHealingProgressField / resetHealingProgressField / replayHealingProgressField.',
    'Honour both reduced-motion triggers; listen for `{ type: "restart" }` postMessage.',
  ],
  acceptance: [
    'Damaged 5×5 field heals in three concentric rings starting from the centre tile',
    'Each ring transitions as a group before the next ring outward begins',
    'Idle, healing, and resolved states are visually distinct',
    'Replay resets every tile to damaged before rerunning',
    'Reduced motion shows every tile healed immediately',
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
