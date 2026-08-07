import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire SELECT to runHomeToGameHandoff(); RESET to resetHomeToGameHandoff().',
    'Phases: idle → select → expand → launch.',
    'Import demo.css verbatim.',
    'Preserve RM on .htgh__rail, .htgh__tile, .htgh__launch and JS skip of expand delay.',
  ],
  acceptance: [
    'SELECT runs idle → select → expand → launch; launch shows LAUNCHING.',
    'Expand uses scale 1.35 and 12px lift before the 520ms handoff.',
    'RESET returns to the idle home rail.',
    'Reduced motion kills rail/tile/launch transitions and jumps to launch with no expand delay.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
