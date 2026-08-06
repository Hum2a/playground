import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden viewport.',
    'Import demo.css verbatim; call runEyecatchTransition(target) on trigger.',
    'Swap content at interstitial midpoint while fully covered.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Continue/Return runs one eyecatch sequence then shows the other state',
    'Interstitial remains clipped to the specimen frame',
    'Replay via restart message resets to state A',
    'Reduced motion swaps states without panel travel',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
