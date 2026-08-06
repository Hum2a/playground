import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×360+).',
    'Import demo.css verbatim; freeze swap-at (420ms) / total (600ms) / settle (150ms) from contract.json.',
    'Wire runWindSliceTransition / resetWindSliceTransition / replayWindSliceTransition.',
    'Content swap fires once the last blade fully covers the stage; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Four diagonal blades sweep across with a staggered 70ms offset each',
    'Content swap is invisible to the viewer — it happens while covered',
    'Replay resets to state one before rerunning',
    'Reduced motion swaps state instantly with no blade sweep',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
